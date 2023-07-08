let passwordDisplay = document.querySelector('[data-PasswordDisplay]');
let dataCpy = document.querySelector('[data-copy]');
let inputSlider = document.querySelector('[data-lengthSlider]');
let upperCase = document.querySelector('#upperCase');
let lowerCase = document.querySelector('#lowerCase');
let numbers = document.querySelector('#number');
let symbols = document.querySelector('#symbol');
let dataIndicator = document.querySelector('[data-Indicator]');
let indicator = document.querySelector('[data-Indicator]');
let passwordGenerate = document.querySelector('#generate_Password');
let allCheckBox = document.querySelectorAll("input[type=checkbox]");
const lengthDisplay = document.querySelector('.data-lengthInput');
let datacopyMsg = document.querySelector('[datacopy-Msg]');

let password = "";
let passwordLength = 8;
let checkCount = 0;

handleSlider();
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    // shadow
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNo() {
    return random(0, 9);
}

function generateUpperCase() {
    return String.fromCharCode(random(65, 91));
}

function generateLowerCase() {
    return String.fromCharCode(random(97, 113));
}

const specialSymbol = `"~!@#$%^&*()_+[[}}:";'<>,.?/'`;

function generateSymbol() {
    let randomNo = random(0, specialSymbol.length);
    return specialSymbol.charAt(randomNo);
}

function calcStrength() {
    console.log('main call hua bro');
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if (upperCase.checked) hasUpper = true;
    if (lowerCase.checked) hasLower = true;
    if (numbers.checked) hasNumber = true;
    if (symbols.checked) hasSymbol = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator('#0f0');
    }
    else if ((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordLength >= 6) {
        setIndicator('#ff0');
    }
    else {
        setIndicator('#f00');
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        datacopyMsg.innerText = "Copied";
    } catch (e) {
        datacopyMsg.innerText = "Failed";
    }
    datacopyMsg.classList.add('active');

    setTimeout(() => {
        datacopyMsg.classList.remove("active");
    }, 2000);
}

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

dataCpy.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
})

function handleCheckBoxChange() {
    checkCount = 0;
    console.log("cheaking checkBox Bro");
    allCheckBox.forEach((c) => {
        if (c.checked)
            checkCount++;
    });
    console.log(checkCount);

    // special condition
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

function shufflePassword(array) {
    // Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    let str = "";
    array.forEach((el) => { str += el });
    return str;
}

let generatePass = () => {
    if (checkCount <= 0) {
        console.log('CheckBox tick hi ni h bro');
        return;
    }

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    let password = "";

    let funArr = [];

    if (upperCase.checked) funArr.push(generateUpperCase);
    if (lowerCase.checked) funArr.push(generateLowerCase);
    if (numbers.checked) funArr.push(generateRandomNo);
    if (symbols.checked) funArr.push(generateSymbol);

    // compulsory
    for (let i = 0; i < funArr.length; i++)
        password += funArr[i]();

    // for remaining
    for (let i = 0; i < passwordLength - funArr.length; i++) {
        let randIdx = random(0, funArr.length);
        password += funArr[randIdx]();
    }

    // shuffle the password
    password = shufflePassword(Array.from(password));

    // show in UI
    passwordDisplay.value = password;
    calcStrength();
}
// passwordGenerate.addEventListener('click', () => {
//     if (checkCount <= 0) {
//         console.log('CheckBox tick hi ni h bro');
//         return;
//     }

//     if (passwordLength < checkCount) {
//         passwordLength = checkCount;
//         handleSlider();
//     }

//     let password = "";

//     let funArr = [];

//     if (upperCase.checked) funArr.push(generateUpperCase);
//     if (lowerCase.checked) funArr.push(generateLowerCase);
//     if (number.checked) funArr.push(generateRandomNo);
//     if (symbol.checked) funArr.push(generateSymbol);

//     // compulsory
//     for (let i = 0; i < funArr.length; i++)
//         password += funArr[i]();
//         console.log(password);

//     // for remaining
//     for (let i = 0; i < passwordLength - funArr.length; i++) {
//         let randIdx = random(0, funArr.length);
//         console.log('randomIdx', randIdx);
//         password += funArr[randIdx]();
//     }

//     // shuffle the password
//     password = shufflePassword(Array.from(password));

//     // show in UI
//     passwordDisplay.value = password;
//     calcStrength();
// });
