document.getElementById('analyzeButton').addEventListener('click', function() {
    const text = document.getElementById('textInput').value;

    // Используем библиотеку compromise для анализа текста
    const doc = nlp(text);

    // Пример анализа: определение частей речи
    const nouns = doc.nouns().out('array');
    const verbs = doc.verbs().out('array');

    // Заполнение результатов анализа
    document.getElementById('styleGenre').textContent = 'Научный'; // Это пример, замените на реальный анализ
    document.getElementById('theme').textContent = 'Технологии'; // Это пример, замените на реальный анализ
    document.getElementById('idea').textContent = 'Влияние технологий на общество'; // Это пример, замените на реальный анализ
    document.getElementById('usageSituation').textContent = 'Академическая статья'; // Это пример, замените на реальный анализ
    document.getElementById('purpose').textContent = 'Информирование'; // Это пример, замените на реальный анализ
    document.getElementById('speechForm').textContent = 'Письменная'; // Это пример, замените на реальный анализ
    document.getElementById('speechType').textContent = 'Рассуждение'; // Это пример, замените на реальный анализ
    document.getElementById('speechKind').textContent = 'Монолог'; // Это пример, замените на реальный анализ
    document.getElementById('styleFeatures').textContent = `Существительные: ${nouns.join(', ')}`;
    document.getElementById('stylisticDevices').textContent = `Глаголы: ${verbs.join(', ')}`;
});
