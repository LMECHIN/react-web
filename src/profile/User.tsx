import React, { useState, useEffect } from 'react';
import './User.css';
import ApiUser from './ApiUser';
import { Box, ThemeProvider } from '@mui/system';

const User: React.FC = () => {
  const [userData, setUserData] = useState({ username: '', email: '' });

  const test = async () => {
    try {
      const data = await ApiUser();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  useEffect(() => {
    test();
  }, []);

  return (
    <div className='container'>
      <ThemeProvider
        theme={{
          palette: {
            primary: {
              main: '#4B0082',
            },
          },
        }}
      >
        <Box
          sx={{
            width: 500,
            height: 500,
            borderRadius: 10,
            margin: 'auto',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s, transform 0.3s',
            '&:hover': {
              boxShadow: '0 4px 50px rgba(40, 0, 130, 0.8)',
              transform: 'scale(1.1)',
            },
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '70%',
              backgroundImage: `url(${process.env.PUBLIC_URL}/violet.jpg)`,
              backgroundSize: 'cover',
            }}
          />
          <Box
            sx={{
              width: '100%',
              height: '50%',
              bgcolor: 'primary.main',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#FFFFFF',
              padding: '5px',
            }}
          >
            <p style={{ fontSize: '48px', margin: 10 }}>{userData.username}</p>
            <p>{userData.email}</p>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default User;
