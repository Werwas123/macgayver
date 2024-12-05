document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
        console.log('Файл загружен:', file.name);
        const fileReader = new FileReader();
        fileReader.onload = function() {
            const typedarray = new Uint8Array(this.result);
            pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                console.log('PDF загружен, количество страниц:', pdf.numPages);
                let textOutput = '';
                const numPages = pdf.numPages;

                const promises = [];
                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    promises.push(pdf.getPage(pageNum).then(function(page) {
                        return page.getTextContent().then(function(textContent) {
                            textContent.items.forEach(function(item) {
                                textOutput += item.str + ' ';
                            });
                        });
                    }));
                }

                Promise.all(promises).then(function() {
                    console.log('Текст извлечен:', textOutput);
                    document.getElementById('textOutput').textContent = textOutput;
                    performTextAnalytics(textOutput);
                });
            });
        };
        fileReader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a valid PDF file.');
    }
});
