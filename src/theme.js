const STORAGE_KEY = 'bonanza_theme';

export function getTheme() {
    try {
        return localStorage.getItem(STORAGE_KEY) || 'dark';
    } catch {
        return 'dark';
    }
}

export function setTheme(theme) {
    try {
        localStorage.setItem(STORAGE_KEY, theme);
        applyTheme(theme);
    } catch {
        // silently fail
    }
}

export function applyTheme(theme) {
    if (theme === 'light') {
        document.documentElement.classList.add('light-mode');
    } else {
        document.documentElement.classList.remove('light-mode');
    }
}

export function initTheme() {
    const theme = getTheme();
    applyTheme(theme);
    return theme;
}
