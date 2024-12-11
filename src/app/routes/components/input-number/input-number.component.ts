import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  Optional,
  Self,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { InputTextComponent } from '../input-text/input-text.component';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent extends InputTextComponent implements ControlValueAccessor, OnInit, AfterViewInit {
  @ViewChild('input') inputNumber!: NzInputNumberComponent;

  // @Input() labelContent = '';
  // @Input() hideLabel: boolean = false;
  @Input() isAddOn: boolean = false;
  @Input() isDefaultNull: boolean = false;
  @Input() addOnText = '';
  @Input() min = 0;
  @Input() max: number | undefined;
  @Input() step = 1;
  // @Input() errorTip = '';
  // @Input() disabled: boolean = false;
  // @Input() required: boolean = false;
  // @Input() span = 16;
  // @Input() labelHorizontal: boolean = true;
  @Input() classInput: string = '';
  // @Input() blur: any;
  @Input() isFloatingInput = false;
  // @Input() placeHolder = ' ';
  // @Input() readonly: boolean = false;
  // @Input() errorTipsArr!: any[];

  // @Output() onChange = new EventEmitter();
  // @Output() onBlur = new EventEmitter();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    protected cdr: ChangeDetectorRef,
  ) {
    super(ngControl);
    this.ngControl.valueAccessor = this;
  }

  ngAfterViewInit() {
    if (this.readonly) {
      const elm = this.inputNumber.inputElement.nativeElement;
      elm.setAttribute('readOnly', '');
      elm.style.paddingRight = '11px';
      const parentElm = elm.parentNode;
      if (parentElm) {
        const divInreDecre = parentElm.previousSibling;
        divInreDecre?.remove();
      }
    }
    this.cdr.markForCheck();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  handleBlur(value: any) {
    this.onBlur.emit(value);
  }

  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  handleChange(): void {
    this.onChange.emit(this.ngControl.value);
  }
}
