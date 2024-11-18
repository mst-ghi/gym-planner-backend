import { User, Workspace, Team, WorkoutProgram } from '@prisma/client';

declare global {
  type IDays = 'saturday' | 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday';
  type IGender = 'male' | 'female' | 'other';

  interface IUser extends User {}
  interface ITeam extends Team{}
  interface IWorkspace extends Workspace {}
  interface IWorkoutProgram extends WorkoutProgram {}
}
