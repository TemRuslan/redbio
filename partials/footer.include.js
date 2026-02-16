(() => {
    const DEFAULT_HTML = "<!-- Footer (shared) -->\n<footer id=\"contact\" class=\"py-20 px-6 bg-white\">\n    <div class=\"max-w-7xl mx-auto border-t border-gray-100 pt-16 grid md:grid-cols-4 gap-12 items-start\">\n        <div class=\"space-y-6\">\n            <div class=\"text-3xl font-black\">\n                <span class=\"text-[#bc4749]\">BIO</span>RED\n            </div>\n            <p class=\"text-sm text-gray-400 leading-relaxed\" data-key=\"footer-desc\">Leaders in biometallurgy since 2018.</p>\n        </div>\n        <div class=\"space-y-4\">\n            <h4 class=\"font-bold text-xs uppercase tracking-widest\" data-key=\"footer-contacts\">Contacts</h4>\n            <p class=\"text-sm text-gray-500\" data-key=\"footer-email\">Email: tech@bio-red.com</p>\n            <p class=\"text-sm text-gray-500\" data-key=\"footer-phone\">Phone: —</p>\n            <p class=\"text-sm text-gray-500\" data-key=\"footer-lab\">Laboratory: Changsha, Hunan, PRC</p>\n            <p class=\"text-sm text-gray-500\" data-key=\"footer-address\">Address: —</p>\n        </div>\n        <div class=\"space-y-6\">\n            <h4 class=\"font-bold text-xs uppercase tracking-widest\" data-key=\"footer-news\">Newsletter</h4>\n            <div class=\"flex\">\n                <input type=\"email\" placeholder=\"E-mail\" data-placeholder-key=\"footer-email-placeholder\" class=\"bg-gray-50 border-none px-4 py-3 rounded-l-2xl w-full text-sm focus:ring-1 focus:ring-[#bc4749]\">\n                <button class=\"bg-[#bc4749] text-white px-6 py-3 rounded-r-2xl\">→</button>\n            </div>\n        </div>\n        <div class=\"space-y-4\">\n            <h4 class=\"font-bold text-xs uppercase tracking-widest\" data-key=\"footer-map\">Map</h4>\n            <div class=\"liquid-glass p-3\">\n                <iframe\n                    title=\"Map\"\n                    data-title-key=\"footer-map\"\n                    class=\"w-full h-56 rounded-2xl border border-gray-100\"\n                    src=\"https://www.openstreetmap.org/export/embed.html?bbox=112.90%2C28.19%2C112.98%2C28.26&layer=mapnik&marker=28.2282%2C112.9388\"\n                    loading=\"lazy\"\n                    referrerpolicy=\"no-referrer-when-downgrade\"\n                ></iframe>\n            </div>\n        </div>\n    </div>\n</footer>\n";

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
})();
