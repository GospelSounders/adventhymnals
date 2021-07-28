const fs = require("fs-extra");
const path = require("path")
const csv = require('csvtojson')

const createLink = (hymnals, abbvr) => {
    let hymnal = {}
    for (let i in hymnals) {
        if (hymnals[i].abbvr === abbvr) {
            hymnal = hymnals[i];
            break;
        }
    }
    let link;
    if (hymnal.link === "" || hymnal.link === undefined) link = hymnal.name.toLowerCase().replace(/ /g, "-")
    else link = hymnal.link
    return link
}

const main = async () => {
    const csvFilePath = 'Indices - AdventHymnals - Similar.csv'
    let jsonArray = await csv().fromFile(csvFilePath);
    for (let i in jsonArray) delete jsonArray[i].Title
    let hymnals = Object.keys(jsonArray[0])

    let hymnalsObjs = {}
    hymnals.map(hymnal => hymnalsObjs[hymnal] = {})

    // let tmpObj = {}
    for (let i in jsonArray) {
        let tmp = {}
        hymnals.map(hymnal => {
            let hymnalNumber = jsonArray[i][hymnal]
            if (hymnalNumber !== '') {
                tmp[hymnal] = `${hymnal}_${hymnalNumber}`
            }
        })

        let tmpNumsArr = []
        const similarInOtherHymnals = (hymnal) => {
            let ret = [];
            for (let j in tmp) {
                if (hymnal !== j) ret.push(tmp[j])
            }
            return ret
        }
        for (let hymnal in tmp) {
            // console.log(hymnal, tmp[hymnal])
            let num = tmp[hymnal].split('_')[1]
            let tmpSimilar = similarInOtherHymnals(hymnal)
            if (tmpSimilar.length > 0) {
                if (hymnalsObjs[hymnal][num] === undefined) hymnalsObjs[hymnal][num] = tmpSimilar
                else hymnalsObjs[hymnal][num] = hymnalsObjs[hymnal][num].concat(tmpSimilar)
            }
        }
    }
    let savedHymnalLinks = fs.readFileSync("../json/hymnals.json");
    savedHymnalLinks = JSON.parse(savedHymnalLinks);
    console.log(hymnalsObjs)
    console.log(savedHymnalLinks)
    for (let i in hymnalsObjs) {
        let data = JSON.stringify(hymnalsObjs[i]);
        // console.log(data)
        let link = createLink(savedHymnalLinks, i);
        let filePath = path.join("../json", link, "comparisons.json");
        console.log(filePath)
        try {
            fs.writeFileSync(filePath, data);
        } catch (error) { }
    }
}

main();