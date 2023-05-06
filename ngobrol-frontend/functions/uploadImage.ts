import {ApiType} from '../types/api';

const uploadImage = async (image: File): Promise<string | Error> => {
  const url = 'http://localhost:7080/image';
  let formData = new FormData();
  formData.append("image", image);

  try {
    const fetchResult = await fetch(url, { // When upload form data for uploading a file, we should blank Content-Type and let the browser deciding for us
      method: 'POST',
      body: formData,
    });
    const result: ApiType<{ imageFilename: string, }> = await fetchResult.json();

    if(result.code !== 200) {
      return new Error('Something went wrong');
    }

    return result.data.imageFilename;
  } catch {
    return new Error('Something went wrong');
  }
}

export default uploadImage;
