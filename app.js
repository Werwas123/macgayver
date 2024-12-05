function determineSpeechType(text) {
    const markers = {
        narrative: {
            words: ['затем', 'потом', 'после', 'сначала', 'вдруг', 'однажды', 'далее'],
            patterns: /([а-яё]+л|[а-яё]+ла|[а-яё]+ли)\b/gi  // Глаголы прошедшего времени
        },
        descriptive: {
            words: ['такой', 'словно', 'подобный', 'похожий', 'будто', 'как'],
            patterns: /([а-яё]+ый|[а-яё]+ая|[а-яё]+ое|[а-яё]+ые)\b/gi  // Прилагательные
        },
        reasoning: {
            words: ['потому что', 'поэтому', 'следовательно', 'итак', 'таким образом', 'во-первых', 'во-вторых'],
            patterns: /\b(если|поскольку|так как)\b/gi  // Причинные союзы
        }
    };

    const scores = {
        narrative: 0,
        descriptive: 0,
        reasoning: 0
    };

    const lowerText = text.toLowerCase();

    // Подсчет маркеров
    Object.entries(markers).forEach(([type, {words, patterns}]) => {
        // Проверка ключевых слов
        words.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = (lowerText.match(regex) || []).length;
            scores[type] += matches;
        });

        // Проверка паттернов
        const patternMatches = (lowerText.match(patterns) || []).length;
        scores[type] += patternMatches;
    });

    // Определение преобладающего типа речи
    const dominantType = Object.entries(scores)
        .sort((a, b) => b[1] - a[1])[0][0];

    return {
        type: dominantType,
        details: {
            isNarrative: scores.narrative > 0,
            isDescriptive: scores.descriptive > 0,
            isReasoning: scores.reasoning > 0,
            markers: scores
        }
    };
}

function analyzeStylistics(text) {
    const stylistics = {
        tropes: findTropes(text),
        lexical: findLexicalMeans(text),
        syntactic: findSyntacticMeans(text),
        figures: findStylisticFigures(text)
    };

    return stylistics;
}

function findTropes(text) {
    const tropes = [];
    const patterns = {
        epithet: /([а-яё]+ый|[а-яё]+ая|[а-яё]+ое|[а-яё]+ые)\s+[а-яё]+/gi,
        metaphor: /(словно|будто|как)\s+[а-яё]+/gi,
        personification: /[а-яё]+ит|[а-яё]+ет\s+(солнце|ветер|дождь|природа)/gi
    };

    Object.entries(patterns).forEach(([type, pattern]) => {
        if (text.match(pattern)) {
            tropes.push(type);
        }
    });

    return tropes;
}

function findLexicalMeans(text) {
    const means = [];
    const patterns = {
        diminutive: /[а-яё]+(очк|ечк|оньк|еньк|ушк|юшк)[а-яё]+/gi,
        professional: /(терминал|процесс|функция|система)/gi,
        dialect: /(айда|давеча|намедни)/gi
    };

    Object.entries(patterns).forEach(([type, pattern]) => {
        if (text.match(pattern)) {
            means.push(type);
        }
    });

    return means;
}

function findSyntacticMeans(text) {
    const means = [];
    const patterns = {
        exclamation: /!+/g,
        question: /\?+/g,
        parallelism: /([а-яё]+,[^,]+){2,}/gi,
        repetition: /\b([а-яё]+)\b[^а-яё]+\b\1\b/gi
    };

    Object.entries(patterns).forEach(([type, pattern]) => {
        if (text.match(pattern)) {
            means.push(type);
        }
    });

    return means;
}
