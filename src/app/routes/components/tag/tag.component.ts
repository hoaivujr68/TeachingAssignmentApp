import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
type ModeTag = 'closeable' | 'default' | 'checkable';
type Color =
  | 'disable'
  | 'active'
  | 'inActive'
  | 'link'
  | 'linkExpired'
  | 'emptyPackage'
  | 'newPackage'
  | 'fulledPackage'
  | 'drafting'
  | 'processing'
  | 'processed'
  | 'fail'
  | 'starting'
  | 'success'
  | 'edit'
  | 'failed'
  | 'soonOutOfDate'
  | 'outOfDate'
  | 'gold'
  | 'undefined'
  | 'done'
  | 'denied'
  | 'custom'
  | 'lightBlue'
  | 'darkBlue'
  | 'cyan'
  | 'outOfDateNotGiveBack';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit, OnChanges {
  @Input() color: Color = 'active';
  @Input() mode: ModeTag = 'default';
  @Input() colorCode = '';
  @Input() isUsingColorCode: boolean = false;
  @Input() isChecked = false;
  @Input() hasBorderRadius = false;
  @Input() tagClass = '';
  @Input() isClickable = false;
  @Input() width = '';
  @Input() maxWidth = '';
  @Output() onClose = new EventEmitter<MouseEvent>();
  @Output() onCheckedChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.color && changes.color.currentValue) {
      this.color = changes.color.currentValue;
      if (!this.isUsingColorCode) this.changeColor();
    }
  }

  ngOnInit(): any {
    if (!this.isUsingColorCode) this.changeColor();
  }

  changeColor() {
    switch (this.color) {
      case 'active':
        this.colorCode = '#2780e3';
        break;
      case 'inActive':
        this.colorCode = '#E0E0E0';
        break;
      case 'link':
        this.colorCode = 'green';
        break;
      case 'linkExpired':
        this.colorCode = 'red';
        break;
      case 'emptyPackage':
        this.colorCode = '#2780e3';
        break;
      case 'newPackage':
        this.colorCode = '#CDCDCD';
        break;
      case 'fulledPackage':
        this.colorCode = '#f1c40f';
        break;
      case 'starting':
        this.colorCode = '#CDCDCD';
        break;
      case 'processing':
        this.colorCode = 'orange';
        break;
      case 'processed':
        this.colorCode = 'blue';
        break;
      case 'success':
        this.colorCode = 'green';
        break;
      case 'fail':
        this.colorCode = 'purple';
        break;
      case 'edit':
        this.colorCode = '#2780e3';
        break;
      case 'failed':
        this.colorCode = '#e6e8ea';
        break;
      case 'soonOutOfDate':
        this.colorCode = '#faa30c';
        break;
      case 'outOfDate':
        this.colorCode = '#ff1900';
        break;
      case 'done':
        this.colorCode = '#87d068';
        break;
      case 'disable':
        this.colorCode = '#b3b5b4';
        break;
      case 'gold':
        this.colorCode = 'gold';
        break;
      case 'undefined':
        this.colorCode = '#66615b';
        break;
      case 'lightBlue':
        this.colorCode = 'rgb(62 140 213)';
        break;
      case 'cyan':
        this.colorCode = 'cyan';
        break;
      case 'darkBlue':
        this.colorCode = '#4FAAA5';
        break;
      case 'custom':
        break;
      default:
        this.colorCode = 'default';
        break;
    }
  }

  handleOnClose(event: MouseEvent): any {
    this.onClose.emit(event);
  }

  handleCheckedChange(event: boolean): any {
    this.onCheckedChange.emit(event);
  }
}
