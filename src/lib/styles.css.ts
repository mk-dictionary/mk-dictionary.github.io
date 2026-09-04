import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, themeVars] = createTheme({
	color: {
		bg: '#fbffe3',
		text: '#000000',
		header: '#000000',
		konkani_word: '#000000',
		konkani_text: '#000000',
		english_word: '#480303',
		english_text: '#560808',
		meta_text: '#043e3f'
	},
	font: {
		basicText: 'Arial, sans-serif',
		header: 'Arial, sans-serif',
		konkani_word: 'Helvetica, Arial, sans-serif',
		konkani_text: 'Arial, sans-serif',
		english_word: 'Arial, sans-serif',
		english_text: 'Arial, sans-serif',
		meta_text: 'Arial, sans-serif'
	}
});

export const globalLayoutStyles = {
	footer: style({}),
	header: style({}),
	body: style({
		color: themeVars.color.text,
		fontFamily: 'Arial, sans-serif'
	})
};

export const entryPageStyles = {
	wordContainer: style({}),
	entryPOS: style({}),
	entryWord: style({}),
	meaningContainer: style({}),
	meanings: style({}),

	exampleTable: style({}),
	exampleTableRow: style({}),
	exampleTableEnglish: style({ color: themeVars.color.english_text, fontFamily: themeVars.font.english_text}),
	exampleTableKonkani: style({ color: themeVars.color.konkani_text, fontFamily: themeVars.font.konkani_text }),
	exampleTableLiteral: style({ color: themeVars.color.meta_text, fontFamily: themeVars.font.meta_text }),

	formTable: style({
        borderCollapse: 'collapse',
    }),
	formTableRow: style({

    }),
	formTableLabelCell: style({
                border: '1px solid black',

		color: themeVars.color.meta_text,
		fontFamily: themeVars.font.meta_text
	}),
	formTableEnglishCell: style({
                border: '1px solid black',

		color: themeVars.color.english_text,
		fontFamily: themeVars.font.english_text
	}),
	formTableValueCell: style({
                border: '1px solid black',

		color: themeVars.color.konkani_text,
		fontFamily: themeVars.font.konkani_text
	}),
	categoryContainer: style({}),
	categoryBox: style({})
};
export const catPageStyles = {
	entryWord: style({}),
	entryMeaning: style({}),
	entryPOS: style({})
};
export const catCompStyles = {
	categoriesGrid: style({}),
	categoryCard: style({}),
	categoryLink: style({})
};
export const frontPageStyles = {
	createEntryLink: style({}),
	layout: style({})
};

export const searchCompStyles = {
	searchInput: style({}),
	searchResults: style({}),
	searchContainer: style({}),
	searchResultContainer: style({}),
	searchResultLink: style({}),
	searchResultWord: style({})
};

export const editPageStyles = {
	table: style({
		borderCollapse: 'collapse'
	}),
	tableBody: style({}),
	tableHeaderRow: style({}),
	tableHeaderCell: style({
		color: 'green'
	}),
	tableRow: style({}),
	tableCell: style({}),
	tableCellInput: style({}),
	addRowButton: style({}),
	removeRowButton: style({}),
	submitButton: style({})
};
