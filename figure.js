"use strict";
class Figure {

    constructor(listEntry, id, name, dynasty, dateOfBirth, placeOfBirth, dateOfDeath, placeOfDeath, titles, coatOfArms, db) {
        this.listEntry = listEntry;
        this.id = id;
        this.name = name;
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
        var box = document.getElementById("infobox-overlay");
        var html = this.getCoatOfArmsImg();
        html += "<div class='tooltip'><a href='https://www.deutsche-biographie.de/" + this.db + ".html'><h1>" + this.name+ "</h1></a><span class='tooltiptext'>" + this.name + " in der Deutschen Biographie</span></div>";
        html += "<p class='dynasty'>Haus " + this.dynasty + "</p>";
        html += "<p><i>*" + this.dateOfBirth + " " + this.placeOfBirth + ", †" + this.dateOfDeath + " " + this.placeOfDeath + "</i></p>";
        for (var i in this.titles) {
            html += this.titles[i] + "<br>";
        }
        box.innerHTML = html;
    }

    getCoatOfArmsImg() {
        return "<img src='http://wappenwiki.org/images/" + this.coatOfArms + ".svg'>";
    }

    createWaypoint(id, x, y) {
        var element = document.createElement("div");
        element.id = "waypoint-" + id;
        element.className = "waypoint";
        element.innerHTML = this.getCoatOfArmsImg();
        viewer.addOverlay(element, OpenSeadragon.Point(x, y), OpenSeadragon.Placement.CENTER);
    }

}

const FIGURES = [
    new Figure("Karl IV. (HRR)",
        "karl4-hrr",
        "Karl IV.",
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
    new Figure("Sigismund (HRR)",
        "sigismund-hrr",
        "Sigismund",
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
