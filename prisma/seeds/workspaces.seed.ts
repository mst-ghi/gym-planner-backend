import { join } from 'path';
import { readFileSync } from 'fs';
import { catchLogger } from './utils';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const data = JSON.parse(readFileSync(join(__dirname, 'json/workspaces.json'), 'utf-8'));

const WorkspacesData: {
  key: string;
  title: string;
  status: string;
  teams: { user_mobile: string; role: string; selected: boolean }[];
}[] = [];

for (let index = 0; index < data.length; index++) {
  const workspace = data[index];
  WorkspacesData.push(workspace);
}

const WorkspacesDataSeeder = async (prisma: PrismaClient) => {
  console.log('');

  for (const workspace of WorkspacesData) {
    try {
      let result = await prisma.workspace.findFirst({
        where: { key: workspace.key },
      });

      if (result) {
        await prisma.workspace.update({
          where: { key: workspace.key },
          data: {
            title: workspace.title,
            status: workspace.status,
          },
        });
        Logger.debug(`Updated workspace by key: ${result.key}`, 'WorkspacesDataSeeder');
      } else {
        result = await prisma.workspace.create({
          data: {
            key: workspace.key,
            title: workspace.title,
            status: workspace.status,
          },
        });
        Logger.log(`Created workspace by key: ${result.key}`, 'WorkspacesDataSeeder');
      }

      if (workspace.teams) {
        for (const team of workspace.teams) {
          const user = await prisma.user.findFirst({ where: { mobile: team.user_mobile } });

          if (user) {
            let t = await prisma.team.findFirst({
              where: {
                user_id: user.id,
                workspace_id: result.id,
              },
            });

            if (t) {
              await prisma.team.update({
                where: { id: t.id },
                data: { role: team.role, selected: team.selected },
              });
            } else {
              await prisma.team.create({
                data: {
                  workspace_id: result.id,
                  user_id: user.id,
                  role: team.role,
                  selected: team.selected,
                },
              });
            }
          }
        }

        Logger.debug(`Synced workspace's teams by key: ${result.key}`, 'WorkspacesDataSeeder');
      }
    } catch (error) {
      catchLogger(error, workspace.key);
    }
  }
};

export default WorkspacesDataSeeder;
