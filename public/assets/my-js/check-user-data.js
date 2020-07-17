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

    const stocks = getCookie("stocks") || []
    // document.getElementById('shoppingCardNumber').innerText = stocks.length 
    document.getElementById('shoppingCardNumber').innerText = stocks.reduce((sum, stock) => sum+stock.amount, 0) 
}


function signOut() {
    deleteCookie("userData")
    deleteCookie("stocks")
    checkUserData()
    location.href='/'
}

function goToStockDetail(id) {
    console.log(id)
    location.href = `/stocks?id=${id}`
}

checkUserData()