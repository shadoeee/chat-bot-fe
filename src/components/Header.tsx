import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo.tsx'
import { userAuth } from '../context/AuthContext.tsx';
import NavigationLink from './shared/NavigationLink.tsx';

const Header = () => {
  const auth = userAuth();
  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink bg='lightgreen' to='/chat' text='Go To Chat' textColor='black' />
              <NavigationLink bg='#51538f' to='/' textColor='white' text='logout' onClick={auth.logout} />
            </>
          ) : <>
          <NavigationLink bg='lightgreen' to='/login' text='Login' textColor='black' />
          <NavigationLink bg='#51538f' to='/signup' textColor='white' text='Signup'  /></>}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

