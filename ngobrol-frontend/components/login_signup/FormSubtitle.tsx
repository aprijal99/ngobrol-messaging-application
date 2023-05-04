import {Typography} from '@mui/material';

const FormSubtitle = ({ subtitle }: { subtitle: string }) => {
  return (
    <Typography
      align='center' gutterBottom={true}
      sx={{ margin: '0 auto 50px', fontSize: '.875rem', maxWidth: '250px', }}
    >
      {subtitle}
    </Typography>
  );
}

export default FormSubtitle;
