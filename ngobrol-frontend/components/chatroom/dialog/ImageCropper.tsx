import {Cropper, ReactCropperElement} from 'react-cropper';
import {Box, Button, Typography} from '@mui/material';
import "cropperjs/dist/cropper.css";
import {createRef, useRef} from 'react';

const ImageCropper = ({ image, saveCropImg, closeCropper }: { image: File, saveCropImg: (cropImg: File) => void, closeCropper: () => void, }) => {
  const cropperRef = createRef<ReactCropperElement>();
  const imageExt = image.name.split('.').pop();

  const getCropImg = () => {
    if(typeof cropperRef.current?.cropper !== 'undefined') {
      fetch(cropperRef.current.cropper.getCroppedCanvas().toDataURL())
        .then(res => res.blob())
        .then(blob => saveCropImg(new File([blob], `newImage.${imageExt}`, { type: `image/${imageExt}` })));
    }
  }

  return (
    <Box
      id='cropper-container'
      sx={{
        position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '100', px: 3, py: 4,
        backgroundColor: '#252525',
      }}
    >
      <Typography variant='h5' align='center' sx={{ fontWeight: 'bold', }}>Crop The Image</Typography>
      <Typography align='center' sx={{ mb: 3, fontSize: '1rem', fontWeight: '300', }}>Drag for move and scroll for zoom</Typography>

      <Cropper
        ref={cropperRef}
        src={URL.createObjectURL(image)}
        aspectRatio={1}
        minCropBoxHeight={250}
        minCanvasWidth={250}
        background={false}
        autoCropArea={1}
        checkOrientation={false}
        guides={false}
        center={false}
        style={{ width: 250, height: 250, margin: '0 auto'}}
      />

      <Box display='flex' justifyContent='center' columnGap='5px' sx={{ mt: 3, }}>
        <Button
          variant='contained' size='small'
          onClick={() => {
            getCropImg();
            closeCropper();
          }}
          sx={{ textTransform: 'capitalize', boxShadow: 'none', ':hover': { backgroundColor: '#199bf1', boxShadow: 'none', }, }}
        >
          Save
        </Button>
        <Button
          variant='contained' size='small' color='error' onClick={() => closeCropper()}
          sx={{ textTransform: 'capitalize', boxShadow: 'none', ':hover': { backgroundColor: '#ff1744', boxShadow: 'none', }, }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default ImageCropper;
