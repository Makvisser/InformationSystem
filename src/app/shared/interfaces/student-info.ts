import { UserMetadata } from './userMetadata';

export interface StudentInfo extends UserMetadata{
  name: string;
  surname: string;
  middleName: string;
  course: string;
  speciality: string;
}
