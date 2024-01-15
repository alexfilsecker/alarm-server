import { type Prisma } from '@prisma/client';

import { hashPassword } from '../../src/utils/auth';

const usersSeed = async (): Promise<Prisma.UserCreateManyInput[]> => {
  const users: Prisma.UserCreateManyInput[] = [
    {
      id: 1,
      username: 'Alex',
      password: await hashPassword('123456'),
    },
  ];

  return users;
};

export default usersSeed;
