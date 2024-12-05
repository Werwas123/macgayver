// app.js
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const typedarray = new Uint8Array(this.result);

            pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                let textOutput = '';
                const numPages = pdf.numPages;

                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    pdf.getPage(pageNum).then(function(page) {
                        page.getTextContent().then(function(textContent) {
                            textContent.items.forEach(function(item) {
                                textOutput += item.str + ' ';
                            });
                            document.getElementById('textOutput').textContent = textOutput;
                        });
                    });
                }
            });
        };
        fileReader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a valid PDF file.');
    }
});
