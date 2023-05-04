import MainMenuTitle from './MainMenuTitle';
import SearchBar from './SearchBar';
import ScrollableContainer from '../ScrollableContainer';
import GroupList from './GroupList';
import {GroupAddOutlined} from '@mui/icons-material';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import {IconButton, Tooltip} from '@mui/material';
import {useState} from 'react';
import NewGroupDialog from './NewGroupDialog';
import DialogContainer from './DialogContainer';

const NewGroupButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpenDialog = () => setOpen(true);
  const handleClickCloseDialog = () => setOpen(false);

  return (
    <>
      <Tooltip title='Add New Group' placement='left' enterDelay={500} disableInteractive onClick={handleClickOpenDialog}>
        <IconButton sx={{ cursor: 'pointer', }}>
          <GroupAddOutlined />
        </IconButton>
      </Tooltip>
      <DialogContainer open={open} handleClickCloseDialog={handleClickCloseDialog}>
        <NewGroupDialog />
      </DialogContainer>
    </>
  );
}

const Group = () => {
  const { group } = useSelector((state: RootState) => state.group);

  return (
    <>
      <MainMenuTitle title='Groups' addIcon={<NewGroupButton />} />
      <SearchBar placeholder='Search or create a new group' />
      <ScrollableContainer reducedHeight='130px'>
        {group.map(g => <GroupList key={g.groupId} groupList={g} />)}
      </ScrollableContainer>
    </>
  );
}

export default Group;
