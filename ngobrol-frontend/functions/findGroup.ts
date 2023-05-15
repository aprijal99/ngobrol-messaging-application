import {GroupType} from '../redux/slice/groupSlice';
import {ApiType} from '../types/api';

const findGroup = async (groupId: string): Promise<GroupType | Error> => {
  const url = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/group/find?group_id=${groupId}`;
  try {
    const fetchResult = await fetch(url, { credentials: 'include', });
    const result: ApiType<GroupType> = await fetchResult.json();

    if(result.code !== 302) {
      return new Error(`There is no group with url = https://n.group/${groupId}`);
    }

    return result.data;
  } catch {
    return new Error('There is something wrong');
  }
}

export default findGroup;
