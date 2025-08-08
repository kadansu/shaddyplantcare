document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logoutBtn").addEventListener("click", function () {
        fetch("logout.php", { credentials: "include" })  // Call logout.php to clear session
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("You have been logged out.");
                    window.location.href = "login.html";  // Redirect to login
                } else {
                    alert("Logout failed. Please try again.");
                }
            })
            .catch(error => console.error("Logout error:", error));
    });
});
