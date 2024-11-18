import { join } from 'path';
import { readFileSync } from 'fs';
import { catchLogger } from './utils';
import { Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

const data = JSON.parse(readFileSync(join(__dirname, 'json/equipments.json'), 'utf-8'));

const EquipmentsData: Prisma.EquipmentCreateInput[] = [];

for (let index = 0; index < data.length; index++) {
  const equipment = data[index];
  EquipmentsData.push(equipment);
}

const EquipmentsDataSeeder = async (prisma: PrismaClient) => {
  let workspace = await prisma.workspace.findFirst({
    where: { key: '919f8041-8cfb-4cc3-bc2d-9b75119b9bf7' },
  });

  if (workspace) {
    console.log('');

    for (const equipment of EquipmentsData) {
      try {
        let result = await prisma.equipment.findFirst({
          where: { title: equipment.title },
        });

        if (result) {
          await prisma.equipment.update({
            where: { id: result.id },
            data: {
              title: equipment.title,
              media_url: equipment.media_url,
              description: equipment.description,
            },
          });

          Logger.debug(`Updated equipment by id: ${result.id}`, 'EquipmentsDataSeeder');
        } else {
          result = await prisma.equipment.create({
            data: {
              workspace_id: workspace.id,
              title: equipment.title,
              media_url: equipment.media_url,
              description: equipment.description,
            },
          });

          Logger.log(`Created equipment by title: ${result.title}`, 'EquipmentsDataSeeder');
        }
      } catch (error) {
        catchLogger(error, equipment.title);
      }
    }
  }
};

export default EquipmentsDataSeeder;
