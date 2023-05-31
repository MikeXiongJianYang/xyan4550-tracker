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

// Function to save the record
function saveRecord() {
  var date = document.getElementById("dateInput").value;
  var emoji = document.getElementById("emojiInput").value;

  // Save the record to local storage
  saveRecordToLocalStorage(date, emoji);

  // Redirect to the calendar page
  location.href = "calendar.html";
}

// Function to save the record to local storage
function saveRecordToLocalStorage(date, emoji) {
  var records = JSON.parse(localStorage.getItem("records")) || {};
  records[date] = emoji;
  localStorage.setItem("records", JSON.stringify(records));
}

function changePage(element) {
  // Remove active class from all nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => item.classList.remove('active'));

  // Add active class to the clicked nav item
  element.classList.add('active');
}

// Add event listener to the save button
document.getElementById("saveButton").addEventListener("click", saveRecord);














// Additional code for the task tracking functionality

// Goal
// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  console.log(form.elements.taskType.value);

  addTask(
    form.elements.taskName.value,
    form.elements.taskType.value,
    form.elements.taskRate.value,
    form.elements.taskTime.value,
    form.elements.taskClient.value
  );
  console.log(taskList);
});

function displayTask(task) {
  let item = document.createElement("li");
  item.setAttribute("data-id", task.id);
  item.innerHTML = `<p><strong>${task.name}</strong><br>${task.type}</p>`;

  tasklist.appendChild(item);

  // Clear the value of the input once the task has been added to the page
  form.reset();

  // Setup delete button DOM elements
  let delButton = document.createElement("button");
  let delButtonText = document.createTextNode("Delete");
  delButton.appendChild(delButtonText);
  item.appendChild(delButton); // Adds a delete button to every task

  // Listen for when the delete button is clicked
  delButton.addEventListener("click", function(event) {
    taskList.forEach(function(taskArrayElement, taskArrayIndex) {
      if (taskArrayElement.id == item.getAttribute("data-id")) {
        taskList.splice(taskArrayIndex, 1);
      }
    });

    // Make sure the deletion worked by logging out the whole array
    console.log(taskList);

    item.remove(); // Remove the task item from the page when button clicked
    // Because we used 'let' to define the item, this will always delete the right element
  });
}

// Create an array called 'taskList'
var taskList = [];

// Create a function called 'addTask'
// Give the function input parameters for: name, type, rate, time, client
// Paste your object definition from above in the function
// Replace the property values with the input parameters
// Add the object to the taskList array
function addTask(name, type, rate, time, client) {
  // Creating the object with the usual property:value syntax
  let task = {
    name: name,
    type: type,
    id: Date.now(),
    date: new Date().toISOString(),
    rate: rate,
    time: time,
    client: client
  };

  taskList.push(task);
  displayTask(task);
}

// Call the function with test values for the input parameters
addTask("Initial Sketches", "Concept Ideation", 50, 5, "Google");

// Log the array to the console.
console.log(taskList);
