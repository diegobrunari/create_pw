let passwordLength = 16;
const inputEl = document.getElementById("password")
const upperCaseCheckEl = document.getElementById('uppercase-check')
const numberCheckEl = document.getElementById('number-check')
const symbolCheckEl = document.getElementById('symbol-check')
const securityIndicatorBar = document.getElementById('security-indicator-bar')
const copyBtnEl = document.getElementById('copyBtn')

function generatePassword(){
    let chars = 'abcdefghjklmnpqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const numberChars = '123456789'
    const symbolChars = '?!@&*()[]'

    if(upperCaseCheckEl.checked){
        chars += upperCaseChars
    }
    if(numberCheckEl.checked) {
        chars += numberChars
    }
    if(symbolCheckEl.checked) {
        chars += symbolChars
    }

    let password = '';

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    inputEl.value = password

    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round((passwordLength / 64) * 25 + 
    (upperCaseCheckEl.checked ? 15 : 0) +
    (numberCheckEl.checked ? 25 : 0) +
    (symbolCheckEl.checked ? 35 : 0))

    securityIndicatorBar.style.width = `${percent}%`
    
    if (percent > 69) {
        securityIndicatorBar.classList.remove('critical')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.add('safe')
    } else if (percent > 50) {
        securityIndicatorBar.classList.remove('critical')
        securityIndicatorBar.classList.remove('safe')
        securityIndicatorBar.classList.add('warning')
    } else {
        securityIndicatorBar.classList.remove('safe')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.add('critical')
    }

    if (percent >= 100) {
        securityIndicatorBar.classList.add('completed')
    } else {
        securityIndicatorBar.classList.remove('completed')
    }
}

function calculateFontSize(){
    if (passwordLength >= 45) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xs')
        inputEl.classList.add('font-xxs')
    } else if (passwordLength >= 32) {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xxs')
        inputEl.classList.add('font-xs')
    } else if (passwordLength >= 22) {
        inputEl.classList.remove('font-xs')
        inputEl.classList.remove('font-xxs')
        inputEl.classList.add('font-sm')
    } else {
        inputEl.classList.remove('font-sm')
        inputEl.classList.remove('font-xxs')
        inputEl.classList.remove('font-xs')
    }
}

const passwordLengthEl = document.getElementById('password-length')
passwordLengthEl.addEventListener('input', () => {
  passwordLength = passwordLengthEl.value
  document.getElementById('password-length-text').innerText = passwordLength
  generatePassword()
})

upperCaseCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)
numberCheckEl.addEventListener('click', generatePassword)
document.getElementById('refreshBtn').addEventListener('click', generatePassword)

function copy() {
    navigator.clipboard.writeText(inputEl.value)
}

document.getElementById('copy-password').addEventListener('click', copy)
document.getElementById('copyBtn').addEventListener('click', copy)

generatePassword()