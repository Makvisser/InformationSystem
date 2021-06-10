import { DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { SnapshotData } from '../interfaces/snapshot-data.interface';

export const snapshotDataConverter =
  (getRef = false) =>
  ({ payload }: DocumentChangeAction<any>): SnapshotData =>
    Object.assign(
      {
        id: payload.doc.id,
        ...payload.doc.data(),
      },
      getRef ? { ref: payload.doc.ref as DocumentReference } : {},
    );

export const dbConverter = (data: object, prevId = null): SnapshotData[] => {
  return Object.entries(data).map(([key, value]) => {
    const { children, ...val } = value;
    const customKey = `${prevId ? `${prevId}/` : ''}${key}`;
    return {
      id: customKey,
      ...val,
      ...(children ? { children: dbConverter(children, customKey) } : {}),
    };
  });
};
