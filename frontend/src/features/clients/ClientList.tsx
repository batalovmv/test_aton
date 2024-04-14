import React, { useEffect } from 'react';
import { fetchClients, updateClientStatus } from './clientSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UpdateStatusParams } from './types';

const ClientList: React.FC = () => {
    const clients = useAppSelector(state => state.clients.clients);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchClients());
    }, []);

    const handleStatusChange = (Id: number, newStatus: string) => {
        const params: UpdateStatusParams = { Id, newStatus };
        dispatch(updateClientStatus(params));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Номер счета</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Дата рождения</th>
                    <th>ИНН</th>
                    <th>ФИО ответственного</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {clients.map(client => (
                    <tr key={client.Id}>
                        <td>{client.accountNumber}</td>
                        <td>{client.surname}</td>
                        <td>{client.name}</td>
                        <td>{client.patronymic}</td>
                        <td>{client.birthDate}</td>
                        <td>{client.INN}</td>
                        <td>{client.responsibleFIO}</td>
                        <td>{client.status}</td>
                        <td>
                            <select value={client.status} onChange={(e) => handleStatusChange(client.Id, e.target.value)}>
                                <option value="Не в работе">Не в работе</option>
                                <option value="В работе">В работе</option>
                                <option value="Отказ">Отказ</option>
                                <option value="Сделка закрыта">Сделка закрыта</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ClientList;
