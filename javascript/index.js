const btn = document.getElementById('menu-button');
const menu = document.getElementById('menu');
const toggleBtn = document.getElementById('theme-toggle');

btn.addEventListener('click', () => {
    menu.classList.toggle('visible');
    btn.classList.toggle('toggle');
});


const theme = document.getElementById('theme-link');
toggleBtn.addEventListener('click', () => {
    const isDark = theme.disabled;
    theme.disabled = !isDark;
    localStorage.setItem('darkMode', !isDark);
});