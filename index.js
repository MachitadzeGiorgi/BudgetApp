let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let registrationForm = document.getElementById("registrationForm");
let signInButton = document.getElementById("signInButton");

registrationForm.addEventListener("submit", (event) => {
  let username = usernameInput.value;
  if (!/^[A-Z]/.test(username)) {
    event.preventDefault();
    alert("Username must start with a capital letter.");
    return;
  }

  let password = passwordInput.value;
  if (password.length < 8 || !/\d/.test(password)) {
    event.preventDefault();
    alert(
      "Password must be at least 8 characters long and contain at least one number."
    );
    return;
  }

  let confirmPassword = confirmPasswordInput.value;
  if (password !== confirmPassword) {
    event.preventDefault();
    alert("Password and confirm password do not match.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("Users")) || [];

  let existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    event.preventDefault();
    alert("Username already exists. Please try another username.");
    return;
  }

  let newUser = {
    id: users.length + 1,
    username: username,
    password: password,
  };

  users.push(newUser);
  localStorage.setItem("Users", JSON.stringify(users));

  alert("Registration successful!");
});

signInButton.addEventListener("click", function () {
  registrationForm.classList.add("roll-form");

  setTimeout(function () {
    window.location.href = "login.html";
  }, 1000);
});
