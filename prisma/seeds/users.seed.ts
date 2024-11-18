import { join } from 'path';
import { readFileSync } from 'fs';
import { Logger } from '@nestjs/common';
import { catchLogger, stringToHash } from './utils';
import { PrismaClient, Prisma } from '@prisma/client';

const data = JSON.parse(readFileSync(join(__dirname, 'json/users.json'), 'utf-8'));

const UsersData: Prisma.UserCreateInput[] = [];

for (let index = 0; index < data.length; index++) {
  const user = data[index];
  UsersData.push(user);
}

const UsersDataSeeder = async (prisma: PrismaClient) => {
  console.log('');

  for (const user of UsersData) {
    try {
      let result = await prisma.user.findFirst({
        where: { mobile: user.mobile },
      });

      if (result) {
        await prisma.user.update({
          where: { mobile: user.mobile },
          data: {
            email: user.email,
            national_code: user.national_code,
            fullname: user.fullname,
            verify_email: user.verify_email,
            kind: user.kind,
            status: user.status,
            password: stringToHash(user.password || '12345678'),
          },
        });

        Logger.debug(`Updated user by mobile: ${result.mobile}`, 'UsersDataSeeder');
      } else {
        result = await prisma.user.create({
          data: {
            mobile: user.mobile,
            email: user.email,
            national_code: user.national_code,
            fullname: user.fullname,
            verify_email: user.verify_email,
            kind: user.kind,
            status: user.status,
            password: stringToHash(user.password || '12345678'),
          },
        });

        Logger.log(`Created user by mobile: ${result.mobile}`, 'UsersDataSeeder');
      }

      if (user.profile) {
        await prisma.profile.upsert({
          where: { user_id: result.id },
          create: {
            user_id: result.id,
            ...user.profile,
          },
          update: user.profile as any,
        });

        Logger.debug(`Updated profile by mobile: ${result.mobile}`, 'UsersDataSeeder');
      }
    } catch (error) {
      catchLogger(error, user.mobile);
    }
  }
};

export default UsersDataSeeder;
