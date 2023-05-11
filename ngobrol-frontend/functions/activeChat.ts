import {ActiveChatType} from '../redux/slice/activeChatSlice';

export const changeToPrivateChat = (contactEmail: string): ActiveChatType => ({
  chatMode: 'private',
  contactEmail,
  groupId: 0,
});

export const changeToGroupChat = (groupId: number): ActiveChatType => ({
  chatMode: 'group',
  contactEmail: '',
  groupId,
});

export const resetActiveChat = (): ActiveChatType => ({
  chatMode: '',
  contactEmail: '',
  groupId: 0,
});
