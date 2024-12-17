import { Component } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import { Calendar } from '@fullcalendar/core';
import { cloneDeep } from 'lodash';
import { LecturerServiceService } from 'src/app/service/lecturer-service.service';
import { LecturerManagementComponent } from '../lecturer-management/lecturer-management.component';
import { TeachingAssigmentService } from './../../service/teaching-assigment.service';
import { createEventId, INITIAL_EVENTS } from './even-utils';
import dayGridPlugin from '@fullcalendar/daygrid';  // Nếu sử dụng chế độ ngày
import timeGridPlugin from '@fullcalendar/timegrid';  // Nếu sử dụng chế độ tuần 

@Component({
  selector: 'app-teacher-calendar',
  templateUrl: './teacher-calendar.component.html',
  styleUrls: ['./teacher-calendar.component.scss']
})
export class TeacherCalendarComponent extends LecturerManagementComponent {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    initialView: 'timeGridWeek', // Chế độ xem mặc định là tuần
    events: [], // Sự kiện sẽ được cập nhật trong fetchData()
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };

  currentEvents: EventApi[] = [];

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }
  // Biến để lưu thông tin sự kiện được click
  selectedEvent: any = null;

  // Hàm xử lý khi click vào sự kiện
  handleEventClick(clickInfo: EventClickArg) {
    this.selectedEvent = clickInfo.event; // Lưu thông tin sự kiện được chọn
    this.isModalVisible = true; // Hiển thị modal
  }

  // Biến kiểm soát hiển thị modal
  isModalVisible = false;

  // Hàm đóng modal
  closeModal() {
    this.isModalVisible = false;
    this.selectedEvent = null;
  }


  // handleEventClick(clickInfo: EventClickArg) {
  //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //     clickInfo.event.remove();
  //   }
  // }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  constructor(public lecturerServiceService: LecturerServiceService, public teachingAssigmentService: TeachingAssigmentService) {
    super(lecturerServiceService);
    const name = Calendar.name;
  }

  async fetchData() {
    await this.teachingAssigmentService.getSchedule()
      .toPromise()
      .then((res: any) => {
        if (res) {
          this.listOfData = cloneDeep(res);

          // Chuyển đổi listOfData thành các sự kiện FullCalendar
          const events = this.listOfData.map(item => {
            // Cắt thời gian bắt đầu và kết thúc từ 'timeTable'
            const [startTime, endTime] = item.timeTable.split(' - ');

            // Tạo ngày giờ cho sự kiện, giả sử ngày là "6" là thứ 6, bạn cần chuyển sang ngày trong tuần
            const startDate = this.getDateForWeekday(item.day, startTime);
            const endDate = this.getDateForWeekday(item.day, endTime);

            return {
              id: item.courseId,
              title: `Mã lớp: ${item.courseId}, Mã môn: ${item.courseCode}, Tên môn: ${item.courseName}, SL: ${item.maxEnrol}`,
              start: startDate,
              end: endDate,
              extendedProps: {
                courseCode: item.courseCode,
                courseId: item.courseId,
                courseName: item.courseName,
                maxEnrol: item.maxEnrol
              }
            };
          });

          // Cập nhật lại events cho lịch
          this.calendarOptions.events = events;
        }
      });
  }

  getDateForWeekday(weekday: string, time: string): string {
    // Tạo một đối tượng Date mới (ngày hiện tại)
    const date = new Date();

    // Đặt ngày trong tuần theo giá trị của 'weekday'
    const dayOffset = (parseInt(weekday) - date.getDay() + 6) % 7;
    date.setDate(date.getDate() + (dayOffset === 0 ? 0 : dayOffset)); // Không cộng thêm ngày nếu đã trùng    

    // Chuyển đổi giờ từ time (ví dụ: "6h45" => "06:45")
    const [hour, minute] = time.split('h');
    date.setHours(parseInt(hour), parseInt(minute), 0, 0); // Đặt giờ cho ngày hiện tại

    return date.toISOString(); // Trả về ISO String cho FullCalendar
  }
}
