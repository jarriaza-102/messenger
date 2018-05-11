import { Component, Input } from '@angular/core';

@Component({
  selector: 'messenger-base',
  templateUrl: './messenger-base.component.html'
})
export class MessengerBaseComponent {
  @Input() active: string = 'conversations';

}
