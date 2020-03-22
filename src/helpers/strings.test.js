import { getStringByLanguage } from './strings'

const strings = {
  en: {
    submit: 'submit',
  },
  emoji: {
    submit: '🚀',
  },
  portugueses: {}
}

describe('language string testing', () => {

  beforeEach(() => {

  });

  afterEach(() => {

  });

  test('returns correct submit string for english', () => {
    const string = getStringByLanguage(strings.en, strings.submit, strings);
    expect(string).toBe(strings.submit)
  });

  test('returns the correct submit string for emoji', () => {

  });
  test('returns english submit string when language does not exist', () => {

  });
  test('returns english submit string when submit key does not exist for language', () => {

  });
});