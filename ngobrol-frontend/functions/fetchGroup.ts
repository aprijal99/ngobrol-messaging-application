import {ApiType} from '../types/api';
import {GroupType} from '../redux/slice/groupSlice';

const fetchContact = async (email: string): Promise<GroupType[]> => {
  const url = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/group?email=${email}`;
  try {
    const fetchResult = await fetch(url);
    const result: ApiType<GroupType[]> = await fetchResult.json();

    return result.data;
  } catch {
    console.log(`There is something wrong when trying to fetch group from ${url}`);

    return [] as GroupType[];
  }
}

export default fetchContact;
