(function () {
  var storageKey = 'vulnsmith-theme';
  var root = document.documentElement;

  function storedTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Ignore unavailable storage and keep the in-page toggle working.
    }
  }

  function preferredTheme() {
    if (storedTheme()) {
      return storedTheme();
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      var isDark = theme === 'dark';
      button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('aria-pressed', String(isDark));

      var icon = button.querySelector('[data-theme-icon]');
      if (icon) {
        icon.textContent = isDark ? '☀️' : '🌙';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(root.dataset.theme || preferredTheme());

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        var nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        saveTheme(nextTheme);
      });
    });

    if (window.matchMedia) {
      var media = window.matchMedia('(prefers-color-scheme: dark)');
      media.addEventListener('change', function (event) {
        if (!storedTheme()) {
          applyTheme(event.matches ? 'dark' : 'light');
        }
      });
    }
  });
}());
