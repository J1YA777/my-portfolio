// Password protection
const adminPassword = "eshaal123456"; 
let input = prompt("Enter admin password:");

if(input !== adminPassword){
    alert("Incorrect password. Access denied.");
    document.body.innerHTML = "<h2>Access Denied</h2>";
}

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
