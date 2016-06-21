import {
    getPreviewUri,
    getAuthenticityToken,
    getComment,
    throttleWhenTyping
} from './dom';
import {getMarkdownPreview} from './api';


throttleWhenTyping(form => {
    getMarkdownPreview(
        getPreviewUri(),
        getComment(form),
        getAuthenticityToken()
    ).then(markup => {
        form.querySelector('.js-preview-body').innerHTML = markup;
    }).catch(err => console.error(err.stack));
}, 800);
