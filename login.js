let usernameInput = document.getElementById("usernameInput");
let passwordInput = document.getElementById("passwordInput");
let loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function (event) {
  event.preventDefault();

  let username = usernameInput.value;
  let password = passwordInput.value;

  let users = JSON.parse(localStorage.getItem("Users")) || [];

  let existingUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (existingUser) {
    sessionStorage.setItem("userId", existingUser.id);

    window.location.href = "addbudget.html";
  } else {
    alert("Invalid username or password. Please try again.");

    usernameInput.value = "";
    passwordInput.value = "";
  }
});
