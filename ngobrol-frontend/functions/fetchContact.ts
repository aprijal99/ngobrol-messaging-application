import {ApiType} from '../types/api';
import {UserType} from '../redux/slice/userSlice';

const fetchContact = async (email: string): Promise<UserType[]> => {
  const url = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/contact?email=${email}`;
  try {
    const fetchResult = await fetch(url);
    const result: ApiType<UserType[]> = await fetchResult.json();

    return result.data;
  } catch {
    console.log(`There is something wrong when trying to fetch contact from ${url}`);

    return [] as UserType[];
  }
}

export default fetchContact;
