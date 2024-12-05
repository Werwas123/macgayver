document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const output = document.getElementById('output');

    editor.addEventListener('input', () => {
        output.textContent = editor.value;
    });
});

