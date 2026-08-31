(() => {
  const mount = () => {
    const navbar = document.querySelector('#navbar');
    const logo = navbar?.querySelector('a[href="https://pipeops.io"]');
    const nativeButtons = {
      system: document.querySelector('[data-testid="mode-switch-system"]'),
      light: document.querySelector('[data-testid="mode-switch-light"]'),
      dark: document.querySelector('[data-testid="mode-switch-dark"]'),
    };

    if (!navbar || !logo || !nativeButtons.system || !nativeButtons.light || !nativeButtons.dark) {
      return false;
    }

    if (document.querySelector('#pipeops-theme-toggle')) {
      return true;
    }

    const toggle = document.createElement('div');
    toggle.id = 'pipeops-theme-toggle';
    toggle.setAttribute('aria-label', 'Theme preference');
    toggle.setAttribute('role', 'group');

    for (const mode of ['system', 'light', 'dark']) {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.mode = mode;
      button.setAttribute('aria-label', `Switch to ${mode} theme`);
      button.innerHTML = nativeButtons[mode].innerHTML;
      button.addEventListener('click', () => nativeButtons[mode].click());
      toggle.append(button);
    }

    logo.insertAdjacentElement('afterend', toggle);
    document.querySelector('#theme-preference-menu-trigger')?.setAttribute('hidden', '');

    const syncActiveMode = () => {
      const current = document.documentElement.classList.contains('dark')
        ? 'dark'
        : document.documentElement.classList.contains('light')
          ? 'light'
          : 'system';
      toggle.querySelectorAll('button').forEach((button) => {
        button.dataset.active = String(button.dataset.mode === current);
      });
    };

    syncActiveMode();
    new MutationObserver(syncActiveMode).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return true;
  };

  const observer = new MutationObserver(() => {
    if (mount()) observer.disconnect();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
