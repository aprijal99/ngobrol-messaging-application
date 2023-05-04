import {Typography} from '@mui/material';

const FormTitle = ({ title }: { title: string }) => {
  return (
    <Typography align='center' variant='h5' gutterBottom={true} sx={{ mb: 2, fontWeight: 'bold', }}>
      {title}
    </Typography>
  );
}

export default FormTitle;
