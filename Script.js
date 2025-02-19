document.addEventListener('DOMContentLoaded', () => { 
    const starContainer = document.getElementById('star-container');
  
    // Check if the star container is available
    if (!starContainer) {
        console.error('Star container not found');
        return;  // Exit early if the star container is missing
    }

    // Star generation logic
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
    
        // Randomize size, position, and speed
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * -100}vh`;
    
        // Randomize the duration for both movement and fade-out
        const moveDuration = Math.random() * 5 + 5;  // Random movement duration between 5s and 10s
        const fadeDuration = Math.random() * 5 + 5;  // Random fade-out duration between 2s and 7s
        star.style.animationDuration = `${moveDuration}s, ${fadeDuration}s`; // Apply random durations
    
        // Apply different animation delays to stagger the fades
        const fadeDelay = Math.random() * 2;  // Random delay between 0s and 2s
        star.style.animationDelay = `${fadeDelay}s`; // Apply fade delay
    
        // Append star to the container
        starContainer.appendChild(star);
    
        setTimeout(() => {
            star.remove();
        }, (moveDuration + fadeDuration) * 1000); // Remove after both animations are complete
    
        console.log("Star created!");  // Check if the star is created
    }
    
    
    // Continuously create stars at a set interval
    setInterval(createStar, 25);

    // Add event listener for the search button
    const searchButton = document.getElementById('search-btn');
    searchButton.addEventListener('click', handleUserInput);
    
    // Add an event listener for the "Enter" key on the search input
    document.getElementById("search").addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent the default form submission behavior
            document.getElementById("search-btn").click(); // Trigger the search button click logic
        }
    });
    
    // Function to handle user input and bot response
    async function handleUserInput() {
        const searchInput = document.getElementById("search");
        const chatBox = document.getElementById("star-container"); // Container to display messages

        if (searchInput.value.trim() === "") return; // Prevent empty input

        // Create and display the user's input as a message
        const userMessage = document.createElement("div");
        userMessage.className = "message user-message";
        userMessage.textContent = searchInput.value;
        chatBox.appendChild(userMessage);

        // Store the user's input and clear the search field
        const userQuery = searchInput.value;
        searchInput.value = "";

        // Scroll to the latest message
        chatBox.scrollTop = chatBox.scrollHeight;

        // Display a loading animation or placeholder for the bot's response
        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.textContent = "Thinking...";
        chatBox.appendChild(botMessage);

        // Send the user query to your server
        try {
            const response = await fetch('http://127.0.0.1:5500/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: userQuery }),
            });

            const data = await response.json();

            if (data.error) {
                botMessage.textContent = `Error: ${data.error}`;
            } else {
                botMessage.textContent = data.response;
            }
        } catch (error) {
            botMessage.textContent = "Sorry, I couldn't process your request. Please try again.";
            console.error("Error fetching OpenAI API:", error);
        }

        // Scroll to the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    }


    // Check if the drop zone exists before adding event listeners
    const dropZone = document.getElementById('drop-zone');
    const fileUpload = document.getElementById('file-upload');

    if (dropZone && fileUpload) {
        // Trigger the file input when the drop area is clicked
        dropZone.addEventListener('click', () => {
            console.log("Drop zone clicked");
            fileUpload.click();
        });

        // Handle the dragover event
        dropZone.addEventListener('dragover', (event) => {
            console.log("Dragging over drop zone");
            event.preventDefault();
            dropZone.style.backgroundColor = '#555';  // Change color on hoverj
        });

        // Handle the dragleave event
        dropZone.addEventListener('dragleave', () => {
            console.log("Dragging left drop zone");
            dropZone.style.backgroundColor = '#333';  // Reset background color
        });

        // Handle the drop event
        dropZone.addEventListener('drop', (event) => {
            console.log("File dropped");
            event.preventDefault();
            dropZone.style.backgroundColor = '#333';  // Reset background color
            const files = event.dataTransfer.files;
            if (files.length > 0) {
                const fileNames = Array.from(files).map(file => file.name).join(', ');
                dropZone.innerHTML = `<p>Files: ${fileNames}</p>`;  // Show dropped file names
            }
        });

        // Handle file selection via the file input
        fileUpload.addEventListener('change', () => {
            const files = fileUpload.files;
            if (files.length > 0) {
                const fileNames = Array.from(files).map(file => file.name).join(', ');
                dropZone.innerHTML = `<p>Files: ${fileNames}</p>`;  // Show selected file names
            }
        });
    }
});

// Add an event listener for the search button
document.getElementById("search-btn").addEventListener("click", () => {
    const searchInput = document.getElementById("search");
    const chatBox = document.getElementById("star-container"); // Container to display messages

    if (searchInput.value.trim() === "") return; // Prevent empty input

    // Create and display the user's input as a message
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = searchInput.value;
    chatBox.appendChild(userMessage);

    // Clear the search input field
    searchInput.value = "";

    // Scroll to the latest message (optional for large containers)
    chatBox.scrollTop = chatBox.scrollHeight;

    // Simulate a bot response (optional)
    setTimeout(() => {
        const botMessage = document.createElement("div");
        botMessage.className = "message bot-message";
        botMessage.textContent = "You entered: " + userMessage.textContent; // Respond dynamically
        chatBox.appendChild(botMessage);

        // Scroll to the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
});

// Add an event listener for the "Enter" key on the search input
document.getElementById("search").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission behavior
        document.getElementById("search-btn").click(); // Trigger the search button click logic
    }
});
 
// Function to handle user input and bot response
async function handleUserInput() {
    const searchInput = document.getElementById("search");
    const chatBox = document.getElementById("star-container"); // Container to display messages

    if (searchInput.value.trim() === "") return; // Prevent empty input

    // Create and display the user's input as a message
    const userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = searchInput.value;
    chatBox.appendChild(userMessage);

    // Store the user's input and clear the search field
    const userQuery = searchInput.value;
    searchInput.value = "";

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    // Display a loading animation or placeholder for the bot's response
    const botMessage = document.createElement("div");
    botMessage.className = "message bot-message";
    botMessage.textContent = "Thinking...";
    chatBox.appendChild(botMessage);

    // Send the user query to your server (instead of directly to OpenAI)
    try {
        const response = await fetch('http://127.0.0.1:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userQuery }),
        });

        const data = await response.json();

        if (data.error) {
            botMessage.textContent = `Error: ${data.error}`;
        } else {
            botMessage.textContent = data.response;
        }
    } catch (error) {
        botMessage.textContent = "Sorry, I couldn't process your request. Please try again.";
        console.error("Error fetching OpenAI API:", error);
    }

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

fetch('http://127.0.0.1:3000/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: searchInput.value })
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Bot response:', data.response); // Log the bot response
    const botMessage = document.createElement("div");
    botMessage.className = "message bot-message";
    botMessage.textContent = data.response; // Use the actual response
    chatBox.appendChild(botMessage);
  })
  .catch((error) => {
    console.error('Error:', error); // Log any errors
  });