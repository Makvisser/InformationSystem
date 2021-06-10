import { SnapshotData } from './snapshot-data.interface';

export interface UserMetadata extends SnapshotData {
  login: string;
  password: string;
  isAdmin: boolean;
  role: 'student' | 'teacher';
}
