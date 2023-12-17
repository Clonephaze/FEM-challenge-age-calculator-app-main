function animateResult(element) {
    element.animate([
        // keyframes
        { opacity: 0 }, 
        { opacity: 1 }
    ], { 
        // timing options
        duration: 1000,
        iterations: 1
    });
}

document.querySelector('.button').addEventListener("click", function () {
    const day = document.querySelector('.day-entry .entry-box').value;
    const month = document.querySelector('.month-entry .entry-box').value;
    const year = document.querySelector('.year-entry .entry-box').value;

    // Clear previous error messages
    document.getElementById('day-error').textContent = '';
    document.getElementById('month-error').textContent = '';
    document.getElementById('year-error').textContent = '';

    // Check if any field is empty
    if (!day || !month || !year) {
        if (!day) {
            document.getElementById('day-error').textContent = 'This field is required';
        }
        if (!month) {
            document.getElementById('month-error').textContent = 'This field is required';
        }
        if (!year) {
            document.getElementById('year-error').textContent = 'This field is required';
        }
        return;
    }

    // Check if day is between 1 and 31
    if (day < 1 || day > 31) {
        document.getElementById('day-error').textContent = 'Must be a valid day';
        return;
    }

    // Check if month is between 1 and 12
    if (month < 1 || month > 12) {
        document.getElementById('month-error').textContent = 'Must be a valid month';
        return;
    }

    // Check if year is in the past
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
        document.getElementById('year-error').textContent = 'Must be in the past';
        return;
    }

    // Check if the date is valid
    const userDate = new Date(year, month - 1, day);
    if (userDate.getDate() != day || userDate.getMonth() + 1 != month || userDate.getFullYear() != year) {
        document.getElementById('day-error').textContent = 'Must be a valid date';
        return;
    }

    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - userDate;

    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    const years = Math.floor(differenceInDays / 365.25);
    let remainingDays = differenceInDays % 365.25;

    const months = Math.floor(remainingDays / 30.44);
    remainingDays = remainingDays % 30.44;

    document.getElementById('calculator-result-year').textContent = years;
    document.getElementById('calculator-result-month').textContent = months;
    document.getElementById('calculator-result-day').textContent = Math.round(remainingDays);
    animateResult(document.getElementById('calculator-result-year'));
    animateResult(document.getElementById('calculator-result-month'));
    animateResult(document.getElementById('calculator-result-day'));
});

// Get all input fields
var inputs = document.querySelectorAll('.entry-box');

// Add event listener to each input field
inputs.forEach(function (input) {
    input.addEventListener('input', function (e) {
        var value = e.target.value;
        var isValid = true;

        // Check if the value is within the expected range
        if (input.placeholder === 'DD') {
            isValid = value >= 1 && value <= 31;
        } else if (input.placeholder === 'MM') {
            isValid = value >= 1 && value <= 12;
        } else if (input.placeholder === 'YYYY') {
            isValid = value >= 1 && value <= 2023;
        }

        // Change the border color based on the validity of the value
        if (isValid) {
            input.style.borderColor = 'var(--LightGrey)';
        } else {
            input.style.borderColor = 'var(--LightRed)';
        }
    });
});
inputs.forEach(function (input) {
    input.addEventListener('keydown', function (e) {
        var key = e.keyCode ? e.keyCode : e.which;

        // Allow: backspace, delete, tab, escape, enter and numbers
        if ([46, 8, 9, 27, 13, 110, 190].indexOf(key) !== -1 ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
            (key >= 96 && key <= 105)) {
            return;
        }

        // Prevent the default action (input) for all other keys
        e.preventDefault();
    });
});
document.querySelector('.day-entry .entry-box').addEventListener('input', function() {
    document.getElementById('day-error').textContent = '';
});
document.querySelector('.month-entry .entry-box').addEventListener('input', function() {
    document.getElementById('month-error').textContent = '';
});
document.querySelector('.year-entry .entry-box').addEventListener('input', function() {
    document.getElementById('year-error').textContent = '';
});
