import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
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

  leftSideData: any[] = [
    {
      label: 'Số giảng viên cần phân công',
      numeric: 49,
      type: 'lecturer-management'
    },
    {
      label: 'Số lượng nhóm chuyên môn',
      numeric: 46,
      type: 'professional-group-management'
    },
    {
      label: 'Số lượng lớp học',
      numeric: 159,
      type: 'class-management'
    },
    {
      label: 'Số lượng nguyện vọng',
      numeric: 882,
      type: 'aspiration-management'
    },
    {
      label: 'Số lượng lớp không được phân công',
      numeric: 0,
      type: 'teaching-not-assignment'
    },
    {
      label: 'Số lượng GV không được PC giảng dạy',
      numeric: 0,
      type: 'project-not-assignment'
    },
    {
      label: 'Số lượng NV không được phân công',
      numeric: 0,
      type: 'project-not-assignment'
    },
    {
      label: 'Số lượng GV không được PC hướng dẫn',
      numeric: 0,
      type: 'project-not-assignment'
    },
  ]

  gdTeachingDetail = [
    { "TeacherCode": "GV014", "TeacherName": "Nguyễn Hữu Đức", "TotalGdInstruct": 23.4 },
    { "TeacherCode": "GV023", "TeacherName": "Nguyễn Thị Oanh", "TotalGdInstruct": 21 },
    { "TeacherCode": "GV024", "TeacherName": "Nguyễn Thị Thu Trang", "TotalGdInstruct": 20.4 },
    { "TeacherCode": "GV035", "TeacherName": "Trần Việt Trung", "TotalGdInstruct": 20.2 },
    { "TeacherCode": "GV013", "TeacherName": "Nguyễn Hồng Phương", "TotalGdInstruct": 20 },
    { "TeacherCode": "GV028", "TeacherName": "Ngô Văn Linh", "TotalGdInstruct": 19.8 },
    { "TeacherCode": "GV047", "TeacherName": "Đỗ Bá Lâm", "TotalGdInstruct": 19.8 },
    { "TeacherCode": "GV044", "TeacherName": "Vũ Văn Thiệu", "TotalGdInstruct": 19.4 },
    { "TeacherCode": "GV032", "TeacherName": "Thân Quang Khoát", "TotalGdInstruct": 18.4 },
    { "TeacherCode": "GV004", "TeacherName": "Bùi Thị Mai Anh", "TotalGdInstruct": 17.8 },
    { "TeacherCode": "GV031", "TeacherName": "Phạm Đăng Hải", "TotalGdInstruct": 17.4 },
    { "TeacherCode": "GV008", "TeacherName": "Lê Thanh Hương", "TotalGdInstruct": 16.8 },
    { "TeacherCode": "GV010", "TeacherName": "Lê Đức Trung", "TotalGdInstruct": 15.2 },
    { "TeacherCode": "GV007", "TeacherName": "Huỳnh Thị Thanh Bình", "TotalGdInstruct": 15.2 },
    { "TeacherCode": "GV025", "TeacherName": "Nguyễn Tiến Thành", "TotalGdInstruct": 14.8 },
    { "TeacherCode": "GV012", "TeacherName": "Nguyễn Bình Minh", "TotalGdInstruct": 14.4 },
    { "TeacherCode": "GV003", "TeacherName": "Bùi Quốc Trung", "TotalGdInstruct": 14.4 },
    { "TeacherCode": "GV045", "TeacherName": "Đinh Viết Sang", "TotalGdInstruct": 14.4 },
    { "TeacherCode": "GV020", "TeacherName": "Nguyễn Phi Lê", "TotalGdInstruct": 14 },
    { "TeacherCode": "GV036", "TeacherName": "Trần Văn Đặng", "TotalGdInstruct": 14 },
    { "TeacherCode": "GV018", "TeacherName": "Nguyễn Mạnh Tuấn", "TotalGdInstruct": 13.8 },
    { "TeacherCode": "GV015", "TeacherName": "Nguyễn Khanh Văn", "TotalGdInstruct": 13.6 },
    { "TeacherCode": "GV042", "TeacherName": "Vũ Thị Hương Giang", "TotalGdInstruct": 13.6 },
    { "TeacherCode": "GV022", "TeacherName": "Nguyễn Thị Kim Anh", "TotalGdInstruct": 13.6 },
    { "TeacherCode": "GV033", "TeacherName": "Trần Nhật Hoá", "TotalGdInstruct": 13.2 },
    { "TeacherCode": "GV017", "TeacherName": "Nguyễn Kiêm Hiếu", "TotalGdInstruct": 12.8 },
    { "TeacherCode": "GV034", "TeacherName": "Trần Thế Hùng", "TotalGdInstruct": 12.4 },
    { "TeacherCode": "GV030", "TeacherName": "Phạm Văn Hải", "TotalGdInstruct": 12.2 },
    { "TeacherCode": "GV038", "TeacherName": "Trần Đình Khang", "TotalGdInstruct": 11 },
    { "TeacherCode": "GV043", "TeacherName": "Vũ Tuyết Trinh", "TotalGdInstruct": 11 },
    { "TeacherCode": "GV040", "TeacherName": "Trịnh Thành Trung", "TotalGdInstruct": 10.2 },
    { "TeacherCode": "GV002", "TeacherName": "Ban Hà Bằng", "TotalGdInstruct": 9.6 },
    { "TeacherCode": "GV019", "TeacherName": "Nguyễn Nhất Hải", "TotalGdInstruct": 9 },
    { "TeacherCode": "GV011", "TeacherName": "Nguyễn Bá Ngọc", "TotalGdInstruct": 7.2 },
    { "TeacherCode": "GV041", "TeacherName": "Trịnh Tuấn Đạt", "TotalGdInstruct": 7.2 },
    { "TeacherCode": "GV005", "TeacherName": "Cao Tuấn Dũng", "TotalGdInstruct": 6.8 },
    { "TeacherCode": "GV049", "TeacherName": "Đỗ Quốc Huy", "TotalGdInstruct": 6.6 },
    { "TeacherCode": "GV009", "TeacherName": "Lê Tấn Hùng", "TotalGdInstruct": 5.8 },
    { "TeacherCode": "GV046", "TeacherName": "Đào Thành Chung", "TotalGdInstruct": 5.8 },
    { "TeacherCode": "GV026", "TeacherName": "Nguyễn Tuấn Dũng", "TotalGdInstruct": 5.8 },
    { "TeacherCode": "GV037", "TeacherName": "Trần Vĩnh Đức", "TotalGdInstruct": 5.8 },
    { "TeacherCode": "GV039", "TeacherName": "Trịnh Anh Phúc", "TotalGdInstruct": 5.6 },
    { "TeacherCode": "GV050", "TeacherName": "Đỗ Tuấn Anh", "TotalGdInstruct": 5.6 },
    { "TeacherCode": "GV027", "TeacherName": "Nguyễn Đức Anh", "TotalGdInstruct": 5.6 },
    { "TeacherCode": "GV016", "TeacherName": "Nguyễn Khánh Phương", "TotalGdInstruct": 5.2 },
    { "TeacherCode": "GV048", "TeacherName": "Đỗ Phan Thuận", "TotalGdInstruct": 2.8 },
    { "TeacherCode": "GV006", "TeacherName": "Huỳnh Quyết Thắng", "TotalGdInstruct": 2.2 },
    { "TeacherCode": "GV021", "TeacherName": "Nguyễn Thanh Hùng", "TotalGdInstruct": 1.2 },
    { "TeacherCode": "GV029", "TeacherName": "Phạm Quang Dũng", "TotalGdInstruct": 0.8 }
  ]
    ;
  constructor(protected router: Router) { }

  ngAfterViewInit(): void {
    this.initChar1();
    this.initChar2();
    // this.initChar3();
  }
  initChar1() {
    const ctx = document.getElementById('myChart1') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Số lượng lớp không được phân công', 'Số lượng lớp học',],
        datasets: [{
          data: [0, 159],
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
  initChar2() {
    const ctx = document.getElementById('myChart2') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Số lượng nguyện vọng không được phân công', 'Số lượng nguyện vọng',],
        datasets: [{
          data: [0, 882],
          backgroundColor: ['#0077c0', '#B0C4DE'],
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Tỷ lệ nguyện vọng được phân",
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

  initChar3() {
    const ctx = document.getElementById('myChart3') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Giảng viên',
          data: [
            { x: 'GV014', y: 23.4 },
            { x: 'GV023', y: 21 },
            { x: 'GV024', y: 20.4 },
            { x: 'GV035', y: 20.2 },
            { x: 'GV013', y: 20 },
            { x: 'GV028', y: 19.8 },
            { x: 'GV047', y: 19.8 },
            { x: 'GV044', y: 19.4 },
            { x: 'GV032', y: 18.4 },
            { x: 'GV004', y: 17.8 },
            { x: 'GV031', y: 17.4 },
            { x: 'GV008', y: 16.8 },
            { x: 'GV010', y: 15.2 },
            { x: 'GV007', y: 15.2 },
            { x: 'GV025', y: 14.8 },
            { x: 'GV012', y: 14.4 },
            { x: 'GV003', y: 14.4 },
            { x: 'GV045', y: 14.4 },
            { x: 'GV020', y: 14 },
            { x: 'GV036', y: 14 },
            { x: 'GV018', y: 13.8 },
            { x: 'GV015', y: 13.6 },
            { x: 'GV042', y: 13.6 },
            { x: 'GV022', y: 13.6 },
            { x: 'GV033', y: 13.2 },
            { x: 'GV017', y: 12.8 },
            { x: 'GV034', y: 12.4 },
            { x: 'GV030', y: 12.2 },
            { x: 'GV038', y: 11 },
            { x: 'GV043', y: 11 },
            { x: 'GV040', y: 10.2 },
            { x: 'GV002', y: 9.6 },
            { x: 'GV019', y: 9 },
            { x: 'GV011', y: 7.2 },
            { x: 'GV041', y: 7.2 },
            { x: 'GV005', y: 6.8 },
            { x: 'GV049', y: 6.6 },
            { x: 'GV009', y: 5.8 },
            { x: 'GV046', y: 5.8 },
            { x: 'GV026', y: 5.8 },
            { x: 'GV037', y: 5.8 },
            { x: 'GV039', y: 5.6 },
            { x: 'GV050', y: 5.6 },
            { x: 'GV027', y: 5.6 },
            { x: 'GV016', y: 5.2 },
            { x: 'GV048', y: 2.8 },
            { x: 'GV006', y: 2.2 },
            { x: 'GV021', y: 1.2 },
            { x: 'GV029', y: 0.8 }
          ],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          pointRadius: 5
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Teacher Code'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Gd Instruct'
            },
            min: 0
          }
        }
      }
    });
  }

  handleClick(item: any) {
    if (item) {
      const type = item.type;
      this.router.navigate([`/lecturer/${type}`]);
    }
  }
}

