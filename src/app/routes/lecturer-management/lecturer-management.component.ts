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
  isLoadingTable: boolean = false;
  userRole: string = 'lanhdao';
  mode: string = 'specialty';
  total = 0;
  scrollY: string = 'calc(100vh - 240px)';
  request: any = {
    page: 1,
    size: 20,
    sort: '',
    listTextSearch: []
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

  constructor(public lecturerServiceService: LecturerServiceService) { }

  async ngOnInit() {
    await this.fetchData();
    this.checkRole();
  }

  checkRole(){
    const userRole = localStorage.getItem('listRoles');
    this.userRole = userRole;
  }

  buildQueryString() {
    const queryModel = {
      listTextSearch: this.request.listTextSearch,
      pageSize: this.request.size,
      currentPage: this.request.page,
      name: '',
      code: ''
    };
    return queryModel;
  }

  async fetchData() {
    this.isLoadingTable = true;
    const queryString = this.buildQueryString();
    await this.lecturerServiceService.getTeacherFilter(queryString)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listOfData = cloneDeep(res.content);
          this.total = res.totalRecords;
        }
      })
      .finally(() => {
        this.isLoadingTable = false;
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

  handleChangeModeView(ev: any) {
    if (ev) {
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

  async handleReload(ev: any) {
    await this.fetchData();
  }

  async nzOnSearch(ev: any) {
    this.request.page = 1;
    await this.fetchData();
  }

}
