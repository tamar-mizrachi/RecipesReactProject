import React, { useState, useRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Login from './Login';
import Register from './Register';

function Home() {
    const [formType, setFormType] = useState<string>(''); // למעקב אחרי סוג הטופס
    const [open, setOpen] = useState<boolean>(false); // למעקב אחרי מצב ה-Dialog
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // למעקב אחרי מצב ההתחברות

    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false); // סוגרים את ה-Dialog
    };

    const renderForm = () => {
        if (formType === 'login') {
            
            return <Login/>;
        } else if (formType === 'register') {
            return <Register />;
        }
        return null;
    };

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            <header style={headerStyle}>
                <h1 style={welcomeStyle}>TAMARTASTE🧁</h1>
                <nav style={navStyle}>
                <button style={buttonStyle} onClick={() => navigate('login') }>כניסה🔐 </button>
                <button style={buttonStyle} onClick={() => navigate('register')}>הרשמה📝 </button>
                </nav>
            
            </header>
            <main style={{ marginTop: '160px' }}>
         <Outlet /> 
      </main>

            <div style={contentStyle}>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{formType === 'login' ? 'Login' : 'Register'}</DialogTitle>
                    <DialogContent>
                        {renderForm()}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            סגור
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        </div>
        
    );

}

const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '150px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: '0 20px',
    backgroundColor: 'rgb(56, 5, 5)',
    color: 'white',
    zIndex: 1000,
};

const welcomeStyle: React.CSSProperties = {
    margin: 45,
    fontSize: '50px',
};

const navStyle: React.CSSProperties = {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    marginRight: '100px',
};

const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    color: 'white',
    background:'rgb(56, 5, 5)',
};

const contentStyle: React.CSSProperties = {
    marginTop: '150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export default Home;

