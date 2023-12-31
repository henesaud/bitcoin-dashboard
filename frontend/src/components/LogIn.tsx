import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { getCSRF, getSession, login } from '../utils/auth/Auth';
import { useNavigate } from 'react-router-dom';


export default function LogIn() {
    const [csrf, setCsrf] = React.useState<string>('')
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchCsrfIfNoSession = async () => {
            const session = await getSession()
            if (!session) {
                const csrf = await getCSRF()
                if (csrf) {
                    setCsrf(csrf)
                }
            }
        }
        fetchCsrfIfNoSession()
    }, [])


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        login(csrf, data);
        navigate('/')
    }

    const userPassFields = <>
        <TextField
            margin="normal"
            required
            fullWidth
            id="user"
            label="User Name"
            name="user"
            autoComplete="user"
            autoFocus
        />
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
        />
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
        />
    </>

    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    LogIn
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {userPassFields}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        LogIn
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password? Sorry.
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sorry"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}