const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

class Calendar {
  constructor() {
    this.container = document.querySelector('.calendar__dates');
    this.currentDate = new Date();
    this.currentYear = this.currentDate.getFullYear();
    this.currentMonth = this.currentDate.getMonth();
    
    this.render();
    document.getElementById('previous').addEventListener('click', this.showPreviousMonth.bind(this));
    document.getElementById('next').addEventListener('click', this.showNextMonth.bind(this));
  }

  render() {
    // Fill month and year header
    const titleRef = document.querySelector('.calendar__header-title');
    console.log(titleRef);
    titleRef.textContent = `${monthNames[this.currentMonth]} - ${this.currentYear}`;

    // Clean container
    this.container.innerHTML = '';

    // Create calendar header
    days.forEach(day => {
      const heading = document.createElement('h6');
      heading.classList.add('calendar__date-name');
      heading.textContent = day;
      this.container.appendChild(heading);
    });

    // Create calendar body
    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    let dayCounter = 1;

    // there are not months with more than 6 weeks
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        const dayRef = document.createElement('div');
        dayRef.classList.add('calendar__date-number');
        this.container.appendChild(dayRef);

        if (i === 0 && j < firstDay) {
          dayRef.textContent = '';
        } else if (dayCounter <= lastDay) {
          dayRef.textContent = dayCounter;
          if (
            this.currentYear === this.currentDate.getFullYear() &&
            this.currentMonth === this.currentDate.getMonth() &&
            dayCounter === this.currentDate.getDate()
          ) {
            dayRef.classList.add('calendar__date-number--selected');
          }
          dayCounter++;
        } else {
          dayRef.textContent = '';
        }
      }
    }
  }

  showPreviousMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.render();
  }

  showNextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.render();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Create a new instance of the calendar
  new Calendar();
});
