const logout = document.getElementById("logout")

logout.addEventListener('click', () => {
    localStorage.removeItem('user')
    window.location.href = "/login.html"
})