const qs = document.querySelector.bind(document);

export function injectCSS(cssString = '', index = 0) {
    const style = document.createElement('style');
    style.innerHTML = cssString;
    document.body.appendChild(style);
}

export function getAuthenticityToken() {
    return qs('input[name="authenticity_token"]').value;
}

export function getComment(form) {
    return form.querySelector('.js-comment-field').value;
}

export function getPreviewUri() {
    return qs('.js-new-comment-form [data-preview-url]')
        .getAttribute('data-preview-url');
}

export function waitForTypingPause(cb) {
    const TIMEOUT = 800;
    let timer;

    function reset() {
        clearTimeout(timer);
        timer = null;
    }

    function success(form) {
        reset();
        cb(form);
    }

    $(document).on('keydown', '.js-comment-field', function() {
        if (timer) return;

        const form = $(this).closest('form').get(0);
        timer = setTimeout(() => success(form), TIMEOUT);
    });
}
