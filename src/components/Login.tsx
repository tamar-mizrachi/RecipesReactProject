
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';
import axios from 'axios';

const Login: React.FC = () => {
    const { setIsLoggedIn, registerUser } = useAuth();
    const [UserName, setUserName] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ UserName: boolean; Password: boolean }>({
        UserName: false,
        Password: false,
    });

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', {
                UserName: UserName,
                Password: Password,
            });
    
            const data = response.data;

            if (!data || !data.Id) {
                throw new Error('Login failed: No user ID returned');
            }
    
            // המרת הנתונים לפי הסוג שהוגדר ב־authcontext
            registerUser({
                Id: data.Id,
                fullName: data.Name,
                username: data.UserName,
                password: data.Password,
                phone: data.Phone,
                email: data.Email,
                tz: data.Tz,
            });
    
            setIsLoggedIn(true);
            localStorage.setItem('userId',data.Id)
            navigate('/home-recipes');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Login failed');
            console.error('Login error:', err);
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

