document.getElementById('analyzeButton').addEventListener('click', function() {
    const fileInput = document.getElementById('pdfInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a PDF file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function() {
        const typedarray = new Uint8Array(this.result);

        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
            let textContent = '';

            const numPages = pdf.numPages;
            let pagePromises = [];

            for (let i = 1; i <= numPages; i++) {
                pagePromises.push(pdf.getPage(i).then(function(page) {
                    return page.getTextContent().then(function(textContent) {
                        return textContent.items.map(item => item.str).join(' ');
                    });
                }));
            }

            Promise.all(pagePromises).then(function(pagesText) {
                textContent = pagesText.join(' ');
                document.getElementById('output').textContent = textContent;
            });
        });
    };

    reader.readAsArrayBuffer(file);
});
