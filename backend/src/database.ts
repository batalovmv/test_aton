import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

sqlite3.verbose();

export async function dbSetup() {
    const db = await open({
        filename: './mydb.sqlite',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS clients (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            lastName TEXT,
            firstName TEXT,
            middleName TEXT,
            birthDate TEXT,
            INN TEXT,
            responsibleFIO TEXT,
            status TEXT DEFAULT 'Не в работе'
        );

        CREATE TABLE IF NOT EXISTS users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT,
            login TEXT KEY,
            password TEXT
        );
    `);

    return db;
}

