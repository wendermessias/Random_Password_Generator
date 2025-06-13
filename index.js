const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!-$^+";
const spaceChar = " ";

function getRandomChar(chars) {
    const index = Math.floor(Math.random() * chars.length);
    return chars[index];
}

function generatePassword() {
    const passwordInput = document.getElementById("password");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const excludeDuplicateCheckbox = document.getElementById("exc-duplicate");
    const spacesCheckbox = document.getElementById("spaces");
    const lengthRange = document.getElementById("lengthRange");

    let characters = "";

    if (lowercaseCheckbox.checked) characters += lowercaseChars;
    if (uppercaseCheckbox.checked) characters += uppercaseChars;
    if (numbersCheckbox.checked) characters += numberChars;
    if (symbolsCheckbox.checked) characters += symbolChars;
    if (spacesCheckbox.checked) characters += spaceChar;

    if (characters === "") {
        passwordInput.value = "";
        updatePasswordStrength();
        return;
    }

    let password = "";
    const length = parseInt(lengthRange.value);

    while (password.length < length) {
        let char = getRandomChar(characters);
        if (excludeDuplicateCheckbox.checked && password.includes(char)) continue;
        password += char;
    }

    passwordInput.value = password;
    updatePasswordStrength();
}

function copyPassword() {
    const passwordInput = document.getElementById('password');
    const copyButton = document.getElementById('copy');

    passwordInput.disabled = false;
    passwordInput.select();
    document.execCommand('copy');
    passwordInput.disabled = true;

    copyButton.textContent = 'Copied';
    setTimeout(() => {
        copyButton.textContent = 'Copy';
    }, 2000);
}

function updateLengthValue() {
    const lengthRange = document.getElementById("lengthRange");
    const lengthValue = document.getElementById("lengthValue");
    lengthValue.textContent = lengthRange.value;
    updatePasswordStrength();
}

function updatePasswordStrength() {
    const passwordInput = document.getElementById("password");
    const strengthBar = document.getElementById("password-strength-bar");
    const password = passwordInput.value;
    let strength = 0;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!-$^+]/.test(password);

    if (hasLower) strength++;
    if (hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSymbol) strength++;
    if (password.length >= 8) strength++;

    strengthBar.classList.remove("weak", "medium", "strong");

    if (password.length < 6 || strength < 3) {
        strengthBar.classList.add("weak");
    } else if (password.length < 10 || strength < 4) {
        strengthBar.classList.add("medium");
    } else {
        strengthBar.classList.add("strong");
    }
}

// FUNÇÃO NOVA: Mudar tema
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
}

// Inicializa a barra de força da senha
updatePasswordStrength();

function updatePasswordStrength() {
    const passwordInput = document.getElementById("password");
    const strengthBar = document.getElementById("password-strength-bar");
    const strengthText = document.getElementById("password-strength-text");
    const password = passwordInput.value;
    let strength = 0;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!-$^+]/.test(password);

    if (hasLower) strength++;
    if (hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSymbol) strength++;
    if (password.length >= 8) strength++;

    strengthBar.classList.remove("weak", "medium", "strong");

    if (password.length < 6 || strength < 2) {
        strengthBar.classList.add("weak");
        strengthText.textContent = "Senha fraca";
        strengthText.style.color = "red";
    } else if (password.length < 10 || strength < 4) {
        strengthBar.classList.add("medium");
        strengthText.textContent = "Senha média";
        strengthText.style.color = "orange";
    } else {
        strengthBar.classList.add("strong");
        strengthText.textContent = "Senha forte";
        strengthText.style.color = "green";
    }
}
