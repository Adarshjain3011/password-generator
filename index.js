
const inputSlider = document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthContainer]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const lowercaseCheck = document.querySelector("#lowercase");
const uppercaseCheck = document.querySelector("#uppercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#Symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".Generatebutton");

const allCheckbox = document.querySelectorAll("input[type=checkbox]");

const symbol = '~+-*/.,!#$%^&*()}{]['

let password = "";

let password_length = 10;

let checkCount = 0;

setIndicator("#ccc")
// console.log(allCheckbox);
//set password-length

handle_slider();

// set password length---->

function handle_slider() {

    inputSlider.value = password_length;
    lengthDisplay.innerText = password_length;

    const min = inputSlider.min;

    const max = inputSlider.max;

    console.log("min" +min);

    console.log("max" +max)
    
    inputSlider.style.backgroundSize = ((password_length -min)*100 /(max-min) ) +"% 100%";

    console.log("bs "+inputSlider.style.backgroundSize);
}


function setIndicator(color) {

    indicator.style.backgroundColor = color;

    indicator.style.boxShadow = '0px 0px 12px 1px ${color}';


}

function getRndInteger(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}

function generateRandomNumber() {

    return getRndInteger(0, 9);

}

function generateLowercase() {

    return String.fromCharCode(getRndInteger(97, 122));

}

function generateUpercase() {

    return String.fromCharCode(getRndInteger(65, 90));

}

function generateSymbol() {

    const randNum = getRndInteger(0, symbol.length);

    return symbol.charAt(randNum);

}

function calcStrength() {

    hasLower = false;
    hasUpper = false;
    hasNumber = false;
    hasSymbol = false;

    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (symbolCheck.checked) hasSymbol = true;
    if (numberCheck.checked) hasNumber = true;

    if (hasUpper && hasLower && (hasNumber || hasSymbol) && password_length >= 8) {

        setIndicator("#0f0");

    }

    else if ((hasLower || hasUpper) && (hasNumber || hasSymbol) && password_length >= 6) {

        setIndicator("#ff0")
    }

    else {

        setIndicator("#f00");
    }


}

async function copy_content() {

    try {

        await navigator.clipboard.writeText(passwordDisplay);

        copyMsg.innerText = "copied";

    } catch (e) {

        copyMsg.innerText = "failed";

    }

    copyMsg.classList.add("active");

    setTimeout(() => {

        copyMsg.classList.remove("active");

    }, 3000)

}

function shufflePassword(array){

    // fisher yates method ----->

    for(let i=array.length-1;i>0;i--){

        const j = Math.floor(Math.random() *(i+1));

        const temp = array[i];
        
        array[i] = array[j];

        array[j] = temp;


    }

    let str ="";

    array.forEach((el)=>{str+=el});

    return str;
}

function handleCheckBoxChange(){

    checkCount =0;

    allCheckbox.forEach( (checkbox) =>{

        if(checkbox.checked){

            checkCount++;
        }    
    })

    // special-condition

    if(password_length < checkCount){

        password_length = checkCount;

        handle_slider();

    }
}

allCheckbox.forEach( (checkbox) => {

    checkbox.addEventListener('change',handleCheckBoxChange)

})


inputSlider.addEventListener('input', (e) =>{

    password_length = e.target.value;

    handle_slider();

})



// yaha dikkat ho sakti hai 


copyBtn.addEventListener('click',()=>{

    if(passwordDisplay.value){

        copy_content();

    }
    
})


generateBtn.addEventListener('click',() => {

    // none of the check box are selected -->

    if(checkCount == 0){

        return;
    }

    if(password_length < checkCount){

        password_length = checkCount;

        handle_slider();
    }

    // let start journey to find out new password -->

    //remove  old password -->


    password="";

    //lets put the stuff mentioned by checkboxes ------>


    let funArr =[];

    if(uppercaseCheck.checked){

        funArr.push(generateUpercase);

        console.log("upper");

    }
    if(lowercaseCheck.checked){

        funArr.push(generateLowercase);

        console.log("lower");

    }

    if(numberCheck.checked){

        funArr.push(generateRandomNumber);


    }

    if(symbol.checked){

        funArr.push(generateSymbol);

    }

    // compulsary addition --->

    for(let i=0;i<funArr.length;i++){

        password += funArr[i]();


    }

    // console.log("hum hai" +password);

    
    // remainning addition ----------->

    for(let i=0;i<password_length - funArr.length;i++){

        let randIndex = getRndInteger(0,funArr.length);

        password+=funArr[randIndex]();
    }

    //shuffle the password ----------->

    // console.log("hum hai" +password.length);
    password = shufflePassword(Array.from(password));

    // show in UI

    console.log(password);

    passwordDisplay.value = password;

    // claculate the strength ---->

    calcStrength();

})






