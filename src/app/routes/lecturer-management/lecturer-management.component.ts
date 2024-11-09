import { Component, OnInit } from '@angular/core';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { cloneDeep } from 'lodash';

interface Teacher {
  id: number;
  name: string;
  specialty: string;
}
@Component({
  selector: 'app-lecturer-management',
  templateUrl: './lecturer-management.component.html',
  styleUrls: ['./lecturer-management.component.scss']
})
export class LecturerManagementComponent {
  mode: string = 'specialty';
  total = 0;
  scrollY: string = 'calc(100vh - 240px)';
  request: any = {
    page: 1,
    size: 20,
    sort: '',
  };
  listModeView = [
    {
      label: 'Nhóm chuyên môn',
      value: 'specialty',
    },    
    {
      label: 'Môn học có thể dạy',
      value: 'subject',
    }
  ]
  tableBodyElement: any;
  listOfData = [];
  listOfSpecialties = [];

  constructor(public lecturerServiceService: LecturerServiceService){}

  async ngOnInit(){
    await this.fetchData();
  }

  buildQueryString(): string {
    const queryModel = {
    };
    return JSON.stringify(queryModel);
  }

  async fetchData(){
    const queryString = this.buildQueryString();
    await this.lecturerServiceService.getTeacher(this.request.page, this.request.size, queryString)
    .toPromise()
    .then((res: any) => {
      if (res) {
        this.listOfData = cloneDeep(res.content);
        this.total = res.totalRecords;
      }
    })
    .finally(() => {
    });
  }

  ngAfterViewInit() {
    this.calculateHeightBodyTable();
    this.tableBodyElement = document.getElementsByTagName('nz-table-inner-scroll')[0];
    if (this.tableBodyElement) {
      (this.tableBodyElement as HTMLElement).style.minHeight = 'calc(100vh - 240px)';
    }
  }
  
  calculateHeightBodyTable() {
    this.scrollY = `calc(100vh - 240px)`;
  }

  handleChangeModeView(ev: any){
    if(ev){
      this.mode = ev;
    }
  }

  async nzPageIndexChange(page: number) {
    this.request.page = page;
    await this.fetchData();
    setTimeout(() => {
      if (this.tableBodyElement && this.tableBodyElement.scrollTop) this.tableBodyElement.scrollTop = 0;
    }, 50);
  }

}
