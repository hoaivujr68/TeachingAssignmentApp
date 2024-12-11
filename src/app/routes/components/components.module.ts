import { NgModule } from "@angular/core";
import { FooterTableComponent } from "./footer-table/footer-table.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from "src/app/shared/ng-zorro-ant/ng-zorro-antd.module";
import { ButtonBaseComponent } from './button-base/button-base.component';
import { OnOffComponent } from './on-off/on-off.component';
import { LabelVerticalComponent } from './label-vertical/label-vertical.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './input-text/input-text.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { TagComponent } from './tag/tag.component';
import { InputNumberComponent } from './input-number/input-number.component';

const components: any[] = [
      FooterTableComponent,
      PaginationComponent,
      ButtonBaseComponent, 
      OnOffComponent, 
      LabelVerticalComponent, 
      InputTextComponent, 
      InputTextareaComponent,
      TagComponent,
      InputNumberComponent
]

@NgModule({
      declarations: [...components, OnOffComponent, LabelVerticalComponent, InputTextComponent, InputTextareaComponent, TagComponent, InputNumberComponent,],
      imports: [
            CommonModule,
            NgZorroAntdModule,
            ReactiveFormsModule
      ],
      providers: [],
      exports: [...components],
})

export class ComponentsModule { }