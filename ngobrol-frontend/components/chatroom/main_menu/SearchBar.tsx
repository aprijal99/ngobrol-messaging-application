import {Box, InputAdornment, TextField} from '@mui/material';
import {Search} from '@mui/icons-material';

const SearchBar = ({ placeholder }: { placeholder: string }) => {
  return (
    <Box sx={{ px: 2, pb: 2, }}>
      <TextField
        fullWidth={true}
        autoComplete='off'
        placeholder={placeholder}
        sx={{
          'input': { py: 1, pr: 1, },
          '.MuiInputBase-root': { pl: 1.5, },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start' >
              <Search sx={{ fontSize: '22px', color: '#8b8b8b', }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;
