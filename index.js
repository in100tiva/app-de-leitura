const TOTAL_PAGES = 5;
const INACTIVITY_DELAY = 3000; // 3 segundos

let currentPage = 0;
let bookmarkedPages = new Set();
let inactivityTimeout;

const bookPages = [
    "Página 1: Era uma vez, em uma terra distante, uma vasta floresta onde cada árvore parecia guardar um segredo.",
    "Página 2: Em meio à floresta, havia uma pequena cabana, habitada por um velho sábio que conhecia os mistérios da natureza.",
    "Página 3: Muitos viajantes procuravam o sábio para aprender sobre as ervas que curam e os encantamentos antigos.",
    "Página 4: Entre esses viajantes, estava uma jovem destemida, buscando a cura para salvar seu vilarejo de uma terrível praga.",
    "Página 5: O sábio, vendo a determinação da jovem, decidiu revelar-lhe o segredo da Flor da Lua, a única cura para a praga."
];

function loadPage(pageNumber) {
    const bookText = document.getElementById('book-text');
    bookText.innerText = bookPages[pageNumber];
    updateProgressBar(pageNumber);
    updatePageMarking(bookText, pageNumber);
    resetInactivityTimer();
}

function goToNextPage() {
    if (currentPage < TOTAL_PAGES - 1) {
        currentPage++;
        loadPage(currentPage);
    }
}

function goToPreviousPage() {
    if (currentPage > 0) {
        currentPage--;
        loadPage(currentPage);
    }
}

function updateProgressBar(pageNumber) {
    const progressBar = document.getElementById('progress-bar');
    progressBar.value = ((pageNumber + 1) / TOTAL_PAGES) * 100;
}

function toggleBookmark() {
    if (bookmarkedPages.has(currentPage)) {
        bookmarkedPages.delete(currentPage);
        updatePageMarking(document.getElementById('book-text'), currentPage);
    } else {
        bookmarkedPages.add(currentPage);
        updatePageMarking(document.getElementById('book-text'), currentPage);
    }
}

function updatePageMarking(bookText, pageNumber) {
    bookText.classList.toggle('marked-page', bookmarkedPages.has(pageNumber));
}

function hideControls() {
    document.querySelector('.controls').style.opacity = '0';
}

function showControls() {
    document.querySelector('.controls').style.opacity = '1';
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    showControls();
    inactivityTimeout = setTimeout(hideControls, INACTIVITY_DELAY);
}

function toggleSettingsPanel() {
    const panel = document.querySelector('.settings-panel');
    panel.classList.toggle('visible');
}

function changeTheme(theme) {
    document.body.className = theme;
}

function setFontSize(size) {
    document.getElementById('book-text').style.fontSize = `${size}px`;
}

function setLineSpacing(spacing) {
    document.getElementById('book-text').style.lineHeight = spacing;
}

window.onload = () => {
    loadPage(0);
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);
};
