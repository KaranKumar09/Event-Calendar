import React, { useState } from 'react';
import Calendar from './components/Calendar';
import EventFormModal from './components/EventFormModal';
import EventDetails from './components/EventDetails';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(ev => (ev.id === updatedEvent.id ? updatedEvent : ev)));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      <h1>Event Calendar</h1>
      <Calendar
        events={events}
        onDateClick={(date) => { setSelectedDate(date); setFormOpen(true); }}
        onEventClick={setSelectedEvent}
      />
      {isFormOpen && (
        <EventFormModal
          date={selectedDate}
          onClose={() => setFormOpen(false)}
          onSave={addEvent}
          allEvents={events}
        />
      )}
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdate={updateEvent}
          onDelete={deleteEvent}
        />
      )}
    </div>
  );
}

export default App;
