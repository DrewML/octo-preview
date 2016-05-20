import {
    getPreviewUri,
    getAuthenticityToken,
    getComment,
    throttleWhenTyping
} from './dom';
import {getMarkdownPreview} from './api';


// HACK: GitHub removed their jQuery global.
// Short term fix: restore the global
// Better fix (when time permits) just use direct DOM APIs
window.$ = window.require('jquery');

throttleWhenTyping(form => {
    getMarkdownPreview(
        getPreviewUri(),
        getComment(form),
        getAuthenticityToken()
    ).then(markup => {
        form.querySelector('.js-preview-body').innerHTML = markup;
    }).catch(err => console.error(err.stack));
}, 800);
