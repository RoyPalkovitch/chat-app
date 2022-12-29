import { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { IMessage, messages } from './messagesData';
import { mockUserDetails } from '../users/usersData';
export const mockMessages = Router();

mockMessages.get('/', (req: Request, res: Response) => {
  const mockMessagesWithNames: IMessage[] = messages.map((message: IMessage) => {
    const author = mockUserDetails.find(user => user.id === message.authorId);
    const authorName = author && author.name;
    return { ...message, authorName };
  });
  res.send(mockMessagesWithNames);
});

mockMessages.post('/', bodyParser.json(), (req: Request, res: Response) => {
  const newMessage: IMessage = req.body;
  newMessage.likes = [];
  newMessage.authorName = mockUserDetails.find(user => user.id === newMessage.authorId).name;
  messages.push(newMessage);
  res.sendStatus(200);
});

mockMessages.post('/like', bodyParser.json(), (req: Request, res: Response) => {
  const newMessage: {
    messageId: number,
    userId: number,
    like: boolean
  } = req.body;

  messages.forEach(message => {
    if (message.id === newMessage.messageId) {
      const userLiked = message.likes.indexOf(newMessage.userId);
      newMessage.like === false ? message.likes.push(newMessage.userId) : message.likes.splice(userLiked, 1);
    }
  });

  res.sendStatus(200);
});