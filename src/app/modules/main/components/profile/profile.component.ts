import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { StudentInfo } from '../../../../shared/interfaces/student-info';
import { TeacherInfo } from '../../../../shared/interfaces/teacher-info';
import { PhotoService } from '../../../../shared/services/photo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private photoService: PhotoService) {}
  photo$;
  ngOnInit(): void {
    this.photo$ = this.photoService.getProfilePhoto(this.user.userId);
  }

  get user(): StudentInfo | TeacherInfo {
    return this.authService.currentUser.value || ({} as any);
  }
}
