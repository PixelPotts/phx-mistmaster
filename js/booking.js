/* PHX MistMaster — Booking Calendar JS */

document.addEventListener('DOMContentLoaded', () => {
  initCalendar();
});

function initCalendar() {
  const widget = document.querySelector('.calendar-widget');
  if (!widget) return;

  const state = {
    currentDate: new Date(),
    selectedDate: null,
    selectedTime: null
  };

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  function render() {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0,0,0,0);

    const headerEl = widget.querySelector('.calendar-month');
    if (headerEl) headerEl.textContent = `${monthNames[month]} ${year}`;

    const grid = widget.querySelector('.calendar-grid');
    if (!grid) return;

    let html = dayNames.map(d => `<div class="day-header">${d}</div>`).join('');

    for (let i = 0; i < firstDay; i++) {
      html += `<div class="day disabled"></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = date < today;
      const isSunday = date.getDay() === 0;
      const isToday = date.getTime() === today.getTime();
      const isSelected = state.selectedDate && date.getTime() === state.selectedDate.getTime();

      let classes = 'day';
      if (isPast || isSunday) classes += ' disabled';
      if (isToday) classes += ' today';
      if (isSelected) classes += ' selected';

      html += `<div class="${classes}" data-date="${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}">${day}</div>`;
    }

    grid.innerHTML = html;

    grid.querySelectorAll('.day:not(.disabled)').forEach(el => {
      el.addEventListener('click', () => {
        const [y, m, d] = el.dataset.date.split('-').map(Number);
        state.selectedDate = new Date(y, m-1, d);
        render();
        showTimeSlots();
        updateHiddenField();
      });
    });
  }

  function showTimeSlots() {
    const slotsContainer = widget.querySelector('.time-slots');
    if (!slotsContainer) return;

    const times = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'];
    slotsContainer.innerHTML = times.map(t =>
      `<div class="time-slot${state.selectedTime === t ? ' selected' : ''}" data-time="${t}">${t}</div>`
    ).join('');

    slotsContainer.querySelectorAll('.time-slot').forEach(el => {
      el.addEventListener('click', () => {
        state.selectedTime = el.dataset.time;
        slotsContainer.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        el.classList.add('selected');
        updateHiddenField();
      });
    });
  }

  function updateHiddenField() {
    const dateInput = document.querySelector('input[name="preferred_date"]');
    const timeInput = document.querySelector('input[name="preferred_time"]');
    if (dateInput && state.selectedDate) {
      dateInput.value = state.selectedDate.toISOString().split('T')[0];
    }
    if (timeInput && state.selectedTime) {
      timeInput.value = state.selectedTime;
    }
  }

  // Nav buttons
  const prevBtn = widget.querySelector('.cal-prev');
  const nextBtn = widget.querySelector('.cal-next');
  if (prevBtn) prevBtn.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    render();
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    render();
  });

  render();
}
