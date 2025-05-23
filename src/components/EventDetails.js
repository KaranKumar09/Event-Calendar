import React, { useState } from 'react';
import './EventDetails.css';

const EventDetails = ({ event, onClose, onUpdate, onDelete }) => {
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({ ...event });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (new Date(formData.start) > new Date(formData.end)) {
      alert("End date & time can't be before start date & time.");
      return;
    }
    onUpdate(formData);
    setEdit(false);
  };

  return (
    <div className="modal">
      <div className="event-details">
        {edit ? (
          <>
            <h2>Edit Event</h2>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <label>Start Date & Time:</label>
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleChange}
            />
            <label>End Date & Time:</label>
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleChange}
            />
            <label>Recurrence:</label>
            <select
              name="recurrence"
              value={formData.recurrence || 'none'}
              onChange={handleChange}
            >
              <option value="none">None</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom</option>
            </select>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setEdit(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p><strong>Start:</strong> {event.start}</p>
            <p><strong>End:</strong> {event.end}</p>
            <p>
              <strong>Recurrence:</strong>{' '}
              {event.recurrence
                ? event.recurrence.charAt(0).toUpperCase() + event.recurrence.slice(1)
                : 'None'}
            </p>
            <button onClick={() => setEdit(true)}>Edit</button>
          </>
        )}
        <button onClick={() => onDelete(event.id)}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EventDetails;
