// ================================
// CONFIG
// ================================
const PASSWORD_HASH = "f1c5ea439e9f24f5ad4c1f3c5e902c204c73671c70de6ba011eb17a79eec65da";

// SHA-256 hashing function
async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ================================
// LOGIN HANDLER
// ================================
document.getElementById("login-btn").addEventListener("click", async () => {
    const input = document.getElementById("password-input").value.trim();
    const hashed = await sha256(input);

    if (hashed === PASSWORD_HASH) {
        // Show admin panel
        document.getElementById("login-form").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
    } else {
        alert("Incorrect password");
    }
});

// ================================
// INIT
// ================================
window.addEventListener("DOMContentLoaded", () => {
    // Always hide admin panel on load
    document.getElementById("admin-panel").style.display = "none";
    document.getElementById("login-form").style.display = "block";
});

// ================================
// ADD NEW ENTRY
// ================================
document.getElementById("addButton").addEventListener("click", () => {
    const section = document.getElementById("section").value;
    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value;
    const status = document.getElementById("status").value.trim();
    const content = document.getElementById("content").value.trim();
    const image = document.getElementById("image").value.trim();

    if (!title) {
        alert("Title is required");
        return;
    }

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
        alert("Entry added! Download the JSON file and commit it to GitHub to make it live.");

        // Clear form fields after posting
        document.getElementById("title").value = "";
        document.getElementById("date").value = "";
        document.getElementById("status").value = "";
        document.getElementById("content").value = "";
        document.getElementById("image").value = "";
    })
    .catch(err => alert("Error fetching JSON: " + err));
});
