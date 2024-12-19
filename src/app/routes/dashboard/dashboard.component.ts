import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GeneralService } from 'src/app/service/general.service';
import { TeacherEtlService } from 'src/app/service/teacher-etl.service';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  listDataClassAsignment: any[] = [];
  userRole: string = 'lanhdao';
  listTotalGd: any[] = [];
  listTotalGdPer: any[] = [];
  listPerGdTeaching: any[] = [];
  listPerGdInstruct: any[] = [];
  listDataAspirationAsignment: any[] = [];
  DATA_COUNT = 8;
  NUMBER_CFG = { count: this.DATA_COUNT, min: 10, max: 100 };
  colorBusinessChart: any = [
    '#0077c0',
    '#007791',
    '#6495ED',
    '#6699CC',
    '#A3C1AD',
    '#4C516D',
    '#48D1CC',
    '#CCCCFF',
    '#1da1f2',
    '#00CCFF',
    '#AFDBF5',
    '#B0C4DE',
  ];
  isSpinning: boolean = false;
  leftSideData: any[] = [];

  constructor(
    protected router: Router, 
    public generalService: GeneralService, 
    private message: NzMessageService,
    public teacherEtlService: TeacherEtlService,
  ) { }

  async ngOnInit(){
    this.checkRole();
    if (this.userRole == 'lanhdao'){
      await this.fetchDataTotal();
      await this.fetchDataClassAssignment();
      await this.fetchDataAspirationAssignment();
      this.initCharLeader1(); // Gọi sau khi fetch dữ liệu
      this.initCharLeader2();
    }
    else {
      await this.fetchDataTotalGDTeaching();
      await this.fetchDataTotalGDInstruct();
      await this.fetchDataTotalGD();
      await this.fetchDataTotalGDPer();
      this.initCharGV1();
      this.initCharGV2();
      this.initCharGV3();
      this.initCharGV4();
    }
  }

  async fetchDataTotalGDTeaching() {
    const payload = {
      role: this.userRole,
      type: 'per-gd-teaching'
    }
    const queryModel = JSON.stringify(payload);
    await this.teacherEtlService.getETLGeneral(queryModel)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listPerGdTeaching = res; 
        }
      })
  }

  async fetchDataTotalGDInstruct() {
    const payload = {
      role: this.userRole,
      type: 'per-gd-instruct'
    }
    const queryModel = JSON.stringify(payload);
    await this.teacherEtlService.getETLGeneral(queryModel)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listPerGdInstruct = res; 
        }
      })
  }

  async fetchDataTotalGD() {
    const payload = {
      role: this.userRole,
      type: 'total-gd-analyzed'
    }
    const queryModel = JSON.stringify(payload);
    await this.teacherEtlService.getETLGeneral(queryModel)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listTotalGd = res; 
        }
      })
  }

  async fetchDataTotalGDPer() {
    const payload = {
      role: this.userRole,
      type: 'gd-ratio-assigned'
    }
    const queryModel = JSON.stringify(payload);
    await this.teacherEtlService.getETLGeneral(queryModel)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listTotalGdPer = res; 
        }
      })
  }

  checkRole(){
    const userRole = localStorage.getItem('listRoles');
    this.userRole = userRole;
  }

  async handleReload(ev: any) {
    this.isSpinning = true;
    if(this.userRole == 'lanhdao') {
      await this.generalService.refreshETLGeneral()
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.leftSideData = res.filter((item) => item.type == 'total-statistics');
          this.listDataClassAsignment = res.filter((item) => item.type == 'per-assigned-classes');
          this.listDataAspirationAsignment = res.filter((item) => item.type == 'per-assigned-wishes');
          this.isSpinning = false;
          this.message.success("Thống kê lại dữ liệu thành công");
        }
      })
    } else {
      await this.teacherEtlService.refreshETLGeneral(JSON.stringify(this.userRole))
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listTotalGd = res.filter((item) => item.type == 'total-gd-analyzed');
          this.listTotalGdPer = res.filter((item) => item.type == 'gd-ratio-assigned');
          this.listPerGdTeaching = res.filter((item) => item.type == 'per-gd-teaching');
          this.listPerGdInstruct = res.filter((item) => item.type == 'per-gd-instruct');
          this.isSpinning = false;
          this.message.success("Thống kê lại dữ liệu thành công");
        }
      })
    }
  }

  async fetchDataTotal() {
    const queryModel = JSON.stringify('total-statistics');
    await this.generalService.getETLGeneral(queryModel)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.leftSideData = res; 
        }
      })
  }

  async fetchDataClassAssignment() {
    const queryModel = JSON.stringify('per-assigned-classes');

    await this.generalService.getETLGeneral(queryModel)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listDataClassAsignment = res; 
        }
      })
  }

  async fetchDataAspirationAssignment() {
    const queryModel = JSON.stringify('per-assigned-wishes');

    await this.generalService.getETLGeneral(queryModel)
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listDataAspirationAsignment = res; 
        }
      })
  }

  initCharLeader1() {
    const ctx = document.getElementById('myChartLeader1') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Số lượng lớp không được phân công', 'Số lượng lớp học',],
        datasets: [{
          data: this.listDataClassAsignment.map((item) => item.value),
          backgroundColor: ['#A3C1AD', '#6495ED'],
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Tỷ lệ lớp được phân",
            font: {
              family: 'Quicksand, sans-serif',
              size: 14,
            },
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'rect',
            },
          },
        }
      }
    });
  }
  initCharLeader2() {
    const ctx = document.getElementById('myChartLeader2') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Số lượng đồ án không được phân công', 'Số lượng đồ án',],
        datasets: [{
          data: this.listDataAspirationAsignment.map((item) => item.value),
          backgroundColor: ['#0077c0', '#B0C4DE'],
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Tỷ lệ đồ án được phân",
            font: {
              family: 'Quicksand, sans-serif',
              size: 14,
            },
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'rect',
            },
          },
        }
      }
    });
  }

  initCharGV1() {
    const ctx = document.getElementById('myChartGV1') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['GD phân công giảng dạy', 'GD phân công hướng dẫn đồ án',],
        datasets: [
          {
          data: this.listTotalGd.filter((item) => item.label === 'GD tối đa').sort((a, b) => b.value - a.value).map((item) => item.value),
          label: 'GD tối đa',
          backgroundColor: ['#FFA54F'],
          },
          {
            data: this.listTotalGd.filter((item) => item.label === 'GD thực tế').sort((a, b) => b.value - a.value).map((item) => item.value),
            label: 'GD thực tế',
            backgroundColor: ['#0077c0'],
          }
      ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Tổng GD đã phân công",
            font: {
              family: 'Quicksand, sans-serif',
              size: 14,
            },
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        }
      }
    });
  }

  initCharGV2() {
    const ctx = document.getElementById('myChartGV2') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['GD giảng dạy được phân', 'GD hướng dẫn đồ án được phân',],
        datasets: [{
          data: this.listTotalGdPer.sort((a, b) => b.value - a.value).map((item) => item.value),
          backgroundColor: ['#4876FF', '#B0C4DE'],
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Tỷ lệ GD được phân",
            font: {
              family: 'Quicksand, sans-serif',
              size: 14,
            },
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'rect',
            },
          },
          tooltip: {
            callbacks: {
              // Hiển thị phần trăm và label trong tooltip
              label: (tooltipItem: any) => {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                const total = dataset.data.reduce((sum: any, value: any) => sum + value, 0);
                const percentage = ((currentValue / total) * 100).toFixed(2);
                return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
              },
            },
          },
        }
      }
    });
  }
  getRandomColors(count: number): string[] {
    const colors: string[] = [];
    const availableColors = [...this.colorBusinessChart]; // Sao chép mảng màu để thao tác

    for (let i = 0; i < count; i++) {
      if (availableColors.length === 0) break; // Dừng nếu hết màu để chọn
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      colors.push(availableColors[randomIndex]);
      availableColors.splice(randomIndex, 1); // Loại bỏ màu đã chọn để tránh trùng lặp
    }

    return colors;
  }

  initCharGV3() {
    const ctx = document.getElementById('myChartGV3') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['CTTT', 'HEDSPI', 'KSCQ', 'CN', 'SIE', 'KSTN', 'ThSKH', 'KSCLC'],
        datasets: [{
          data: this.listPerGdTeaching.map((item) => item.value),
          backgroundColor: this.getRandomColors(this.DATA_COUNT),
        }],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Tỷ lệ GD theo hệ giảng dạy",
            font: {
              family: 'Quicksand, sans-serif',
              size: 14,
            },
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'rect',
            },
          },
          tooltip: {
            callbacks: {
              // Hiển thị phần trăm và label trong tooltip
              label: (tooltipItem: any) => {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                const total = dataset.data.reduce((sum: any, value: any) => sum + value, 0);
                const percentage = ((currentValue / total) * 100).toFixed(2);
                return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
              },
            },
          },
        }
      }
    });
  }

  initCharGV4() {
    const ctx = document.getElementById('myChartGV4') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['ĐAMH', 'ĐATN',],
        datasets: [{
          data: this.listPerGdInstruct.map((item) => item.value),
          backgroundColor: this.getRandomColors(2),
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        cutout: '30%',
        plugins: {
          title: {
            display: true,
            text: "Tỷ lệ GD theo loại đồ án",
            font: {
              family: 'Quicksand, sans-serif',
              size: 14,
            },
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              pointStyle: 'rect',
            },
          },
          tooltip: {
            callbacks: {
              // Hiển thị phần trăm và label trong tooltip
              label: (tooltipItem: any) => {
                const dataset = tooltipItem.dataset;
                const currentValue = dataset.data[tooltipItem.dataIndex];
                const total = dataset.data.reduce((sum: any, value: any) => sum + value, 0);
                const percentage = ((currentValue / total) * 100).toFixed(2);
                return `${tooltipItem.label}: ${currentValue} (${percentage}%)`;
              },
            },
          },
        }
      }
    });
  }

  handleClick(item: any) {
    if (item) {
      const type = item.category;
      this.router.navigate([`/lecturer/${type}`]);
    }
  }
}

