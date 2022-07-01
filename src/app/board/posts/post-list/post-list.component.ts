import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'admin-board-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor() {}

  ngOnInit(): void {
    this.posts = [
      {
        id: '0',
        date: 1656611159072,
        title: 'laboris ut laboris consectetur duis',
        content:
          'Minim sit tempor incididunt ullamco eiusmod fugiat magna sit nostrud ut est eu. Ex in aliqua cupidatat dolor commodo. Dolor do elit quis voluptate tempor ullamco ipsum velit. Dolor magna labore ad nostrud cillum ea duis cillum esse tempor dolor adipisicing consequat adipisicing. Cupidatat aute incididunt magna commodo enim duis nulla voluptate qui occaecat irure. Consectetur et mollit fugiat proident magna in adipisicing. Laborum est aliquip minim dolore.\r\n',
        imgUrl:
          'https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '1',
        date: 1656611159072,
        title: 'proident aute aute culpa eu',
        content:
          'Velit duis eu pariatur officia ipsum nisi voluptate sunt qui. Id ullamco sunt exercitation ea occaecat laboris deserunt. Adipisicing et esse ad adipisicing velit officia consectetur et. In Lorem enim non amet aute non reprehenderit. Amet elit velit cupidatat Lorem non duis eiusmod excepteur nisi magna dolor. Sit sint id elit aute sunt et ex occaecat tempor. In nulla anim elit ut occaecat nulla labore cillum ipsum commodo et occaecat aute esse.\r\n',
        imgUrl:
          'https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '2',
        date: 1656611159072,
        title: 'enim eu velit nisi laboris',
        content:
          'Velit aliquip magna enim consequat nisi do. Do dolore esse ut aliquip consequat elit anim magna quis amet laboris aute. Aliquip quis dolor voluptate incididunt sint anim exercitation. Nisi cillum velit et ullamco consequat ad sint in. Id amet irure consectetur ullamco dolor id voluptate esse do cupidatat minim aliquip. Fugiat et sint adipisicing dolore adipisicing minim ea ea et laboris.\r\n',
        imgUrl:
          'https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '3',
        date: 1656611159072,
        title: 'et commodo qui velit commodo',
        content:
          'Amet veniam incididunt velit occaecat id non eiusmod ad. Cillum anim velit in quis ipsum irure velit Lorem mollit non. Cillum eu aliquip enim laborum eiusmod ullamco reprehenderit esse magna mollit est. Eu aliquip deserunt dolore sunt sunt. Voluptate nulla quis Lorem dolor excepteur nostrud dolore. Non cupidatat occaecat enim sunt nulla ad eu tempor. Ipsum pariatur sit occaecat incididunt nisi.\r\n',
        imgUrl:
          'https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '4',
        date: 1656611159072,
        title: 'dolore veniam elit commodo labore',
        content:
          'Ullamco ullamco exercitation occaecat consequat consectetur commodo ipsum eu. Nisi in sunt nulla irure proident id ullamco excepteur et. Id duis ad consectetur nostrud mollit enim deserunt irure duis veniam excepteur Lorem nostrud. Deserunt consectetur tempor ea laboris et velit labore aliqua. Mollit officia cupidatat culpa non ea pariatur nulla in proident elit aliquip aliqua ad adipisicing.\r\n',
        imgUrl:
          'https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      },
      {
        id: '5',
        date: 1656611159072,
        title: 'consectetur enim culpa eiusmod consequat',
        content:
          'Et mollit non enim velit. Veniam do dolor tempor excepteur nisi exercitation eiusmod labore commodo. Adipisicing esse qui duis eu magna id aliqua ad duis ad ad dolor.\r\n',
        imgUrl:
          'https://images.unsplash.com/photo-1546074177-ffdda98d214f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8YmxvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      },
    ];
  }
}
