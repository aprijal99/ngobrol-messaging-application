import {
  Alert,
  AlertColor,
  Avatar,
  Box,
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  IconButton, Slide, SlideProps, Snackbar,
  TextField,
  Typography
} from '@mui/material';
import {AddAPhotoOutlined, Close, Delete, DeleteOutlined, PersonAddOutlined, SendOutlined} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {GroupType} from '../../../redux/slice/groupSlice';
import ImageCropper from '../dialog/ImageCropper';
import {UserType} from '../../../redux/slice/userSlice';
import {TransitionProps} from '@mui/material/transitions';
import {ApiType} from '../../../types/api';

const TransitionUp = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) { return <Slide direction='up' ref={ref} {...props} />; });

type CustomTransitionProps = Omit<SlideProps, 'direction'>;
function TransitionRight(props: CustomTransitionProps) {
  return <Slide {...props} direction='right' />
}

const ConfirmationDialog = ({ openDialog, member, closeDialog, deleteMember }: { openDialog: boolean, member: UserType, closeDialog: () => void, deleteMember: (userEmail: string) => void }) => {
  return (
    <Dialog open={openDialog} onClose={closeDialog} TransitionComponent={TransitionUp} sx={{ '.MuiPaper-root': { m: 2.5, backgroundColor: '#252525', backgroundImage: 'none', }, }}>
      <DialogTitle sx={{ lineHeight: '1.5rem', }}>Delete this member from group?</DialogTitle>
      <DialogContent sx={{ pb: '16px', }}>
        <Box alignItems='center' sx={{ display: 'flex', }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
            <Avatar alt='Contact Profile Image' src={member.imageUrl ? `http://localhost:7080/image/${member.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'} />
          </Box>
          <Box flexGrow='1'>
            <Typography>{member.name}</Typography>
            <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>{member.status}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ pt: 0, }}>
        <Button size='small' onClick={() => closeDialog()} sx={{ textTransform: 'none', ':hover': { backgroundColor: 'initial', }, }}>Cancel</Button>
        <Button
          size='small' color='error'
          onClick={() => { closeDialog(); deleteMember(member.email); }} sx={{ textTransform: 'none', ml: '0px !important', ':hover': { backgroundColor: 'initial', }, }}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

const EditProfileDetail = () => {
  const { activeChat } = useSelector((state: RootState) => state.activeChat, (oldVal, newVal) => {
    if(oldVal.activeChat.chatMode === '' && newVal.activeChat.chatMode === 'group') return false;
    return !(oldVal.activeChat.chatMode === 'group' && newVal.activeChat.chatMode === 'group');
  });
  const { group } = useSelector((state: RootState) => state.group);
  const [newGroupImg, setNewGroupImg] = useState<File | null>(null);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [newGroupDesc, setNewGroupDesc] = useState<string>('');
  const [groupMembers, setGroupMembers] = useState<{ email: string, }[]>([]);
  const [tempImg, setTempImg] = useState<File | null>(null);
  const [cropper, setCropper] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [deletedMember, setDeletedMember] = useState<UserType | null>(null);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{ severity: AlertColor, message: string, }>({ severity: 'success', message: 'Successfully update group data' });

  let groupById: GroupType = group.filter(g => g.groupId === Number(activeChat.groupId))[0];

  useEffect(() => {
    setNewGroupName(groupById.name);
    setNewGroupDesc(groupById.description);

    const usersOfGroupById: { email: string, }[] = [];
    groupById.users.map(u => usersOfGroupById.push({ email: u.email }));
    setGroupMembers(usersOfGroupById)
  }, [groupById]);


  const handleClickCloseEditProfileDetail = () => {
    const editProfileDetail = document.getElementById("edit-profile-detail") as HTMLDivElement;
    if(editProfileDetail) editProfileDetail.classList.add("translate-x-minus-100-percent");
  }

  const handleClickSaveGroupDetailChanges = () => {
    console.log({
      groupId: groupById.groupId,
      name: newGroupName,
      description: newGroupDesc,
      users: groupMembers,
    });
  }

  const deleteMember = (userEmail: string) => {
    fetch(`http://localhost:7080/group/delete-user`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        userEmail,
        groupChatId: groupById.groupId,
      }),
    })
      .then(fetchResult => fetchResult.json())
      .then((result: ApiType) => {
        if(result.code !== 200) {
          setAlertMessage({ severity: 'error', message: 'Failed delete the member' });
          setAlert(true);
        } else {
          setAlertMessage({ severity: 'success', message: 'Successfully delete the member' });
          setAlert(true);
        }
      });
  }

  return (
    <Box
      id="edit-profile-detail"
      className="translate-x-minus-100-percent"
      sx={{
        position: 'absolute', top: '0', left: '0', backgroundColor: '#252525', width: '100%', minHeight: '100%',
        overflow: 'hidden', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      {(cropper && tempImg) && <ImageCropper image={tempImg} saveCropImg={(cropImg) => setNewGroupImg(cropImg)} closeCropper={() => setCropper(prevState => !prevState)} />}

      {deletedMember && <ConfirmationDialog openDialog={confirmDialog} closeDialog={() => setConfirmDialog(false)} member={deletedMember} deleteMember={(userEmail) => deleteMember(userEmail)} />}

      <Snackbar
        open={alert} anchorOrigin={{ vertical: 'top', horizontal: 'left', }} onClose={() => setAlert(false)} TransitionComponent={TransitionRight} autoHideDuration={5000}
        sx={{ top: '24px', left: '24px', right: '24px', '@media (min-width: 600px)': { top: '24px', left: '24px', right: '24px', }, '@media (min-width: 620px)': { top: '24px', left: '24px', right: 'auto', }, }}
      >
        <Alert severity={alertMessage.severity} sx={{ width: '100%', }}>{alertMessage.message}</Alert>
      </Snackbar>

      {(activeChat.chatMode === 'group' && groupById) && <>
        <Box display='flex' alignItems='center' sx={{ p: '10px', pb: 3, }}>
          <Typography sx={{ flexGrow: '1', fontSize: '1.2rem', fontWeight: '600', ml: 1.5, color: 'rgba(255, 255, 255, 0.6)', }}>Edit Group</Typography>
          <IconButton onClick={handleClickCloseEditProfileDetail}>
            <Close fontSize='inherit' sx={{ color: 'rgba(255, 255, 255, 0.6)', }} />
          </IconButton>
        </Box>
        <Box display='flex' justifyContent='center'>
          <Box position='relative' sx={{ cursor: 'pointer', }} onClick={() => document.getElementById('new-group-image-input')?.click()}>
            <Avatar
              alt='Group image' src={newGroupImg ? URL.createObjectURL(newGroupImg) : groupById.imageUrl ? `http://localhost:7080/image/${groupById.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'}
              sx={{ height: '150px', width: '150px', opacity: '0.75' }}
            />
            <AddAPhotoOutlined sx={{ fontSize: '4rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate3D(-50%, -50%, 0)', }} />
          </Box>
          <input
            id='new-group-image-input' hidden accept='image/*' type='file'
            onChange={(e) => {
              if(e.target.files) setTempImg(e.target.files.item(0));
              setCropper(prevState => !prevState);
            }}
          />
        </Box>
        <Box display='flex' flexDirection='column' rowGap='20px' sx={{ p: 2.5, mt: 2, }}>
          <TextField
            id='new-group-name-input' fullWidth size='small' label='Group Name' variant='outlined' autoComplete='nope' value={newGroupName} sx={{ '.MuiInputBase-root': { borderRadius: '10px', } }}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
          <TextField
            id='new-group-desc-input' fullWidth size='small' label='Description' variant='outlined' autoComplete='nope' value={newGroupDesc} sx={{ '.MuiInputBase-root': { borderRadius: '10px', } }}
            onChange={(e) => setNewGroupDesc(e.target.value)}
          />
          <Box component='fieldset' sx={{ borderRadius: '10px', borderWidth: '1px', borderColor: '#575757', }}>
            <legend style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', padding: '0 5px', marginLeft: '8px' }}>Members</legend>
            {groupById.users.map((user, idx) => <Box key={idx} alignItems='center' sx={{ display: 'flex', mx: 1.25, my: 1, }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
                <Avatar alt='Contact Profile Image' src={user.imageUrl ? `http://localhost:7080/image/${user.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'} />
              </Box>
              <Box flexGrow='1'>
                <Typography>{user.name}</Typography>
                <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>{user.status}</Typography>
              </Box>
              <IconButton onClick={() => {
                setConfirmDialog(true);
                setDeletedMember(user);
              }}>
                <Delete color='error' />
              </IconButton>
            </Box>)}
          </Box>
          <Box display='flex' columnGap='20px'>
            <Button fullWidth variant='outlined' startIcon={<PersonAddOutlined />} sx={{ textAlign: 'left', justifyContent: 'start', textTransform: 'none', borderRadius: '10px', ':hover': { backgroundColor: 'initial', }, }}>
              Add a Member
            </Button>
            <Button fullWidth variant='outlined' onClick={handleClickSaveGroupDetailChanges} startIcon={<SendOutlined />} sx={{ textAlign: 'left', justifyContent: 'start', textTransform: 'none', borderRadius: '10px', ':hover': { backgroundColor: 'initial', }, }}>
              Save Changes
            </Button>
          </Box>
          <Button variant='outlined' color='error' startIcon={<DeleteOutlined />} sx={{ justifyContent: 'start', textTransform: 'none', borderRadius: '10px', ':hover': { backgroundColor: 'initial', }, }}>
            Delete and Leave Group
          </Button>
        </Box>
      </>}
    </Box>
  );
}

export default EditProfileDetail;
