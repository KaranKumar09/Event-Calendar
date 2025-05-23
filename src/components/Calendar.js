import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameDay,
  isToday,
  addMonths,
  subMonths
} from 'date-fns';
import './Calendar.css';

const Calendar = ({ events, onDateClick, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = 'd';
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      const dayEvents = events.filter(event => isSameDay(new Date(event.start), cloneDay));
      days.push(
        <div
          className={`col cell ${isToday(cloneDay) && format(currentMonth, 'MM-yyyy') === format(new Date(), 'MM-yyyy') ? 'today' : ''}`}
          key={cloneDay}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className="number">{formattedDate}</span>
          {dayEvents.map(event => (
            <div
              className="event"
              key={event.id}
              style={{ backgroundColor: event.color }} 
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event);
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <span className="month-label">{format(currentMonth, 'MMMM yyyy')}</span>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="header">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="col header-cell">
            {day}
          </div>
        ))}
      </div>
      {rows}
    </div>
  );
};

export default Calendar;
