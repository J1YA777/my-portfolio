// ----- CONFIG -----
const PASSWORD_HASH = "f90c6a6f21bbd43e3bf3e83f4d392eb3839141e4be5e1478dd8e2b847cdfbe0e"; // SHA-256 of "eshaal123456"

// SHA-256 Hashing function
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ----- LOGIN HANDLER -----
document.getElementById("login-btn").addEventListener("click", async () => {
    const input = document.getElementById("password-input").value;

    const hashed = await sha256(input);

    if (hashed === PASSWORD_HASH) {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Incorrect password");
    }
});

// Add new entry
document.getElementById("addButton").addEventListener("click", () => {
    const section = document.getElementById("section").value;
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").value;

    const newEntry = { title, date, status, content, image };

    fetch(`../data/${section}.json`)
    .then(res => res.json())
    .then(data => {
        data.push(newEntry);
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], {type: "application/json"});
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `${section}.json`;
        a.click();
        alert("Entry added! Download the JSON file and commit to GitHub to make it live.");
    });
});
