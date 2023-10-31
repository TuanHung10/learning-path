document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dayMaxEventRows: true,
        slotLabelFormat: {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: false,
            meridiem: 'short'
        },
        views: {
            timeGridDay: {
                dayHeaderFormat: { weekday: 'long', month: 'numeric', day: 'numeric' },

            },
            timeGridWeek: {
                dayHeaderFormat: { weekday: 'long', month: 'numeric', day: 'numeric' }
            },
            dayGridMonth: {
                dayHeaderFormat: { weekday: 'long' },
                dayMaxEventRows: 3
            }
        },
        themeSystem: 'bootstrap',
        headerToolbar: {
            start: 'trainingCalendar,myTrainingCalendar,title, prev,next',
            end: 'today timeGridDay,timeGridWeek,dayGridMonth'
        },
        customButtons: {
            trainingCalendar: {
                text: 'Training Calendar',
                click: function () {
                    calendar.removeAllEventSources();
                    // Add your Training Calendar data source
                    // calendar.addEventSource(yourTrainingCalendarDataSource);
                    calendar.refetchEvents();
                }
            },
            myTrainingCalendar: {
                text: 'My Training Calendar',
                click: function () {
                    calendar.removeAllEventSources();
                    // Add your My Training Calendar data source
                    // calendar.addEventSource(yourMyTrainingCalendarDataSource);
                    calendar.refetchEvents();
                }
            }
        },
        titleFormat: {
            year: 'numeric',
            month: 'long',
        },
        // datesSet: function (info) {
        //     var title = document.querySelector('.fc-toolbar-title').textContent;
        //     var modifiedTitle = `(${title})`;
        //     document.querySelector('.fc-toolbar-title').textContent = modifiedTitle;
        // },
        firstDay: 1,
        expandRows: true,
        events: mockup.map(event => ({
            title: `${event.title}`,
            start: event.date + 'T' + event.startTime + ':00',
            end: event.date + 'T' + event.endTime + ':00',
            display: 'block',
            backgroundColor: '#e5f4e9',
            textColor: '#000',
            location: event.location
        })),
        eventContent: function (arg) {
            var div = document.createElement('div');
            div.classList.add('event-content')
            div.innerHTML = `
            <div class="event-title">${arg.event.title}</div>
           <div>
           <div class="custom-event event-time"><div class='icon'></div>${arg.event.start.toTimeString().substring(0, 5)} - ${arg.event.end.toTimeString().substring(0, 5)}</div>
           <div class="custom-event event-location"><div class='icon'></div>${arg.event.extendedProps.location}</div></div>
          `;
            return { domNodes: [div] };
        },
        datesSet: function (info) {
            let viewName = info.view.type;
            let titleElement = calendarEl.querySelector('.fc-toolbar-title');
            if (titleElement) {
                switch (viewName) {
                    case 'dayGridMonth':
                        titleElement.textContent = '(' + info.startStr.split('-')[1] + ', ' + info.startStr.split('-')[0] + ')';
                        break;
                    case 'timeGridWeek':
                        let startDate = new Date(info.startStr);
                        let endDate = new Date(info.endStr);
                        endDate.setDate(endDate.getDate() - 1);
                        titleElement.textContent = '(' + startDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + ' - ' + endDate.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + ', ' + startDate.getFullYear() + ')';
                        break;
                    case 'timeGridDay':
                        let date = new Date(info.startStr);
                        titleElement.textContent = '(' + date.toLocaleString('en-US', { month: 'short', day: 'numeric' }) + ', ' + date.getFullYear() + ')';
                        break;
                }
            }
        }
    });
    calendar.render();


    // var smallCalendarEl = document.getElementById('small-calendar');
    // var smallCalendar = new FullCalendar.Calendar(smallCalendarEl, {
    //     initialView: 'dayGridMonth',
    //     height: 'auto', // Adjusts the height automatically based on the number of weeks in the month
    //     headerToolbar: false, // Hides the header
    //     dayCellContent: function (e) { e.dayNumberText = e.dayNumberText.replace(/(\d+)/, '<span class="small-day-number">$1</span>'); }
    // });
    // smallCalendar.render();
});


const mockup = [
    {
        title: 'Morning Meeting',
        date: '2023-10-05',
        startTime: '09:00',
        endTime: '10:30',
        location: 'Conference Room A'
    },
    {
        title: 'Training Session',
        date: '2023-10-10',
        startTime: '14:00',
        endTime: '17:00',
        location: 'Training Center'
    },
    {
        title: 'Training Session',
        date: '2023-10-25',
        startTime: '14:00',
        endTime: '17:00',
        location: 'Training Center'
    },
    {
        title: 'Training Session',
        date: '2023-10-25',
        startTime: '14:00',
        endTime: '17:00',
        location: 'Training Center'
    },
    {
        title: 'Training Session',
        date: '2023-10-25',
        startTime: '14:00',
        endTime: '17:00',
        location: 'Training Center'
    },
    {
        title: 'Training Session',
        date: '2023-10-25',
        startTime: '14:00',
        endTime: '15:00',
        location: 'Training Center'
    },
    {
        title: 'Training Session',
        date: '2023-10-25',
        startTime: '15:00',
        endTime: '18:00',
        location: 'Training Center'
    },
    {
        title: 'Training Session',
        date: '2023-10-25',
        startTime: '14:00',
        endTime: '14:30',
        location: 'Training Center'
    },
    {
        title: 'Project Review',
        date: '2023-10-15',
        startTime: '11:30',
        endTime: '13:00',
        location: 'Main Office'
    },
    {
        title: 'Client Meetup',
        date: '2023-10-18',
        startTime: '16:00',
        endTime: '18:30',
        location: 'Client Office'
    },
    {
        title: 'Workshop',
        date: '2023-10-27',
        startTime: '13:00',
        endTime: '15:00',
        location: 'Workshop Hall'
    }
];

