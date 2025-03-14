import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import CustomButton from './CustomButton'
import { FcGoogle } from 'react-icons/fc'
import { IoMdClose } from "react-icons/io"

const LoginDialog = ({openDialog,setOpenDialog,login}) => {
  return (
    <Dialog open={openDialog} fullWidth="sm" >
        <div className='bg-[#FBF5DD]'>
        <DialogTitle>
            <div className='w-36 h-15 lg:w-45 lg:h-15'>
                <img src='./logo5.png' alt='Wander-Wise-Logo'/>
            </div>
        </DialogTitle>
        <IconButton
            aria-label="close"
            onClick={()=>setOpenDialog(false)}
            sx={(theme) => ({
                padding: '1rem',
                position: 'absolute',
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
        >
            <IoMdClose/>
        </IconButton>
        <DialogContent>
            <div className='mb-4 mx-1'>
                <h2 className='font-bold text-lg'>Sign In With Google</h2>
                <p className='text-grey-400'>Sign in to the App with Google authentication securely</p>
            </div>
            <CustomButton variant='contained' size='large' bg="black" className='w-full flex gap-2' onClick={login}>
                <FcGoogle />Sign In With Google
            </CustomButton>
        </DialogContent>
        </div>
    </Dialog>
  )
}

export default LoginDialog