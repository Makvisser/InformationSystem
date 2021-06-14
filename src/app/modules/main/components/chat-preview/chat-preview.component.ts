import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { UserMetadata } from '../../../../shared/interfaces/userMetadata';
import { StudentInfo } from '../../../../shared/interfaces/student-info';
import { TeacherInfo } from '../../../../shared/interfaces/teacher-info';
import { AuthService } from '../../../../shared/services/auth.service';
import { PhotoService } from '../../../../shared/services/photo.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-chat-preview',
  templateUrl: './chat-preview.component.html',
  styleUrls: ['./chat-preview.component.scss'],
})
export class ChatPreviewComponent implements OnInit {
  @Input() users: string[];
  constructor(private authService: AuthService, private photoService: PhotoService) {}
  photo$: Observable<string>;
  recipientName$: Observable<string>;

  ngOnInit(): void {
    this.photo$ = this.photoService
      .getProfilePhoto(this.getRecipient(this.users))
      .pipe(untilDestroyed(this));
    this.recipientName$ = this.authService.getUserById(this.getRecipient(this.users)).pipe(
      switchMap(({ id, role }: UserMetadata) => this.authService.getKnownUserByRoleAndId(id, role)),
      map(
        ({ name, surname, middleName }: StudentInfo | TeacherInfo) =>
          `${surname} ${name} ${middleName}`,
      ),
      untilDestroyed(this),
    );
  }

  get user(): StudentInfo | TeacherInfo {
    return this.authService.currentUser.value;
  }
  getRecipient(users: string[]) {
    return users.find((val) => val !== this.user.userId);
  }
}
