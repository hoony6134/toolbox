// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`/src/languages/${lang}.json`);
    return response.json();
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
}

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}
// Function to change language and update URL parameter
async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    // Update URL with the new language parameter
    const url = new URL(window.location);
    url.searchParams.set('hl', lang);
    window.history.pushState({}, '', url);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

// Function to initialize the language and update content
async function initializeLanguage() {
    // set browser language as default language
    console.log("detected language: " + navigator.language);
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('hl');
    if (langParam) {
        await changeLanguage(langParam);
        document.getElementById('language').value = langParam;
        localStorage.setItem("language", langParam);
    }
    const userPreferredLanguage = localStorage.getItem("language") || navigator.language.split('-')[0] || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
}

// Initialize language on page load and hide content until done
window.addEventListener('DOMContentLoaded', async () => {
    // Hide content until language is initialized (div id: app)
    // sync the dropdown with the browser language
    document.getElementById('app').style.display = 'none';
    document.getElementById('loader').style.display = 'block';
    document.getElementById('language').value = localStorage.getItem("language") || navigator.language.split('-')[0] || 'en';
    await initializeLanguage();
    document.getElementById('app').style.display = 'block';
    document.getElementById('loader').style.display = 'none';
});