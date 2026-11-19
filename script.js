// =====================================
// JEEVAN JYOTI - DONATION SECTION SCRIPT
// =====================================

const amountButtons = document.querySelectorAll(".amount-btn");
const customInput = document.getElementById("customAmount");
const selectedText = document.getElementById("selectedAmount");
const donateBtn = document.getElementById("donateBtn");
const upiIdText = document.getElementById("upiId");

let selectedAmount = 0;

// Show the chosen amount in the "Selected Amount" box
function showAmount(amount) {
    selectedAmount = amount;
    selectedText.textContent = "₹" + amount;
}

// 1. Preset amount buttons (₹100, ₹500, ₹1000, ₹2000)
amountButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        amountButtons.forEach(function (b) {
            b.classList.remove("selected");
        });
        button.classList.add("selected");

        customInput.value = "";
        showAmount(Number(button.dataset.amount));
    });
});

// 2. Custom amount box
customInput.addEventListener("input", function () {
    amountButtons.forEach(function (b) {
        b.classList.remove("selected");
    });

    const value = Number(customInput.value);
    showAmount(value > 0 ? value : 0);
});

// 3. "Pay Using UPI" button
donateBtn.addEventListener("click", function () {
    if (selectedAmount <= 0) {
        alert("Please select or enter a donation amount first.");
        return;
    }

    const upiId = upiIdText.textContent.trim();
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    // UPI apps only open on phones, so on a computer ask to scan the QR code
    if (!isMobile) {
        alert("Please scan the QR code with any UPI app to donate ₹" + selectedAmount + ".");
        return;
    }

    const upiLink =
        "upi://pay?pa=" + encodeURIComponent(upiId) +
        "&pn=" + encodeURIComponent("Jeevan Jyoti") +
        "&am=" + selectedAmount +
        "&cu=INR" +
        "&tn=" + encodeURIComponent("Donation to Jeevan Jyoti");

    window.location.href = upiLink;
});
