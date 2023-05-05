import {UserType} from '../redux/slice/userSlice';
import {ApiType} from '../types/api';

const findContact = async (email: string): Promise<UserType | Error> => {
  const url = `http://localhost:7080/user?email=${email}`;
  try {
    const fetchResult = await fetch(url, { credentials: 'include', });
    const result: ApiType<UserType> = await fetchResult.json();

    if(result.code !== 302) {
      return new Error(`There is no contact with email = ${email}`);
    }

    return result.data;
  } catch {
    return new Error('There is something wrong');
  }
}

export default findContact;
