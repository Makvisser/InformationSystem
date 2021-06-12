import { Component, Input, OnInit } from '@angular/core';
import { SnapshotData } from '../../../../shared/interfaces/snapshot-data.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../../shared/services/auth.service';
import { WorkService } from '../../../../shared/services/work.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-start-work-dialog',
  templateUrl: './start-work-dialog.component.html',
  styleUrls: ['./start-work-dialog.component.scss'],
})
export class StartWorkDialogComponent {
  @Input() node: SnapshotData;
  constructor(
    private dialogRef: MatDialogRef<StartWorkDialogComponent>,
    private authService: AuthService,
    private workService: WorkService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOk(): void {
    const teacherId = this.node.id.substring(this.node.id.lastIndexOf('/') + 1);
    const studentId = this.authService.currentUser.value.id;
    this.workService
      .createNewWork(teacherId, studentId)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.onNoClick());
  }
}
