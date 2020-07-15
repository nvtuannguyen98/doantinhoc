function checkUserData() {
    const userData = getCookie("userData");
    console.log(userData)
    if (userData) {
        $("#signInButton").hide()
        $("#signOutButton").show()
        document.getElementById('userName').innerText = userData.name
    } else {
        document.getElementById('userName').innerText = ""
        $("#signInButton").show()
        $("#signOutButton").hide()
    }
}

checkUserData()