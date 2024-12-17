import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
interface Radio {
  label?: string;
  value: string;
}
@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent implements OnInit {
  @Output() onChange = new EventEmitter();
  @Input() labelContent = '';
  @Input() checkedContent = '';
  @Input() unCheckedContent = '';
  @Input() noColon = false;
  @Input() errorTip = '';
  @Input() errorTipsArr!: any[];
  @Input() radioGroupClass!: string[];
  @Input() disabled = false;
  @Input() required = false;
  @Input() name = 'checkbox';
  @Input() span = 16;
  @Input() classLabel = '';
  @Input() listDataRadio: Radio[] = [];
  @Input() hideLabel = false;
  @Input() labelHorizontal = false;
  @Input() styleRadio = false;
  @Input() valueField = 'value';
  @Input() labelField = 'label';

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnChanges(): any {}
  handleChange(): void {
    this.onChange.emit(this.ngControl.value);
  }

  ngOnInit(): any {}

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
