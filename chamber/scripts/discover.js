// Discover page JavaScript - handles data loading and visitor tracking

document.addEventListener('DOMContentLoaded', () => {
    loadAttractions();
    displayVisitorMessage();
    updateFooterYear();
});

// Load attractions from JSON and display them
async function loadAttractions() {
    try {
        const response = await fetch('data/discover.json');
        const data = await response.json();
        
        const container = document.getElementById('attractions-container');
        
        data.attractions.forEach(attraction => {
            const card = createAttractionCard(attraction);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading attractions:', error);
        displayErrorMessage();
    }
}

// Create attraction card HTML element
function createAttractionCard(attraction) {
    const card = document.createElement('div');
    card.className = 'attraction-card';
    
    card.innerHTML = `
        <figure>
            <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
        </figure>
        <div class="card-content">
            <h2>${attraction.name}</h2>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more-btn" onclick="learnMore('${attraction.name}')">Learn More</button>
        </div>
    `;
    
    return card;
}

// Handle visitor tracking with localStorage
function displayVisitorMessage() {
    const lastVisit = localStorage.getItem('discover-last-visit');
    const currentDate = Date.now();
    const messageElement = document.getElementById('visitor-message');
    
    if (!lastVisit) {
        // First visit
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysDifference = Math.floor((currentDate - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            // Less than a day
            messageElement.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            // Exactly 1 day
            messageElement.textContent = "You last visited 1 day ago.";
        } else {
            // More than 1 day
            messageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    // Store current visit date
    localStorage.setItem('discover-last-visit', currentDate.toString());
}

// Learn more button functionality
function learnMore(attractionName) {
    alert(`More information about ${attractionName} would be available here. This could link to a detailed page or external website.`);
}

// Display error message if JSON fails to load
function displayErrorMessage() {
    const container = document.getElementById('attractions-container');
    container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #666;">
            <h3>Sorry, we're having trouble loading the attractions.</h3>
            <p>Please try refreshing the page or contact us if the problem persists.</p>
        </div>
    `;
}

// Update footer year
function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }
}
