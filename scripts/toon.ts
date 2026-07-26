import {encode } from '@toon-format/toon';
import { readdirSync } from 'node:fs';
import { readFileSync, writeFileSync } from 'node:fs';
// simple function to take a json file and convert to toon

function convertJsonToToon(jsonFile: string, toonFile: string) {
	const jsonData = JSON.parse(readFileSync(jsonFile, 'utf8'));
	const toonData = encode(jsonData);
	writeFileSync(toonFile, toonData);
}

// do that for every json file in the directory argument

const dir = process.argv[2];
readdirSync(dir).forEach(file => {
    if (file.endsWith('.json')) {
        const jsonFile = `${dir}/${file}`;
        const toonFile = `${dir}/${file.replace('.json', '.toon')}`;
        convertJsonToToon(jsonFile, toonFile);
    }
});