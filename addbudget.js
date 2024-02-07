document.addEventListener("DOMContentLoaded", function () {
  const financeTypeSelect = document.querySelector("select");
  const dateTimeInput = document.querySelector('input[type="datetime-local"]');
  const categoryInput = document.querySelector('input[type="text"]');
  const amountInput = document.querySelector('input[type="number"]');
  const saveButton = document.getElementById("savebtn");

  saveButton.addEventListener("click", function (e) {
    e.preventDefault();

    const financeType = financeTypeSelect.value;
    const dateTime = dateTimeInput.value;
    const category = categoryInput.value;
    const amount = amountInput.value;

    if (!financeType || !dateTime || !category || !amount) {
      alert("Please fill in all required fields!");
      return;
    }

    const userID = sessionStorage.getItem("userId");

    const formData = {
      id: new Date().getTime(),
      financeType: financeType,
      dateTime: dateTime,
      category: category,
      amount: amount,
      userId: userID,
    };

    const storedData = localStorage.getItem("formData");
    let formDataArray = [];
    if (storedData) {
      formDataArray = JSON.parse(storedData);
    }

    formDataArray.push(formData);

    localStorage.setItem("formData", JSON.stringify(formDataArray));

    financeTypeSelect.value = "Finance Type";
    dateTimeInput.value = "";
    categoryInput.value = "";
    amountInput.value = "";

    alert("Form values saved successfully!");
  });
});
