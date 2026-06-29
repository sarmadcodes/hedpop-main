// Booking-flow UI scaffolding. These are NOT mock business data — they are
// the date picker (real upcoming calendar days) and the salon's opening-hour
// time slots. Real appointment availability would come from the backend later.

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Build the next `count` real calendar days starting today.
export const buildUpcomingDates = (count = 10) => {
  const out = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    out.push({
      id: String(i),
      day: DAYS[d.getDay()],
      date: String(d.getDate()),
      month: MONTHS[d.getMonth()],
      year: d.getFullYear(),
      iso: d.toISOString(),
    });
  }
  return out;
};

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];
