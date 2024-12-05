document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    const output = document.getElementById('output');
    const clearBtn = document.getElementById('clearBtn');
    const copyBtn = document.getElementById('copyBtn');

    function analyzeText(text) {
        // Базовый анализ текста
        const analysis = {
            characters: text.length,
            words: text.trim().split(/\s+/).length,
            sentences: text.split(/[.!?]+/).length - 1,
            paragraphs: text.split('\n\n').length,
            // Анализ тона (простой пример)
            tone: analyzeTone(text),
            // Поиск повторяющихся слов
            repeatedWords: findRepeatedWords(text),
            // Синтаксический анализ
            syntax: analyzeSyntax(text)
        };
        
        return analysis;
    }

    function analyzeTone(text) {
        const positiveWords = ['хорошо', 'отлично', 'прекрасно', 'замечательно'];
        const negativeWords = ['плохо', 'ужасно', 'отвратительно'];
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        const words = text.toLowerCase().split(/\s+/);
        words.forEach(word => {
            if (positiveWords.includes(word)) positiveCount++;
            if (negativeWords.includes(word)) negativeCount++;
        });

        if (positiveCount > negativeCount) return 'позитивный';
        if (negativeCount > positiveCount) return 'негативный';
        return 'нейтральный';
    }

    function findRepeatedWords(text) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const wordCount = {};
        const repeated = [];

        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
            if (wordCount[word] === 2) repeated.push(word);
        });

        return repeated;
    }

    function analyzeSyntax(text) {
        return {
            exclamationMarks: (text.match(/!/g) || []).length,
            questionMarks: (text.match(/\?/g) || []).length,
            commas: (text.match(/,/g) || []).length,
        };
    }

    editor.addEventListener('input', () => {
        const text = editor.value;
        const analysis = analyzeText(text);
        
        // Форматируем вывод анализа
        output.innerHTML = `
            <h3>Анализ текста:</h3>
            <p>Символов: ${analysis.characters}</p>
            <p>Слов: ${analysis.words}</p>
            <p>Предложений: ${analysis.sentences}</p>
            <p>Абзацев: ${analysis.paragraphs}</p>
            <p>Тон текста: ${analysis.tone}</p>
            <p>Повторяющиеся слова: ${analysis.repeatedWords.join(', ') || 'нет'}</p>
            <p>Синтаксис:</p>
            <ul>
                <li>Восклицательных знаков: ${analysis.syntax.exclamationMarks}</li>
                <li>Вопросительных знаков: ${analysis.syntax.questionMarks}</li>
                <li>Запятых: ${analysis.syntax.commas}</li>
            </ul>
        `;
    });

    // Остальной код остается без изменений...
});
