import express from 'express';
import cors from 'cors';
import { mockMessages } from './messages/mockMessages';
import { mockUsers } from './users/mockUsers';


const app = express();

app.use(cors());
app.use('/messages', mockMessages);
app.use('/users', mockUsers);

export default app;