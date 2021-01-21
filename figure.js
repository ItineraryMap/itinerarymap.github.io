"use strict";
class Figure {

    constructor(id, name, listEntry, dynasty, dateOfBirth, placeOfBirth, dateOfDeath, placeOfDeath, titles, coatOfArms, db) {
        this.id = id;
        this.name = name;
        this.listEntry = listEntry;
        this.dynasty = dynasty;
        this.dateOfBirth = dateOfBirth;
        this.placeOfBirth = placeOfBirth;
        this.dateOfDeath = dateOfDeath;
        this.placeOfDeath = placeOfDeath;
        this.titles = titles;
        this.coatOfArms = coatOfArms;
        this.db = db;
    }

    printToInfobox() {
        let box = document.getElementById("infobox-overlay");
        let html = this.getCoatOfArmsImg();
        html += "<div class='tooltip'><a href='https://www.deutsche-biographie.de/" + this.db + ".html'><h1>" + this.name+ "</h1></a><span class='tooltiptext'>" + this.name + " in der Deutschen Biographie</span></div>";
        html += "<p class='dynasty'>Haus " + this.dynasty + "</p>";
        html += "<p><i>*" + this.dateOfBirth + " " + this.placeOfBirth + ", †" + this.dateOfDeath + " " + this.placeOfDeath + "</i></p>";
        for (let i in this.titles) {
            html += this.titles[i] + "<br>";
        }
        box.innerHTML = html;
    }

    getCoatOfArmsImg() {
        return "<img src='resources/coa/" + this.id +".svg'>";
    }

    getCoatOfArmsSrc() {
        return "http://wappenwiki.org/images/" + this.coatOfArms + ".svg";
    }

}

const FIGURES = [
    new Figure("karl4-hrr",
        "Karl IV.",
        "Karl IV. (HRR)",
        "Luxemburg",
        "1316",
        "Prag",
        "1378",
        "ebd.",
        ["König (1346) und Kaiser (1355) des Heiligen Römischen Reichs",
            "König von Böhmen (1347)",
            "Markgraf von Brandenburg (1373)"],
        "e/ed/HRE_Luxembourg_Bohemia",
        "sfz70316"),
    new Figure("sigismund-hrr",
        "Sigismund",
        "Sigismund (HRR)",
        "Luxemburg",
        "1368",
        "Nürnberg",
        "1437",
        "Znaim",
        ["König (1411) und Kaiser (1433) des Heiligen Römischen Reichs",
            "König von Ungarn und Kroatien (1387)",
            "König von Böhmen (1419)",
            "Markgraf von Brandenburg (1378-1388 & 1411-1415)"],
        "9/9d/HRE_Sigismund",
        "sfz56308")
];

function getFigure(id) {
    for (var i in FIGURES) {
        if (FIGURES[i].id == id) {
            return FIGURES[i];
        }
    }
    return null;
}
