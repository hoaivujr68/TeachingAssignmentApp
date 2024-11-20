import { Component, OnInit } from '@angular/core';
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
      numeric: 50,
    },
    {
      label: 'Số lượng nhóm chuyên môn',
      numeric: 46,
    },
    {
      label: 'Số lượng lớp học',
      numeric: 173,
    },
    {
      label: 'Số lượng nguyện vọng',
      numeric: 141,
    },
    {
      label: 'Số lượng lớp không được phân công',
      numeric: 14,
    },
    {
      label: 'Số lượng giáo viên không được phân công giảng dạy',
      numeric: 0,
    },
    {
      label: 'Số lượng nguyện vọng không được phân công',
      numeric: 10,
    },
    {
      label: 'Số lượng giáo viên không được phân công hướng dẫn',
      numeric: 0,
    },
  ]
  constructor() { }

  ngAfterViewInit(): void {
    this.initChar1();
    this.initChar2();
  }
  initChar1() {
    const ctx = document.getElementById('myChart1') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Số lượng lớp không được phân công', 'Số lượng lớp học',],
        datasets: [{
          data: [14, 173],
          backgroundColor: ['#A3C1AD','#6495ED'],
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
          data: [10, 141],
          backgroundColor: ['#0077c0','#B0C4DE'],
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
}

