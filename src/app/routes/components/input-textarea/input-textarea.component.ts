import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss'],
})
export class InputTextareaComponent extends InputTextComponent implements ControlValueAccessor, OnInit {
  // @Input() hideLabel = false;
  // @Input() labelContent = '';
  // @Input() errorTip = '';
  // @Input() disabled = false;
  // @Input() required = false;
  // @Input() span = 16;
  // @Input() labelHorizontal = true;
  // @Input() isFloatingInput = false;
  @Input() minRows = 4;
  @Input() maxRows = 10;
  // @Input() placeHolder = ' ';
  // @Input() blur: any;
  // @Input() errorTipsArr!: any[];

  // @Output() onChange = new EventEmitter();
  // constructor(@Optional() @Self() public ngControl: NgControl) {
  //   this.ngControl.valueAccessor = this;
  // }

  // @Output() onBlur = new EventEmitter();

  ngOnInit(): any {
    super.ngOnInit();
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  handleChange() {
    this.onChange.emit(this.ngControl.value);
  }

  handleBlur(value: any) {
    this.onBlur.emit(value);
  }
}
