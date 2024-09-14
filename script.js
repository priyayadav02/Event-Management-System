let events = []; // Ensure the events array is globally accessible
let currentEvent = null;

// Helper functions to switch between sections
function showCreateEvent() {
    document.getElementById('create-event-section').style.display = 'block';
    document.getElementById('event-list-section').style.display = 'none';
    document.getElementById('event-details-section').style.display = 'none';
}

function showEventList() {
    document.getElementById('create-event-section').style.display = 'none';
    document.getElementById('event-list-section').style.display = 'block';
    document.getElementById('event-details-section').style.display = 'none';
    renderEventList(); // Call renderEventList to display events
}

// Function to render the list of events
function renderEventList() {
    const eventsListDiv = document.getElementById('events-list');
    eventsListDiv.innerHTML = ''; // Clear any previous events

    if (events.length === 0) {
        eventsListDiv.innerHTML = '<p>No events available.</p>'; // If no events exist
        return;
    }

    events.forEach((event, index) => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-item';
        eventDiv.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date}</p>
            <button onclick="viewEvent(${index})">View Details</button>
        `;
        eventsListDiv.appendChild(eventDiv);
    });
}

// Function to display event details
function viewEvent(index) {
    currentEvent = events[index];
    document.getElementById('create-event-section').style.display = 'none';
    document.getElementById('event-list-section').style.display = 'none';
    document.getElementById('event-details-section').style.display = 'block';

    const eventDetailsDiv = document.getElementById('event-details');
    eventDetailsDiv.innerHTML = `
        <h3>${currentEvent.name}</h3>
        <p>${currentEvent.date}</p>
        <p>${currentEvent.description}</p>
    `;
    document.getElementById('rsvp-button').innerText = currentEvent.rsvp ? 'Cancel RSVP' : 'RSVP';
}

// Function to create a new event
function createEvent(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventDescription = document.getElementById('event-description').value;

    if (eventName === '' || eventDate === '') {
        alert('Please fill out the event name and date.');
        return;
    }

    events.push({
        name: eventName,
        date: eventDate,
        description: eventDescription,
        rsvp: false
    });

    alert('Event Created!');
    showEventList(); // Show the list after event creation
}

// Function to toggle RSVP status
function toggleRSVP() {
    if (currentEvent) {
        currentEvent.rsvp = !currentEvent.rsvp;
        alert(currentEvent.rsvp ? 'RSVP Confirmed' : 'RSVP Cancelled');
        viewEvent(events.indexOf(currentEvent)); // Refresh event details
    }
}

// Function to delete an event
function deleteEvent() {
    const confirmDelete = confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
        events = events.filter(event => event !== currentEvent);
        alert('Event Deleted');
        showEventList(); // Go back to the event list after deletion
    }
}

// Function to send a reminder
function sendReminder() {
    if (currentEvent) {
        alert('Reminder sent for ${currentEvent.name}');
    } else {
        alert('No event selected.');
    }
}

// User activity tracker
document.addEventListener('click', (e) => {
  console.log('User clicked on: ${e.target.tagName}');
});
