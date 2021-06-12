import { Component, OnInit } from '@angular/core';
import { WorkService } from '../../../../shared/services/work.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { concatAll, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { TeacherInfo } from '../../../../shared/interfaces/teacher-info';
import { StudentInfo } from '../../../../shared/interfaces/student-info';
import { Project } from '../../../../shared/interfaces/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  constructor(private workService: WorkService, private authService: AuthService) {}
  projects$: Observable<Project[]>;
  ngOnInit(): void {
    const { id, role } = this.authService.currentUser.value;
    this.projects$ = this.workService.getWorksById(id, role);
  }
}
