import { Component, OnInit } from '@angular/core';
import { SpecialitiesService } from '../../../../shared/services/specialities.service';
import { Observable } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SnapshotData } from '../../../../shared/interfaces/snapshot-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { StartWorkDialogComponent } from '../start-work-dialog/start-work-dialog.component';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent implements OnInit {
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node?.children && node?.children?.length > 0,
      name: node?.name,
      level: level,
      ...node,
    };
  };

  treeControl = new FlatTreeControl<any>(
    (node) => node.level,
    (node) => node.expandable,
  );

  private treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node?.level,
    (node) => node?.expandable,
    (node) => node?.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: any) => node.expandable;

  constructor(
    private specialitiesService: SpecialitiesService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const { role } = this.authService.currentUser.value;
    if (role === 'teacher') {
      this.router.navigate(['main', 'schedule']).then();
    } else {
      this.specialitiesService
        .getSpecialities()
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          this.dataSource.data = data;
        });
    }
  }

  click(node: SnapshotData) {
    const dialogRef = this.dialog.open(StartWorkDialogComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.node = node;
  }
}
