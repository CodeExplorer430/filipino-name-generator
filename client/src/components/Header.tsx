import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Filipino Name Generator
                </Typography>
                {isAuthenticated ? (
                    <>
                        <Button color="inherit" component={Link} to="/generate">
                            Generate Names
                        </Button>
                        <Button color="inherit" onClick={logout}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;