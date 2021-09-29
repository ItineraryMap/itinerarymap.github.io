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
        
        let selectorAsOf = document.querySelector("#year-asof");
        let selectorUntil = document.querySelector("#year-until");
        let options = "";
        this.currentYearAsOf = this.yearAsOf;
        this.currentYearUntil = this.yearUntil;
        let year = this.yearAsOf;
        while (year <= this.yearUntil) {
            options += "<option value='" + year + "'>" + year + "</option>";
            year++;
        }
        selectorAsOf.innerHTML = options;
        selectorUntil.innerHTML = options;
        selectorUntil.selectedIndex = this.yearUntil - this.yearAsOf;
        selectorAsOf.addEventListener("change", function() {
                DATA.getLoadedFigure().displayWaypoints();
                DATA.getLoadedFigure().currentYearAsOf = this.value;
            });
        selectorUntil.addEventListener("change", function() {
                DATA.getLoadedFigure().displayWaypoints();
                DATA.getLoadedFigure().currentYearUntil = this.value;
            });
        this.displayWaypoints();
    }

    displayWaypoints() {
        if (this.markers != null) {
            this.hide();
        }
        this.markers = new Map();
        this.maxDays = 0;
        for (let w of this.waypoints) {
            w.figure = this;
            let c = DATA.getCity(w.place);
            if (c != null && (w.x == null || w.y == null)) {
                w.x = c.x;
                w.y = c.y;
            }
            w.marker = this.getOrCreateMarker(w.place, w.x, w.y);
            if ((w.length > 1 && compare(w.date[1], this.currentYearAsOf) < 0) ||
                (w.length == 1 && compare(w.date[0], this.currentYearAsOf) < 0)) {
                continue;
            }
            if (compare(w.date[0], this.currentYearUntil) > 0) {
                break;
            }
            w.marker.addStay(w.date, w.comment);
            if (w.marker.days > this.maxDays) {
                this.maxDays = w.marker.days;
            }
        }
        for (let e of this.markers) {
            e[1].display();
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
