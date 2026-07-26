# dictionary

# contributing entries
each entry is a file in a part of speech folder within the entries folder
#### what goes in misc?
- sentences/phrases that mean something different from their parts (poishe lagta, nidh yeta etc.)
- similarly, phrases that have components that act differently (karunka, maka zai)
- interrogative words (kaale, kite~)
  - subject to change
- non-pronoun pro-forms (angaa, tho~i, ixin, tixin)
## spelling
See SPELLING.md for the romanization: [SPELLING.md](SPELLING.md)
This spelling format was made to balance ease of reading and typing as well as precision.  

additionally, to try it yourself, try [aksharamukha](https://www.aksharamukha.com/converter) to convert to and from velthuis romanization

(aksharamukha doesn't allow using /, so replace it with ~m when testing)
## format
entries are .json files that follow this format:
```json
{
  "konkani_word": "",
  "meaning": [""],
  "part_of_speech": "",
  "keywords": [""],
  "forms": [
    {  
      "label": "",
      "form_value": ""
    }
  ],
  "examples": [
    {
      "konkani_sentence": "",
      "english_sentence": ""
    }
  ],
  "categories": [""], // find categories in schema/entry.ts
  "status": "draft", // or published
  "note":""
}
```
`[]` is a list of items
`{}` is a grouping of text fields
`""` is text
if a word starts with a period (i.e. .sik), replace the leading period with _ (_sik.json)
### keywords
keywords are used for search. They include the word itself, alternate spellings, commonly used forms, english meanings and synonyms of the english meaning. 
Additionally, if the word is close to another language's word, that word should also go there
use your best judgement
## forms
the different forms the entry can take
the label should have 
#### examples
add examples for every form that needs one
use your best judgement
#### nouns
if a nouns has a plural, **add it**  to forms
konkani_word, however, should be the **singular** form
#### verbs
if a verb conjugates irregularly (i.e. ye -> aile), add all forms that conjugate irregularly
additionally, always add the gerund and infinitive (doing and to do, karun and karunk, respectively) if the verb ends in a **vowel**
#### adjectives
add all adjective forms (i.e. boro, bari, bare~)
#### misc
if a phrase changes depending on the verb/noun/subject/situation, include it
## examples
