---
title: fetching headers
metadata:
    description: 
    keywords: 
    author: 
toc: false
---

## Fetching Headers

Headers are such details as are defined under the [structure]({{{cself-}}}/adventhymnals#structure) section.

These, which are found in the respective pdfs ([1941 church hymnal pdf]({{{cself}}}/resources/1941-sda-hymnal-1.pdf), etc), can be scraped from [hymnary.org](https://hymnary.org/hymn/CHSD1941/1). The scripts for doing this are found in the [tools/headers](https://github.com/GospelSounders/adventhymnals/tree/master/tools/headers) directory.

Running `index.js` will create 2 files having header data for both [Christ in Song](https://hymnary.org/hymn/CSR1908/1) and [Church hymnal](https://hymnary.org/hymn/CHSD1941/1) respectively.

This might be dropped here for reference:

```javascript
titleCase  = (str) => {
  return str.replace(/([A-Z])([A-Z]+)([^A-Z]+)/g, function(match, $1, $2, $3){return $1+$2.toLowerCase() + $3})
}
```

## Initial Edits

### Missing Numbers

Data for some hymns are missing in the data provided by hymnary. For these to be added, it is required, first, that the missing numbers be identified. This is done by running `missingNumbers.js` which is also found in the [tools/headers](https://github.com/GospelSounders/adventhymnals/tree/master/tools/headers) directory.

Once the list of missing numbers is found, run `enterMissinginformation.js`, which is found in the same directory, which will guide you through to see that you enter the missing information in the required format to avoid breaking any part of what has been done so far.

>>>>> #389 is missing in Christ in Song 1908 Edition

### Authors

To form an index of authors/poets and composers, it is required that the name of a single person appearing in different hymns be consistent in its format. This is not the case with the data we have so far. To be able to fix this, first it is required that all hymns have their authors/poets and composers/arrangers listed. To check if all hymns have these run the following: `checkMissing.js` and follow the prompts till everything is fixed.                                                                                                                                                                                         

Some important header information is not contained in the data extracted from hymnary. These are obtained from the respective pdfs ([1941 church hymnal pdf]({{{cself}}}/resources/1941-sda-hymnal-1.pdf), etc)

### Titles and First Lines

` sort -o "CHSD1941Title&FirstLines" "CHSD1941Title&FirstLines"`

```
(.*)([0-9][0-9][0-9],)\n    $2$1\n
( [_\.]+ )\n  \n
\n([0-9]+)( .*)([0-9]{3})(.*)   \n$3 $2\n$1$4
```
