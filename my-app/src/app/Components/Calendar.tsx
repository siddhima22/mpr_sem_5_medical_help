import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Event } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface MedicationEvent extends Event {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  medicine?: string;
  dosage?: string;
  meetLink?: string;
}

const initialEvents: MedicationEvent[] = [
  {
    title: 'Take Medicine A',
    start: new Date(2024, 9, 14, 10, 0),
    end: new Date(2024, 9, 14, 10, 30),
    allDay: false,
    medicine: 'Medicine A',
    dosage: '1 pill'
  },
  {
    title: 'Doctor Appointment',
    start: new Date(2024, 9, 15, 13, 0),
    end: new Date(2024, 9, 15, 14, 0),
    allDay: false,
  },
];

// Utility function to generate a random Google Meet-like link
const generateRandomMeetLink = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  const randomString = () =>
    Array.from({ length: 3 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  return `https://meet.google.com/${randomString()}-${randomString()}-${randomString()}`;
};

const MedicationCalendar: React.FC = () => {
  const [events, setEvents] = useState<MedicationEvent[]>(initialEvents);
  const [isOpen, setIsOpen] = useState(false);
  const [isViewingEvent, setIsViewingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<MedicationEvent>>({});
  const [selectedEvent, setSelectedEvent] = useState<MedicationEvent | null>(null);
  const [currentView, setCurrentView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectSlot = (slotInfo: { start: Date; end: Date; slots: Date[] }) => {
    setNewEvent({
      start: slotInfo.start,
      end: slotInfo.end,
      allDay: slotInfo.slots.length === 1,
    });
    setIsOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title && newEvent.start && newEvent.end) {
      const meetLink = generateRandomMeetLink(); // Generate a random Meet link
      const newEventWithLink = {
        ...newEvent,
        meetLink,
      } as MedicationEvent;
      setEvents([...events, newEventWithLink]);
      setIsOpen(false);
      setNewEvent({});
    }
  };

  const handleSelectEvent = (event: MedicationEvent) => {
    setSelectedEvent(event);
    setIsViewingEvent(true);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const eventStyleGetter = (event: MedicationEvent) => {
    const style: React.CSSProperties = {
      backgroundColor: event.medicine ? '#0d9488' : '#14b8a6',
      borderRadius: '0.375rem',
      color: 'white',
      border: 'none',
      display: 'block'
    };
    return { style };
  };

  return (
    <div className="flex flex-col items-center bg-teal-900 text-white min-h-screen p-6">
      <div className="container max-w-5xl">
        <h1 className="text-center text-2xl md:text-4xl font-bold mb-8">
          Medication Calendar
        </h1>

        {!isOpen && !isViewingEvent && (
          <div className="bg-white text-black p-6 rounded-lg shadow-lg mb-8">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView={currentView}
              date={currentDate}
              onNavigate={handleNavigate}
              onView={handleViewChange}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
              style={{ height: 500 }}
              eventPropGetter={eventStyleGetter}
            />
          </div>
        )}

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full z-50">
              <h2 className="text-lg font-semibold mb-4">Add Medication Event</h2>
              <form onSubmit={handleSaveEvent} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block mb-1">Title</label>
                  <input
                    id="title"
                    type="text"
                    value={newEvent.title || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="medicine" className="block mb-1">Medicine</label>
                  <input
                    id="medicine"
                    type="text"
                    value={newEvent.medicine || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, medicine: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label htmlFor="dosage" className="block mb-1">Dosage</label>
                  <input
                    id="dosage"
                    type="text"
                    value={newEvent.dosage || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, dosage: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded transition"
                  >
                    Save event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isViewingEvent && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md w-full z-50">
              <h2 className="text-lg font-semibold mb-4">{selectedEvent.title}</h2>
              <p><strong>Start:</strong> {selectedEvent.start.toLocaleString()}</p>
              <p><strong>End:</strong> {selectedEvent.end.toLocaleString()}</p>
              {selectedEvent.medicine && <p><strong>Medicine:</strong> {selectedEvent.medicine}</p>}
              {selectedEvent.dosage && <p><strong>Dosage:</strong> {selectedEvent.dosage}</p>}
              {selectedEvent.meetLink && (
                <p>
                  <strong>Google Meet:</strong> <a href={selectedEvent.meetLink} target="_blank" rel="noopener noreferrer">{selectedEvent.meetLink}</a>
                </p>
              )}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsViewingEvent(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-black py-2 px-4 rounded transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationCalendar;
