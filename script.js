// ================================
// Sample Data (Replace with Netlify CMS fetch later)
// ================================

// Blog posts
const blogPosts = [
    {
        title: "Sample Blog Post",
        date: "2025-11-16",
        image: "images/sample1.jpg",
        body: "This is a sample blog post. Your posts added via Netlify CMS will appear here."
    }
];

// Coding Projects
const codingProjects = [
    {
        title: "Sample Project",
        description: "A short description of the project.",
        link: "#",
        image: "images/sample-project.jpg"
    }
];

// Competitions
const competitions = [
    {
        title: "Sample Project",
        date: "1010-10-10",
        status: "Completed",
        certificate: "images/sample-certificate.jpg"
    }
];

// Research Projects
const researchProjects = [
    {
        title: "Sample Project",
        description: "Short summary of the research project.",
        file: "images/sample-research.pdf",
        image: "images/sample-research.jpg"
    }
];

// ================================
// Helper Functions
// ================================

function createCard(item, type) {
    const card = document.createElement('div');
    card.className = 'card';

    switch(type) {
        case "blog":
            card.innerHTML = `
                ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
                <h3>${item.title}</h3>
                <p>${item.date}</p>
                <p>${item.body}</p>
            `;
            break;

        case "projects":
            card.innerHTML = `
                ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${item.link ? `<a href="${item.link}" target="_blank">View Project</a>` : ''}
            `;
            break;

        case "competitions":
            card.innerHTML = `
                ${item.certificate ? `<img src="${item.certificate}" alt="${item.title} Certificate">` : ''}
                <h3>${item.title}</h3>
                <p>${item.date}</p>
                <p>Status: ${item.status}</p>
            `;
            break;

        case "research":
            card.innerHTML = `
                ${item.image ? `<img src="${item.image}" alt="${item.title}">` : ''}
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                ${item.file ? `<a href="${item.file}" target="_blank">View File</a>` : ''}
            `;
            break;
    }

    return card;
}

function loadSection(containerId, dataArray, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    dataArray.forEach(item => container.appendChild(createCard(item, type)));
}

// ================================
// Load all sections
// ================================

document.addEventListener('DOMContentLoaded', () => {
    loadSection('blog-container', blogPosts, 'blog');
    loadSection('projects-container', codingProjects, 'projects');
    loadSection('competitions-container', competitions, 'competitions');
    loadSection('research-container', researchProjects, 'research');
});
