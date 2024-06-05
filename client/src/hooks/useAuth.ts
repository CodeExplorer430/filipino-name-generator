import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout as logoutAction } from '../redux/authSlice';
import axios from 'axios';

export const useAuth = () => { 
    const { token, isAuthenticated } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutAction());
    };

    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return { token, isAuthenticated, logout, axiosInstance };
};