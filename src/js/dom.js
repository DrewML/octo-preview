const qs = document.querySelector.bind(document);

export function getAuthenticityToken() {
    return qs('input[name="authenticity_token"]').value;
}

export function getComment(form) {
    return form.querySelector('.js-comment-field').value;
}

export function getPreviewUri() {
    return qs('.js-previewable-comment-form')
        .getAttribute('data-preview-url');
}

export function throttleWhenTyping(cb, timeout) {
    let timer;

    function reset() {
        clearTimeout(timer);
        timer = null;
    }

    function success(form) {
        reset();
        cb(form);
    }

    $(document).on('change keydown', '.js-comment-field', function() {
        if (timer) return;

        const form = $(this).closest('form').get(0);
        timer = setTimeout(() => success(form), timeout);
    });
}
