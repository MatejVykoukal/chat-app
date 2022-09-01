import { defaultDictionary } from '../constants';

export const scrollToBottom = (elementId: string) => {
	const element = document.getElementById(elementId);
	element.scrollIntoView({ behavior: 'smooth' });
};

export const useDictionary = (
	dictionaryQuery: keyof typeof defaultDictionary,
	fallbackString = `???-${dictionaryQuery}`,
	dictionary = defaultDictionary
) => {
	return dictionary[dictionaryQuery]
		? dictionary[dictionaryQuery]
		: fallbackString;
};
