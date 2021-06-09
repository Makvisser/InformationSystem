import { UserMetadata } from './userMetadata';

export interface StudentInfo extends UserMetadata{
  id?: string;
  name: string;
  surname: string;
  middleName: string;
  course: string;
  speciality: string;
}
