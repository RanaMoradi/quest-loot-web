// Array declared outside event listener so it persists between clicks
let loot = [];

// Get references to all page elements
let addBtn = document.getElementById('addBtn');
let lootNameInput = document.getElementById('lootName');
let lootValueInput = document.getElementById('lootValue');
let lootList = document.getElementById('lootList');
let totalDisplay = document.getElementById('total');
let message = document.getElementById('message');

// Listen for button click - this is event-driven programming
// The code below only runs when the user clicks the button
addBtn.addEventListener('click', function() {

    // Clear previous message
    message.textContent = '';

    // Read input values from the page
    let name = lootNameInput.value.trim();
    let value = parseFloat(lootValueInput.value);

    // Validate: name must not be empty
    if (name === '') {
        message.textContent = 'Please enter a loot name.';
        return;
    }

    // Validate: value must be a valid positive number
    if (isNaN(value) || value <= 0) {
        message.textContent = 'Please enter a valid positive number for value.';
        return;
    }

    // Check for duplicate item names (case insensitive)
    let duplicate = false;
    for (let i = 0; i < loot.length; i++) {
        if (loot[i].name.toLowerCase() === name.toLowerCase()) {
            duplicate = true;
            break;
        }
    }
    if (duplicate) {
        message.textContent = 'That item already exists! Please enter a different item.';
        return;
    }

    // Create loot object and push into array - same structure as terminal version
    let item = { name: name, value: value };
    loot.push(item);

    // Clear input fields after adding
    lootNameInput.value = '';
    lootValueInput.value = '';

    // Loop through array to render loot list to the page
    lootList.innerHTML = '';
    for (let i = 0; i < loot.length; i++) {
        let li = document.createElement('li');
        li.textContent = '[' + (i + 1) + '] ' + loot[i].name + ' - ' + loot[i].value;
        lootList.appendChild(li);
    }

    // Loop to calculate total value
    let total = 0;
    for (let i = 0; i < loot.length; i++) {
        total = total + loot[i].value;
    }

    // Display total on the page
    totalDisplay.textContent = 'Total Loot Value: ' + total;
});

/*
DEBUGGING REFLECTION:

I placed a breakpoint inside the addEventListener callback in loot.js.

Before clicking Add Loot:
- The loot array was empty []
- The lootList on the page showed nothing
- The total displayed nothing

After clicking Add Loot with a valid item:
- The loot array updated immediately to contain the new object
  e.g. [{ name: "Sword", value: 50 }]
- State changed at the moment loot.push(item) executed
- The screen updated right after, when the render loop ran
  and lootList.innerHTML was rebuilt

Key observation:
- In the terminal version, a while loop kept the program running
- In this version, the program sits idle until a click event fires
- The click is what starts the process, not a continuous loop
- Data and display stay in sync because we re-render the full
  list every time a new item is added
*/