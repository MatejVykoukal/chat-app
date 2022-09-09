import { DEFAULT_DICTIONARY } from '../constants';

export const scrollToBottom = (elementId: string) => {
	const element = document.getElementById(elementId);
	element.scrollIntoView({ behavior: 'smooth' });
};

export const useDictionary = (
	dictionaryQuery: keyof typeof DEFAULT_DICTIONARY,
	fallbackString = `???-${dictionaryQuery}`,
	dictionary = DEFAULT_DICTIONARY
) => {
	return dictionary[dictionaryQuery]
		? dictionary[dictionaryQuery]
		: fallbackString;
};
