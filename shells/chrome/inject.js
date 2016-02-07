'use strict';

function messageIfFound(window) {
    'use strict';

    try {
        // Determine if the page is truly a GitHub page. Use their
        // feature detection to detect them :)
        require('github/feature-detection');
        window.postMessage({ installLivePreview: true }, '*');
    } catch(err) {}
}

window.addEventListener('message', msg => {
    if (!msg.data || !msg.data.installLivePreview) return;

    const inspectorScript = document.createElement('script');
    inspectorScript.src = chrome.extension.getURL('live-preview.js');
    document.documentElement.appendChild(inspectorScript);
});

function runFnInPage(fn) {
    const script = document.createElement('script');
    script.textContent = `;(${fn.toString()}(window))`;
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);
}

runFnInPage(messageIfFound);
