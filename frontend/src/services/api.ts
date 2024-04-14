import  { AxiosError } from 'axios';
import { LoginParams, User } from '../features/auth/types';
import { Client, UpdateStatusParams } from '../features/clients/types';
import axios from './axiosConfig'


export const authenticate = async (params: LoginParams): Promise<User> => {
    try {
        const response = await axios.post<User>(`/users/login`, params);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        throw (axiosError.response?.data || "Unknown error");
    }
};

export const fetchClients = async (): Promise<Client[]> => {
    try {
        const response = await axios.get<Client[]>(`/clients/getClientsList`);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        throw (axiosError.response?.data || "Unknown error");
    }
};

export const updateClientStatus = async (params: UpdateStatusParams): Promise<void> => {
    try {
        const response = await axios.put(`/clients/${params.Id}`, { newStatus: params.newStatus });
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        throw (axiosError.response?.data || "Unknown error");
    }
};