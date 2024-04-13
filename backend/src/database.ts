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
            accountId INTEGER PRIMARY KEY,
            lastName TEXT,
            firstName TEXT,
            middleName TEXT,
            birthDate TEXT,
            INN TEXT,
            responsibleFIO TEXT,
            status TEXT DEFAULT 'Не в работе'
        );

        CREATE TABLE IF NOT EXISTS users (
            fullName TEXT,
            login TEXT PRIMARY KEY,
            password TEXT
        );
    `);

    return db;
}

