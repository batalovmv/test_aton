export interface UpdateStatusParams {
    Id: number;
    newStatus: string;
}

export interface Client {
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

export interface ClientsState {
    clients: Client[];
    loading: boolean;
    error: string | null;
}
