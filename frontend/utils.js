(function() {
    const checkUser = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            window.location.href = "/login.html";
        } else {
            window.myApp.user = user;
        }
    };

    // Expose to global scope under a namespace
    window.myApp = window.myApp || {};  // Ensures `myApp` namespace exists
    window.myApp.checkUser = checkUser;
})();

(function() {
    const checkLoggedIn = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            window.location.href = "/levels.html"
        }
    };

    window.myApp = window.myApp || {};  // Ensures `myApp` namespace exists
    window.myApp.checkLoggedIn = checkLoggedIn;
})();