import * as React from 'react';
import Swal from 'sweetalert2';
import Typography from '@mui/material/Typography';
import { getSession, logout } from '../utils/auth/Auth';
import { useNavigate } from 'react-router-dom';


export default function LogOut() {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false)
    const navigate = useNavigate();

    const executeLogout = async () => {
        const response = await getSession()
        setIsAuthenticated(response)
        if (isAuthenticated) {
            const message: string = await logout()
            Swal.fire({
                title: message,
                confirmButtonText: 'Cool'
            })
            navigate('/')
        }
    }
    React.useEffect(() => {
        executeLogout()
    },)

    return (
        <>
            {isAuthenticated ? null :
                <Typography component="h1" variant="h5" align='center'>
                    {`You are not logged in`}
                </Typography>
            }
        </>
    );
}

