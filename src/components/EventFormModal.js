import React, { useState, useEffect } from 'react';
import './EventFormModal.css';

const EventFormModal = ({ date, onClose, onSave, allEvents }) => {
  const toLocalDateTimeString = (date) => {
    const offsetMs = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offsetMs);
    return localDate.toISOString().slice(0, 16);
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [start, setStart] = useState(toLocalDateTimeString(date));
  const [end, setEnd] = useState(toLocalDateTimeString(date));
  const [color, setColor] = useState('#007bff');
  const [recurrence, setRecurrence] = useState('none');
  const [conflictWarning, setConflictWarning] = useState('');

  useEffect(() => {
    setTitle('');
    setDescription('');
    setStart(toLocalDateTimeString(date));
    setEnd(toLocalDateTimeString(date));
    setColor('#007bff');
    setRecurrence('none');
    setConflictWarning('');
  }, [date]);

  const hasConflict = (newEvent, events) => {
    const newStart = new Date(newEvent.start).getTime();
    const newEnd = new Date(newEvent.end).getTime();

    return events.some(event => {
      const existingStart = new Date(event.start).getTime();
      const existingEnd = new Date(event.end).getTime();
      return newStart < existingEnd && newEnd > existingStart;
    });
  };

  useEffect(() => {
    setConflictWarning('');
  }, [start, end, title]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(start) > new Date(end)) {
      setConflictWarning("End date & time can't be before start date & time.");
      return;
    }

    if (!title.trim()) {
      setConflictWarning("Title is required.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      title,
      description,
      start,
      end,
      color,
      recurrence,
    };

    if (hasConflict(newEvent, allEvents || [])) {
      setConflictWarning("Please choose a different time; this slot overlaps with an existing event.");
      return;
    }

    setConflictWarning('');
    onSave(newEvent);
    onClose();
  };

  return (
    <div className="modal">
      <form className="event-form" onSubmit={handleSubmit}>
        <h2>Add Event</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Start Date & Time:</label>
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          required
        />

        <label>End Date & Time:</label>
        <input
          type="datetime-local"
          value={end}
          min={start}
          onChange={(e) => setEnd(e.target.value)}
          required
        />

        <label>Event Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label>Recurrence:</label>
        <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom</option>
        </select>

        {conflictWarning && (
          <p
            className="error-message"
            style={{
              color: 'red',
              marginTop: '10px',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            {conflictWarning}
          </p>
        )}

        <div className="form-buttons" style={{ marginTop: '15px' }}>
          <button type="submit" disabled={!!conflictWarning}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventFormModal;
