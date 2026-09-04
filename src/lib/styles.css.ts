import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, themeVars] = createTheme({
	color: {
		bg: '#fbffe3',
		text: '#000000',
		header: '#000000',
		konkani_word: '#d62a03',
		konkani_text: '#d62a03',
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
	wordContainer: style({
		fontFamily: themeVars.font.konkani_word,
		color: themeVars.color.konkani_word
	}),
	entryPOS: style({}),
	entryWord: style({}),
	meaningContainer: style({}),
	meanings: style({}),

	exampleTable: style({}),
	exampleTableRow: style({}),
	exampleTableEnglish: style({
		border: '1px solid black',
		color: themeVars.color.english_text,
		fontFamily: themeVars.font.english_text
	}),
	exampleTableKonkani: style({
		border: '1px solid black',
		color: themeVars.color.konkani_text,
		fontFamily: themeVars.font.konkani_text
	}),
	exampleTableLiteral: style({
		border: '1px solid black',
		color: themeVars.color.meta_text,
		fontFamily: themeVars.font.meta_text
	}),

	formTable: style({
		borderCollapse: 'collapse'
	}),
	formTableRow: style({}),
	formTableLabelCell: style({
		border: '1px solid black',

		color: themeVars.color.meta_text,
		fontFamily: themeVars.font.meta_text
	}),
	formTableEnglishCell: style({
		border: '1px solid black',

		color: themeVars.color.english_word,
		fontFamily: themeVars.font.english_text
	}),
	formTableValueCell: style({
		border: '1px solid black',

		color: themeVars.color.konkani_word,
		fontFamily: themeVars.font.konkani_text
	}),
	categoryContainer: style({}),
	categoryBox: style({})
};
export const catPageStyles = {
	entryGrid: style({
		display: 'grid',
		gridTemplateColumns: 'auto auto auto auto',

	}),
	entryCard: style({
		textDecoration: 'none',
		padding: '1em 2em',
		backgroundColor: "#ff9900",
		margin: '1em',
		borderRadius: '5px',
		":hover": {
			backgroundColor: "#ffcc00",
		}

	}),
	entryWord: style({
		fontFamily: themeVars.font.konkani_word,
		color: themeVars.color.konkani_word

	}),
	entryMeaning: style({
		color: themeVars.color.english_word,
		fontFamily: themeVars.font.english_word
	}),
	entryPOS: style({
		color: themeVars.color.meta_text,
		fontFamily: themeVars.font.meta_text
	})
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
