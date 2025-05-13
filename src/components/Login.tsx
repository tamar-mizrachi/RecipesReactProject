
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';

const Login: React.FC = () => {
    const { setIsLoggedIn } = useAuth();
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ UserName: boolean; Password: boolean }>({
        UserName: false,
        Password: false,
    });

    const handleLogin = async () => {
        let newErrors = { UserName: !UserName, Password: !Password };
        setErrors(newErrors);

        if (newErrors.UserName || newErrors.Password) return;

        try {
            const res = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ UserName, Password }),
            });
    
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'Login failed');

            console.log('Login successful:', data);
            localStorage.setItem('userId', data.userId);
            navigate('/home-recipes');
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Error:', error);
            alert('Invalid login credentials');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '200px' }}>
                <Typography variant="h4" gutterBottom>
                    כניסה
                </Typography>
                <TextField
                    label="שם משתמש *"
                    variant="outlined"
                    value={UserName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} // הוספת טיפוס כאן
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.UserName}
                    helperText={errors.UserName ? 'Username is required' : ''}
                />
                <TextField
                    label="סיסמה *"
                    type="password"
                    variant="outlined"
                    value={Password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // הוספת טיפוס כאן
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.Password}
                    helperText={errors.Password ? 'Password is required' : ''}
                />
                <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
                    כניסה
                </Button>
            </Box>
        </Container>
    );
};

export default Login;

