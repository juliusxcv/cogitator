// Get the canvas and context for drawing
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tickButton = document.getElementById('tickButton');
const tickCounter = document.getElementById('tickCounter');

// Set canvas background to black
canvas.style.backgroundColor = 'green';
let tickCount = 0;

// Define constants and an array to hold Points of Interest (POIs)
const minPOIs = 3;
const maxPOIs = 10;
const POIs = [];
const minDistance = 50; // Minimum distance between POIs

// Define the POI class
class POI {
    constructor(id, x, y, difficulty, status) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.difficulty = difficulty;
        this.status = status;
        this.ticks = 0;
        this.initialized = false; // Flag to track if the POI has been initialized by a click
    }

    // Method to draw the POI on the canvas
    draw() {
        // Clear previous drawing
        ctx.clearRect(this.x - 20, this.y - 30, 140, 60);

        // Set text style based on status
        switch (this.status) {
            case 'undiscovered':
                ctx.font = '10px Arial';
                ctx.fillStyle = 'white';
                break;
            case 'discovered':
                ctx.font = 'bold 10px Arial';
                ctx.fillStyle = 'white';
                break;
            case 'exploring':
                ctx.font = 'bold 10px Arial';
                ctx.fillStyle = 'blue';
                break;
            case 'SUCCESS... resources added':
                ctx.font = 'bold 10px Arial';
                ctx.fillStyle = 'green';
                break;
            case 'FAILED... servitor lost':
                ctx.font = 'bold 10px Arial';
                ctx.fillStyle = 'red';
                break;
            default:
                ctx.font = '10px Arial';
                ctx.fillStyle = 'white';
                break;
        }

        // Draw POI text
        ctx.fillText(`ID: ${this.id}`, this.x, this.y);
        ctx.fillText(`Difficulty: ${this.difficulty}`, this.x, this.y + 10);
        ctx.fillText(this.status, this.x, this.y + 20);

        // Draw progress bar
        const progressBarWidth = (100 / this.getDifficultyTicks()) * this.ticks;
        ctx.fillStyle = 'lime'; // Use correct color
        ctx.fillRect(this.x, this.y + 30, progressBarWidth, 2.5); // Half the height of the progress bar

        // Draw clickable circle in the upper left corner of the POI
        ctx.beginPath();
        ctx.arc(this.x - 10, this.y - 10, 5, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.strokeStyle = ctx.fillStyle;
        ctx.stroke();
    }

    // Method to update the status of the POI
    updateStatus() {
        // Update status to next stage
        if (this.status === 'undiscovered') {
            this.status = 'discovered';
            console.log(`POI ${this.id} status updated to discovered`);
        } else if (this.status === 'discovered') {
            this.status = 'exploring';
            console.log(`POI ${this.id} status updated to exploring`);
        }
        this.initialized = true; // Mark the POI as initialized
    }

    // Method to handle tick updates for initialized exploring POIs
    tick() {
        if (this.initialized && this.status === 'exploring') {
            this.ticks++;
            console.log(`POI ${this.id} tick incremented to ${this.ticks}`);
            let successChance = 0;
            switch (this.difficulty) {
                case 1:
                    successChance = 0.5;
                    break;
                case 2:
                    successChance = 0.25;
                    break;
                case 3:
                    successChance = 0.15;
                    break;
                case 4:
                    successChance = 0.1;
                    break;
                default:
                    break;
            }
            this.checkSuccess(successChance);
            console.log(`POI ${this.id} status: ${this.status}, ticks: ${this.ticks}`);
        }
    }

    // Method to check if exploration is successful or failed
    checkSuccess(successChance) {
        if (Math.random() < successChance) {
            this.status = 'SUCCESS... resources added';
            console.log(`POI ${this.id} exploration successful`);
        } else if (this.ticks >= this.getDifficultyTicks()) {
            this.status = 'FAILED... servitor lost';
            console.log(`POI ${this.id} exploration failed`);
        }
    }

    // Method to get the number of ticks needed based on difficulty
    getDifficultyTicks() {
        switch (this.difficulty) {
            case 1: return 1;
            case 2: return 2;
            case 3: return 5;
            case 4: return 10;
            default: return 0;
        }
    }
}

// Function to generate POIs at random positions without overlapping
function generatePOIs() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const minRange = 50;
    const maxRange = 250;

    for (let i = 0; i < maxPOIs; i++) {
        let x, y;
        let overlap;
        do {
            overlap = false;
            const angle = Math.random() * 2 * Math.PI;
            const distance = minRange + Math.random() * (maxRange - minRange);
            x = centerX + Math.cos(angle) * distance;
            y = centerY + Math.sin(angle) * distance;

            // Check for overlap with existing POIs
            for (const poi of POIs) {
                const dx = x - poi.x;
                const dy = y - poi.y;
                if (dx * dx + dy * dy < minDistance * minDistance) {
                    overlap = true;
                    break;
                }
            }
        } while (overlap);

        const difficulty = Math.floor(Math.random() * 4) + 1;
        const status = 'undiscovered';

        POIs.push(new POI(i + 1, x, y, difficulty, status));
        console.log(`Generated POI ${i + 1} at (${x}, ${y}) with difficulty ${difficulty}`);
    }
}

// Function to draw all POIs on the canvas
function drawPOIs() {
    // Clear canvas and redraw all POIs
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    POIs.forEach(poi => poi.draw());
}

// Event handler for canvas click to update POI status
function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    POIs.forEach(poi => {
        const dx = x - (poi.x - 10);  // Adjust click detection to the circle's position
        const dy = y - (poi.y - 10);
        if (dx * dx + dy * dy <= 25) {  // Clicked within the circle area
            poi.updateStatus();
        }
    });

    drawPOIs();
}

// Event handler for tick button to update POI status
function handleTick() {
    console.log('Tick button pressed');
    POIs.forEach(poi => {
        if (poi.initialized && poi.status === 'exploring') {
            poi.tick();
        }
    });
    drawPOIs();

    // Increment and display the tick counter
    tickCount++;
    tickCounter.innerText = tickCount;
    console.log(`Tick count incremented to ${tickCount}`);
}

// Add event listeners for canvas click and tick button
canvas.addEventListener('click', handleClick);
tickButton.addEventListener('click', handleTick);

// Generate initial POIs and draw them
generatePOIs();
drawPOIs();
