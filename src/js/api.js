
import querystring from 'querystring';

const defaultText = 'Nothing to preview';

export function getMarkdownPreview(previewURI, text, authenticityToken) {
    if (!text) return Promise.resolve(defaultText);

    return fetch(previewURI, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          authenticity_token: authenticityToken,
          text
        }),
        credentials: 'same-origin'
    })
      .then(res => res.text());
}
