import {ApiType} from '../types/api';
import {GroupMessageType} from '../redux/slice/groupMessageSlice';

const fetchMessage = async (groupId: number): Promise<GroupMessageType[]> => {
  const url = `http://localhost:7080/group/message?group_id=${groupId}`;
  try {
    const fetchResult = await fetch(url);
    const result: ApiType<GroupMessageType[]> = await fetchResult.json();

    return result.data;
  } catch {
    console.log(`There is something wrong when trying to fetch group message from ${url}`);

    return [] as GroupMessageType[];
  }
}

export default fetchMessage;
