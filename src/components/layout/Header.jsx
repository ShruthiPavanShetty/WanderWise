import { Button, Popover } from '@mui/material';
import React, { useState } from 'react';
import CustomButton from '../CustomButton';
import LoginDialog from '../LoginDialog';
import { useNavigate } from 'react-router';
import { useAuth } from '../../service/Authentication';

const Header = () => {
  const navigate = useNavigate();
  const {user, login, logout} = useAuth();

  const [anchorEl,setAnchorEl] = useState(false);//popover current position
  const [openDialog, setOpenDialog] = useState(false);

  const toggleUserProfile = (e) => setAnchorEl(e.currentTarget);

  const openPop = Boolean(anchorEl);

  const handleLogout = () =>{
   logout();
   setAnchorEl(false);
   navigate('/');
  }

  const handleLogin = () =>{
    login();
    setOpenDialog(false);
  }

   const buttonStyle = { border:`1px solid #16404D`,
    borderRadius:'2rem',padding:{sm:'12px 16px',md:'12px 26px',lg:'12px 26px'}, letterSpacing:{sm:'1px',md:'3px',lg:'3px'},color:'#16404D', "&:hover": {
    backgroundColor: `#16404D`,color:'#FBF5DD',
  },}

  return (
    <div className='bg-[#FBF5DD] px-1 md:px-2 pt-0 shadow-sm flex justify-between items-center fixed top-0 right-0 left-0 z-50'>
    <div className='cursor-pointer m-2' onClick={() => navigate('/')}>
        <img src='/logo5.png' alt='Wander-Wise-Logo' className='w-22 h-12 md:w-36 md:h-22 lg:w-52 lg:h-24' />
    </div>
    {user? 
      <div className='flex items-center gap-2 md:gap-5 px-1 md:px-3'>
        <Button variant='outlined' sx={buttonStyle} className='pt-5' size='medium' onClick={()=>navigate('/my-trips')}> My Trips</Button>
        <img src={`${user?.picture}`} alt='user-profile-picture' className='h-8 w-8 md:h-12 md:w-12 rounded-full cursor-pointer' aria-describedby='user-profile' onClick={toggleUserProfile} loading='lazy' />
        <Popover
          id='user-profile'
          open={openPop}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className='mt-1'
        >
         <div className='flex flex-col gap-3 p-2 lg:p-4 min-w-26 lg:min-w-40 cursor-pointer bg-[#A6CDC6]'>
            <h2 onClick={handleLogout}>Logout</h2>
          </div>
           
        </Popover>
      </div> : 
      <div className='mx-1 lg:mx-3 pt-1'>
        <CustomButton variant='contained' size='medium' bg="#16404D" onClick={()=> setOpenDialog(true)} >Sign In</CustomButton>
      </div>}
      <LoginDialog openDialog={openDialog} setOpenDialog={setOpenDialog} login={handleLogin} />
   
   </div>
  )
}

export default Header