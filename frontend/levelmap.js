myApp.checkUser(); 



const mapContainer = document.getElementById("map");
const levels = 25; // Total number of levels
let currentLevel = myApp.user.level + 1|| 1; // Player starts at level 1



// Function to generate the map tiles
function generateMap() {
    mapContainer.innerHTML = ""; // Clear the map before regenerating

    for (let i = 1; i <= levels; i++) {
        const levelTile = document.createElement("div");
        levelTile.classList.add("level-tile");
        levelTile.dataset.level = i;
        levelTile.innerText = i;

        // Apply styles based on the level state
        if (i < currentLevel) {
            levelTile.classList.add("completed");
        } else if (i === currentLevel) {
            levelTile.classList.add("active");
        } else {
            levelTile.classList.add("locked");
        }

        // Add click event to navigate through the levels
        levelTile.addEventListener("click", () => {
            if (i <= currentLevel) {
                window.location.href = "/quiz.html";
            }
        });

        // Append level tile to map
        mapContainer.appendChild(levelTile);

        // Create path between levels (only after the first level)
        if (i > 1) {
            const path = document.createElement("div");
            path.classList.add("path");
            mapContainer.appendChild(path);
        }
    }
}

// Simulate playing the level and unlocking the next one
function playLevel(level) {
    console.log(`Playing level ${level}...`);
    currentLevel = level + 1; // After playing, unlock the next level
    generateMap(); // Regenerate the map to reflect updated progress
}

// Generate the initial map
generateMap();
