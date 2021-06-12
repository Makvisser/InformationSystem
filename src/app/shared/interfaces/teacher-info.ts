import { UserMetadata } from './userMetadata';

export interface TeacherInfo extends UserMetadata {
  degree: string;
  departmentId: string;
  department?: { id?: string; name: string };
  middleName: string;
  name: string;
  surname: string;
  userId: string;
}
