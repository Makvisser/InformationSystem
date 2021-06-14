import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { MessagesService } from '../../../../shared/services/messages.service';
import { Chat } from '../../../../shared/interfaces/chat';
import { Observable } from 'rxjs';
import { StudentInfo } from '../../../../shared/interfaces/student-info';
import { TeacherInfo } from '../../../../shared/interfaces/teacher-info';
import { PhotoService } from '../../../../shared/services/photo.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserMetadata } from '../../../../shared/interfaces/userMetadata';
import { Router } from '@angular/router';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private messagesService: MessagesService,
    private photoService: PhotoService,
    private router: Router,
  ) {}

  messages$: Observable<Chat[]>;
  ngOnInit(): void {
    this.messages$ = this.messagesService
      .getMessagesByUserId(this.user.userId)
      .pipe(tap((data) => console.log(data)));
  }

  get user(): StudentInfo | TeacherInfo {
    return this.authService.currentUser.value;
  }

  openChat(event: MatSelectionListChange): void {
    this.router.navigateByUrl(`${this.router.url}/${event.options[0].value}`).then();
  }
}
