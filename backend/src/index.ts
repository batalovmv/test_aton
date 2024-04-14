import express from 'express';
import bodyParser from 'body-parser';


import { userRouter } from './routes/UserRoute';
import { clientRouter } from './routes/ClientRoute';


import { dbSetup } from './database';
import session from 'express-session';
import cors from 'cors';

require('module-alias/register');
const app = express();
const port = 3000;
declare module 'express-session' {
    interface SessionData {
        user?: { fullName: string; Id: number };
    }
}
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true 
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'qerrty1123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use('/users', userRouter);
app.use('/clients', clientRouter);

// Инициализация базы данных 
async function initializeDatabase() {
    const db = await dbSetup();
    app.locals.db = db
}

initializeDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch(error => {
    console.error("Failed to initialize database:", error);
});

