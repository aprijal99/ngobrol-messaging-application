import {Box, Dialog, DialogContent, IconButton, useMediaQuery} from '@mui/material';
import {Close} from '@mui/icons-material';
import React, {ReactNode, useEffect, useRef} from 'react';
import {useStore} from 'react-redux';
import {RootState} from '../../../redux/store/store';

const DialogContentContainer = ({ children }: { children: ReactNode, }) => {
  const dialogContentRef = useRef<HTMLDivElement>();
  const store = useStore<RootState>();

  useEffect(() => {
    if(dialogContentRef.current && store.getState().menu.activeMenu === 'group') {
      dialogContentRef.current.style.height = `${dialogContentRef.current.offsetHeight}px`;
    }
  }, []);

  return (
    <DialogContent
      sx={{
        p: 0, display: 'flex', justifyContent: 'center', overflowX: 'hidden', overflowY: 'auto', alignItems: 'start',
        '::-webkit-scrollbar': { width: '5px', }, '::-webkit-scrollbar-thumb': { borderRadius: '5px', visibility: 'hidden', backgroundColor: 'rgba(255, 255, 255, 0.3)', },
        ':hover': { '::-webkit-scrollbar-thumb': { visibility: 'visible', }, },
      }}
    >
      <Box
        id='dialog-content' ref={dialogContentRef}
        sx={{
          position: 'relative', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', alignItems: 'start',
          transition: 'height 225ms cubic-bezier(0, 0, 0.2, 1) 0ms', '@media (min-width: 620px)': { alignItems: 'center', },
        }}
      >
        {children}
      </Box>
    </DialogContent>
  );
}

const DialogContainer = ({ children, open, handleClickCloseDialog }: { children: ReactNode, open: boolean, handleClickCloseDialog: () => void, }) => {
  const fullScreen = useMediaQuery('(max-width: 619px)');

  return (
    <Dialog
      open={open} onClose={handleClickCloseDialog} fullScreen={fullScreen}
      sx={{ '.MuiPaper-root': { backgroundColor: '#252525', backgroundImage: 'none', '@media (min-width: 620px)': { maxWidth: '450px', }, }, }}
    >
      <IconButton onClick={handleClickCloseDialog} sx={{ position: 'absolute', top: '10px', right: '10px', zIndex: '100', }}>
        <Close sx={{ color: 'rgba(255, 255, 255, 0.6)', }} />
      </IconButton>
      <DialogContentContainer>
        {children}
      </DialogContentContainer>
    </Dialog>
  );
}

export default DialogContainer;
