/* eslint-disable no-restricted-globals */
import React, { Fragment } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import Alert from 'sweetalert2';

import '../App.css';

export default class EventCalendar extends React.Component {
  myCalendar = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvents: [{ title: 'Event Now', start: new Date() }],
  };

  handleDateClick = arg => {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay,
        }),
      });
    }
  };

  handleEventClick = arg => {
    Alert.fire({
      title: arg.event.title,
      html:
        `<div class="table-responsive">
        <table class="table">
        <tbody>
        <tr >
        <td>Title</td>
        <td><strong>` +
        arg.event.title +
        `</strong></td>
        </tr>
        <tr >
        <td>Start Time</td>
        <td><strong>
        ` +
        arg.event.start +
        `
        </strong></td>
        </tr>
        </tbody>
        </table>
        </div>`,

      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Remove Event',
      cancelButtonText: 'Close',
    }).then(result => {
      if (result.value) {
        arg.event.remove();
        Alert.fire('Deleted!', 'Your Event has been deleted.', 'success');
      }
    });
  };

  render() {
    console.log('myCalendar', this.myCalendar.current.hasOwnProperty)
    return (
      <Fragment>
        <div className='app'>
          <div className='app-top' />
          <div className='app-calendar'>
            <FullCalendar
              ref={this.myCalendar}
              schedulerLicenseKey='GPL-My-Project-Is-Open-Source'
              defaultView='dayGridMonth'
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              weekends={this.state.calendarWeekends}
              events={this.state.calendarEvents}
              dateClick={this.handleDateClick}
              eventClick={this.handleEventClick}
              event
              editable={true}
              droppable={true}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}
