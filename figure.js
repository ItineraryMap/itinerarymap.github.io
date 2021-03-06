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

    display() {
        let box = document.getElementById("infobox-overlay");
        let html = this.getCoatOfArmsImg();
        html += "<div class='tooltip'><a href='https://www.deutsche-biographie.de/" + this.db + ".html'><h1>" + this.name+ "</h1></a><span class='tooltiptext'>" + this.name + " in der Deutschen Biographie</span></div>";
        html += "<p class='dynasty'>Haus " + this.dynasty + "</p>";
        html += "<p><i>*" + this.dateOfBirth + " " + this.placeOfBirth + ", †" + this.dateOfDeath + " " + this.placeOfDeath + "</i></p>";
        for (let t of this.titles) {
            html += t + "<br>";
        }
        box.innerHTML = html;
        if (this.waypoints == null) {
            this.waypoints = new Set();
            DATA.loadWaypoints(this);
        } else {
            for (let w of this.waypoints) {
                w.display();
            }
        }
    }

    getCoatOfArmsImg() {
        return "<img src='resources/coa/" + this.id +".svg'>";
    }

    getCoatOfArmsSrc() {
        return "http://wappenwiki.org/images/" + this.coatOfArms + ".svg";
    }

}
