import {
    injectCSS,
    getPreviewUri,
    getAuthenticityToken,
    getComment,
    waitForTypingPause
} from './dom';
import {getMarkdownPreview} from './api';

setupDisplay();
waitForTypingPause(form => {
    getMarkdownPreview(
        getPreviewUri(),
        getComment(form),
        getAuthenticityToken()
    ).then(markup => {
        form.querySelector('.js-preview-body').innerHTML = markup;
    }).catch(err => console.error(err.stack));
});

// TODO: Just use an external stylesheet
function setupDisplay() {
    injectCSS(`
        .preview-content {
            display: block !important;
        }
        .js-preview-tab {
            display: none !important;
        }
        .js-preview-body:before {
            content: "Preview";
            font-weight: 600;
            color: #555;
        }
    `);
}
