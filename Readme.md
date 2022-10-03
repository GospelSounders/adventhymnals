# Advent Hymnals Site

Advent Hymnals Site created using [csycms](https://github.com/csymapp/csycms).

## Usage

### Editing Hymnals List

List of hymnals is in `./public/json/hymnals.json` having the format:

```json
{
"HfPF1838": {
    "name": "Hymns for the Poor of the Flock",
    "abbvr": "HfPF1838",
    "year": "1838",
    "numSongs": "453",
    "parts": {
      "main": { "type": "hymnal", "numSongs":377},
      "special occassions": { "type": "hymnal", "numSongs":75},
      "prayer": { "type": "prayer", "numSongs":1}
    },
    "separateParts": 1,
    "lang": "en",
    "compiler": "Unknown",
    "siteName": "Hymns for the Poor of the Flock",
    "link":"hymns-for-the-poor-of-the-flock",
    "gtLink": "GospelSounders/adventhymnals/master/content/08.hymns-for-the-poor-of-the-flock"
  },
  ...
}
```
|Section|Description|
|-------|-----------|
|name| The name of the hymnal|
|abbvr|The abbreviation to use for the hymnal|
|year| Year of publishing|
|numSongs| Number of songs in hymnal, including scripture readings|
|parts|The different parts of the hymnal|
|separateParts| The number of different hymnals in the hymmnal.|
|lang| Language in its abbreviated form|
|compiler|Hymnal Compiler|
|siteName|Reasonably short name for the hymnal to show on website|
|link|Hymnal name used in sitemap|
|gtLink|link to github repo directory for the hymnal|

### Editing Languages
Languages are editted in a similar manner. List of hymnals is in `./public/json/languages.json` having the format:
```json
{
    "en": "English",
    "swa": "Kiswahili",
    "luo": "Dholuo"
}
```

### Editing Hymnals
The content for each hymnals is contained in the `./content/{0-9}{0-9}.{link}`. `{link}` is the link given in `./public/json/hymnals.json`. The directory structure there is self explanatory. Check any existing hymnal for a sample.

The rest of the details are in `./public/json/{link}`. Again check an existing directory for a sample.

