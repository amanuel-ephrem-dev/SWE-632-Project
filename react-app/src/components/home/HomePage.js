import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';


export default function Home() {
    
    return (
        <Container maxWidth="md">
          <Box
            sx={{
              textAlign: 'center',
              mt: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h3" fontWeight="bold">
              Home Page
            </Typography>

            <Typography variant="h5" sx={{ mt: 2 }}>
              Welcome to MetaTier!
            </Typography>

            <Typography variant="h5" sx={{ mt: 2 }}>
              An application to create, save and compare tier ranking lists.
            </Typography>

            {/* 🔥 New styled button */}
            <Button
              component={Link}
              to="/templates"
              variant="contained"
              sx={{
                mt: 4,
                px: 4,
                py: 1.4,
                borderRadius: '999px',
                textTransform: 'none',
                fontWeight: 'bold',
                fontSize: '1rem',
                backgroundColor: 'black',
                boxShadow: 'none',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#222',
                  boxShadow: 'none',
                },
              }}
            >
              Get Started
            </Button>
          </Box>
        </Container>
    );
}