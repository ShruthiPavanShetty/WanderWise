import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({bg,color,hover,variant,borderColor,borderRadius, textTransform, size,className,onClick,hoverEffect, children}) => {
  return (
          <Button
          variant={variant}
          size={size}
          onClick={onClick}
          className= {className}
            sx={{
              backgroundColor:  `${ variant === 'contained'? bg : 'transparent'}`,
              color: `${color}`,
              textTransform:`${textTransform}`,
              "&:hover": hoverEffect && {
                backgroundColor: variant === 'contained'?'transparent': `${hover?.bg}`,
                outline:`1px solid ${variant === 'contained'?bg: borderColor}`,
                color: `${hover?.text}`
              },
              border:`1px solid ${borderColor}`,
              borderRadius:`${borderRadius}`,
              fontSize:'1rem'
            }}
          
          >
           {children}
          </Button>
       
  )
}

export default CustomButton