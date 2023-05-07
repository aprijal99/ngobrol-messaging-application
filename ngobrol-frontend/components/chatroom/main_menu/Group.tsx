import MainMenuTitle from './MainMenuTitle';
import SearchBar from './SearchBar';
import ScrollableContainer from '../ScrollableContainer';
import GroupList from './GroupList';
import {GroupAddOutlined} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {IconButton, Tooltip} from '@mui/material';
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
      <Tooltip title='Add New Group' placement='left' enterDelay={500} disableInteractive onClick={handleClickOpenDialog}>
        <IconButton sx={{ cursor: 'pointer', }}>
          <GroupAddOutlined />
        </IconButton>
      </Tooltip>
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
        {sortedGroup.map(g => <GroupList key={g.groupId} groupList={g} />)}
      </ScrollableContainer>
    </>
  );
}

export default Group;
