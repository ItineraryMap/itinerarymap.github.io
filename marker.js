"use strict";
class Marker {

    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
    }

    display() {
        this.element = document.createElement("div");
        this.element.className = this.type;
        viewer.addOverlay(this.element, new OpenSeadragon.Point(this.x, this.y), OpenSeadragon.Placement.CENTER);
        return this.element;
    }

    hide() {
        viewer.removeOverlay(this.element);
        this.element = null;
    }

}

class Waypoint extends Marker {

    constructor(figure, place, x, y) {
        super("waypoint", x, y);
        this.figure = figure;
        this.place = place;
        this.text = "<b>" + place + "</b>";
        this.statsAdded = false;
    }

    addStay(date, comment) {
        if (this.stays == null) {
            this.stays = 1;
        } else {
            this.stays++;
        }

        if (this.days == null) {
            this.days = 0;
        }
        this.text += "<br>" + date[0];
        if (date.length == 1) {
            this.days++;
            return;
        }
        let date1 = new Date(date[0]);
        let date2 = new Date(date[1]);
        this.days += (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24);

        if (date.length > 1) {
            this.text += " bis " + date[1];
        }
        if (comment != null) {
            this.text += "<br><i>" + comment + "</i>";
        }
    }

    display() {
        if (this.x == null || this.y == null) {
            console.log("Wegpunkt " + this.place + " hat keine Koordinaten.");
            return;
        }
        if (this.stays == null) {
            return;
        }
        let city = DATA.getCity(this.place);
        if (city != null) {
            city.hide();
        }

        super.display();
        this.addStats();
        this.element.innerHTML = this.figure.getCoatOfArmsImg(this.getWidth(), this.getHeight()) + "<span class='tooltiptext'>" + this.text + "</span>";
    }

    addStats() {
        if (!this.figure.countDays) {
            return;
        }
        if (this.statsAdded) {
            return;
        }
        this.text += "<br><br>Insgesamt " + this.stays + " Aufenthalt";
        if (this.stays > 1) {
            this.text += "e";
        }
        this.text +=  " über " + this.days + " Tag";
        if (this.days > 1) {
            this.text += "e";
        }
        this.text += ".";
        this.statsAdded = true;
    }

    hide() {
        super.hide();
        let city = DATA.getCity(this.place);
        if (city != null) {
            city.display();
        }
    }

    getWidth() {
        if (this.figure.countDays) {
            return 25 * (0.25 + this.days / this.figure.maxDays);
        } else {
            return 25;
        }
    }

    getHeight() {
        if (this.figure.countDays) {
            return 30 * (0.25 + this.days / this.figure.maxDays);
        } else {
            return 30;
        }
    }

}

class Region extends Marker {

    constructor(name, x, y) {
        super("region", x, y);
        this.name = name;
    }
 
    display() {
        super.display().innerHTML = "<span class='region'>" + this.name + "</span>";
    }

}

class City extends Marker {

    constructor(name, level, x, y) {
        super("city", x, y);
        this.name = name;
        this.level = level;
    }

    display() {
        super.display();
        this.element.innerHTML = "<img src='resources/city_" + this.level + ".png'>";
        this.element.innerHTML += "<span class='tooltiptext'>" + this.name + "</span>";
    }

}
