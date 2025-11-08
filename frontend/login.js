const apiUrl = "http://localhost:3000";
myApp.checkLoggedIn(); 

document.getElementById("login__form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    userData = {
        email,
        password,
    };

    fetch(`${apiUrl}/login`, {
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
