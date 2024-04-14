import axios, { AxiosError } from 'axios';
import { LoginParams, User } from '../features/auth/types';
import { Client, UpdateStatusParams } from '../features/clients/types';

const API_URL = 'http://localhost:3000'; 

export const authenticate = async (params: LoginParams): Promise<User> => {
    try {
        const response = await axios.post<User>(`${API_URL}/login`, params);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        throw (axiosError.response?.data || "Unknown error");
    }
};

export const fetchClients = async (): Promise<Client[]> => {
    try {
        const response = await axios.get<Client[]>(`${API_URL}/clients`);
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        throw (axiosError.response?.data || "Unknown error");
    }
};

export const updateClientStatus = async (params: UpdateStatusParams): Promise<void> => {
    try {
        const response = await axios.put(`${API_URL}/clients/${params.Id}`, { newStatus: params.newStatus });
        return response.data;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        throw (axiosError.response?.data || "Unknown error");
    }
};