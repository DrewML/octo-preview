import waitForTypingPause from './typing-pause';

const qs = document.querySelector.bind(document);
const defaultText = 'Nothing to preview'; 

function getMarkdownPreview(previewURI, text, authenticityToken) {
    if (!text) return Promise.resolve(defaultText);

    // Upgrade jQuery deferred to an ES6 Promise
    return Promise.resolve($.ajax({
        method: 'POST',
        url: previewURI,
        data: {
            authenticity_token: authenticityToken,
            text
        }
    }));
}

function getAuthenticityToken() {
    return qs('input[name="authenticity_token"]').value;
}

function getComment(form) {
    return form.querySelector('.js-comment-field').value;
}

function setupDisplay() {
    injectCSS(`
        .preview-content {
            display: block !important;
        }
        .js-preview-tab {
            display: none !important;
        }
    `);
}

function getPreviewUri() {
    return qs('.js-new-comment-form [data-preview-url]')
        .getAttribute('data-preview-url');
}

function injectCSS(cssString = '', index = 0) {
    const style = document.createElement('style');
    style.innerHTML = cssString;
    document.body.appendChild(style);
}

setupDisplay();
waitForTypingPause(form => {
    getMarkdownPreview(getPreviewUri(), getComment(form), getAuthenticityToken())
        .then(markup => {
            form.querySelector('.js-preview-body')
                .innerHTML = markup;
        }).catch(err => console.error(err.stack));
});
