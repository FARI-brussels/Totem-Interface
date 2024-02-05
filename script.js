const strapiUrl = "http://46.226.110.124:1337";
let currentLanguage = localStorage.getItem('currentLanguage') || "en"; // Get language from localStorage or default to English
const contentDiv = document.getElementById('content');


async function loadTitles(language = currentLanguage) {
    try {
        const response = await fetch(`${strapiUrl}/api/totem-interface-items?locale=${language}&populate=*`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Update button texts with titles from the CMS
        data.data.forEach(item => {
            const sectionId = item.attributes.section_id; // Assuming 'section_id' is the identifier
            const title = item.attributes.Title; // Assuming 'Title' holds the title text
            const button = document.querySelector(`button[data-section="${sectionId}"]`);
            if (button) {
                button.textContent = title;
            }
        });
    } catch (error) {
        console.error('Failed to load titles:', error);
    }
}


async function loadContent(section, language = currentLanguage) {
    try {
        console.log(language);
        const response = await fetch(`${strapiUrl}/api/totem-interface-items?locale=${language}&populate=*`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Update button texts with titles from the CMS
        const contentItem = data.data.find(item => item.attributes.section_id === section); // Use section_id for matching
        if (contentItem) {
            const markdownContent = contentItem.attributes.Content;
            const htmlContent = marked.parse(markdownContent); // Convert Markdown to HTML
            contentDiv.innerHTML = `<h1>${contentItem.attributes.Title}</h1><div>${htmlContent}</div>`; // Insert HTML content inside a div
        }
    } catch (error) {
        console.error('Failed to load content:', error);
        contentDiv.innerHTML = '<p>Error loading content.</p>';
    }
}

const languageMap = {
    'en': 'EN',
    'fr-FR': 'FR',
    'nl': 'NL'
};

function updateLanguageButton(currentLanguage) {
    const languageButton = document.getElementById('language-select');
    const languageText = languageMap[currentLanguage] || 'EN'; // Default to 'EN' if the language code is not in the map
    languageButton.textContent = `${languageText} 🌐`;
}



document.addEventListener('DOMContentLoaded', function() {
    updateLanguageButton(currentLanguage);
    loadTitles(); // Load titles for the current language
    loadContent("about-fari", language = currentLanguage); // Load the default content
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
