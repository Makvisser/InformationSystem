import { UserMetadata } from './userMetadata';

export interface TeacherInfo extends UserMetadata {
  degree: string;
  departmentId: string;
  middlename: string;
  name: string;
  surname: string;
  userId: string;
}
