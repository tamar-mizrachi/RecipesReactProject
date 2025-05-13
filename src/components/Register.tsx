/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Register: React.FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [tz, setTz] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<{
        fullName?: boolean;
        username?: boolean;
        password?: boolean;
        phone?: boolean;
        email?: boolean;
        tz?: boolean;
    }>({});
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
            const res = await fetch('http://localhost:8080/api/user/sighin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Name: fullName,
                    UserName: username,
                    Password: password,
                    Phone: phone,
                    Email: email,
                    Tz: tz,
                }),
            });

            const data = await res.json();
    
            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }
    
            alert('נרשמת בהצלחה!');
            navigate('/'); // נווט לדף ההתחברות
    
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Error during registration:', err.message);
                alert('Registration failed: ' + err.message);
            } else {
                console.error('Unknown error during registration:', err);
                alert('An unknown error occurred.');
            }
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
                <Typography variant="h4" gutterBottom>הרשמה</Typography>
                <TextField
                    label="שם *"
                    variant="outlined"
                    value={fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.fullName}
                    helperText={errors.fullName ? 'Full Name is required' : ''}
                />
                <TextField
                    label="שם משתמש *"
                    variant="outlined"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.username}
                    helperText={errors.username ? 'Username is required' : ''}
                />
                <TextField
                    label="סיסמה *"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.password}
                    helperText={errors.password ? 'Password is required' : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="טלפון *"
                    variant="outlined"
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.phone}
                    helperText={errors.phone ? 'Phone number is required' : ''}
                />
                <TextField
                    label="מייל *"
                    variant="outlined"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.email}
                    helperText={errors.email ? 'Email is required' : ''}
                />
                <TextField
                    label="ת.ז *"
                    variant="outlined"
                    value={tz}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTz(e.target.value)}
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
}

export default Register;
*/
/*
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from './authcontext'; // ודא שהנתיב נכון

const Register: React.FC = () => {
    const { registerUser } = useAuth(); // גישה לפונקציה מההקשר
    const [fullName, setFullName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [tz, setTz] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
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
            // קריאת API להרשמה (אם יש צורך)
            const res = await fetch('http://localhost:8080/api/user/sighin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Id:0,
                    Name: fullName,
                    UserName: username,
                    Password: password,
                    Phone: phone,
                    Email: email,
                    Tz: tz,
                }),
            });

            const data = await res.json();
    
            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // שמירת פרטי המשתמש בהצלחה
            registerUser({ Id,fullName, username, password, phone, email, tz });
            alert('נרשמת בהצלחה!');
            navigate('/'); // נווט לדף ההתחברות
    
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Error during registration:', err.message);
                alert('Registration failed: ' + err.message);
            } else {
                console.error('Unknown error during registration:', err);
                alert('An unknown error occurred.');
            }
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '150px' }}>
                <Typography variant="h4" gutterBottom>הרשמה</Typography>
                <TextField
                    label="שם *"
                    variant="outlined"
                    value={fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.fullName}
                    helperText={errors.fullName ? 'Full Name is required' : ''}
                />
                <TextField
                    label="שם משתמש *"
                    variant="outlined"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.username}
                    helperText={errors.username ? 'Username is required' : ''}
                />
                <TextField
                    label="סיסמה *"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.password}
                    helperText={errors.password ? 'Password is required' : ''}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="טלפון *"
                    variant="outlined"
                    value={phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.phone}
                    helperText={errors.phone ? 'Phone number is required' : ''}
                />
                <TextField
                    label="מייל *"
                    variant="outlined"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    error={errors.email}
                    helperText={errors.email ? 'Email is required' : ''}
                />
                <TextField
                    label="ת.ז *"
                    variant="outlined"
                    value={tz}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTz(e.target.value)}
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
}

export default Register;*/


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

    const handleRegister = async () => {
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
            const res = await fetch('http://localhost:8080/api/user/sighin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Id: 0,
                    Name: fullName,
                    UserName: username,
                    Password: password,
                    Phone: phone,
                    Email: email,
                    Tz: tz,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            const user = {
                Id: data.Id || data.id || 0,
                fullName,
                username,
                password,
                phone,
                email,
                tz,
            };

            registerUser(user);
            alert('נרשמת בהצלחה!');
            navigate('/');

        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Error during registration:', err.message);
                alert('Registration failed: ' + err.message);
            } else {
                console.error('Unknown error during registration:', err);
                alert('An unknown error occurred.');
            }
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
