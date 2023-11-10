document.addEventListener("DOMContentLoaded", function () {
  function dateHasMultipleEvents(date, events) {
    let count = 0;
    for (let i = 0; i < events.length; i++) {
      if (events[i].start.toDateString() === date.toDateString()) {
        count++;
        if (count > 1) return true;
      }
    }
    return false;
  }
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    height: "100%",
    expandRows: true,
    initialView: "dayGridMonth",
    slotLabelFormat: {
      hour: "numeric",
      minute: "2-digit",
      omitZeroMinute: false,
      meridiem: "short",
    },
    views: {
      timeGridDay: {
        dayHeaderFormat: { weekday: "long", month: "numeric", day: "numeric" },
      },
      timeGridWeek: {
        dayHeaderFormat: { weekday: "long", month: "numeric", day: "numeric" },
      },
      dayGridMonth: {
        dayHeaderFormat: { weekday: "long" },
        dayMaxEvents: 2,
      },
      timeGrid: {
        eventMaxStack: 2,
      },
    },
    showNonCurrentDates: false,
    themeSystem: "bootstrap",
    headerToolbar: {
      start: "trainingCalendar,myTrainingCalendar,title, prev,next",
      end: "today timeGridDay,timeGridWeek,dayGridMonth",
    },
    customButtons: {
      trainingCalendar: {
        text: "Training Calendar",
        click: function () {
          calendar.removeAllEventSources();
          // Add your Training Calendar data source
          // calendar.addEventSource(yourTrainingCalendarDataSource);
          calendar.refetchEvents();
        },
      },
      myTrainingCalendar: {
        text: "My Training Calendar",
        click: function () {
          calendar.removeAllEventSources();
          // Add your My Training Calendar data source
          // calendar.addEventSource(yourMyTrainingCalendarDataSource);
          calendar.refetchEvents();
        },
      },
    },
    titleFormat: {
      year: "numeric",
      month: "long",
    },
    firstDay: 1,
    dayPopoverFormat: { weekday: "long", month: "long", day: "numeric" },
    events: mockup.map((event) => ({
      title: `${event.title}`,
      start: event.date + "T" + event.startTime + ":00",
      end: event.date + "T" + event.endTime + ":00",
      display: "block",
      backgroundColor: "#e5f4e9",
      textColor: "#000",
      location: event.location,
    })),
    eventContent: function (arg) {
      var div = document.createElement("div");
      div.classList.add("event-content");

      // Check if the current view is 'dayGridMonth' and if the event's date has multiple events
      if (
        arg.view.type === "dayGridMonth" &&
        dateHasMultipleEvents(arg.event.start, arg.view.calendar.getEvents())
      ) {
        // If conditions are met, just render the event title
        div.innerHTML = `<div class="event-title">${arg.event.title}</div>`;
      } else {
        // Else, render the event title, time, and location
        div.innerHTML = `
                <div class="event-title">${arg.event.title}</div>
                <div>
                    <div class="custom-event event-time"><div class='icon'></div>${arg.event.start
                      .toTimeString()
                      .substring(0, 5)} - ${arg.event.end
          .toTimeString()
          .substring(0, 5)}</div>
                    <div class="custom-event event-location"><div class='icon'></div>${
                      arg.event.extendedProps.location
                    }</div>
                </div>
                `;
      }

      return { domNodes: [div] };
    },
    datesSet: function (info) {
      let viewName = info.view.type;
      let titleElement = calendarEl.querySelector(".fc-toolbar-title");
      if (titleElement) {
        switch (viewName) {
          case "dayGridMonth":
            let currentMonthDate = calendar.getDate();
            titleElement.textContent =
              "(" +
              currentMonthDate.toLocaleString("en-US", { month: "long" }) +
              ", " +
              currentMonthDate.getFullYear() +
              ")";
            break;
          case "timeGridWeek":
            let startDate = new Date(info.startStr);
            let endDate = new Date(info.endStr);
            endDate.setDate(endDate.getDate() - 1);
            titleElement.textContent =
              "(" +
              startDate.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              }) +
              " - " +
              endDate.toLocaleString("en-US", {
                month: "short",
                day: "numeric",
              }) +
              ", " +
              startDate.getFullYear() +
              ")";
            break;
          case "timeGridDay":
            let date = new Date(info.startStr);
            titleElement.textContent =
              "(" +
              date.toLocaleString("en-US", { month: "short", day: "numeric" }) +
              ", " +
              date.getFullYear() +
              ")";
            break;
        }
      }
    },
  });
  document
    .querySelector(".course-form-btn")
    .addEventListener("click", function () {
      // When the button is clicked, display the modal
      var modal = document.getElementById("courseModal");
      modal.style.display = "block";
    });

  // Get the modal
  var modal = document.getElementById("courseModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  calendar.render();

  var smallCalendarEl = document.getElementById("small-calendar");
  var smallCalendar = new FullCalendar.Calendar(smallCalendarEl, {
    initialView: "dayGridMonth",
    firstDay: 1,
    height: "auto",
    themeSystem: "bootstrap",
    views: {},
    headerToolbar: {
      start: "prev",
      center: "title",
      end: "next",
    },
    titleFormat: {
      month: "long",
    },
    events: mockup.map((event) => ({
      start: event.date + "T" + event.startTime + ":00",
      end: event.date + "T" + event.endTime + ":00",
    })),
    eventClassNames: "sidebar-event",
  });
  smallCalendar.render();
  addCustomButtonWrapper();

  handleSmallCalendarView();
});

