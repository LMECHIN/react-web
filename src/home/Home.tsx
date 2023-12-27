import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MySnackbar } from '../lib/my_snackbar';
import MyAppbar from '../lib/app_bar';

const Home: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [successMessage, setSuccess] = useState<string>('');
  const location = useLocation();
  const successMessageFromLogout = location.state?.successMessage || '';

  const [boxContent, setBoxContent] = useState('Cette boîte est déplaçable !');
  const [boxPosition, setBoxPosition] = useState<{ x: number; y: number }>(
    () => {
      const storedPosition = localStorage.getItem('boxPosition');
      const defaultPosition = { x: 0, y: 0 };

      if (storedPosition && storedPosition !== '') {
        const parsedPosition = JSON.parse(storedPosition);
        if (
          typeof parsedPosition === 'object' &&
          'x' in parsedPosition &&
          'y' in parsedPosition
        ) {
          return parsedPosition;
        }
      }
      return defaultPosition;
    },
  );

  const boxRef = useRef(null);
  const [isBoxHovered, setIsBoxHovered] = useState(false);

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoxContent(event.target.value);
  };

  const handleDragStart = () => {
    setIsBoxHovered(true);
  };

  const handleDragStop = (_e: any, data: { x: number; y: number }) => {
    const newPosition = { x: data.x, y: data.y };
    setBoxPosition(newPosition);
    localStorage.setItem('boxPosition', JSON.stringify(newPosition));
    setIsBoxHovered(false);
  };

  useEffect(() => {
    if (successMessageFromLogout) {
      setSuccess(successMessageFromLogout);
    }
  }, [successMessageFromLogout]);

  return (
    <div>
      <MyAppbar />
      <Draggable
        onStart={handleDragStart}
        onStop={handleDragStop}
        position={boxPosition}
        nodeRef={boxRef}
      >
        <Box
          ref={boxRef}
          sx={{
            width: isSmallScreen ? '90vw' : '40vw',
            height: isSmallScreen ? '30vh' : '40vh',
            background: '#000000DB',
            color: 'white',
            padding: '20px',
            position: 'absolute',
            transition: 'box-shadow 0.3s, border 0.1s',
            boxShadow: isBoxHovered ? '0 4px 25px rgba(0, 0, 0, 0.8588)' : 'none',
            cursor: 'move',
            border: isBoxHovered ? '2px solid rgba(255, 255, 255, 1)' : 'none',
          }}
        >
          <TextField
            fullWidth
            multiline
            variant='standard'
            value={boxContent}
            onChange={handleContentChange}
            inputProps={{ style: { color: 'white' } }}
          />
        </Box>
      </Draggable>
      <MySnackbar open={!!successMessage} onClose={() => setSuccess('')}>
        {successMessage}
      </MySnackbar>
    </div>
  );
};

export default Home;
