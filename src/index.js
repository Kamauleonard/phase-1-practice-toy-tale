let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // Toggle the toy form's visibility
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // Fetch and display toys
  fetchToys();

  // Add event listener for the toy form submission
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;

    // Create a new toy object
    const newToy = {
      name: name,
      image: image,
      likes: 0,
    };

    // Add the new toy
    addNewToy(newToy);
  });

  // Add event listeners for "Like" buttons
  const toyCollection = document.getElementById("toy-collection");
  toyCollection.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-btn")) {
      const toyId = event.target.id;
      const likesElement = event.target.previousElementSibling;

      // Calculate the new number of likes
      const currentLikes = parseInt(likesElement.textContent);
      const newLikes = currentLikes + 1;

      // Update the toy's likes in the DOM
      likesElement.textContent = `${newLikes} Likes`;

      // Send a PATCH request to update the likes
      updateLikes(toyId, newLikes);
    }
  });
});

// Function to fetch toys and display them
function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => {
      toys.forEach((toy) => {
        createToyCard(toy);
      });
    });
}

// Function to create a toy card and add it to the DOM
function createToyCard(toy) {
  const toyCollection = document.getElementById("toy-collection");
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;

  toyCollection.appendChild(card);
}

// Function to add a new toy
function addNewToy(newToy) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newToy),
  })
    .then((response) => response.json())
    .then((toy) => {
      createToyCard(toy);
    });
}

// Function to update a toy's likes with a PATCH request
function updateLikes(toyId, newLikes) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes: newLikes }),
  })
    .then((response) => response.json())
    .then((updatedToy) => {
      // Handle the response if needed
    });
}
