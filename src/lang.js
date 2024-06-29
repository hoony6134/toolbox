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

// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

// Function to initialize the language and update content
async function initializeLanguage() {
    // set browser language as default language
    console.log("detected language: " + navigator.language);
    const userPreferredLanguage = localStorage.getItem("language") || navigator.language.split('-')[0] || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
}

// Initialize language on page load and hide content until done
window.addEventListener('DOMContentLoaded', async () => {
    await initializeLanguage();
});