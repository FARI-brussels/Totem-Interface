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
