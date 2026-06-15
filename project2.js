// Wait for page to load
document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('myForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Event Listeners - validate on blur
    username.addEventListener('blur', () => validate(username, checkUsername));
    email.addEventListener('blur', () => validate(email, checkEmail));
    password.addEventListener('blur', () => validate(password, checkPassword));
    confirmPassword.addEventListener('blur', () => validate(confirmPassword, checkConfirmPassword));

    // Event Listeners - clear error on input
    username.addEventListener('input', () => clearError(username));
    email.addEventListener('input', () => clearError(email));
    password.addEventListener('input', () => clearError(password));
    confirmPassword.addEventListener('input', () => clearError(confirmPassword));

    // Validate function
    function validate(input, validationFn) {
        const group = input.closest('.input-group');
        const errorText = group.querySelector('.error-text');
        
        // Run validation
        const error = validationFn(input.value);
        
        if (error) {
            // Show error
            group.classList.remove('success');
            group.classList.add('error');
            errorText.textContent = error;
        } else {
            // Show success
            group.classList.remove('error');
            group.classList.add('success');
            errorText.textContent = '';
        }
    }

    // Clear error function
    function clearError(input) {
        const group = input.closest('.input-group');
        const errorText = group.querySelector('.error-text');
        
        group.classList.remove('error');
        errorText.textContent = '';
    }

    // Validation Rules
    function checkUsername(value) {
        if (value === '') return 'Username is required';
        if (value.length < 3) return 'Username must be at least 3 characters';
        if (value.length > 20) return 'Username must be less than 20 characters';
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Only letters, numbers and underscore allowed';
        return '';
    }

    function checkEmail(value) {
        if (value === '') return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return '';
    }

    function checkPassword(value) {
        if (value === '') return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (!/[A-Z]/.test(value)) return 'Password must have 1 uppercase letter';
        if (!/[a-z]/.test(value)) return 'Password must have 1 lowercase letter';
        if (!/[0-9]/.test(value)) return 'Password must have 1 number';
        return '';
    }

    function checkConfirmPassword(value) {
        if (value === '') return 'Please confirm your password';
        if (value !== password.value) return 'Passwords do not match';
        return '';
    }

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Validate all fields
        validate(username, checkUsername);
        validate(email, checkEmail);
        validate(password, checkPassword);
        validate(confirmPassword, checkConfirmPassword);

        // Check if any field has error class
        const errorGroups = document.querySelectorAll('.input-group.error');
        
        if (errorGroups.length > 0) {
            isValid = false;
            errorGroups[0].querySelector('input').focus();
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
            
            // Remove success classes
            document.querySelectorAll('.input-group').forEach(group => {
                group.classList.remove('success');
            });
        }
    });

});