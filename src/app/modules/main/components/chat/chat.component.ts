import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../../../../shared/services/messages.service';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Chat } from '../../../../shared/interfaces/chat';
import { AuthService } from '../../../../shared/services/auth.service';
import { StudentInfo } from '../../../../shared/interfaces/student-info';
import { TeacherInfo } from '../../../../shared/interfaces/teacher-info';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as moment from 'moment';

@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('element') elementRef: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}
  chatId: string;
  chat: Chat;
  form: FormGroup;
  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          this.chatId = params['id'];
          return this.messagesService.getMessagesByChatId(this.chatId);
        }),
        untilDestroyed(this),
      )
      .subscribe((data) => {
        this.chat = data;
      });
    this.form = new FormGroup({
      value: new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewChecked() {
    this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
    this.cdr.detectChanges();
  }

  get user(): StudentInfo | TeacherInfo {
    return this.authService.currentUser.value;
  }

  covertToMoment(date: Date): moment.Moment {
    return moment(date);
  }

  newMessage() {
    this.form.markAllAsTouched();
    this.form.valid &&
      this.messagesService.createMessage(
        this.chat.messages,
        this.chat.id,
        this.user.userId,
        this.form.get('value').value,
      );
    this.form.reset();
  }
}
