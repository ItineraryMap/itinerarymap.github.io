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
            this.markers = new Map();
            DATA.loadWaypoints(this);
        } else {
            for (let e of this.markers) {
                e[1].display();
            }
        }
    }

    hide() {
        for (let e of this.markers) {
            e[1].hide();
        }
    }

    getCoatOfArmsImg(width, height) {
        return "<img src='resources/coa/" + this.id + ".svg' width='" + width + "' height='" + height + "'>";
    }

    getCoatOfArmsSrc() {
        return "http://wappenwiki.org/images/" + this.coatOfArms + ".svg";
    }

    getOrCreateMarker(place, x, y) {
        if (this.markers.has(place)) {
            return this.markers.get(place);
        }
        let marker = new Waypoint(this, place, x, y);
        this.markers.set(place, marker);
        return marker;
    }

}
