import { Message } from '../types/message';

const endpoint = 'http://localhost:3003'; // todo: add endpoint (server) address (starting with http://)

type messagesType = {
  "authorId": number,
  "id": number,
  "body": string,
  "timestamp": number,
  "likes": number[]
};
/**
 * GET Request to get the list of messages
 **/
export async function getMessages() {
  // todo: replace this with fetch to get the messages from the server
  const request = await fetch(`${endpoint}/messages`);
  const mockMessages: messagesType[] = await request.json();

  return mockMessages;
}

/**
 * GET request to get the full list of users - id + name
 **/
export async function getUsers() {
  // todo: replace this with fetch to get the user list from the server
  const request = await fetch(`${endpoint}/users`);
  const mockUsers = await request.json();
  return mockUsers;
}


/**
 * GET request to get the full details of a user
 **/
export async function getUserDetails(userId: number) {
  // todo: replace this with fetch to get the user details from the server.
  //  For mocking example, we're calling an external JSON service.
  //  You can use mockUserDetails.ts for the list of user details in the server.
  const res = await fetch(`${endpoint}/users/${userId}`);
  const user = await res.json();
  return user;
}

/**
 * POST request to add a message. The message contains: id, body, timestamp, authorId
 **/
export async function addNewMessage(message: Message): Promise<boolean> {
  const res = await fetch(`${endpoint}/messages`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(message),
  });
  if (res.status === 200) {
    return true;
  }
  return false;
}

/**
 * POST request to change the user's like of a message
 **/
export async function changeMessageLikes(messageId: number, userId: number, like: boolean) {
  const message = {
    messageId,
    userId,
    like
  }
  const res = await fetch(`${endpoint}/messages/like`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(message),
  });
  return res.status;
}