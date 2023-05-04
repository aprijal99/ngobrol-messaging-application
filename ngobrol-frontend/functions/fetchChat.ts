import {ApiType} from '../types/api';
import {ChatType} from '../redux/slice/chatSlice';

const fetchChat = async (email: string): Promise<ChatType> => {
  const messageChatUrl = `http://localhost:7080/message/chat?email=${email}`;
  const groupChatUrl = `http://localhost:7080/group/chat?email=${email}`;
  try {
    const messageFetchResult = await fetch(messageChatUrl);
    const messageResult: ApiType<ChatType> = await messageFetchResult.json();

    const groupFetchResult = await fetch(groupChatUrl);
    const groupResult: ApiType<ChatType> = await groupFetchResult.json();

    return {
      ...messageResult.data,
      ...groupResult.data
    };
  } catch {
    console.log(`There is something wrong when trying to fetch chat from ${messageChatUrl} and ${groupChatUrl}`);

    return {} as ChatType;
  }
}

export default fetchChat;
