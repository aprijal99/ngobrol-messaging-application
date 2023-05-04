import {MessageType} from '../redux/slice/messageSlice';
import {ApiType} from '../types/api';

const fetchMessage = async (userEmail: string, receiverEmail: string): Promise<MessageType[]> => {
  const url = `http://localhost:7080/message?sender=${userEmail}&receiver=${receiverEmail}`;
  try {
    const fetchResult = await fetch(url);
    const result: ApiType<MessageType[]> = await fetchResult.json();

    return result.data;
  } catch {
    console.log(`There is something wrong when trying to fetch message from ${url}`);

    return [] as MessageType[];
  }
}

export default fetchMessage;
