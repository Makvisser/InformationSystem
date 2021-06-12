import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { Project } from '../../../../shared/interfaces/project';
import { WorkService } from '../../../../shared/services/work.service';
import { from, Observable } from 'rxjs';
import { concatAll, concatMap, map, mergeMap, switchMap, take, tap, toArray } from 'rxjs/operators';
import { StudentInfo } from '../../../../shared/interfaces/student-info';
import { TeacherInfo } from '../../../../shared/interfaces/teacher-info';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent implements OnInit {
  @Input() project: Project;
  statusForm: FormGroup;
  constructor(private authService: AuthService, private workService: WorkService) {}
  students: StudentInfo[] = [];
  teacher: TeacherInfo = null;

  ngOnInit(): void {
    this.statusForm = new FormGroup({
      title: new FormControl(this.project.title.value, Validators.required),
      technologies: new FormControl(this.project.technologies.value, Validators.required),
    });
    from(this.project.studentId)
      .pipe(
        mergeMap(
          (v) => this.authService.getUserByRoleAndId(v, 'student') as Observable<StudentInfo>,
        ),
        take(this.project.studentId.length),
        toArray(),
      )
      .subscribe((data) => (this.students = data));
    this.authService
      .getUserByRoleAndId(this.project.teacherId, 'teacher')
      .subscribe((data: TeacherInfo) => (this.teacher = data));
  }

  getControl(name: string) {
    return this.statusForm.get(name);
  }

  get user() {
    return this.authService.currentUser.value;
  }

  stepIsCompleted(name: string): boolean {
    return this.project[name].completed;
  }

  updateValue(field: string) {
    const newProjectData: Project = {
      ...this.project,
      [field]: { value: this.getControl(field).value, completed: this.project[field].completed },
    };
    this.project = newProjectData;
    this.workService.updateProject(newProjectData);
  }

  approveStep(field: string) {
    const newProjectData: Project = {
      ...this.project,
      [field]: { value: this.project[field].value, completed: true },
    };
    this.project = newProjectData;
    this.workService.updateProject(newProjectData);
  }

  completeProject() {
    const newProjectData: Project = {
      ...this.project,
      isDone: true,
    };
    this.project = newProjectData;
    this.workService.updateProject(newProjectData);
  }

  get selected(): number {
    const { title, technology, practice, theory, isDone } = this.project;
    switch (true) {
      case title.completed:
        return 1;
      case technology.completed:
        return 2;
      case practice.completed:
        return 3;
      case theory.completed || isDone:
        return 4;
      default:
        return 0;
    }
  }

  get isEditable(): boolean {
    return this.user.role === 'teacher';
  }
}
