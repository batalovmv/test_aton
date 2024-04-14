import React from 'react';
import { Select } from 'antd';
import { Client } from './types'; 

const { Option } = Select;

interface ColumnProps {
    handleStatusChange: (id: number, newStatus: string) => void;
}

export const getColumns = ({ handleStatusChange }: ColumnProps) => [
    {
        title: 'Номер счета',
        dataIndex: 'Id',
        key: 'Id',
    },
    {
        title: 'Фамилия',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Имя',
        dataIndex: 'firstName',
        key: 'firstName',
    },
    {
        title: 'Отчество',
        dataIndex: 'middleName',
        key: 'middleName',
    },
    {
        title: 'Дата рождения',
        dataIndex: 'birthDate',
        key: 'birthDate',
    },
    {
        title: 'ИНН',
        dataIndex: 'INN',
        key: 'INN',
    },
    {
        title: 'ФИО ответственного',
        dataIndex: 'responsibleFIO',
        key: 'responsibleFIO',
    },
    {
        title: 'Статус',
        key: 'status',
        dataIndex: 'status',
        render: (text: string, record: Client) => (
            <Select defaultValue={text} style={{ width: 120 }} onChange={(newStatus) => handleStatusChange(record.Id, newStatus)}>
                <Option value="В работе">В работе</Option>
                <Option value="Отказ">Отказ</Option>
                <Option value="Сделка закрыта">Сделка закрыта</Option>
            </Select>
        ),
    }
];