import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-board-basic-button',
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.css']
})
export class BasicButtonComponent implements OnInit {
   @Input() text: string
   @Input() color: string

  constructor() { }

  ngOnInit(): void {
  }

}
