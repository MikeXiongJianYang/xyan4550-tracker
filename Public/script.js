$(document).ready(function() {
    // Initialize the calendar
    var calendar = $('#calendar').fullCalendar({
      // Set the calendar options
      defaultView: 'month',
      selectable: true,
      select: function(start, end) {
        // Handle date selection event
        var date = moment(start).format('YYYY-MM-DD');
        var mood = prompt("How do you feel today?");
        if (mood) {
          // Save the mood to local storage
          saveMood(date, mood);
          // Refresh the calendar events
          refreshCalendarEvents();
        }
        calendar.fullCalendar('unselect');
        renderMoodRecords(); // Update mood records instantly
      },
      events: loadMoods(), // Load saved moods on calendar initialization
      eventRender: function(event, element) {
        // Add delete button to each event in the calendar
        var deleteButton = $('<span class="delete-button">x</span>');
        deleteButton.click(function() {
          deleteRecord(event.start.format('YYYY-MM-DD'));
        });
        element.append(deleteButton);
      }
    });
  
    // Function to save the mood to local storage
    function saveMood(date, mood) {
      var moods = JSON.parse(localStorage.getItem('moods')) || {};
      moods[date] = mood;
      localStorage.setItem('moods', JSON.stringify(moods));
    }
  
    // Function to load saved moods from local storage
    function loadMoods() {
      var moods = JSON.parse(localStorage.getItem('moods')) || {};
      var events = [];
      for (var date in moods) {
        var eventObj = {
          title: moods[date],
          start: date
        };
        events.push(eventObj);
      }
      return events;
    }
  
    // Function to refresh the calendar events
    function refreshCalendarEvents() {
      calendar.fullCalendar('removeEvents');
      calendar.fullCalendar('addEventSource', loadMoods());
    }
  
    // Function to delete a mood record
    function deleteRecord(date) {
      var moods = JSON.parse(localStorage.getItem('moods')) || {};
      delete moods[date];
      localStorage.setItem('moods', JSON.stringify(moods));
      renderMoodRecords(); // Update mood records after deletion
      refreshCalendarEvents(); // Refresh the calendar events
    }
  
    // Function to render mood records from local storage
    function renderMoodRecords() {
      var moods = JSON.parse(localStorage.getItem('moods')) || {};
      $('#moodRecords').empty(); // Clear existing records
      for (var date in moods) {
        var recordElement = document.createElement('div');
        recordElement.className = 'record';
        recordElement.innerHTML = '<span class="record-date">' + date + ': </span>' + moods[date];
        $('#moodRecords').append(recordElement);
      }
    }
  
    renderMoodRecords(); // Initial rendering of mood records
  });
  

  function changePage(element) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
  
    // Add active class to the clicked nav item
    element.classList.add('active');
  }
  