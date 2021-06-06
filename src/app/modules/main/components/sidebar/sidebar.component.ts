import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuOptions: { title: string; link: string }[] = [
    { title: 'Профиль', link: 'profile' },
    { title: 'Сообщения', link: 'messages' },
    { title: 'Проекты', link: 'projects' },
    { title: 'Расписание', link: 'schedule' },
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo({ option }: MatSelectionListChange): void {
    this.router.navigate(['main', option.value]).then();
  }
}
