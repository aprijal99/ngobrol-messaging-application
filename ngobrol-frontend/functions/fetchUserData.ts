import {UserType} from '../redux/slice/userSlice';
import {ApiType} from '../types/api';

const fetchUserData = async (email: string): Promise<UserType> => {
  const url = `http://localhost:7080/user?email=${email}`;
  try {
    const fetchResult = await fetch(url);
    const result: ApiType<UserType> = await fetchResult.json();

    return result.data;
  } catch {
    console.log(`There is something wrong when trying to fetch user data from ${url}`);

    return {} as UserType;
  }
}

export default fetchUserData;
