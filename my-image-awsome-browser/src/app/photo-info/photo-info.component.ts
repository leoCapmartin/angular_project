import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Details } from '../details';

@Component({
  selector: 'app-photo-info',
  templateUrl: './photo-info.component.html',
  styleUrls: ['./photo-info.component.css']
})
export class PhotoInfoComponent {
  @Input()detail:Details =
  {
    author : "",
    date : "",
    position : ""
  }
  @Output() newItemEvent = new EventEmitter<string>();

  public closeWindow(){
    this.newItemEvent.emit("none")
  }

}