const addCustomButtonWrapper = () => {
  const customTrainingCalendarButton = document.querySelector(
    ".fc-myTrainingCalendar-button"
  );

  customTrainingCalendarButton.parentElement.classList.add(
    "header-start-wrapper"
  );
};

const handleSmallCalendarView = () => {
  smallViewDays = document.querySelectorAll("#small-calendar .fc-daygrid-day");

  if (smallViewDays && Array.from(smallViewDays).length > 0) {
    const daysArr = Array.from(smallViewDays);

    daysArr.forEach((day) => {
      const eventsInDay = mockup.filter(
        (event) => event.date === day.dataset.date
      );

      if (eventsInDay.length) {
        //   Create a wrapper for indicators in small view
        const indicatorWrapper = document.createElement("div");
        indicatorWrapper.classList.add("indicator-wrapper");

        //   Add event data (different types for different colors) to indicator wrapper
        const indicatorElements = [];
        eventsInDay.forEach((event) => {
          const eventIndicator = document.createElement("div");
          eventIndicator.classList.add("indicator");

          // TODO: Add new class name for each event base on event data source
          // VD:
          eventIndicator.classList.add("green");

          indicatorElements.push(eventIndicator);
        });
        indicatorElements.forEach((i) => {
          indicatorWrapper.appendChild(i);
        });
        day.appendChild(indicatorWrapper);
      }
    });
  }
};

const mockup = [
  {
    title: "Morning Meeting",
    date: "2023-10-05",
    startTime: "09:00",
    endTime: "10:30",
    location: "Conference Room A",
  },
  {
    title: "Training Session",
    date: "2023-10-10",
    startTime: "14:00",
    endTime: "17:00",
    location: "Training Center",
  },
  {
    title: "Training Session",
    date: "2023-10-25",
    startTime: "14:00",
    endTime: "17:00",
    location: "Training Center",
  },
  {
    title: "Training Session",
    date: "2023-10-25",
    startTime: "14:00",
    endTime: "17:00",
    location: "Training Center",
  },
  {
    title: "Training Session",
    date: "2023-10-25",
    startTime: "14:00",
    endTime: "17:00",
    location: "Training Center",
  },
  {
    title: "Training Session",
    date: "2023-10-25",
    startTime: "14:00",
    endTime: "15:00",
    location: "Training Center",
  },
  {
    title: "Training Session",
    date: "2023-10-25",
    startTime: "15:00",
    endTime: "18:00",
    location: "Training Center",
  },
  {
    title: "Training Session",
    date: "2023-10-25",
    startTime: "14:00",
    endTime: "14:30",
    location: "Training Center",
  },
  {
    title: "Project Review",
    date: "2023-10-15",
    startTime: "11:30",
    endTime: "13:00",
    location: "Main Office",
  },
  {
    title: "Client Meetup",
    date: "2023-10-18",
    startTime: "16:00",
    endTime: "18:30",
    location: "Client Office",
  },
  {
    title: "Workshop",
    date: "2023-11-01",
    startTime: "11:00",
    endTime: "18:00",
    location: "Workshop Hall",
  },
  {
    title: "Workshop",
    date: "2023-11-01",
    startTime: "13:00",
    endTime: "16:00",
    location: "Workshop Hall",
  },
  {
    title: "Workshop",
    date: "2023-11-01",
    startTime: "12:00",
    endTime: "15:00",
    location: "Workshop Hall",
  },
  {
    title: "Seminar: Risk Management",
    date: "2023-11-09",
    startTime: "12:00",
    endTime: "15:00",
    location: "Workshop Hall",
  },
  {
    title: "Seminar: Risk Management",
    date: "2023-11-10",
    startTime: "12:00",
    endTime: "15:00",
    location: "Workshop Hall",
  },
  {
    title: "Seminar: Risk Management",
    date: "2023-11-10",
    startTime: "12:00",
    endTime: "15:00",
    location: "Workshop Hall",
  },
];
