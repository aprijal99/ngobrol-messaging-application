import MainMenuTitle from './MainMenuTitle';
import SearchBar from './SearchBar';
import ScrollableContainer from '../ScrollableContainer';
import GroupList from './GroupList';
import {GroupAddOutlined} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {Box, IconButton} from '@mui/material';
import React, {useState} from 'react';
import DialogContainer from '../dialog/DialogContainer';
import AddGroupDialog from '../dialog/AddGroupDialog';
import GroupCreateDialog from '../dialog/GroupCreateDialog';
import GroupJoinDialog from '../dialog/GroupJoinDialog';

const NewGroupButton = () => {
  const [openAddGroupDialog, setOpenAddGroupDialog] = useState<boolean>(false);
  const handleClickOpenDialog = () => setOpenAddGroupDialog(true);
  const handleClickCloseDialog = () => setOpenAddGroupDialog(false);

  return (
    <>
      <IconButton onClick={handleClickOpenDialog} sx={{ cursor: 'pointer', }}>
        <GroupAddOutlined />
      </IconButton>
      <DialogContainer open={openAddGroupDialog} handleClickCloseDialog={handleClickCloseDialog}>
        <AddGroupDialog />
        <GroupCreateDialog handleClickCloseDialog={handleClickCloseDialog} />
        <GroupJoinDialog />
      </DialogContainer>
    </>
  );
}

const Group = () => {
  const { group } = useSelector((state: RootState) => state.group);
  const sortedGroup = [...group].sort((a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  });

  return (
    <>
      <MainMenuTitle title='Groups' addIcon={<NewGroupButton />} />
      <SearchBar placeholder='Search or create a new group' />
      <ScrollableContainer reducedHeight='130px'>
        {sortedGroup.length > 0 ?
          sortedGroup.map(g => <GroupList key={g.groupId} groupList={g} />) :
          <Box position='absolute' left='50%' top='50%' sx={{ transform: 'translate3d(-50%, -50%, 0)', color: 'rgba(255, 255, 255, 0.6)', }}>
            There is no any group
          </Box>
        }
      </ScrollableContainer>
    </>
  );
}

export default Group;
