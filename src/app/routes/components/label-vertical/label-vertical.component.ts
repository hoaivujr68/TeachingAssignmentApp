import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-vertical',
  templateUrl: './label-vertical.component.html',
  styleUrls: ['./label-vertical.component.scss'],
})
export class LabelVerticalComponent implements OnInit {
  @Input() required = false;
  @Input() noColon = true;
  @Input() content = '';
  @Input() classLabel = '';
  @Input() for = '';
  constructor() {}

  ngOnInit(): any {}
}
