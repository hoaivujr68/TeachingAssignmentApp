import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements ControlValueAccessor, OnInit {
  @ViewChild('input') inputElm!: ElementRef<any>;
  @Input() type: string = 'text';
  @Input() hideLabel = false;
  @Input() labelContent!: string;
  @Input() labelHorizontal = true;
  @Input() errorTip!: string;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() span = 24;
  @Input() placeHolder = '';
  @Input() classInput: any = false;
  @Input() classLabel!: string | any;
  @Input() blur: any;
  @Input() isShowTooltip = false;
  @Input() nzMin = null;
  @Input() nzMax = null;
  @Input() typeNumber = false;
  @Input() textRight = false;
  @Input() addOnAfter: string | TemplateRef<any> = '';
  @Input() addOnBefore: string | TemplateRef<any> = '';
  @Input() isAddOnBefore: boolean = false;
  @Input() isAddOnAfter: boolean = false;
  @Input() isFloatingInput = false;
  @Input() errorTipsArr!: any[];
  @Input() isEmptyPlaceholder: boolean = false;
  @Input() isEmitChangeWhenPatchData: boolean = false;
  //***errorTipsArr*** có dạng
  // [
  //   {
  //     key: 'required',
  //     value: 'không được để trống'
  //   },
  //   {
  //     key: 'userExist',
  //     value: 'đã tồn tại'
  //   }
  // ]

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onChange = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onBlur = new EventEmitter();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onKeyUpEnter = new EventEmitter();

  numberInput!: number;
  numberFormatResult!: string;
  region = 'vi-VN';
  isTouched = false;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    if (!this.hideLabel && this.placeHolder == '' && !this.isEmptyPlaceholder)
      this.placeHolder = 'Nhập ' + this.labelContent?.toLowerCase();
  }

  writeValue(obj: any): void {
    this.numberFormatResult = obj;
    if (obj) {
      if (this.isEmitChangeWhenPatchData) {
        this.onChange.emit(obj);
      }
    }
  }
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  handleChange(value: any) {
    this.onChange.emit(this.ngControl.value);
  }
  handleKeyUpEnter(value: any) {
    this.onChange.emit(this.ngControl.value);
    this.onKeyUpEnter.emit(this.ngControl.value);
  }

  handleBlur(value: any) {
    this.onBlur.emit(value);
  }

  preventNegative(event: any) {
    if (this.typeNumber) {
      const pattern = /[0-9/.]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }
}
