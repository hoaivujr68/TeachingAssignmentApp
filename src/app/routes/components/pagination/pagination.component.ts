import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements ControlValueAccessor {
  @Input() pageSize!: number;
  @Input() pageIndex!: number;
  @Input() total!: number;
  @Input() size: string = 'small';
  @Output() pageIndexChange = new EventEmitter();

  constructor(@Optional() @Self() public ngControl: NgControl, private cdr: ChangeDetectorRef) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
      this.cdr.detectChanges();
    }
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
  nzPageIndexChange(value: any): void {
    this.pageIndexChange.emit(value);
    this.cdr.detectChanges();
  }
}
