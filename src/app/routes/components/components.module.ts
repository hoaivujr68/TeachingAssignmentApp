import { NgModule } from "@angular/core";
import { FooterTableComponent } from "./footer-table/footer-table.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from "src/app/shared/ng-zorro-ant/ng-zorro-antd.module";
import { ButtonBaseComponent } from './button-base/button-base.component';

const components: any[] = [
      FooterTableComponent,
      PaginationComponent,
      ButtonBaseComponent
]

@NgModule({
      declarations: [...components,],
      imports: [
            CommonModule,
            NgZorroAntdModule,
      ],
      providers: [],
      exports: [...components],
})

export class ComponentsModule { }