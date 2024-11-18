import { join } from 'path';
import { readFileSync } from 'fs';
import { catchLogger } from './utils';
import { Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

const data = JSON.parse(readFileSync(join(__dirname, 'json/body-parts.json'), 'utf-8'));

const BodyPartsData: Prisma.BodyPartCreateInput[] = [];

for (let index = 0; index < data.length; index++) {
  const bodyPart = data[index];
  BodyPartsData.push(bodyPart);
}

const BodyPartsDataSeeder = async (prisma: PrismaClient) => {
  let workspace = await prisma.workspace.findFirst({
    where: { key: '919f8041-8cfb-4cc3-bc2d-9b75119b9bf7' },
  });

  if (workspace) {
    console.log('');

    for (const bodyPart of BodyPartsData) {
      try {
        let result = await prisma.bodyPart.findFirst({
          where: { title: bodyPart.title },
        });

        if (result) {
          await prisma.bodyPart.update({
            where: { id: result.id },
            data: {
              title: bodyPart.title,
              media_url: bodyPart.media_url,
              description: bodyPart.description,
            },
          });

          Logger.debug(`Updated bodyPart by id: ${result.id}`, 'BodyPartsDataSeeder');
        } else {
          result = await prisma.bodyPart.create({
            data: {
              workspace_id: workspace.id,
              title: bodyPart.title,
              media_url: bodyPart.media_url,
              description: bodyPart.description,
            },
          });

          Logger.log(`Created bodyPart by title: ${result.title}`, 'BodyPartsDataSeeder');
        }
      } catch (error) {
        catchLogger(error, bodyPart.title);
      }
    }
  }
};

export default BodyPartsDataSeeder;
