import { Component, OnInit } from '@angular/core';
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
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  scrollY: string = 'calc(100vh - 240px)';
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
  listOfData = [
    { id: 'GV001', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8},
    { id: 'GV002', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV003', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV004', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV005', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV006', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV007', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV008', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV009', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0010', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0011', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0012', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0013', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0014', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0015', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0016', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0017', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0018', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0019', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
    { id: 'GV0020', name: 'Nguyễn Văn A', specialty: 'Cấu trúc dữ liệu và thuật toán, Data Structures & Algorithms, Thuật toán ứng dụng', subject: 'IT3011, IT3010Q, IT3014, IT3312, IT3312E, IT3010E,  IT3011Q, IT3170, IT3680, IT3240E, IT3240, IT3170E', gdTeaching: 5.4, gdInstruct: 7.8 },
  ];

  listOfSpecialties = ['Toán', 'Vật lý', 'Hóa học', 'Sinh học'];
  filterName = '';
  filterSpecialty = '';
  filteredData = [...this.listOfData];

  applyFilter(): void {
    this.filteredData = this.listOfData.filter(data =>
      (this.filterName ? data.name.toLowerCase().includes(this.filterName.toLowerCase()) : true) &&
      (this.filterSpecialty ? data.specialty === this.filterSpecialty : true)
    );
  }
  tableBodyElement: any;
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

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      console.log(this.setOfCheckedId.size)
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  handleChangeModeView(ev: any){
    if(ev){
      this.mode = ev;
    }
  }
}
