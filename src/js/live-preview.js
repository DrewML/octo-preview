import {
    getPreviewUri,
    getAuthenticityToken,
    getComment,
    waitForTypingPause
} from './dom';
import {getMarkdownPreview} from './api';

waitForTypingPause(form => {
    getMarkdownPreview(
        getPreviewUri(),
        getComment(form),
        getAuthenticityToken()
    ).then(markup => {
        form.querySelector('.js-preview-body').innerHTML = markup;
    }).catch(err => console.error(err.stack));
});
