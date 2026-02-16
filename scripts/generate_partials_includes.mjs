import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

async function generateInclude({ inputPath, outputPath }) {
    const html = await readFile(inputPath, 'utf8');
    const defaultHtmlLiteral = JSON.stringify(html);

    const js = `(() => {
    const DEFAULT_HTML = ${defaultHtmlLiteral};

    function requestTextSync(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send(null);
        if (xhr.status >= 200 && xhr.status < 300) return xhr.responseText;
        if (xhr.status === 0 && xhr.responseText) return xhr.responseText;
        throw new Error(\`Failed to load \${url}: HTTP \${xhr.status}\`);
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
})();\n`;

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, js, 'utf8');
}

await generateInclude({
    inputPath: 'partials/header.html',
    outputPath: 'partials/header.include.js',
});

await generateInclude({
    inputPath: 'partials/footer.html',
    outputPath: 'partials/footer.include.js',
});

console.log('Generated:', 'partials/header.include.js', 'partials/footer.include.js');

