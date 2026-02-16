(() => {
    const DEFAULT_HTML = "<!-- Navigation (shared) -->\n<nav class=\"fixed w-full z-50 px-6 py-4\">\n    <div id=\"site-nav-inner\" class=\"max-w-7xl mx-auto liquid-glass px-8 py-3 flex justify-between items-center\">\n        <a id=\"site-logo\" href=\"index.html#share\" aria-label=\"BIORED Home\" class=\"text-2xl font-extrabold tracking-tighter cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bc4749]/60 focus-visible:ring-offset-4 rounded-xl\">\n            <span class=\"text-[#bc4749]\">BIO</span>RED\n        </a>\n        <div class=\"hidden lg:flex space-x-8 font-semibold text-xs uppercase tracking-widest text-gray-600\">\n            <a href=\"technology.html\" class=\"hover:text-[#bc4749] transition\" data-nav=\"tech\" data-key=\"nav-tech\">Technology</a>\n            <a href=\"#process\" class=\"hover:text-[#bc4749] transition\" data-key=\"nav-process\">Process</a>\n            <a href=\"#products\" class=\"hover:text-[#bc4749] transition\" data-key=\"nav-products\">Products</a>\n            <a href=\"#research\" class=\"hover:text-[#bc4749] transition\" data-key=\"nav-research\">Research</a>\n        </div>\n\n        <div class=\"flex items-center gap-4\">\n            <!-- Language Switcher -->\n            <div class=\"flex gap-2 text-[10px] font-bold text-gray-400 border-r border-gray-200 pr-4 mr-2\">\n                <button onclick=\"setLang('en')\" class=\"lang-btn active\" id=\"btn-en\">EN</button>\n                <button onclick=\"setLang('ru')\" class=\"lang-btn\" id=\"btn-ru\">RU</button>\n                <button onclick=\"setLang('me')\" class=\"lang-btn\" id=\"btn-me\">ME</button>\n                <button onclick=\"setLang('zh')\" class=\"lang-btn\" id=\"btn-zh\">中文</button>\n            </div>\n            <button id=\"request-tech-btn\" type=\"button\" class=\"hidden lg:inline-flex hover-scale bg-[#bc4749] text-white px-7 py-2.5 rounded-full text-xs font-bold hover:bg-[#a43d3f] transition shadow-xl\" data-key=\"nav-cta\">\n                REQUEST TECH\n            </button>\n            <button id=\"mobile-menu-button\" type=\"button\" class=\"lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-black/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bc4749]/60 focus-visible:ring-offset-4\" aria-controls=\"mobile-menu-panel\" aria-expanded=\"false\" aria-label=\"Open menu\">\n                <svg data-mobile-menu-icon=\"burger\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-5 h-5 text-gray-700\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 6h16M4 12h16M4 18h16\" />\n                </svg>\n                <svg data-mobile-menu-icon=\"close\" xmlns=\"http://www.w3.org/2000/svg\" class=\"w-5 h-5 text-gray-700 hidden\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\">\n                    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 18L18 6M6 6l12 12\" />\n                </svg>\n            </button>\n        </div>\n\n        <!-- Mobile dropdown menu (opens under burger) -->\n        <div id=\"mobile-menu-panel\" class=\"lg:hidden liquid-glass border border-white/40\" role=\"menu\" aria-label=\"Menu\" aria-hidden=\"true\" hidden>\n            <nav class=\"p-6 flex flex-col gap-5 font-semibold text-xs uppercase tracking-widest text-gray-700\">\n                <a href=\"technology.html\" class=\"hover:text-[#bc4749] transition\" data-nav=\"tech\" data-key=\"nav-tech\" data-mobile-menu-close>Technology</a>\n                <a href=\"#process\" class=\"hover:text-[#bc4749] transition\" data-key=\"nav-process\" data-mobile-menu-close>Process</a>\n                <a href=\"#products\" class=\"hover:text-[#bc4749] transition\" data-key=\"nav-products\" data-mobile-menu-close>Products</a>\n                <a href=\"#research\" class=\"hover:text-[#bc4749] transition\" data-key=\"nav-research\" data-mobile-menu-close>Research</a>\n            </nav>\n\n            <div class=\"px-6 pb-6 -mt-1\">\n                <button type=\"button\" class=\"w-full hover-scale bg-[#bc4749] text-white px-7 py-3 rounded-full text-xs font-bold hover:bg-[#a43d3f] transition shadow-xl\" data-key=\"nav-cta\" data-request-tech data-mobile-menu-close>\n                    REQUEST TECH\n                </button>\n            </div>\n        </div>\n    </div>\n</nav>\n";

    function requestTextSync(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        if (xhr.status >= 200 && xhr.status < 300) return xhr.responseText;
        if (xhr.status === 0 && xhr.responseText) return xhr.responseText;
        throw new Error(`Failed to load ${url}: HTTP ${xhr.status}`);
    }

    const script = document.currentScript;
    const targetId = script?.dataset?.target || '';
    const url = script?.dataset?.url || '';
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    let html = DEFAULT_HTML;
    if (url) {
        try {
            html = requestTextSync(url);
        } catch (e) {
            console.warn(e);
        }
    }

    target.outerHTML = html;
    try {
        window.dispatchEvent(new CustomEvent('redbio:header-injected'));
    } catch (_) {}
})();
