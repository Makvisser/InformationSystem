import { SnapshotData } from './snapshot-data.interface';

export interface Task extends SnapshotData {
  description: string;
  teacherId: string;
}
