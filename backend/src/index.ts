import express from 'express';
import bodyParser from 'body-parser';


import { userRouter } from './routes/UserRoute';
import { clientRouter } from './routes/ClientRoute';


import { dbSetup } from './database';


require('module-alias/register');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/clients', clientRouter);

// Инициализация базы данных и генерация данных
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

