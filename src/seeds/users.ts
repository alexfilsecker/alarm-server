import { type User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const createUsersSeed = async (): Promise<User[]> => {
  const users = [
    {
      id: 1,
      username: 'Alex',
      password: await bcrypt.hash('123456', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return users;
};

export default createUsersSeed;
