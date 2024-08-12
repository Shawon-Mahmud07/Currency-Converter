const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn-box button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".message");

for (let select of dropdowns) {
  for (currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (currencyCode === "USD" && select.name === "from") {
      newOption.selected = "selected";
    } else if (currencyCode === "BDT" && select.name === "to") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  // update flag when currency selected from dropdown
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// update flag
const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
   exchangeUpdateRate();
});

const exchangeUpdateRate = async() => {
   let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue < 1 || amountValue === "") {
    amountValue = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  let convertedAmount = amountValue * exchangeRate;
  msg.innerText = `${amountValue} ${fromCurr.value} = ${convertedAmount.toFixed(
    2
  )} ${toCurr.value}`;
}
window.addEventListener("load", exchangeUpdateRate)

