document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll(".callback-form");

    forms.forEach(form => {
        form.addEventListener("submit", function(e) {
            let isValid= true;

            const nameInput = form.querySelector('input[name="name"], input[id="fname"]');
            const phoneInput = form.querySelector('input[type="tel"]');
            const emailInput = form.querySelector('input[type="email"]');
            const postcodeInput = form.querySelector('input[name="postcode"]');
            const messageInput = form.querySelector('textarea[name="message"]');

            // Sanitize name input
            if (nameInput) {
                nameInput.value = nameInput.value.trim();

                const nameValue = nameInput.value;
                // Regex allows letters, spaces, hyphens, and apostrophes
                const nameRegex = /^[A-Za-z\s'-]{2,50}$/;

                // Regex catches 3 or more identical repeated characters
                const repeatedCharacters = /(.)\1{2,}/;

                //check if name has length >= 4 and have at least one vowel(a,e,i,o,u)
                const hasVowel = /[aeiouAEIOU]/.test(nameValue);

                if (nameInput.value.length < 2) {
                    setError(nameInput, "Please enter a valid name!");
                    isValid = false;
                } else if (!nameRegex.test(nameInput.value)) {
                    setError(nameInput, "Name should only contain letters.");
                    isValid = false;
                } else if (repeatedCharacters.test(nameInput.value.toLowerCase())) {
                    setError(nameInput, "Please enter a valid name.");
                    isValid = false;
                } else if (nameValue.length >= 4 && !hasVowel) {
                    setError(nameInput, "Please enter a real name.");
                    isValid = false;
                } else {
                    setSuccess(nameInput);
                }
            }

            // Sanitize Phone number
            if(phoneInput) {
                phoneInput.value = phoneInput.value.trim();
                const phoneRegex = /^[\d\s\+\-\(\)]{10,11}$/;

                if (!phoneRegex.test(phoneInput.value)) {
                    setError(phoneInput, "Please enter a valid phone number (at least 10 digits)");
                    isValid = false;
                } else {
                    setSuccess(phoneInput);
                }
            }

            // Email sanitisation
            if(emailInput) {
                emailInput.value = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if(!emailRegex.test(emailInput.value)) {
                    setError(emailInput, "Please enter a valid email address.");
                    isValid = false;
                } else {
                    setSuccess(emailInput);
                }
            }

            //sanitize UK postcode if present in the form
            if(postcodeInput) {
                // remove extra spaces and automatically upercase the letters (e.g sa15 4mm -> SA15 4MM)
                postcodeInput.value = postcodeInput.value.trim().toUpperCase();

                const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/;

                if (!ukPostcodeRegex.test(postcodeInput.value)) {
                    setError(postcodeInput, "Please enter a valid UK postcode (e.g., EN5 1AB).");
                    isValid = false;
                } else {
                    setSuccess(postcodeInput);
                }
            }

            if(messageInput) {
                // Sanitize message field
                messageInput.value = escapeHTML(messageInput.value.trim())
            }

            //Block submission if any validation fails
            if(!isValid) {
                e.preventDefault();
            }
        });
    });


    function setError(input, message) {
        input.style.borderColor = "#e63946";
        input.style.backgroundColor = "rgba(230, 57, 70, 0.03)";
        
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains("form-error-text")) {
            errorDiv = document.createElement("div");
            errorDiv.className = "form-error-text";
            errorDiv.style.color = "#e63946";
            errorDiv.style.fontSize = "0.8rem";
            errorDiv.style.marginTop = "0.3rem";
            input.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    function setSuccess(input) {
        input.style.borderColor = "#2a9d8f";
        input.style.backgroundColor = "rgba(42, 157, 143, 0.02)";
        
        let errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains("form-error-text")) {
            errorDiv.remove();
        }
    }
});

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag));
    }