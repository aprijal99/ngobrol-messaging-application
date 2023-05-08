import {Box, IconButton, Typography} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store/store';
import ProfileAvatar from '../ProfileAvatar';
import {ArrowBack, ArrowForward} from '@mui/icons-material';
import React, {useEffect, useRef} from 'react';

const ContactProfile = ({ contactEmail }: { contactEmail: string, }) => {
  const { contact } = useSelector((state: RootState) => state.contact);
  const contactByEmail = contact.filter(c => c.email === contactEmail)[0];

  return (
    <>
      <ProfileAvatar imageUrl={contactByEmail.imageUrl} />
      <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', justifyContent: 'center', }}>
        <Typography sx={{ fontWeight: 'bold', }} >{contactByEmail.name}</Typography>
        <Typography sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', }}>Last seen 2 hours ago</Typography>
      </Box>
    </>
  );
}

const GroupProfile = ({ groupId }: { groupId: number, }) => {
  const { group } = useSelector((state: RootState) => state.group);
  const groupById = group.filter(g => g.groupId === Number(groupId))[0];

  return (
    <>
      <ProfileAvatar imageUrl={groupById.imageUrl} />
      <Box sx={{ display: 'flex', flexGrow: '1', flexDirection: 'column', justifyContent: 'center', }}>
        <Typography sx={{ fontWeight: 'bold', }} >{groupById.name}</Typography>
        <Typography sx={{ fontSize: '.9rem', color: 'rgba(255, 255, 255, 0.6)', }}>{groupById.userNumber} members, 2 online</Typography>
      </Box>
    </>
  );
}

const Arrow = () => {
  const messageMenu = document.getElementById('message-menu');
  const arrowBackRef = useRef<SVGSVGElement>(null);
  const arrowForwardRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if((window.innerWidth < 950) && arrowBackRef.current && arrowForwardRef.current) {
      arrowBackRef.current.style.display = 'initial';
      arrowForwardRef.current.style.display = 'none';
    }
  }, []);

  const handleOnClickArrowBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const profileDetail = document.getElementById('profile-detail');

    if(messageMenu && messageMenu.classList.contains('left-0')) {
      if(profileDetail) profileDetail.classList.remove('transform-none');
      messageMenu.classList.remove('left-0');

      if(arrowBackRef.current && arrowForwardRef.current) {
        arrowBackRef.current.style.display = 'none';
        arrowForwardRef.current.style.display = 'initial';
      }
    } else if (messageMenu && !messageMenu.classList.contains('left-0')) {
      messageMenu.classList.add('left-0');

      if(arrowBackRef.current && arrowForwardRef.current) {
        arrowBackRef.current.style.display = 'initial';
        arrowForwardRef.current.style.display = 'none';
      }
    }
  }

  return (
    <IconButton sx={{ mr: 1, ml: -2, '@media (min-width: 950px)': { display: 'none', }, }} onClick={handleOnClickArrowBack}>
      <ArrowBack id='arrow-back' ref={arrowBackRef} sx={{ display: 'none', }} />
      <ArrowForward id='arrow-forward' ref={arrowForwardRef} />
    </IconButton>
  );
}

const MessageTopProfile = () => {
  const { activeChat: { chatMode, contactEmail, groupId } } = useSelector((state: RootState) => state.activeChat);

  const handleOnClick = () => {
    const profileDetail = document.getElementById('profile-detail');
    const messageMenu = document.getElementById('message-menu');
    const arrowBack = document.getElementById('arrow-back');
    const arrowForward = document.getElementById('arrow-forward');

    if(profileDetail && messageMenu && ((window.innerWidth > 620) && (window.innerWidth < 950)) && !messageMenu.classList.contains('left-0')) {
      messageMenu.classList.add('left-0');

      if(arrowBack && arrowForward) {
        arrowBack.style.display = 'initial';
        arrowForward.style.display = 'none';
      }
    } else if(profileDetail && messageMenu && (window.innerWidth >= 950)) {
      profileDetail.classList.add('transform-none');
      messageMenu.classList.add('left-0');

      if(arrowBack && arrowForward) {
        arrowBack.style.display = 'initial';
        arrowForward.style.display = 'none';
      }
    } else if (profileDetail) profileDetail.classList.add('transform-none');

    if(messageMenu && window.innerWidth > 1300) messageMenu.style.marginRight = '400px';
  }

  const wMedia: MediaQueryList = window.matchMedia('(min-width: 1300px)');
  const messageMenuWidth = (e: MediaQueryList) => {
    const messageMenu = document.getElementById('message-menu');
    const profileDetail = document.getElementById('profile-detail');

    if((!profileDetail || !profileDetail.classList.contains('transform-none')) && messageMenu) {
      messageMenu.style.marginRight = '0px';
    } else if(profileDetail && profileDetail.classList.contains('transform-none') && messageMenu) {
      if(e.matches) {
        messageMenu.style.marginRight = '400px';
      } else {
        messageMenu.style.marginRight = '0px';
      }
    }
  }

  wMedia.addEventListener('change', () => messageMenuWidth(wMedia));
  messageMenuWidth(wMedia);

  return (
    <Box
      onClick={handleOnClick}
      sx={{
        px: 3, mb: 2, height: '75px', display: 'flex', cursor: 'pointer', alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      }}
    >
      <Arrow />
      {chatMode === 'private' ? <ContactProfile contactEmail={contactEmail} /> : <GroupProfile groupId={groupId} />}
    </Box>
  );
}

export default MessageTopProfile;
