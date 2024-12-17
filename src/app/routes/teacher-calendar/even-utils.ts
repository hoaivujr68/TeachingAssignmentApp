import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
const PERIOD = {
      1: {start: "6h45", end: "7h30"},
      2: {start: "7h30", end: "8h15"},
      3: {start: "8h25", end: "9h10"},
      4: {start: "9h20", end: "10h05"},
      5: {start: "10h15", end: "11h00"},
      6: {start: "11h00", end: "11h45"},
      7: {start: "12h30", end: "13h15"},
      8: {start: "13h15", end: "14h00"},
      9: {start: "14h10", end: "14h55"},
      10: {start: "15h05", end: "15h50"},
      11: {start: "16h00", end: "16h45"},
      12: {start: "16h45", end: "17h30"},
  };
  
export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}