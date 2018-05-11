import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'groups',
  templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.group = [
      {
        img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
        name:  'Super Group',
        message: 'Hola Mundo',
        sentOn: '9:04 PM',
        status: 1
      },
      {
        img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
        name:  'Super Group 2',
        message: 'Hola Mundo X2',
        sentOn: '9:04 PM',
        status: 1
      },
      {
        img: 'data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==',
        name:  'Super Group 3',
        message: 'Hola Mundo X3',
        sentOn: '9:04 PM',
        status: 1
      }
    ]
  }

}
