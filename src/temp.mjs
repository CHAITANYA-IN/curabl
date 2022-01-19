import dateFns from 'date-fns';
import React from 'react';
// import { compareAsc, format } from 'date-fns'
// const {dateFns} = require('date-fns');

const now = new Date();
const offsetHours = dateFns.getHours(now);
console.log(now, offsetHours);
console.log(new Date())

function generateTimeSlots(selectedDate, slotSizeMinutes) {
  const isToday = dateFns.isToday(new Date(selectedDate));
  console.log(isToday)

  let start = selectedDate;
  if (isToday) {
    const now = new Date();
    const offsetHours = 5;
    
    // "Pad" the start time with the amount of hours of the current time, to
    // prevent rendering time slots of the past
    start = dateFns.addHours(start, offsetHours);
    start = dateFns.addMinutes(start, 30);
    console.log("start" , start);

    // The start positions might still be in the past in terms of minutes
    // So "pad" the start time with the slot size, to prevent rendering time
    // slots of the past
 
  }

  const end = dateFns.addDays(selectedDate, 1);

  let slot = start;
  let timeSlots = [];
  while (slot < end) {
    timeSlots.push(slot);
    slot = dateFns.addMinutes(slot, slotSizeMinutes);
  }

  return timeSlots;
}

console.log(generateTimeSlots(new Date(), 15));