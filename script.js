const strapiUrl = "http://46.226.110.124:1337";
let currentLanguage = localStorage.getItem('currentLanguage') || "en"; // Get language from localStorage or default to English
const contentDiv = document.getElementById('content');

async function loadContent(section, language = currentLanguage) {
    try {
        const response = await fetch(`${strapiUrl}/api/totem-interface-items?locale=${language}&populate=*`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const contentItem = data.data.find(item => item.attributes.Title.toLowerCase().replace(/\s+/g, '-') === section);
        console.log(contentItem);
        if (contentItem) {
            contentDiv.innerHTML = `<h1>${contentItem.attributes.Title}</h1><p>${contentItem.attributes.Content}</p>`;
        }
    } catch (error) {
        console.error('Failed to load content:', error);
        contentDiv.innerHTML = '<p>Error loading content.</p>';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    navbar.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON' && event.target.dataset.section) {
            loadContent(event.target.dataset.section);
        }
    });

    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('click', function() {
        window.location.href = 'language.html'; // Redirect to the language selection page
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    navbar.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const section = event.target.getAttribute('data-section');
            // Placeholder for content change logic
            loadContent(section);
            console.log('Section clicked:', section);
        }
    });

    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('click', function() {
        window.location.href = 'language.html'; // Redirect to the language selection page
    });
});
