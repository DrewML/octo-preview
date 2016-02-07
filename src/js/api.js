const defaultText = 'Nothing to preview'; 

export function getMarkdownPreview(previewURI, text, authenticityToken) {
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
