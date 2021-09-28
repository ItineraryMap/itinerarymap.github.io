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
        this.text = "<b>" + place + "</b>";
    }

    addStay(date, comment) {
        this.text += "<br>" + date[0];
        if (date.length > 1) {
            this.text += " bis " + date[1];
        }
        if (comment != null) {
            this.text += "<br><i>" + comment + "</i>";
        }
    }

    display() {
        super.display();
        this.element.innerHTML = this.figure.getCoatOfArmsImg() + "<span class='tooltiptext'>" + this.text + "</span>";
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
