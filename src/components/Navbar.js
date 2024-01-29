import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'


function Navbar() {

    let navigate=useNavigate()


  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Your Logo
      </Typography>
      <Button onClick={()=>{navigate("/")}}  color="inherit">Görevler</Button>
      <Button onClick={()=>{navigate("/telegram")}} color="inherit">Hatırlatıcı</Button>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar