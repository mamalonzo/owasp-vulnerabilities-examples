// Written by Marc Malonzo
// Frontend code for the identification/authentication failure example

/**
 * Event listener for when user presses the login button on the login screen.
 */
document.getElementById('login-button').addEventListener('click', () => {
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()).then(data => {
        console.log(data);
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('successful').style.display = 'block';
    });
});

/**
 * Event listener for when user presses the register button on the register screen.
 */
document.getElementById('register-button').addEventListener('click', () => {
    const email = document.getElementById('email-register').value;
    const password = document.getElementById('password-register').value;
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()).then(data => {
        console.log(data);
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('successful').style.display = 'block';
    });
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

/**
 * Event listener for when user presses the recover button on the login screen.
 */
document.getElementById("activate-recover").addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("login-form").style.display = "none";
  document.getElementById("recover-form").style.display = "block";
});

/**
 * Event listener for when user presses the recover button on the recover screen.
 */
document.getElementById("recover-button").addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("email-recover").value;
  fetch('http://localhost:3000/get-password?email=' + email, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.json()).then(data => {
    document.getElementById("recovered-password").innerText = "Your password is: " + data;
  });
});