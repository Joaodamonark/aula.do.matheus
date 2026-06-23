const themeSwitcher = document.getElementById('themeSwitcher');

const getStoredTheme = () => localStorage.getItem('carsellTheme') || 'light';
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeSwitcher) {
    themeSwitcher.textContent = theme === 'dark' ? 'Modo Claro' : 'Modo Escuro';
  }
};

const toggleTheme = () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('carsellTheme', nextTheme);
  applyTheme(nextTheme);
};

applyTheme(getStoredTheme());

if (themeSwitcher) {
  themeSwitcher.addEventListener('click', toggleTheme);
}
