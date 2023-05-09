import {
  Alert, AlertColor,
  Avatar, Backdrop,
  Box,
  Button, CircularProgress,
  FormControlLabel,
  IconButton, Slide, SlideProps,
  Snackbar,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import {AddAPhotoOutlined, Close} from '@mui/icons-material';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/store/store';
import ImageCropper from '../dialog/ImageCropper';
import {ApiType} from '../../../types/api';
import uploadImage from '../../../functions/uploadImage';
import {updateUserData} from '../../../redux/slice/userSlice';

type TransitionProps = Omit<SlideProps, 'direction'>;
function transitionDown(props: TransitionProps) {
  return <Slide {...props} direction='right' />
}

const EditUserDetail = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [changePass, setChangePass] = useState<boolean>(false);
  const [newUserImg, setNewUserImg] = useState<File | null>(null);
  const [tempImg, setTempImg] = useState<File | null>(null);
  const [cropper, setCropper] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<{ severity: AlertColor, message: string, }>({ severity: 'success', message: 'Successfully update user data' });
  const [backdropLoading, setBackdropLoading] = useState<boolean>(false);

  const currentUserDetail: { [n: string]: any } = {
    name: user.name,
    email: user.email,
    status: user.status,
    imageUrl: user.imageUrl,
  }

  const handleClickCloseEditUserProfile = () => {
    const editUserDetail = document.getElementById('edit-user-detail') as HTMLDivElement;
    if(editUserDetail) editUserDetail.classList.add('translate-x-100-percent');
    setNewUserImg(null);
  }

  const updateUserDetail = async () => {
    const newUserNameInput = document.getElementById('new-user-name-input') as HTMLInputElement;
    const newUserStatusInput = document.getElementById('new-user-status-input') as HTMLInputElement;
    const newUserEmailInput = document.getElementById('new-user-email-input') as HTMLInputElement;

    currentUserDetail['name'] = newUserNameInput?.value;
    currentUserDetail['status'] = newUserStatusInput?.value;
    currentUserDetail['email'] = newUserEmailInput?.value;

    if(newUserImg) {
      const result = await uploadImage(newUserImg);
      if(result instanceof Error) {
        setAlertMessage({ severity: 'error', message: 'Something went wrong when trying to upload image, try again later' });
        setAlert(true);
        setBackdropLoading(false);
        return;
      }

      currentUserDetail['imageUrl'] = result;
    }

    fetch(`http://localhost:7080/user/${user.email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(currentUserDetail),
    })
      .then(fetchResult => fetchResult.json())
      .then((result: ApiType) => {
        if(result.code !== 200) {
          setAlertMessage({ severity: 'error', message: 'Something went wrong when trying to update user data, try again later' });
          setAlert(true);
          return;
        } else dispatch(updateUserData({
          name: currentUserDetail['name'],
          email: currentUserDetail['email'],
          status: currentUserDetail['status'],
          imageUrl: currentUserDetail['imageUrl'],
        }));
      });

    setAlert(true);
    setBackdropLoading(false);
  }

  const handleClickUpdateUserDetail = () => {
    setBackdropLoading(true);
    const currentUserPasswordInput = document.getElementById('current-user-password-input') as HTMLInputElement;
    const newUserPasswordInput = document.getElementById('new-user-password-input') as HTMLInputElement;

    if(changePass) {
      if(currentUserPasswordInput?.value === newUserPasswordInput?.value) {
        setAlertMessage({ severity: 'error', message: 'Please type different new password' });
        setAlert(true);
        setBackdropLoading(false);
        return;
      }

      currentUserDetail['password'] = newUserPasswordInput?.value;
      fetch('http://localhost:7080/user/check-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email: user.email, password: currentUserPasswordInput?.value }),
      })
        .then(fetchResult => fetchResult.json())
        .then((result: ApiType) => {
          if(result.code !== 200) {
            setAlertMessage({ severity: 'error', message: 'Wrong current password' });
            setAlert(true);
            setBackdropLoading(false);
          }
          else updateUserDetail();
        });
    } else updateUserDetail();
  }

  return (
    <Box
      id='edit-user-detail'
      className='translate-x-100-percent'
      sx={{
        position: 'absolute', top: '0', left: '0', backgroundColor: '#252525', width: '100%', minHeight: '100%',
        overflow: 'hidden', transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      <Backdrop open={backdropLoading} sx={{ zIndex: '10000', }}>
        <CircularProgress />
      </Backdrop>

      <Snackbar
        open={alert} anchorOrigin={{ vertical: 'top', horizontal: 'left', }} onClose={() => setAlert(false)} TransitionComponent={transitionDown} autoHideDuration={5000}
        sx={{
          top: '24px', left: '24px', right: '24px',
          '@media (min-width: 600px)': { top: '24px', left: '24px', right: '24px', },
          '@media (min-width: 620px)': { top: '24px', left: '24px', right: 'auto', }
        }}
      >
        <Alert severity={alertMessage.severity} sx={{ width: '100%', }}>{alertMessage.message}</Alert>
      </Snackbar>

      {(cropper && tempImg) && <ImageCropper image={tempImg} saveCropImg={(cropImg) => setNewUserImg(cropImg)} closeCropper={() => setCropper(prevState => !prevState)} />}

      <Box display='flex' alignItems='center' sx={{ p: '10px', pb: 3, }}>
        <Typography sx={{ flexGrow: '1', fontSize: '1.2rem', fontWeight: '600', ml: 1.5, color: 'rgba(255, 255, 255, 0.6)', }}>Edit User Profile</Typography>
        <IconButton onClick={handleClickCloseEditUserProfile}>
          <Close fontSize='inherit' sx={{ color: 'rgba(255, 255, 255, 0.6)', }} />
        </IconButton>
      </Box>
      <Box display='flex' justifyContent='center'>
        <Box position='relative' sx={{ cursor: 'pointer', }} onClick={() => document.getElementById('new-user-image-input')?.click()}>
          <Avatar
            alt='User image' src={newUserImg ? URL.createObjectURL(newUserImg) : user.imageUrl ? `http://localhost:7080/image/${user.imageUrl}` : 'https://i.pravatar.cc/150?u=a042581f4e29026024d'}
            sx={{ height: '150px', width: '150px', opacity: '0.75' }}
          />
          <AddAPhotoOutlined sx={{ fontSize: '4rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate3D(-50%, -50%, 0)', }} />
        </Box>
        <input
          id='new-user-image-input' hidden accept='image/*' type='file'
          onChange={(e) => {
            if(e.target.files) setTempImg(e.target.files.item(0));
            setCropper(prevState => !prevState);
          }}
        />
      </Box>
      <Box display='flex' flexDirection='column' rowGap='20px' sx={{ p: 2.5, mt: 2, }}>
        {user.name !== '' && <TextField id='new-user-name-input' fullWidth size='small' label='Name' variant='outlined' autoComplete='nope' defaultValue={user.name} sx={{ '.MuiInputBase-root': { borderRadius: '10px', } }} />}
        {user.status !== '' && <TextField id='new-user-status-input' fullWidth size='small' label='Status' variant='outlined' autoComplete='nope' defaultValue={user.status} sx={{ '.MuiInputBase-root': { borderRadius: '10px', } }} />}
        {user.email !== '' && <TextField id='new-user-email-input' fullWidth size='small' label='Email' variant='outlined' autoComplete='nope' defaultValue={user.email} sx={{ '.MuiInputBase-root': { borderRadius: '10px', } }} />}
        <FormControlLabel control={<Switch size='small' onChange={() => setChangePass(prevState => !prevState)} />} label="Change password" sx={{ m: 0, }} />
        <TextField id='current-user-password-input' fullWidth disabled={!changePass} size='small' label='Current password' variant='outlined' autoComplete='nope' type='password' sx={{ '.MuiInputBase-root': { borderRadius: '10px', } }} />
        <TextField id='new-user-password-input' fullWidth disabled={!changePass} size='small' label='New password' variant='outlined' autoComplete='nope' type='password' sx={{ '.MuiInputBase-root': { borderRadius: '10px', } }} />
        <Button
          variant='contained' size='small' onClick={handleClickUpdateUserDetail}
          sx={{
            textTransform: 'capitalize', boxShadow: 'none', fontSize: 'initial', borderRadius: '10px',
            ':hover': { backgroundColor: '#199bf1', boxShadow: 'none', },
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default EditUserDetail;
