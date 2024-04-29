var studentTableBody = "studentTableBody";

// Define function to add new student record
function addRecord() {
    // Retrieve input field values
    var name = document.getElementById('name').value;
    var studentId = document.getElementById('studentId').value;
    var email = document.getElementById('email').value;
    var contactNo = document.getElementById('contactNo').value;

    // Validate input fields
    if (name.trim() === '' || studentId.trim() === '' || email.trim() === '' || contactNo.trim() === '') {
        alert('Please fill in all fields.');
        return;
    }

    if (isNaN(studentId) || isNaN(contactNo)) {
        alert('Student ID and Contact No must be numbers.');
        return;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Create a new row in the table with the entered data
    var table = document.getElementById(studentTableBody);
    var newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${studentId}</td>
        <td>${email}</td>
        <td>${contactNo}</td>
        <td><button onclick="editRecord(this)">Edit</button> <button onclick="deleteRecord(this)">Delete</button></td>
    `;

    // Clear the input fields after adding the record
    document.getElementById('name').value = '';
    document.getElementById('studentId').value = '';
    document.getElementById('email').value = '';
    document.getElementById('contactNo').value = '';

    // Save the updated records to local storage
    saveToLocalStorage();

    // Display a success message
    document.getElementById('message').textContent = 'Record added successfully!';
}

// Define function to edit existing record
function editRecord(button) {
    var row = button.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');

    // Populate input fields with data from the row
    document.getElementById('name').value = cells[0].innerText;
    document.getElementById('studentId').value = cells[1].innerText;
    document.getElementById('email').value = cells[2].innerText;
    document.getElementById('contactNo').value = cells[3].innerText;
}

// Define function to delete existing record
function deleteRecord(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    // Save the updated records to local storage
    saveToLocalStorage();
}

// Define function to save records to local storage
function saveToLocalStorage() {
    var tableRows = document.getElementById(studentTableBody).getElementsByTagName('tr');
    var studentRecords = [];

    for (var i = 0; i < tableRows.length; i++) {
        var cells = tableRows[i].getElementsByTagName('td');
        var record = {
            name: cells[0].innerText,
            studentId: cells[1].innerText,
            email: cells[2].innerText,
            contactNo: cells[3].innerText
        };
        studentRecords.push(record);
    }

    localStorage.setItem('studentRecords', JSON.stringify(studentRecords));
}

// Define function to load records from local storage
function loadFromLocalStorage() {
    var studentRecords = JSON.parse(localStorage.getItem(studentRecords));

    if (studentRecords != null) {
        var table = document.getElementById(studentTableBody);
        table.innerHTML = '';

        studentRecords.forEach(function (record) {
            var newRow = table.insertRow();
            newRow.innerHTML = `
                <td>${record.name}</td>
                <td>${record.studentId}</td>
                <td>${record.email}</td>
                <td>${record.contactNo}</td>
                <td><button onclick="editRecord(this)">Edit</button> <button onclick="deleteRecord(this)">Delete</button></td>
            `;
        });
    }
}

// Load records from local storage when the page is loaded
window.onload = function () {
    loadFromLocalStorage();
};

// Add event listener to register button
document.getElementById('registerBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from submitting
    addRecord(); // Call the addRecord function when the button is clicked
});
