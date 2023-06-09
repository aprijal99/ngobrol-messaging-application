import {Box, CircularProgress, Container, Typography} from '@mui/material';
import PrivateLeftMessage from './PrivateLeftMessage';
import RightMessage from './RightMessage';
import ScrollableContainer from '../ScrollableContainer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import fetchMessage from '../../../functions/fetchMessage';
import {setInitialMessage} from '../../../redux/slice/messageSlice';
import fetchGroupMessage from '../../../functions/fetchGroupMessage';
import {setInitialGroupMessage} from '../../../redux/slice/groupMessageSlice';
import GroupLeftMessage from './GroupLeftMessage';

const PrivateMessageList = ({ contactEmail }: { contactEmail: string, }) => {
  const { user: { email: userEmail } } = useSelector((state: RootState) => state.user);
  const { message } = useSelector((state: RootState) => state.message);

  const dispatch = useDispatch<AppDispatch>();
  if(message[contactEmail] === undefined) {
    fetchMessage(userEmail, contactEmail)
      .then(msg => {
        if(msg instanceof Error) dispatch(setInitialMessage({ email: contactEmail, message: [], }));
        else dispatch(setInitialMessage({ email: contactEmail, message: msg, }));
      });
  }

  return (
    <>
      {message[contactEmail] === undefined ?
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
          <CircularProgress />
        </div> : <Box sx={{ mb: -2, display: 'flex', flexDirection: 'column-reverse', }}>
          {message[contactEmail].length !== 0 ?
            message[contactEmail].map((m, idx) => {
              if(m.receiverEmail === contactEmail) {
                const removeBbr: boolean = idx === 0 ? true : message[contactEmail][idx-1].receiverEmail !== m.receiverEmail;
                const addMarginTop: boolean = idx === (message[contactEmail].length-1) ? false : message[contactEmail][idx+1].receiverEmail !== m.receiverEmail;

                return <RightMessage key={idx} message={m.message} bbr={removeBbr} mt={addMarginTop}/>;
              } else {
                const removeBtl: boolean = idx === (message[contactEmail].length-1) ? true : message[contactEmail][idx+1].receiverEmail !== m.receiverEmail;
                const addMarginTop: boolean = idx === (message[contactEmail].length-1) ? false : message[contactEmail][idx+1].receiverEmail !== m.receiverEmail;

                return <PrivateLeftMessage key={idx} message={m.message} btl={removeBtl} mt={addMarginTop}/>;
              }
            }) :
            <Box display='flex' justifyContent='center'>
              <Typography
                sx={{ textAlign: 'center', fontSize: '.9rem', px: 1.5, py: .5, borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.08)', }}
              >
                There is no message yet
              </Typography>
            </Box>
          }
        </Box>
      }
    </>
  );
}

const GroupMessageList = ({ groupId }: { groupId: number, }) => {
  const { groupMessage } = useSelector((state: RootState) => state.groupMessage);
  const { user: { email: userEmail } } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  if(groupMessage[groupId] === undefined) {
    fetchGroupMessage(groupId)
      .then(groupMessage => dispatch(setInitialGroupMessage({ groupId: groupId, groupMessage: groupMessage, })));
  }

  return (
    <>
      {groupMessage[groupId] === undefined ?
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}>
          <CircularProgress />
        </div> : <Box sx={{ mb: -2, display: 'flex', flexDirection: 'column-reverse', }}>
          {groupMessage[groupId].map((gm, idx) => {
            if(gm.senderEmail !== userEmail) {
              const removeAvatar: boolean = idx === (groupMessage[groupId].length-1) ? true : groupMessage[groupId][idx+1].senderEmail !== gm.senderEmail;

              return <GroupLeftMessage key={idx} groupMessage={gm} avatar={removeAvatar} />;
            } else {
              const removeBbr: boolean = idx === 0 ? true : groupMessage[groupId][idx-1].senderEmail !== userEmail;
              const addMarginTop: boolean = idx === (groupMessage[groupId].length-1) ? false : groupMessage[groupId][idx+1].senderEmail !== userEmail;

              return <RightMessage key={idx} message={gm.message} bbr={removeBbr} mt={addMarginTop} />;
            }
          })}
        </Box>
      }
    </>
  );
}

const MessageList = () => {
  const { activeChat: { chatMode, contactEmail, groupId } } = useSelector((state: RootState) => state.activeChat);

  return (
    <Box
      sx={{
        px: 2, pb: 2, maxHeight: 'calc(100% - 166px)', overflowX: 'hidden', overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column-reverse', flexGrow: '1',
        '::-webkit-scrollbar': { width: '5px', },
        '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
        ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, },
      }}
    >
      <Container
        sx={{
          p: 0, minHeight: '100%', maxWidth: '750px !important', '@media (min-width: 600px)': { p: 0, },
          display: 'flex', flexDirection: 'column', justifyContent: 'end', position: 'relative',
        }}
      >
        {chatMode === 'private' ? <PrivateMessageList contactEmail={contactEmail} /> : <GroupMessageList groupId={groupId} />}
      </Container>
    </Box>
  );
}

export default MessageList;
