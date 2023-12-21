import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  show:boolean=false;

  @Input() msg:any;
  constructor(public commonServie:CommonService) { }

  ngOnInit(): void {
  }

}
