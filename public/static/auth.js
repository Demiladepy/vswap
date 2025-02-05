// Toggle between Login and Signup forms
function toggleForm() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}

// Basic form validation
function validateForm(isSignup) {
    const email = document.getElementById(isSignup ? 'signup-email' : 'login-email').value;
    const password = document.getElementById(isSignup ? 'signup-password' : 'login-password').value;
    const phone = isSignup ? document.getElementById('signup-phone').value : null;

    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return false;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return false;
    }

    if (isSignup && (!phone || phone.length < 10)) {
        alert('Please enter a valid phone number');
        return false;
    }

    return true;
}

// Handle Signup form submission
document.getElementById('signup-form-element').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(true)) return; // Validate the signup form

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Signup failed');
        alert('Signup successful!');
        toggleForm(); // Switch to Login form after signup
    } catch (error) {
        alert(error.message);
    }
});

// Handle Login form submission
document.getElementById('login-form-element').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(false)) return; // Validate the login form

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Login failed');
        alert('Login successful!');
        window.location.href = '/home'; // Redirect to home page after login
    } catch (error) {
        alert(error.message);
    }
});