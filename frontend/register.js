const apiUrl = "http://localhost:3000";
myApp.checkLoggedIn(); 

document.getElementById("login__form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (username.length < 6) {
        alert("Username must be at least 6 characters long.");
        return;
    }

    // Validate passwords
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // Check password strength (e.g., minimum length of 8 characters, at least 1 number, 1 uppercase letter, 1 special character)
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert(
            "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
        );
        return;
    }

    userData = {
        username,
        email,
        password,
    };

    fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then(async (response) => {
            if (!response.ok) {
                return response.json().then((errorData) => {
                    throw new Error(errorData.message);
                });
            }
            return response.json();
        })
        .then((data) => {
            localStorage.setItem("user", JSON.stringify({...data}))
            window.location.href = "/levels.html";
        })
        .catch((error) => {
            alert("Error: " + error.message); // Show error message to the user
        });
});
