import React, {ReactNode, useEffect, useState} from 'react';
import {
  Avatar,
  Box, Button, Checkbox, Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {AddAPhotoOutlined, ArrowBackIosNew} from '@mui/icons-material';
import ImageCropper from './ImageCropper';
import uploadImage from '../../../functions/uploadImage';
import {ApiType} from '../../../types/api';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

const CustomTableCell = ({ children, padding = 'none' }: { children: ReactNode, padding?: 'none' | 'normal' | 'checkbox' | undefined, }) => {
  return (
    <TableCell padding={padding} sx={{ borderBottom: 'none', }}>
      {children}
    </TableCell>
  );
}

const GroupCreateDialog = () => {
  const { contact } = useSelector((state: RootState) => state.contact);
  const [addContacts, setAddContacts] = useState<{ name: string, email: string, }[]>([]);
  const [checked, setChecked] = useState<{ [n: string]: boolean }>({});
  const [cropper, setCropper] = useState<boolean>(false);
  const [uploadedImg, setUploadedImg] = useState<File | null>(null);
  const [tempImg, setTempImg] = useState<File | null>(null);

  useEffect(() => {
    contact.map(c => {
      checked[c.email] = false;
      setChecked(checked);
    });
  }, []);

  const handleClickNewGroupCreateBack = () => {
    const dialogContent = document.getElementById('dialog-content');
    const newGroup = document.getElementById('new-group');
    const newGroupCreate = document.getElementById('new-group-create');

    if(dialogContent && newGroup && newGroupCreate) {
      dialogContent.style.height = `${newGroup.offsetHeight}px`;
      newGroup.classList.remove('translate-x-minus-100-percent');
      newGroupCreate.style.left = '100%';
    }
  }

  const handleClickSubmitNewGroup = () => {
    if(uploadedImg) {
      uploadImage(uploadedImg)
        .then(result => {
          if(result instanceof Error) throw result;
          else {
            const groupName = (document.getElementById('group-name-input') as HTMLInputElement)?.value;
            const groupDesc = (document.getElementById('group-desc-input') as HTMLInputElement)?.value;

            const formBody: { [n: string]: any } = {
              name: groupName,
              description: groupDesc,
              imageUrl: result,
              users: addContacts,
              createdAt: new Date().getTime(),
            }

            fetch('http://localhost:7080/group', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formBody),
            })
              .then(fetchResult => fetchResult.json())
              .then((result: ApiType) => {
                if(result.code !== 201) throw new Error('Something went wrong');
                else console.log('Group created successfully');
              })
              .catch(error => console.log(error));
          }
        })
        .catch(error => console.log(error));
    } else {
      console.log('Group name can not be empty and at least select one contact');
    }
  }

  return (
    <Box
      id='new-group-create'
      sx={{
        px: 3, py: 4, position: 'absolute', left: '100%', minWidth: '100%', overflow: 'hidden',
        transition: 'left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      }}
    >
      <IconButton onClick={handleClickNewGroupCreateBack} sx={{ position: 'absolute', top: '12px', left: '10px', zIndex: '100', }}>
        <ArrowBackIosNew sx={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.6)', }} />
      </IconButton>

      {(cropper && tempImg) && <ImageCropper image={tempImg} saveCropImg={(cropImg) => setUploadedImg(cropImg)} closeCropper={() => setCropper(false)} />}

      <Box>
        <Typography variant='h5' align='center' gutterBottom={true} sx={{ fontWeight: 'bold', }}>Create a New Group</Typography>
        <Typography align='center' sx={{ fontWeight: '300', mx: 'auto', color: 'rgba(255, 255, 255, 0.6)', }}>
          Give the group a name and add at least one of your contact to it
        </Typography>

        <Box display='flex' flexDirection='column' rowGap='15px' justifyContent='center' sx={{ mt: 4, mx: 'auto', }}>
          <Box display='flex' columnGap='10px' rowGap='10px' flexWrap='wrap'>
            <Box
              display='flex' justifyContent='center' alignItems='center'
              onClick={() => document.getElementById('file-input-new-group')?.click()}
              sx={{
                minWidth: '56px', height: '56px', cursor: 'pointer', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.23)', overflow: 'hidden',
                ':hover': { borderColor: 'white', },
              }}
            >
              {uploadedImg ?
                <img src={URL.createObjectURL(uploadedImg)} alt='temporary uploaded image' style={{ width: '100%', height: '100%', }} /> :
                <AddAPhotoOutlined sx={{ color: 'rgba(255, 255, 255, 0.7)', mx: 2, }} />
              }
              <input
                id='file-input-new-group' hidden accept='image/*' type='file'
                onChange={(e) => {
                  if(e.target.files) setTempImg(e.target.files.item(0));
                  setCropper(true);
                }}
              />
            </Box>
            <TextField id='group-name-input' label='Group name' variant='outlined' autoComplete='nope' sx={{ flexGrow: '1', }} />
            <TextField id='group-desc-input' fullWidth size='small' label='Group description' variant='outlined' autoComplete='nope' sx={{ width: '100', }} />
          </Box>

          {/*<TextField fullWidth hiddenLabel placeholder='Search contacts' variant='standard' autoComplete='nope' size='small'*/}
          {/*           sx={{ 'input': { p: '10px', }, '.MuiInputBase-root:before': { borderBottomColor: '#575757', }, }} />*/}

          <Typography sx={{ fontSize: '1.2rem', fontWeight: '500', mb: -.5, mt: 2, }}>Add contacts</Typography>
          <TableContainer
            sx={{
              maxHeight: '300px',
              '::-webkit-scrollbar': { width: '5px', },
              '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
              ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, },
            }}
          >
            <Table>
              <TableBody>
                {contact.map((c, idx) =>
                  <TableRow
                    key={idx}
                    onClickCapture={() => {
                      const newChecked: { [n: string]: boolean } = { ...checked }
                      newChecked[c.email] = !checked[c.email];
                      setChecked(newChecked);

                      if(newChecked[c.email]) setAddContacts(prevState => [...prevState, { name: c.name, email: c.email }]);
                      else setAddContacts(prevState => [...(prevState.filter(val => val.email !== c.email))]);
                    }}
                    sx={{
                      cursor: 'pointer', 'td:first-of-type': { borderRadius: '10px 0 0 10px', }, 'td:last-of-type': { borderRadius: '0 10px 10px 0', },
                      ':hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)', },
                    }}
                  >
                    <CustomTableCell padding='checkbox'>
                      <Checkbox disableRipple checked={checked[c.email] === undefined ? false : checked[c.email]} />
                    </CustomTableCell>
                    <CustomTableCell>
                      <Box sx={{ display: 'flex', p: .5, }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mr: 2, }}>
                          <Avatar alt='Contact Profile Image' src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
                        </Box>
                        <Box>
                          <Typography>{c.name}</Typography>
                          <Typography sx={{ fontSize: '.85rem', color: 'rgba(255, 255, 255, 0.6)', }}>Last seen 2 hours ago</Typography>
                        </Box>
                      </Box>
                    </CustomTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {addContacts.length !== 0 && <Box display='flex' flexWrap='wrap' gap='5px'>
            {addContacts.map((addContact, idx) =>
              <Chip
                key={idx}
                label={addContact.name}
                variant='outlined'
                color='primary'
                sx={{ maxWidth: '150px', }}
                onDelete={() => {
                  setAddContacts(prevState => [...(prevState.filter(val => val.email !== addContact.email))]);

                  const newChecked: { [n: string]: boolean } = { ...checked }
                  newChecked[addContact.email] = !checked[addContact.email];
                  setChecked(newChecked);
                }}
              />
            )}
          </Box>}

          <Button
            variant='contained' onClick={handleClickSubmitNewGroup}
            sx={{
              textTransform: 'capitalize', boxShadow: 'none', px: 3, fontSize: 'initial', mt: 1,
              ':hover': { backgroundColor: '#199bf1', boxShadow: 'none', },
            }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default GroupCreateDialog;
