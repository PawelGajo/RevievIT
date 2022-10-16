import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../components/main-layout/navigation/navigation.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  template: `
    <app-navigation>
      <div main-content>Main content</div>
      <div rightnav-content>Rightnav content</div>
    </app-navigation>
  `,
  styles: [],
})
export class PostListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
