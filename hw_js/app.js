const API_URL = "https://jsonplaceholder.typicode.com/users";

const form = document.getElementById("registration-form");
const successEl = document.getElementById("success")

const usernameEl = document.getElementById("username");
const nameEl = document.getElementById("name");
const familyNameEl = document.getElementById("family-name");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const streetEl = document.getElementById("street");
const cityEl = document.getElementById("city");
const postalCodeEl = document.getElementById("postal-code");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,10}$/;
const postalCodeRegex = /^(\d{4}|\d{5}-\d{4})$/;

const clearErrors = () => {
    document.querySelectorAll(".error").forEach(e => e.remove());
    successEl.textContent = "";
};

const showError = (input, message) => {
    const error = document.createElement("div");
    error.className = "error";
    error.textContent = message;
    input.parentElement.appendChild(error);
};

const validateForm = () => {
    clearErrors();
    let isValid = true;

    if (usernameEl.value.trim().length < 3 || usernameEl.value.trim().length > 10) {
        showError(usernameEl, "Потребителското име трябва да е между 3 и 10 символа.");
        isValid = false;
    }

    if (!nameEl.value.trim() || nameEl.value.length > 50) {
        showError(nameEl, "Името е задължително (до 50 символа).");
        isValid = false;
    }

    if (!familyNameEl.value.trim() || familyNameEl.value.length > 50) {
        showError(familyNameEl, "Фамилията е задължителна (до 50 символа).");
        isValid = false;
    }

    if (!emailRegex.test(emailEl.value.trim())) {
        showError(emailEl, "Невалиден имейл адрес.");
        isValid = false;
    }

    if (!passwordRegex.test(passwordEl.value)) {
        showError(
            passwordEl, 
            "Паролата трябва да е 6-10 символа и да съдържа малки, главни букви и цифри."
        );
        isValid = false;
    }

    if (postalCodeEl.value.trim() && !postalCodeRegex.test(postalCodeEl.value.trim())) {
        showError(
            postalCodeEl, 
            "Пощенският код трябва да е 1111 или 11111-1111."
        );
        isValid = false;
    }

    return isValid;
};

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
        const response = await fetch(API_URL);
        const users = await response.json();

        const usernameExists = users.some(
            user => user.username.toLowerCase() === usernameEl.value.trim().toLowerCase()
        );

        if (usernameExists) {
            showError(usernameEl, "Потребител с това име вече съществува.");
            return;
        }

        const newUser = {
            username: usernameEl.value.trim(),
            name: `${nameEl.value.trim()} ${familyNameEl.value.trim()}`,
            email: emailEl.value.trim(),
            password: passwordEl.value,
            address: {
                street: streetEl.value.trim(),
                city: cityEl.value.trim(),
                zipcode: postalCodeEl.value.trim()
            }
        };

        const postResponse = await fetch(API_URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });
        
        if (postResponse.ok) {
            successEl.textContent = "Успешна регистрация!";
            setTimeout(() => {
                form.reset();
            }, 200);
        }
    } catch(error) {
        console.error(error);
    }
});