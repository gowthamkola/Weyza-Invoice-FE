import { createAsyncThunk } from '@reduxjs/toolkit'
import {getToken, removeToken, setToken} from '../../utils/HelperFunctions';
import api from '../../services/api';
import history from '../../utils/history';
import * as endpointUrls from '../constants/enpointURL';

// export const fetchUserData = createAsyncThunk(endpointUrls.GET_PROFILE, async (_, {rejectWithValue}) => {
//     try{
//         const accessToken = getToken();
//         api.defaults.headers.Authorization = `Bearer ${accessToken}`;
//         const response = await api.get(endpointUrls.GET_PROFILE);
//         return {...response.data, accessToken};
//     }catch(e){
//         removeToken();
//         return rejectWithValue('');
//     }
// });

export const login = createAsyncThunk('auth/login', async (payload) => {
    const response = await api.post('/login', payload);
    setToken(response.data.accessToken);
    history.push('/dashboard');
    return response.data;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
    removeToken();
});