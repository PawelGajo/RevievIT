import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../components/main-layout/navigation/navigation.component';
import { PostListComponent } from '../../components/post/post-list/post-list.component';
import { Post } from '../../components/post/models/post';

@Component({
  selector: 'app-post-list-container',
  standalone: true,
  imports: [CommonModule, NavigationComponent, PostListComponent],
  template: `
    <app-navigation>
      <div main-content><app-post-list [posts]="posts"></app-post-list></div>
      <div rightnav-content>Rightnav content</div>
    </app-navigation>
  `,
  styles: [],
})
export class PostListContainerComponent implements OnInit {
  posts: Post[] = [
    {
      id: 1,
      answers: 2,
      categories: [
        {
          id: 1,
          name: 'Code quality',
        },
        {
          id: 2,
          name: 'Design',
        },
        {
          id: 3,
          name: 'Performance',
        },
      ],
      created: '02.12.2020',
      has_top_answer: true,
      description: 'Lorem test impsum test',
      author: {
        id: 1,
        username: 'Jan Kowalski',
        reputation: 1200,
        avatar_link:
          'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Round&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerSweater&eyeType=WinkWacky&eyebrowType=AngryNatural&mouthType=Concerned&skinColor=Yellow',
      },
      author_last_activity: {
        author: {
          id: 1,
          username: 'Jan Kowalski',
          reputation: 1200,
          avatar_link:
            'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Round&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerSweater&eyeType=WinkWacky&eyebrowType=AngryNatural&mouthType=Concerned&skinColor=Yellow',
        },
        created: '02.14.2022',
        type: 'answered',
      },
      post_last_activity: {
        author: {
          id: 1,
          username: 'Jan Kowalski',
          reputation: 1200,
          avatar_link:
            'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Round&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerSweater&eyeType=WinkWacky&eyebrowType=AngryNatural&mouthType=Concerned&skinColor=Yellow',
        },
        created: '02.14.2022',
        type: 'answered',
      },
      rank: 4.2,
      title: 'My new special Project',
      visits: 2,
      page_url: 'www.google.com',
      repo_url: 'www.github.com',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
