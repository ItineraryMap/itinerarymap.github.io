"use strict";
class Figure {

    display() {
        this.displayBox();
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

    displayBox() {
        let box = document.getElementById("infobox-overlay");
        let html = this.getCoatOfArmsImg();
        html += "<div class='tooltip'><a href='https://www.deutsche-biographie.de/" + this.db + ".html'><h1>" + this.name+ "</h1></a><span class='tooltiptext'>" + this.name + " in der Deutschen Biographie</span></div>";
        html += "<p class='dynasty'>Haus " + this.dynasty + "</p>";
        html += "<p><i>*" + this.dateOfBirth + " " + this.placeOfBirth + ", †" + this.dateOfDeath + " " + this.placeOfDeath + "</i></p>";
        for (let t of this.titles) {
            html += t + "<br>";
        }

        if (this.interregnum) {
            html += "<p><center><a href='#' id='link-interregnum'>Über das Interregnum</a></center></p>";
        }
        html += "<p>";
        html += this.text;
        html += "</p><p style='text-indent:10px;'><i>" + this.author + "</i></p>Quellen:<br><ul class='sourcelist'>";
        for (let q of this.sources) {
            html += "<li>" + q + "</li>";
        }
        html += "</ul>";
        box.innerHTML = html;

        if (this.interregnum) {
            let f = this;
            document.getElementById('link-interregnum').onclick = function() {
                html = "<p><center><a href='#' id='link-ruler'>Über " + f.name + "</a></center></p>";
                html += "<h1>Das Interregnum</h1>";
                let xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        html += this.responseText;
                        box.innerHTML = html;
                        document.getElementById('link-ruler').onclick = function() {f.displayBox();};
                    }
                }
                xmlhttp.open("GET", "resources/texts/interregnum.txt", true);
                xmlhttp.send();
            };
        }
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
            if ((w.date.length > 1 && compare(w.date[1], this.currentYearAsOf) < 0) ||
                (w.date.length == 1 && compare(w.date[0], this.currentYearAsOf) < 0)) {
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
        return "<img src='resources/coa/" + this.id + ".png' width='" + width + "' height='" + height + "'>";
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
