import express from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config'
import authRouter from './routes/authRoutes.js'
import { connectDatabase } from './config/db.js';
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(authRouter)

connectDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`server listening on ${PORT}`);
    })

}).catch(error => {
    console.error('Error connecting to database:', error);
    process.exit(1);
});