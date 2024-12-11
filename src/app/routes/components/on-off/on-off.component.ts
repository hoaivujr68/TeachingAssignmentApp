import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy, Optional, Self, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
type Color = 'active' | 'inActive';
@Component({
  selector: 'app-on-off',
  templateUrl: './on-off.component.html',
  styleUrls: ['./on-off.component.scss'],
})
export class OnOffComponent implements ControlValueAccessor, OnInit {
  @Input() hideLabel = false;
  @Input() labelContent!: string;
  @Input() labelHorizontal = false;
  @Input() span = 16;
  @Input() classLabel!: string;
  @Input() classInput: string = 'mt-1';
  @Input() required = false;
  @Input() dataOnOff = new OnOffModel();
  @Input() disable = false;
  @Input() type = 'switch'; // 'switch' or 'checkbox' //
  @Output() onChange = new EventEmitter<boolean>();

  colorCodeOn = '';
  colorCodeOff = '';

  constructor(@Optional() @Self() public ngControl: NgControl, protected cdr: ChangeDetectorRef) {
    if (this.ngControl != null) this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any) {}
  registerOnChange(fn: any) {}
  registerOnTouched(fn: any) {}
  setDisabledState?(isDisabled: boolean) {}

  ngOnInit(): any {
    if (this.dataOnOff) {
      switch (this.dataOnOff.bgColorOn) {
        case 'active':
        case 'inActive':
          this.colorCodeOn = 'bg-primary text-white';
          break;
        default:
          this.colorCodeOn = 'default';
          break;
      }

      switch (this.dataOnOff.bgColorOff) {
        case 'active':
        case 'inActive':
          this.colorCodeOff = 'bg-primary text-white';
          break;
        default:
          this.colorCodeOff = 'default';
          break;
      }
    }

    this.cdr.markForCheck();
  }

  handleChange(ev: any) {
    this.onChange.emit(ev);
  }
}
export class OnOffModel {
  nameOn?: string | null;
  nameOff?: string | null;
  bgColorOn?: Color;
  bgColorOff?: Color;
}
