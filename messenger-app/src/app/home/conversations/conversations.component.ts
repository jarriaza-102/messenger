import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'conversations',
  templateUrl: './conversations.component.html'
})
export class ConversationsComponent implements OnInit {
  conversations = [];

  constructor() { }

  ngOnInit() {
    this.conversations = [
      {
        img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
        name:  'Abner Juarez',
        message: 'Hola Mundo',
        sentOn: '9:04 PM',
        status: 1
      },
      {
        img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
        name:  'Abner Juarez 2',
        message: 'Hola Mundo X2',
        sentOn: '9:04 PM',
        status: 1
      },
      {
        img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
        name:  'Abner Juarez 3',
        message: 'Hola Mundo X3',
        sentOn: '9:04 PM',
        status: 1
      }
    ];
  }

}
