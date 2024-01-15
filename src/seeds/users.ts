import { type User } from '@prisma/client';

import { hashPassword } from '../utils/auth';

const createUsersSeed = async (): Promise<User[]> => {
  const users = [
    {
      id: 1,
      username: 'Alex',
      password: await hashPassword('123456'),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return users;
};

export default createUsersSeed;
