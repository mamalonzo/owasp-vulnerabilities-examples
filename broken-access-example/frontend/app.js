/**
 * Event listener for when user presses login button.
 */
document.getElementById("login-button").addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email-login").value;
  const password = document.getElementById("password-login").value;
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        window.location.href = "/profile/" + data.userId;
      }
    });
});

/**
 * Event listener for when user presses register button.
 */
document.getElementById("register-button").addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email-register").value;
  if (email.trim().length == 0) {
    console.log("Email cannot be empty");
    return;
  } else if (/^\S+@\S+\.\S+$/.test(email) == false) {
    console.log("Email is invalid");
    return;
  }
  const name = document.getElementById("name").value;
  if (name.trim().length == 0) {
    console.log("Name cannot be empty");
    return;
  }
  const password = document.getElementById("password-register").value;
  if (password.trim().length == 0) {
    console.log("Password cannot be empty");
    return;
  } else if (password.trim().length < 6) {
    console.log("Password must be at least 6 characters");
    return;
  }
  const confirmPassword = document.getElementById("confirm-password").value;
  if (password != confirmPassword) {
    console.log("Passwords do not match");
  } else {
    fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          window.location.href = "/profile?userId=" + data.userId;
        }
      });
  }
});

/**
 * Event listener for when user presses the register button on the login screen.
 */
document.getElementById("activate-register").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
});

/**
 * Event listener for when user presses the login button on the register screen.
 */
document.getElementById("activate-login").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("register-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
});
