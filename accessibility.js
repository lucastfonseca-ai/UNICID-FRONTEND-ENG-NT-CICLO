(function () {
    'use strict';

    const body = document.body;
    const panel = document.querySelector('#accessibility-panel');
    const panelToggle = document.querySelector('.accessibility-toggle');
    const accessibilityTools = document.querySelector('.accessibility-tools');
    const prefs = { theme: 'ciclo-theme', contrast: 'ciclo-contrast', font: 'ciclo-font-scale' };

    function initializeVLibras() {
        if (window.VLibras && window.VLibras.Widget && !window.cicloVLibrasWidget) {
            window.cicloVLibrasWidget = new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
    }
    initializeVLibras();
    window.addEventListener('load', initializeVLibras, { once: true });

    const themeButton = document.createElement('button');
    themeButton.className = 'theme-toggle';
    themeButton.type = 'button';
    themeButton.setAttribute('aria-pressed', 'false');
    themeButton.setAttribute('aria-keyshortcuts', 'Alt+Shift+D');
    themeButton.textContent = '\u263d Modo escuro';
    themeButton.title = 'Alternar entre tema claro e escuro (Alt+Shift+D)';

    const headerControls = document.createElement('div');
    headerControls.className = 'header-accessibility-controls';
    headerControls.setAttribute('role', 'group');
    headerControls.setAttribute('aria-label', 'Controles de acessibilidade');
    if (accessibilityTools) headerControls.append(accessibilityTools);
    headerControls.append(themeButton);

    const navigation = document.querySelector('.navbar');
    if (navigation && navigation.parentElement) navigation.parentElement.insertBefore(headerControls, navigation);
    else body.prepend(headerControls);

    function setTheme(dark) {
        body.classList.toggle('dark-mode', dark);
        themeButton.setAttribute('aria-pressed', String(dark));
        themeButton.textContent = dark ? '\u2600 Modo claro' : '\u263d Modo escuro';
        try { localStorage.setItem(prefs.theme, dark ? 'dark' : 'light'); } catch (_) { }
    }

    function setContrast(enabled) {
        body.classList.toggle('high-contrast', enabled);
        const control = document.querySelector('[data-access-action="contrast"]');
        if (control) control.setAttribute('aria-pressed', String(enabled));
        try { localStorage.setItem(prefs.contrast, String(enabled)); } catch (_) { }
    }

    function setFontScale(scale) {
        const safeScale = Math.min(1.5, Math.max(0.9, scale));
        const scalableElements = body.querySelectorAll('*:not(script):not(style):not(svg):not(path)');
        if (!body.dataset.fontScalePrepared) {
            scalableElements.forEach(element => {
                element.style.setProperty('--accessibility-base-font-size', getComputedStyle(element).fontSize);
            });
            body.dataset.fontScalePrepared = 'true';
        }
        scalableElements.forEach(element => {
            element.style.fontSize = `calc(var(--accessibility-base-font-size) * ${safeScale})`;
        });
        body.style.setProperty('--accessibility-font-scale', safeScale);
        try { localStorage.setItem(prefs.font, String(safeScale)); } catch (_) { }
    }

    try {
        setTheme(localStorage.getItem(prefs.theme) === 'dark');
        setContrast(localStorage.getItem(prefs.contrast) === 'true');
        setFontScale(Number(localStorage.getItem(prefs.font)) || 1);
    } catch (_) { setTheme(false); setContrast(false); setFontScale(1); }

    themeButton.addEventListener('click', () => setTheme(!body.classList.contains('dark-mode')));

    if (panelToggle && panel) {
        panelToggle.addEventListener('click', () => {
            const open = panel.hidden;
            panel.hidden = !open;
            panelToggle.setAttribute('aria-expanded', String(open));
            if (open) panel.querySelector('button')?.focus();
        });
        panel.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                panel.hidden = true;
                panelToggle.setAttribute('aria-expanded', 'false');
                panelToggle.focus();
            }
        });
        panel.addEventListener('click', event => {
            const control = event.target.closest('[data-access-action]');
            if (!control) return;
            const action = control.dataset.accessAction;
            if (action === 'contrast') setContrast(!body.classList.contains('high-contrast'));
            if (action === 'font-up' || action === 'font-down') {
                const current = parseFloat(getComputedStyle(body).getPropertyValue('--accessibility-font-scale')) || 1;
                setFontScale(current + (action === 'font-up' ? 0.1 : -0.1));
            }
            if (action === 'reset') { setContrast(false); setFontScale(1); }
            const status = panel.querySelector('.accessibility-status');
            if (status) status.textContent = action === 'reset' ? 'Preferências restauradas.' : 'Preferência atualizada.';
        });
    }

    document.addEventListener('keydown', event => {
        if (!event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey) return;
        const key = event.key.toLowerCase();
        if (key === 'a' && panelToggle) { event.preventDefault(); panelToggle.click(); }
        if (key === 'd') { event.preventDefault(); themeButton.click(); }
        if (key === 'l') {
            const vlibrasButton = document.querySelector('[vw-access-button]');
            if (vlibrasButton) { event.preventDefault(); vlibrasButton.click(); }
        }
    });
}());
