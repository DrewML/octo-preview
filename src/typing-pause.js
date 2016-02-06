export default function waitForTypingPause(cb) {
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
