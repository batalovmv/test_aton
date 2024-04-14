import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchClients as fetchClientsApi, updateClientStatus as updateClientStatusApi } from '../../services/api';
import { UpdateStatusParams } from './types';

interface Client {
    Id: number;
    accountNumber: string;
    surname: string;
    name: string;
    patronymic: string;
    birthDate: string;
    INN: string;
    responsibleFIO: string;
    status: string;
}

interface ClientsState {
    clients: Client[];
    loading: boolean;
    error: string | null;
}

const initialState: ClientsState = {
    clients: [],
    loading: false,
    error: null,
};

export const fetchClients = createAsyncThunk<Client[], void, { rejectValue: string }>(
    'clients/fetchClients',
    async (_, { rejectWithValue }) => {
        try {
            return await fetchClientsApi();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Unknown error");
        }
    }
);

export const updateClientStatus = createAsyncThunk<void, UpdateStatusParams, { rejectValue: string }>(
    'clients/updateClientStatus',
    async (params, { rejectWithValue }) => {
        try {
            await updateClientStatusApi(params);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Unknown error");
        }
    }
);


const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClients.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchClients.fulfilled, (state, action) => {
                state.clients = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchClients.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(updateClientStatus.fulfilled, (state, action) => {
                const index = state.clients.findIndex(client => client.Id === action.meta.arg.Id);
                if (index !== -1) {
                    state.clients[index].status = action.meta.arg.newStatus;
                }
            })
            .addCase(updateClientStatus.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});


export default clientSlice.reducer;