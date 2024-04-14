export interface UpdateStatusParams {
    Id: number;
    newStatus: string;
}

export interface Client {
    Id: number;
    accountNumber: string;
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    INN: string;
    responsibleFIO: string;
    status: string;
}

export interface ClientsState {
    clients: Client[];
    loading: boolean;
    error: string | null;
}
