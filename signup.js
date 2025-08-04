function validateForm() {
    // Get form values
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Clear previous error messages
    clearErrors();

    // Validation flags
    let isValid = true;

    // Name validation
    if (fullName === '') {
        displayError('fullName-error', 'Name is required.');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        displayError('email-error', 'Please enter a valid email address.');
        isValid = false;
    }

    // Phone number validation: must start with +254 and be 13 characters total
    const phoneRegex = /^\+254\d{9}$/;
    if (!phoneRegex.test(phone)) {
        displayError('phone-error', 'Phone number must start with +254 and be followed by exactly 9 digits (e.g., +254712345678).');
        isValid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        displayError('password-error', 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).');
        isValid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        displayError('confirmPassword-error', 'Passwords do not match.');
        isValid = false;
    }

    // If all validations pass, allow form submission
    return isValid;
}

// Function to display error messages
function displayError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '12px';
}

// Function to clear all error messages
function clearErrors() {
    const errorElements = document.getElementsByClassName('error-message');
    for (let element of errorElements) {
        element.textContent = '';
    }
}

// Real-time validation feedback
document.getElementById('signupForm').addEventListener('input', function(e) {
    const target = e.target;

    if (target.id === 'fullName') {
        if (target.value.trim() === '') {
            displayError('fullName-error', 'Name is required.');
        } else {
            document.getElementById('fullName-error').textContent = '';
        }
    }

    if (target.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (target.value && !emailRegex.test(target.value.trim())) {
            displayError('email-error', 'Please enter a valid email address.');
        } else {
            document.getElementById('email-error').textContent = '';
        }
    }

    if (target.id === 'phone') {
        const phoneRegex = /^\+254\d{9}$/;
        if (target.value && !phoneRegex.test(target.value.trim())) {
            displayError('phone-error', 'Phone number must start with +254 and be followed by exactly 9 digits.');
        } else {
            document.getElementById('phone-error').textContent = '';
        }
    }

    if (target.id === 'password') {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (target.value && !passwordRegex.test(target.value)) {
            displayError('password-error', 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.');
        } else {
            document.getElementById('password-error').textContent = '';
        }
    }

    if (target.id === 'confirmPassword') {
        const password = document.getElementById('password').value;
        if (target.value && target.value !== password) {
            displayError('confirmPassword-error', 'Passwords do not match.');
        } else {
            document.getElementById('confirmPassword-error').textContent = '';
        }
    }
});