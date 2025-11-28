// ================================
// Load content from JSON files
// ================================

async function fetchJSON(section) {
    const response = await fetch(`./data/${section}.json`);
    const data = await response.json();
    return data;
}

function createCard(item, type) {
    const card = document.createElement('div');
    card.className = 'card';

    switch(type) {
        case "blog":
            card.innerHTML = `
                ${item.image ? `<img src="./images/${item.image}" alt="${item.title}">` : ''}
                <h3>${item.title}</h3>
                <p>${item.date}</p>
                <p>${item.content}</p>
            `;
            break;

        case "projects":
            card.innerHTML = `
                ${item.image ? `<img src="./images/${item.image}" alt="${item.title}">` : ''}
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${item.link ? `<a href="${item.link}" target="_blank">View Project</a>` : ''}
            `;
            break;

        case "competitions":
            card.innerHTML = `
                ${item.image ? `<img src="./images/${item.image}" alt="${item.title} Certificate">` : ''}
                <h3>${item.title}</h3>
                <p>${item.date}</p>
                <p>Status: ${item.status}</p>
            `;
            break;

        case "research":
            card.innerHTML = `
                ${item.image ? `<img src="./images/${item.image}" alt="${item.title}">` : ''}
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${item.file ? `<a href="./images/${item.file}" target="_blank">View File</a>` : ''}
            `;
            break;
    }

    return card;
}

async function loadSection(containerId, section, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = await fetchJSON(section);
    container.innerHTML = '';
    data.forEach(item => container.appendChild(createCard(item, type)));
}

document.addEventListener('DOMContentLoaded', () => {
    loadSection('blog-container', 'blog', 'blog');
    loadSection('projects-container', 'projects', 'projects');
    loadSection('competitions-container', 'competitions', 'competitions');
    loadSection('research-container', 'research', 'research');
});
