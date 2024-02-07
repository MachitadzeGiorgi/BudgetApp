const budgetContainer = document.getElementById("budgetContainer");

const storedData = JSON.parse(localStorage.getItem("formData"));
const userId = sessionStorage.getItem("userId");

if (storedData) {
  const formDataArray = storedData.filter((entry) => entry.userId === userId);

  formDataArray.forEach((formData) => {
    const section = createBudgetSection(formData);
    budgetContainer.appendChild(section);
  });
}

let addButton = document.getElementById("addBudget");
addButton.addEventListener("click", function () {
  window.location.href = "addbudget.html";
});

const signOutButton = document.getElementById("signOutButton");

signOutButton.addEventListener("click", () => {
  sessionStorage.removeItem("userId");

  const loginPageUrl = "index.html";
  history.pushState(null, "", "index.html");

  window.location.href = "index.html";
});

const formData = storedData.filter((entry) => entry.userId === userId) || [];

const incomeData = formData.filter((entry) => entry.financeType === "Income");
const spendData = formData.filter((entry) => entry.financeType === "Spend");

const incomeTotal = incomeData.reduce(
  (total, entry) => total + Number(entry.amount),
  0
);
const spendTotal = spendData.reduce(
  (total, entry) => total + Number(entry.amount),
  0
);

const differenceValue = incomeTotal - spendTotal;

document.getElementById("income").textContent = `Income: ${incomeTotal}`;
document.getElementById("spend").textContent = `Spend: ${spendTotal}`;
document.getElementById(
  "difference"
).textContent = `Difference: ${differenceValue}`;

function createBudgetSection(formData) {
  const section = document.createElement("section");
  section.classList.add("budget-section");

  const createdAtParagraph = document.createElement("p");
  createdAtParagraph.textContent = `Created at: ${formData.dateTime}`;
  section.appendChild(createdAtParagraph);

  const financeTypeParagraph = document.createElement("p");
  financeTypeParagraph.textContent = `Finance type: ${formData.financeType}`;
  section.appendChild(financeTypeParagraph);

  const categoryParagraph = document.createElement("p");
  categoryParagraph.textContent = `Category: ${formData.category}`;
  section.appendChild(categoryParagraph);

  const amountParagraph = document.createElement("p");
  amountParagraph.textContent = `Amount: ${formData.amount}`;
  section.appendChild(amountParagraph);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  const deleteImage = document.createElement("img");
  deleteImage.src = "./IMG/Trash-icon.svg";
  deleteImage.alt = "delete";
  deleteButton.appendChild(deleteImage);
  section.appendChild(deleteButton);

  return section;
}

const top3IncomeDiv = document.querySelector(".top3income");

if (storedData) {
  const formDataArray = storedData.filter((entry) => entry.userId === userId);

  const incomes = formDataArray.filter(
    (formData) => formData.financeType === "Income"
  );
  const sortedIncomes = incomes.sort((a, b) => b.amount - a.amount);
  const top3Incomes = sortedIncomes.slice(0, 3);

  top3Incomes.forEach((income) => {
    const p = document.createElement("p");
    p.textContent = `${income.category}: ${income.amount}`;
    top3IncomeDiv.appendChild(p);
  });
}

const deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.parentNode;
    const formDataArray = JSON.parse(localStorage.getItem("formData"));

    const index = formDataArray.findIndex((data) => {
      return (
        data.dateTime ===
        section.querySelector("p:first-child").textContent.split(": ")[1]
      );
    });

    if (index !== -1) {
      formDataArray.splice(index, 1);
    }

    localStorage.setItem("formData", JSON.stringify(formDataArray));

    section.remove();
  });
});

const selectElement = document.querySelector("select");
const dateTimeElement = document.querySelector("input[type='datetime-local']");
const categoryElement = document.querySelector("input[type='text']");
const minMaxElement = document.querySelector(".min-max");
const minElement = minMaxElement.querySelector("input[placeholder='Min']");
const maxElement = minMaxElement.querySelector("input[placeholder='Max']");
const filterButton = document.getElementById("filterbtn");

filterButton.addEventListener("click", () => {
  const financeType = selectElement.value;
  const dateTimeValue = dateTimeElement.value;
  const categoryValue = categoryElement.value;
  const minValue = minElement.value;
  const maxValue = maxElement.value;

  const sections = document.querySelectorAll(".budget-section");

  sections.forEach((section) => {
    const sectionFinanceType = section
      .querySelector("p:nth-child(2)")
      .textContent.split(": ")[1];
    const sectionDateTime = section
      .querySelector("p:first-child")
      .textContent.split(": ")[1];
    const sectionCategory = section
      .querySelector("p:nth-child(3)")
      .textContent.split(": ")[1];
    const sectionAmount = Number(
      section.querySelector("p:nth-child(4)").textContent.split(": ")[1]
    );

    const financeTypeMatch =
      financeType === "Finance Type" || sectionFinanceType === financeType;
    const dateTimeMatch =
      dateTimeValue === "" || sectionDateTime.includes(dateTimeValue);
    const categoryMatch =
      categoryValue === "" ||
      sectionCategory.toLowerCase().includes(categoryValue.toLowerCase());
    const minAmountMatch = minValue === "" || sectionAmount >= Number(minValue);
    const maxAmountMatch = maxValue === "" || sectionAmount <= Number(maxValue);

    if (
      financeTypeMatch &&
      dateTimeMatch &&
      categoryMatch &&
      minAmountMatch &&
      maxAmountMatch
    ) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });

  selectElement.value = "Finance Type";
  dateTimeElement.value = "";
  categoryElement.value = "";
  minElement.value = "";
  maxElement.value = "";
});
