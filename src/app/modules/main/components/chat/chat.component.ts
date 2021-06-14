import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  chatId: string;
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.chatId = params['id']));
  }
}
