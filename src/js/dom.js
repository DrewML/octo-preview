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

    function handleChange() {
        if (timer) return;

        const form = this.closest('form');
        timer = setTimeout(() => success(form), timeout);
    }

    live('change', '.js-comment-field', handleChange);
    live('keydown', '.js-comment-field', handleChange);
}

function live(eventType, selector, cb) {
    document.addEventListener(eventType, function(event) {
        const el = event.target.closest(selector);
        if (el) {
            cb.call(el, event);
        }
    });
}
