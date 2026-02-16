(() => {
    function requestTextSync(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        try {
            xhr.send(null);
        } catch (err) {
            throw new Error(`Failed to load ${url}: ${err?.message || err}`);
        }
        if (xhr.status >= 200 && xhr.status < 300) return xhr.responseText;
        if (xhr.status === 0 && xhr.responseText) return xhr.responseText; // file:// fallback
        throw new Error(`Failed to load ${url}: HTTP ${xhr.status}`);
    }

    window.injectPartialSync = (targetId, url, opts = {}) => {
        const target = document.getElementById(targetId);
        if (!target) return;

        let html = '';
        try {
            html = requestTextSync(url);
        } catch (e) {
            console.error(e);
            return;
        }

        const mode = opts.mode || 'replace';
        if (mode === 'inner') {
            target.innerHTML = html;
            return;
        }

        target.outerHTML = html;
    };

    function fixHeaderHashLinks() {
        const nav = document.getElementById('site-logo')?.closest('nav');
        const mobile = document.getElementById('mobile-menu-panel');

        [nav, mobile].forEach((root) => {
            if (!root) return;
            root.querySelectorAll('a[href^="#"]').forEach((a) => {
                const href = a.getAttribute('href') || '';
                if (!href.startsWith('#')) return;
                const id = href.slice(1);
                if (!id) return;
                if (document.getElementById(id)) return;
                a.setAttribute('href', `index.html${href}`);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixHeaderHashLinks);
    } else {
        fixHeaderHashLinks();
    }
})();
