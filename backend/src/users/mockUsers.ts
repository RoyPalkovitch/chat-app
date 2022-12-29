import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { mockUserDetails } from './usersData';

export const mockUsers = Router();


mockUsers.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = mockUserDetails.find(user => user.id === +id);
  res.send(user);
});

mockUsers.get('/', (req: Request, res: Response) => {

  const users = mockUserDetails.map(user => {
    return {
      'id': user['id'],
      'name': user['name']
    };
  });
  res.send(users);
});





