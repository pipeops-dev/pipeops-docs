(() => {
  const storageKey = 'pipeops-docs-sidebar-sections';

  const readState = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}');
    } catch {
      return {};
    }
  };

  const writeState = (state) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Private browsing may disable localStorage; accordion still works in memory.
    }
  };

  const mount = () => {
    const navigation = document.querySelector('#navigation-items');
    if (!navigation) return false;

    const state = readState();
    const sections = [...navigation.children].filter((section) =>
      section.querySelector(':scope > .sidebar-group-header') &&
      section.querySelector(':scope > .sidebar-group'),
    );

    sections.forEach((section, index) => {
      if (section.dataset.pipeopsSidebarSection) return;

      const header = section.querySelector(':scope > .sidebar-group-header');
      const list = section.querySelector(':scope > .sidebar-group');
      const sectionKey = header.textContent.trim().toLowerCase().replace(/\s+/g, '-');
      const listId = `pipeops-sidebar-section-${index}`;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'pipeops-sidebar-toggle';
      button.setAttribute('aria-controls', listId);

      while (header.firstChild) button.append(header.firstChild);
      header.append(button);
      list.id = listId;
      section.dataset.pipeopsSidebarSection = sectionKey;

      const isActive = Boolean(list.querySelector('li[data-active]'));
      const isCollapsed = state[sectionKey] === true && !isActive;

      const setExpanded = (expanded, persist = true) => {
        section.toggleAttribute('data-collapsed', !expanded);
        button.setAttribute('aria-expanded', String(expanded));
        if (persist) {
          state[sectionKey] = !expanded;
          writeState(state);
        }
      };

      setExpanded(!isCollapsed, false);
      button.addEventListener('click', () => {
        setExpanded(button.getAttribute('aria-expanded') !== 'true');
      });
    });

    return sections.length > 0;
  };

  const observer = new MutationObserver(() => {
    mount();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
