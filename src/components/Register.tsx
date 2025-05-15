
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Typography,
    Container,
    IconButton,
    InputAdornment
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from './authcontext';
import axios from 'axios';

const Register: React.FC = () => {
    const { registerUser } = useAuth();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [tz, setTz] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    
const handleRegister = async (): Promise<void> => {
    const newErrors = {
        fullName: !fullName,
        username: !username,
        password: !password,
        phone: !phone,
        email: !email,
        tz: !tz,
    };
    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) return;

    try {
        const response = await axios.post('http://localhost:8080/api/user/sighin', {
            Name: fullName,
            UserName: username,
            Password: password,
            Phone: phone,
            Email: email,
            Tz: tz,
        });

        const data = response.data;

        if (!data || !data.Id) {
            throw new Error('Registration failed: No ID returned');
        }

        // שמירת פרטי המשתמש עם ה־ID מהשרת
        registerUser({
            Id: data.Id,
            fullName,
            username,
            password,
            phone,
            email,
            tz,
        });

        alert('נרשמת בהצלחה!');
        navigate('/');

    } catch (err: any) {
        console.error('Error during registration:', err);
        alert('Registration failed: ' + (err.response?.data?.message || err.message));
    }
};
    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
                <Typography variant="h4" gutterBottom>הרשמה</Typography>
                <TextField
                    label="שם *"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.fullName}
                    helperText={errors.fullName ? 'Full Name is required' : ''}
                />
                <TextField
                    label="שם משתמש *"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.username}
                    helperText={errors.username ? 'Username is required' : ''}
                />
                <TextField
                    label="סיסמה *"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.password}
                    helperText={errors.password ? 'Password is required' : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="טלפון *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.phone}
                    helperText={errors.phone ? 'Phone number is required' : ''}
                />
                <TextField
                    label="מייל *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.email}
                    helperText={errors.email ? 'Email is required' : ''}
                />
                <TextField
                    label="ת.ז *"
                    value={tz}
                    onChange={(e) => setTz(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.tz}
                    helperText={errors.tz ? 'TZ is required' : ''}
                />
                <Button variant="contained" color="primary" onClick={handleRegister} fullWidth>
                    הרשמה
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
