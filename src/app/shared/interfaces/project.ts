import { SnapshotData } from './snapshot-data.interface';

type state = { value: string; completed: boolean };
export interface Project extends SnapshotData {
  title: state;
  technologies: state;
  practice: state;
  theory: state;
  isDone: boolean;
  teacherId: string;
  studentId: string[];
}
