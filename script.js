const sliderValue = document.getElementById("sliderValue");
const slider = document.getElementById("slider");
const rangeInputs = document.querySelectorAll('input[type="range"]');
const inclUppercase = document.getElementById("inclUppercase");
const inclLowercase = document.getElementById("inclLowercase");
const inclNumber = document.getElementById("inclNumber");
const inclSymbol = document.getElementById("inclSymbol");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");
const bar4 = document.getElementById("bar4");

/* slider */
sliderValue.innerHTML = slider.value;
bar1.classList.add("weak");
bar2.classList.add("weak");

slider.oninput = function () {
  sliderValue.innerHTML = this.value;

  /* Strength */

  const levelTxt = document.getElementById("levelTxt");

  if (inclUppercase || inclLowercase || inclNumber || inclSymbol) {
    levelTxt.innerHTML = "too weak!";
    bar1.classList.remove("tooWeak", "weak", "medium", "strong");
    bar2.classList.remove("tooWeak", "weak", "medium", "strong");
    bar3.classList.remove("tooWeak", "weak", "medium", "strong");
    bar4.classList.remove("tooWeak", "weak", "medium", "strong");
    bar1.classList.remove("weak");
    bar1.classList.add("tooWeak");
  }

  if (inclUppercase && inclLowercase || inclUppercase && inclNumber || inclUppercase &&   inclSymbol  || inclLowercase && inclNumber || inclLowercase && inclSymbol || inclNumber && inclSymbol ) {
    levelTxt.innerHTML = "weak";
    bar1.classList.remove("tooWeak", "weak", "medium", "strong");
    bar2.classList.remove("tooWeak", "weak", "medium", "strong");
    bar3.classList.remove("tooWeak", "weak", "medium", "strong");
    bar4.classList.remove("tooWeak", "weak", "medium", "strong");
    bar1.classList.add("weak");
    bar2.classList.add("weak");
  }

  if (inclUppercase && inclLowercase && inclNumber || inclUppercase && inclLowercase && inclSymbol  ||  inclLowercase && inclNumber && inclSymbol ) {
    levelTxt.innerHTML = "medium";
    bar1.classList.remove("tooWeak", "weak", "medium", "strong");
    bar2.classList.remove("tooWeak", "weak", "medium", "strong");
    bar3.classList.remove("tooWeak", "weak", "medium", "strong");
    bar4.classList.remove("tooWeak", "weak", "medium", "strong");
    bar1.classList.add("medium");
    bar2.classList.add("medium");
    bar3.classList.add("medium");
  }

  if (inclUppercase && inclLowercase && inclNumber && inclSymbol) {
    levelTxt.innerHTML = "strong";
    bar1.classList.remove("tooWeak", "weak", "medium", "strong");
    bar2.classList.remove("tooWeak", "weak", "medium", "strong");
    bar3.classList.remove("tooWeak", "weak", "medium", "strong");
    bar4.classList.remove("tooWeak", "weak", "medium", "strong");
    bar1.classList.add("strong");
    bar2.classList.add("strong");
    bar3.classList.add("strong");
    bar4.classList.add("strong");
  }
};

function handleInputChange(e) {
  let target = e.target;

  const min = target.min;
  const max = target.max;
  const val = target.value;

  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}

rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});

/*    Copy to clipboard */
const copyIcon = document.getElementById("copyIcon");
const copyMsg = document.getElementById("copyMsg");

copyIcon.addEventListener("click", copyField);

function copyField() {
  /* Get the text field */
  var copyText = document.getElementById("fieldText").innerHTML;

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);

  copyMsg.style.display = "initial";
}

/* Generate Password */

const generateBtn = document.getElementById("generateBtn");
generateBtn.addEventListener("click", generate);
const fieldText = document.getElementById("fieldText");

function generate(length) {
  const uppercase = document.getElementById("inclUppercase");
  const lowercase = document.getElementById("inclLowercase");
  const numbers = document.getElementById("inclNumber");
  const symbols = document.getElementById("inclSymbol");
  const alert = document.getElementById("alert");

  if (
    uppercase.checked === false &&
    lowercase.checked === false &&
    numbers.checked === false &&
    symbols.checked === false
  ) {
    alert.style.display = "block";
  } else {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numbersChars = "0123456789";
    const symbolsChars = "@#&(§!-)^$*%+=/?";

    let chars = "";
    var length = slider.value;

    if (uppercase.checked === true) {
      chars += uppercaseChars;
    }
    if (lowercase.checked === true) {
      chars += lowercaseChars;
    }
    if (numbers.checked === true) {
      chars += numbersChars;
    }
    if (symbols.checked === true) {
      chars += symbolsChars;
    }

    let password = "";
    let passwordLength = length;
    const array = new Uint32Array(length); // Create 'unsigned' array
    window.crypto.getRandomValues(array);
    for (let i = 0; i < passwordLength; i++) {
      password += chars[array[i] % chars.length]; // % operator returns remainder of division
    }

    fieldText.innerHTML = password;
    fieldText.style.color = "hsl( var(--clr-almostWhite) )";
    copyMsg.style.display = "none";
    alert.style.display = "none";

    return password;
  }
}