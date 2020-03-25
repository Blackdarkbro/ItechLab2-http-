const sumButton = document.getElementById("sum");
const subButton = document.getElementById("sub");
const concButton = document.getElementById("conc");
const cancelButton = document.getElementById("cancel");

const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");

const result = document.getElementById("result");

sumButton.addEventListener("click", (e) => {
    e.preventDefault();
    result.textContent = +value1.value + (+value2.value);
    value2.value = "";
    value1.value = "";
});

subButton.addEventListener("click", (e) => {
    e.preventDefault();
    result.textContent = +value1.value - (+value2.value);
    value2.value = "";
    value1.value = "";
});

concButton.addEventListener("click", (e) => {
    e.preventDefault();
    result.textContent = value1.value + value2.value;
    value2.value = "";
    value1.value = "";
});

cancelButton.addEventListener("click", (e) => {
    e.preventDefault();
    result.textContent = "CANCEL";
    value2.value = "";
    value1.value = "";
});