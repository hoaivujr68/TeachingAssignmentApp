import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-footer-table',
  templateUrl: './footer-table.component.html',
  styleUrls: ['./footer-table.component.scss'],
})
export class FooterTableComponent {
  @Input() page: number = 1;
  @Input() size: number = 20;
  @Input() total: number = 0;
  @Output() onPageIndexChange = new EventEmitter();
  constructor() {}

  nzPageIndexChange(ev: any) {
    this.onPageIndexChange.emit(ev);
  }
}
