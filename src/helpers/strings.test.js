import { t } from './strings'

const strings = {
  en: {
    submit: 'Submit',
  },
  emoji: {
    submit: '🚀',
  },
  portuguese: {}
}

describe('language string testing', () => {
  let spy
  beforeEach(() => {
    spy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test('returns correct submit string for english', () => {
    const string = t('en', 'submit', strings);
    expect(string).toBe(strings.en.submit)
  });

  test('returns the correct submit string for emoji', () => {
    const string = t('emoji', 'submit', strings);
    expect(string).toBe(strings.emoji.submit)
  });
  test('returns english submit string when language does not exist', () => {
    const string = t('notALanguage', 'submit', strings);
    expect(string).toBe(strings.en.submit)
    expect(console.log).toHaveBeenLastCalledWith('Could not get string [submit] for [notALanguage]')
  });
  test('returns english submit string when submit key does not exist for language', () => {
    const string = t('portuguese', 'submit', strings);
    expect(string).toBe(strings.en.submit)
    expect(console.log).toHaveBeenLastCalledWith('Could not get string [submit] for [portuguese]')
  });
});

