document.addEventListener('DOMContentLoaded', function() {
    const richtextInput = document.getElementById('richtext-input');
    const markdownOutput = document.getElementById('markdown-output');

    function clearContent() {
        richtextInput.innerHTML = '';
        markdownOutput.textContent = '';
    }

    function copyMarkdown() {
        const markdown = markdownOutput.textContent;
        if (markdown) {
            navigator.clipboard.writeText(markdown).then(() => {
                alert('Markdown copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    }

    function updateMarkdown() {
        const htmlContent = richtextInput.innerHTML;
        const markdown = htmlToMarkdown(htmlContent);
        markdownOutput.textContent = markdown;
    }

    function htmlToMarkdown(html) {
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Process each node recursively
        function processNode(node) {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent;
            }
            
            let markdown = '';
            const tagName = node.tagName ? node.tagName.toLowerCase() : '';
            
            // Process child nodes first
            for (let child of node.childNodes) {
                markdown += processNode(child);
            }
            
            // Apply markdown formatting based on tag
            switch(tagName) {
                case 'strong':
                case 'b':
                    return `**${markdown}**`;
                case 'em':
                case 'i':
                    return `*${markdown}*`;
                case 'h1':
                    return `# ${markdown}\n\n`;
                case 'h2':
                    return `## ${markdown}\n\n`;
                case 'h3':
                    return `### ${markdown}\n\n`;
                case 'h4':
                    return `#### ${markdown}\n\n`;
                case 'h5':
                    return `##### ${markdown}\n\n`;
                case 'h6':
                    return `###### ${markdown}\n\n`;
                case 'p':
                    return `${markdown}\n\n`;
                case 'br':
                    return `\n`;
                case 'ul':
                    // Process list items with bullets
                    let ulContent = '';
                    node.querySelectorAll('li').forEach(li => {
                        ulContent += `- ${processNode(li).trim()}\n`;
                    });
                    return `${ulContent}\n`;
                case 'ol':
                    // Process numbered list items
                    let olContent = '';
                    node.querySelectorAll('li').forEach((li, index) => {
                        olContent += `${index + 1}. ${processNode(li).trim()}\n`;
                    });
                    return `${olContent}\n`;
                case 'li':
                    // List items are processed by their parent ul/ol
                    return markdown;
                case 'a':
                    const href = node.getAttribute('href');
                    // Only create a link if href exists and isn't empty/null
                    if (href && href !== 'null' && href.trim() !== '') {
                        return `[${markdown}](${href})`;
                    }
                    return markdown; // Return just the text if no valid href
                case 'img':
                    const src = node.getAttribute('src');
                    const alt = node.getAttribute('alt') || '';
                    return `![${alt}](${src})`;
                case 'code':
                    return `\`${markdown}\``;
                case 'pre':
                    return `\`\`\`\n${markdown}\n\`\`\`\n\n`;
                case 'blockquote':
                    return `> ${markdown.replace(/\n/g, '\n> ')}\n\n`;
                case 'hr':
                    return `---\n\n`;
                default:
                    return markdown;
            }
        }
        
        // Process all top-level nodes
        let result = '';
        for (let child of tempDiv.childNodes) {
            result += processNode(child);
        }
        
        // Clean up extra newlines
        result = result.replace(/\n{3,}/g, '\n\n').trim();
        
        return result;
    }

    // Set up event listeners
    document.querySelector('.editor-toolbar button:nth-child(1)').addEventListener('click', clearContent);
    document.querySelector('.editor-toolbar button:nth-child(2)').addEventListener('click', copyMarkdown);
    richtextInput.addEventListener('input', updateMarkdown);
    
    richtextInput.addEventListener('paste', (e) => {
        // Let the paste happen first to get the HTML content
        setTimeout(() => {
            updateMarkdown();
        }, 10);
    });

    // Initialize with placeholder text
    richtextInput.innerHTML = '<p>Paste your rich text here...</p>';
    updateMarkdown();
});