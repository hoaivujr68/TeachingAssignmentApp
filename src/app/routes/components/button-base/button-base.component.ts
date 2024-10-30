import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-button-base',
  templateUrl: './button-base.component.html',
  styleUrls: ['./button-base.component.scss']
})
export class ButtonBaseComponent implements OnInit, AfterViewInit {
  @Input() rights: string[] = [];
  @Input() buttonType = 'primary';
  @Input() size = 'default';
  @Input() danger: boolean = false;
  @Input() buttonClass = 'mr-2 color-button custom-boder';
  @Input() iconSource: string = 'fontAwesome';
  @Input() iconType = 'question';
  @Input() iconTheme = 'outline';
  @Input() disabled = false;
  @Input() buttonShape = '';
  @Input() iconClass = '';
  @Input() iconSpin = false;
  @Input() iconFont = '';
  @Input() iconRotate = 0;
  @Input() loading = false;
  @Input() popConfirm = false;
  @Input() titleTooltip: string = '';
  @Input() tooltipPlacement: string = 'bottom';
  @Input() popconfirmPlacement: string = 'top';
  @Input() isShowTooltip: boolean = false;
  @Input() iconPosition: string = 'left';
  @Input() isShowBtn: boolean = true;
  @Output() onClick = new EventEmitter();

  constructor(protected cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.markForCheck();
  }

  ngOnInit(): any {}

  handleClick(): any {
    this.onClick.emit();
  }
}
