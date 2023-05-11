import {
  Alert,
  AlertColor,
  Avatar,
  Box,
  Button, Checkbox,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  IconButton, Slide, SlideProps, Snackbar, Table, TableBody, TableCell, TableRow,
  TextField,
  Typography
} from '@mui/material';
import {AddAPhotoOutlined, Close, Delete, DeleteOutlined, PersonAddOutlined, SendOutlined} from '@mui/icons-material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import {changeGroupUsers, deleteGroup, GroupType, updateGroup} from '../../../redux/slice/groupSlice';
import ImageCropper from '../dialog/ImageCropper';
import {UserType} from '../../../redux/slice/userSlice';
import {TransitionProps} from '@mui/material/transitions';
import {ApiType} from '../../../types/api';
import uploadImage from '../../../functions/uploadImage';
import {deleteChat, updateImageUrl} from '../../../redux/slice/chatSlice';
import {changeActiveChat} from '../../../redux/slice/activeChatSlice';
import {resetActiveChat} from '../../../functions/activeChat';

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

const compareFn = (a: UserType, b: UserType) => {
  if(a.name < b.name) return -1;
  if(a.name > b.name) return 1;
  return 0;
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
          onClick={() => { closeDialog(); deleteMember(member.email); }} sx={{ textTransform: 'none', ml: '0px !important', ':hover': { backgroundColor: 'initial', }, }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const AddMembersDialog = ({ openDialog, groupMembers, closeDialog, addMembers }: { openDialog: boolean, groupMembers: UserType[], closeDialog: () => void, addMembers: (selectedUsers: { userEmail: string }[]) => void }) => {
  const { contact } = useSelector((state: RootState) => state.contact);
  const displayedContact = contact.filter(c => !groupMembers.some(m => m.email === c.email));
  const [checked, setChecked] = useState<{ [n: string]: boolean }>({});

  useEffect(() => {
    let initialChecked: { [n: string]: boolean } = {};
    displayedContact.map(c => initialChecked[c.email] = false);
    setChecked(initialChecked);
  }, []);

  const handleClickAddButton = () => {
    const selectedUsers: { userEmail: string }[] = [];
    Object.keys(checked).map(key => checked[key] && selectedUsers.push({ userEmail: key }));

    if(selectedUsers.length !== 0) {
      addMembers(selectedUsers);
      closeDialog();
    }
  }

  return (
    <Dialog
      fullWidth maxWidth='xs' open={openDialog} onClose={closeDialog} TransitionComponent={TransitionUp}
      sx={{ '.MuiPaper-root': { width: 'calc(100% - 40px)', maxWidth: '350px', m: 2.5, backgroundColor: '#252525', backgroundImage: 'none', }, }}
    >
      <DialogTitle sx={{ lineHeight: '1.5rem', }}>{displayedContact.length !== 0 ? 'Choose from contact' : 'All contacts already has been in the group'}</DialogTitle>
      <DialogContent sx={{ scrollbarWidth: 'thin', pb: 0, }}>
        <Table>
          <TableBody>
            {displayedContact.map((c, idx) =>
              <TableRow
                key={idx}
                onClick={() => {
                  let tempChecked = {...checked};
                  tempChecked[c.email] = !tempChecked[c.email];
                  setChecked(tempChecked);
                }}
                sx={{
                  cursor: 'pointer', 'td:first-of-type': { borderRadius: '10px 0 0 10px', }, 'td:last-of-type': { borderRadius: '0 10px 10px 0', },
                  ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', },
                }}
              >
                <TableCell padding='checkbox' sx={{ borderBottom: 'none', }}>
                  <Checkbox disableRipple checked={checked[c.email] === undefined ? false : checked[c.email]} />
                </TableCell>
                <TableCell sx={{ borderBottom: 'none', p: 0, }}>
                  <Box sx={{ display: 'flex', p: .5, }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
                      <Avatar alt='Contact Profile Image' src={c.imageUrl ? `http://localhost:7080/image/${c.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'} />
                    </Box>
                    <Box>
                      <Typography>{c.name}</Typography>
                      <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Last seen 2 hours ago</Typography>
                    </Box>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button size='small' onClick={() => closeDialog()} sx={{ textTransform: 'none', ':hover': { backgroundColor: 'initial', }, }}>Cancel</Button>
        {displayedContact.length !== 0 && <Button size='small' onClick={handleClickAddButton} sx={{ textTransform: 'none', ml: '0px !important', ':hover': { backgroundColor: 'initial', }, }}>Add</Button>}
      </DialogActions>
    </Dialog>
  );
}

const DeleteOrLeaveGroupDialog = ({ currentGroup, openDialog, closeDialog }: { currentGroup: GroupType, openDialog: boolean, closeDialog: () => void, }) => {
  const store = useStore<RootState>();
  const dispatch = useDispatch<AppDispatch>();

  const leaveGroup = () => {
    const messageMenu = document.getElementById('message-menu');
    if(messageMenu) messageMenu.style.marginRight = '0px';

    fetch(`http://localhost:7080/group/delete-user`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        userEmail: store.getState().user.user.email,
        groupChatId: currentGroup.groupId,
      }),
    })
      .then(fetchResult => fetchResult.json())
      .then((result: ApiType) => {
        if(result.code !== 200) return;
      });

    dispatch(changeActiveChat(resetActiveChat()));
    dispatch(deleteGroup({ groupId: currentGroup.groupId }));
    dispatch(deleteChat({ groupId: currentGroup.groupId }));
  }

  return (
    <Dialog
      open={openDialog} onClose={closeDialog} TransitionComponent={TransitionUp}
      sx={{ '.MuiPaper-root': { m: 2.5, backgroundColor: '#252525', backgroundImage: 'none', }, }}
    >
      <DialogTitle sx={{ lineHeight: '1.5rem', }}>Delete or leave the group?</DialogTitle>
      <DialogActions>
        <Button color='error' onClick={() => closeDialog()} sx={{ textTransform: 'none', ':hover': { backgroundColor: 'initial', }, }}>Delete Group</Button>
        <Button color='error' onClick={() => { closeDialog(); leaveGroup(); }} sx={{ textTransform: 'none', ':hover': { backgroundColor: 'initial', }, }}>Leave Group</Button>
      </DialogActions>
    </Dialog>
  );
}

const EditProfileDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeChat } = useSelector((state: RootState) => state.activeChat, (oldVal, newVal) => {
    if(oldVal.activeChat.chatMode === '' && newVal.activeChat.chatMode === 'group') return false;
    return !(oldVal.activeChat.chatMode === 'group' && newVal.activeChat.chatMode === 'group');
  });
  const { group } = useSelector((state: RootState) => state.group);
  const { contact } = useSelector((state: RootState) => state.contact);
  const { user: { email: thisUserEmail } } = useSelector((state: RootState) => state.user);
  const [newGroupImg, setNewGroupImg] = useState<File | null>(null);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [newGroupDesc, setNewGroupDesc] = useState<string>('');
  const [groupMembers, setGroupMembers] = useState<UserType[]>([]);
  const [tempImg, setTempImg] = useState<File | null>(null);
  const [cropper, setCropper] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState<boolean>(false);
  const [addMembersDialog, setAddMembersDialog] = useState<boolean>(false);
  const [deleteGroupDialog, setDeleteGroupDialog] = useState<boolean>(false);
  const [deletedMember, setDeletedMember] = useState<UserType | null>(null);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{ severity: AlertColor, message: string, }>({ severity: 'success', message: 'Successfully update group data' });

  let groupById: GroupType = group.filter(g => g.groupId === Number(activeChat.groupId))[0];

  useEffect(() => {
    setNewGroupName(groupById.name);
    setNewGroupDesc(groupById.description);

    const thisUser = groupById.users.filter(u => u.email === thisUserEmail);
    const tempUsers = groupById.users.filter(u => u.email !== thisUserEmail);
    setGroupMembers([...thisUser, ...tempUsers.sort(compareFn)]);
  }, [groupById]);


  const handleClickCloseEditProfileDetail = () => {
    const editProfileDetail = document.getElementById("edit-profile-detail") as HTMLDivElement;
    if(editProfileDetail) editProfileDetail.classList.add("translate-x-minus-100-percent");
  }

  const handleClickSaveGroupDetailChanges = async () => {
    const newGroupDetail: { [n: string]: string } = {
      name: newGroupName,
      description: newGroupDesc,
    }

    if(newGroupImg) {
      const result = await uploadImage(newGroupImg);
      if(result instanceof Error) {
        setAlertMessage({ severity: 'error', message: 'Something went wrong when trying to upload image, try again later' });
        setAlert(true);
        return;
      }

      newGroupDetail['imageUrl'] = result;
    }

    fetch(`http://localhost:7080/group/${groupById.groupId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newGroupDetail),
    })
      .then(fetchResult => fetchResult.json())
      .then((result: ApiType) => {
        if(result.code !== 200) {
          setAlertMessage({ severity: 'error', message: 'Something went wrong when trying to update user data, try again later' });
        } else {
          dispatch(updateGroup({
            groupId: groupById.groupId,
            name: newGroupDetail['name'],
            description: newGroupDetail['description'],
            imageUrl: newGroupDetail['imageUrl'] ? newGroupDetail['imageUrl'] : null,
          }));
          if(newGroupDetail['imageUrl']) dispatch(updateImageUrl({ groupId: groupById.groupId, imageUrl: newGroupDetail['imageUrl'] }))
        }
      });

    setNewGroupImg(null);
    setAlert(true);
  }

  const addMembers = (selectedUsers: { userEmail: string }[]) => {
    fetch(`http://localhost:7080/group/assign-user/batch/${groupById.groupId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(selectedUsers),
    })
      .then(fetchResult => fetchResult.json())
      .then((result: ApiType) => {
        if(result.code !== 201) {
          setAlertMessage({ severity: 'error', message: 'Something went wrong' });
          setAlert(true);
        } else {
          setAlertMessage({ severity: 'success', message: 'Successfully added members' });
          setAlert(true);

          const newMembers = contact.filter(c => selectedUsers.some(s => s.userEmail === c.email));
          const newGroupMembers = [...groupMembers, ...newMembers];
          dispatch(changeGroupUsers({ groupId: groupById.groupId, users: newGroupMembers }));
        }
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

          const newGroupMembers = groupMembers.filter(m => m.email !== deletedMember?.email);
          dispatch(changeGroupUsers({ groupId: groupById.groupId, users: newGroupMembers }));
        }
      });
  }

  return (
    <Box
      id="edit-profile-detail" className="translate-x-minus-100-percent"
      sx={{
        position: 'absolute', top: '0', left: '0', backgroundColor: '#252525', width: '100%', minHeight: '100%',
        overflow: 'hidden', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      {(cropper && tempImg) && <ImageCropper image={tempImg} saveCropImg={(cropImg) => setNewGroupImg(cropImg)} closeCropper={() => setCropper(prevState => !prevState)} />}

      {deletedMember && <ConfirmationDialog openDialog={confirmDialog} closeDialog={() => setConfirmDialog(false)} member={deletedMember} deleteMember={(userEmail) => deleteMember(userEmail)} />}
      <AddMembersDialog openDialog={addMembersDialog} groupMembers={groupMembers} closeDialog={() => setAddMembersDialog(false)} addMembers={(selectedUsers) => addMembers(selectedUsers)} />
      <DeleteOrLeaveGroupDialog currentGroup={groupById} openDialog={deleteGroupDialog} closeDialog={() => setDeleteGroupDialog(false)} />

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
            {groupMembers.map((user, idx) => <Box key={idx} alignItems='center' sx={{ display: 'flex', mx: 1.25, my: 1, }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
                <Avatar alt='Contact Profile Image' src={user.imageUrl ? `http://localhost:7080/image/${user.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'} />
              </Box>
              <Box flexGrow='1'>
                <Typography>{user.name}</Typography>
                <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>{user.status}</Typography>
              </Box>
              {user.email !== thisUserEmail && <IconButton onClick={() => {
                setConfirmDialog(true);
                setDeletedMember(user);
              }}>
                <Delete color='error' />
              </IconButton>}
            </Box>)}
          </Box>
          <Box display='flex' columnGap='20px'>
            <Button
              fullWidth variant='outlined' startIcon={<PersonAddOutlined />} onClick={() => setAddMembersDialog(true)}
              sx={{ textAlign: 'left', justifyContent: 'start', textTransform: 'none', borderRadius: '10px', ':hover': { backgroundColor: 'initial', }, }}
            >
              Add Members
            </Button>
            <Button
              fullWidth variant='outlined' startIcon={<SendOutlined />} onClick={handleClickSaveGroupDetailChanges}
              sx={{ textAlign: 'left', justifyContent: 'start', textTransform: 'none', borderRadius: '10px', ':hover': { backgroundColor: 'initial', }, }}
            >
              Save Changes
            </Button>
          </Box>
          <Button
            variant='outlined' color='error' startIcon={<DeleteOutlined />} onClick={() => setDeleteGroupDialog(true)}
            sx={{ justifyContent: 'start', textTransform: 'none', borderRadius: '10px', ':hover': { backgroundColor: 'initial', }, }}
          >
            Delete or Leave Group
          </Button>
        </Box>
      </>}
    </Box>
  );
}

export default EditProfileDetail;
