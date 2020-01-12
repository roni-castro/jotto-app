import getLetterMatchCount from "./LetterMatch";

const secretWord = 'party';

test('match zero letters', () => {
    const qty = getLetterMatchCount('house', secretWord);
    expect(qty).toBe(0);
});

test('returns correct count when there are 3 matching letters', () => {
    const qty = getLetterMatchCount('train', secretWord);
    expect(qty).toBe(3);
});

test('returns correct count when there are duplicate matching letters in the guess', () => {
    const qty = getLetterMatchCount('parka', secretWord);
    expect(qty).toBe(3);
});