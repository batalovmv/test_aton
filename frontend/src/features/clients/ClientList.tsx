import React, { useEffect } from 'react';
import { fetchClients, updateClientStatus } from './clientSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UpdateStatusParams } from './types';
import { Table, message } from 'antd';
import { getColumns } from './columns';

const ClientList: React.FC = () => {
    const clients = useAppSelector(state => state.clients.clients);
    const error = useAppSelector(state => state.clients.error);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchClients());
    }, []);
    useEffect(() => {
        if (error) {
            message.error(error); 
        }
    }, [error]);

    const handleStatusChange = (Id: number, newStatus: string) => {
        const params: UpdateStatusParams = { Id, newStatus };
        dispatch(updateClientStatus(params));
    };

    const columns = getColumns({ handleStatusChange });

    return <Table columns={columns} dataSource={clients} rowKey="Id" />;
};

export default ClientList;
