// Homepage


// Create an array called 'taskList'
var taskList = [];

// Create a function called 'addTask'
// Give the function input parameters for: name, type, rate, time, set
// Paste your object definition from above in the function
// Replace the property values with the input parameters
// Add the object to the taskList array
function addTask(name, type, rate, time, set) {
  // Creating the object with the usual property:value syntax
  let task = {
    name: name,
    type: type,
    id: Date.now(),
    date: new Date().toISOString(),
    rate: rate,
    time: time,
    set: set
  };

  taskList.push(task);
  displayTask(task);
}

// Call the function with test values for the input parameters
addTask("Initial Sketches", "Concept Ideation", 50, 5, "Google");

// Log the array to the console.
console.log(taskList);

$(document).ready(function() {
  // Array to store the daily step counts
var stepCounts = [];

// Function to handle user input and update the chart
function updateChart() {
  var input = document.getElementById("stepInput");
  var steps = parseInt(input.value);

  if (isNaN(steps) || steps <= 0) {
    alert("Please enter a valid number of steps.");
    return;
  }

  stepCounts.push(steps);

  // Clear the input field
  input.value = "";

  // Update the chart
  var chartContainer = document.getElementById("chartContainer");
  chartContainer.innerHTML = ""; // Clear previous bars

  for (var i = 0; i < stepCounts.length; i++) {
    var bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = stepCounts[i] + "px";
    chartContainer.appendChild(bar);
  }
}

// Event listener for form submission
document.getElementById("stepForm").addEventListener("submit", function (event) {
  event.preventDefault();
  updateChart();
});

function displayTask(task) {
  var taskListElement = document.getElementById("tasklist");
  var listItem = document.createElement("li");
  listItem.innerHTML = `<span>${task.name}</span> - ${task.type}, Rate: ${task.rate}, Time: ${task.time}, Client: ${task.set}`;
  taskListElement.appendChild(listItem);
}

function addTask(name, type, rate, time, set) {
  // Creating the object with the usual property:value syntax
  let task = {
    name: name,
    type: type,
    id: Date.now(),
    date: new Date().toISOString(),
    rate: rate,
    time: time,
    set: set
  };

  taskList.push(task);
  displayTask(task);
}

  











  
// Calendar page
// Initialize the calendar
$(document).ready(function () {
  var calendar = $("#calendar").fullCalendar({
    defaultView: "month",
    selectable: true,
    select: function (start, end) {
      var date = moment(start).format("YYYY-MM-DD");
      var mood = prompt("How do you feel today?");
      if (mood) {
        saveMood(date, mood);
        refreshCalendarEvents();
      }
      calendar.fullCalendar("unselect");
      renderMoodRecords();
    },
    events: loadMoods(),
    eventRender: function (event, element) {
      var deleteButton = $('<span class="delete-button">x</span>');
      deleteButton.click(function () {
        deleteRecord(event.start.format("YYYY-MM-DD"));
      });
      element.append(deleteButton);
    }
  });

  function saveMood(date, mood) {
    var moods = JSON.parse(localStorage.getItem("moods")) || {};
    moods[date] = mood;
    localStorage.setItem("moods", JSON.stringify(moods));
  }

  function loadMoods() {
    var moods = JSON.parse(localStorage.getItem("moods")) || {};
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
  calendar.fullCalendar('addEventSource', loadRecords());
}


// Function to delete a mood record
function deleteRecord(date) {
  var records = JSON.parse(localStorage.getItem('records')) || {};
  delete records[date];
  saveRecords(records);
  refreshCalendarEvents(); // Refresh the calendar events
}


  // Function to render mood records
  function renderMoodRecords() {
    // Retrieve mood records from local storage
    var moods = JSON.parse(localStorage.getItem("moods")) || {};
    // Get the container element
    var container = document.getElementById("mood-records");
    // Clear existing records
    container.innerHTML = "";
    // Loop through each mood record and create a new paragraph element to display it
    for (var date in moods) {
      var moodRecord = document.createElement("p");
      moodRecord.innerText = date + ": " + moods[date];
      container.appendChild(moodRecord);
    }
  }

  // Call the renderMoodRecords function initially to display existing records
  renderMoodRecords();
});















// Record page
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


// Task Tracking functionality

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

// Get the emoji card elements
const emojiCard1 = document.getElementById("emoji-card-1");
const emojiCard2 = document.getElementById("emoji-card-2");
const emojiCard3 = document.getElementById("emoji-card-3");

// Add click event listener to the emoji cards
emojiCard1.addEventListener("click", function() {
  handleEmojiClick("😃");
});

emojiCard2.addEventListener("click", function() {
  handleEmojiClick("😊");
});

emojiCard3.addEventListener("click", function() {
  handleEmojiClick("🙂");
});

// Function to handle click events on emoji cards
function selectEmoji(emojiId) {
  // Remove the "selected" class from all emoji cards
  $(".emoji-card").removeClass("selected");
  
  // Add the "selected" class to the clicked emoji card
  $("#emoji-card-" + emojiId).addClass("selected");
}

// Function to handle click event on save button
function saveRecord() {
  // Get the selected emoji
  var selectedEmoji = $(".emoji-card.selected .emoji").text();
  
  // Get the date and note inputs
  var dateInput = $("#dateInput").val();
  var noteInput = $("#noteInput").val();
  
  // Do something with the selected emoji, date, and note (e.g., save to a database)
  console.log("Selected Emoji: " + selectedEmoji);
  console.log("Date: " + dateInput);
  console.log("Note: " + noteInput);
}

// Function to handle click events on navigation items
function changePage(navItem) {
  // Remove the "active" class from all navigation items
  $(".nav-item").removeClass("active");
  
  // Add the "active" class to the clicked navigation item
  $(navItem).addClass("active");
}

// Add onclick event to each emoji card
$(".emoji-card").click(function() {
  var emojiId = $(this).attr("id").split("-")[2];
  selectEmoji(emojiId);
});