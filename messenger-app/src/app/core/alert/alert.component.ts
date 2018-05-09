import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input() list: string[] = [];
  @Input() type = 'danger';
}
