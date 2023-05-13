import {MessageType} from '../redux/slice/messageSlice';
import {ApiType} from '../types/api';

const fetchMessage = async (userEmail: string, receiverEmail: string): Promise<MessageType[] | Error> => {
  const url = `http://localhost:7080/message?sender=${userEmail}&receiver=${receiverEmail}`;
  try {
    const fetchResult = await fetch(url);
    const result: ApiType<MessageType[]> = await fetchResult.json();

    if(result.code !== 302) {
      return new Error(`There is no messages`)
    }

    return result.data;
  } catch {
    return new Error(`There is something wrong when trying to fetch message from ${url}`);
  }
}

export default fetchMessage;
