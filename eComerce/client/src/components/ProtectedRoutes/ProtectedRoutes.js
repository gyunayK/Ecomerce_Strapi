import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('UserJWT');

    useEffect(() => {

        if (!token) {
            navigate('/signin');
        }
    }, [navigate]);

    return token ? children : null;
}

export function GuestRoute({ children }) {
    const navigate = useNavigate();

    const token = localStorage.getItem('UserJWT');

    useEffect(() => {
        if (token) {
            navigate('/profile'); // or any other relevant page for authenticated users
        }
    }, [navigate, token]);

    return !token ? children : null;
}
