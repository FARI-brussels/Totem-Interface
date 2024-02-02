let language = "en"; // Default to English
let strapiUrl = "http://46.226.110.124:1337";
let pageHistory = ["home"]; // Start with the home page

let interfaceContent;
async function loadContentFromStrapi() {
  try {
    const response = await fetch(
      `${strapiUrl}/api/totem-interface-items?locale=${language}&populate=*`
    );
    if (!response.ok) {
      console.log(response);
    }
    interfaceContent = await response.json();
  } catch (error) {
    console.error("Error occurred: ", error);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    navbar.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const section = event.target.getAttribute('data-section');
            // Placeholder for content change logic
            console.log('Section clicked:', section);
        }
    });

    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('click', function() {
        window.location.href = 'language.html'; // Redirect to the language selection page
    });
});
