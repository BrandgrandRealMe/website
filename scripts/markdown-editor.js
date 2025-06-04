document.addEventListener('DOMContentLoaded', function() {
    const markdownInput = document.getElementById('markdown-input');
    const markdownPreview = document.getElementById('markdown-preview');

    markdownInput.addEventListener('input', () => {
        const markdownText = markdownInput.value;
        const htmlOutput = marked.parse(markdownText);
        const sanitizedHTML = DOMPurify.sanitize(htmlOutput);
        markdownPreview.innerHTML = sanitizedHTML;
    });
});