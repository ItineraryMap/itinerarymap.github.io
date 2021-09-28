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

}

class Waypoint extends Marker {

    constructor(figure, x, y) {
        super("waypoint", x, y);
        this.figure = figure;
    }

    display() {
        super.display();
        this.element.innerHTML = this.figure.getCoatOfArmsImg() + "<span class='tooltiptext'>" + this.text + "</span>";
    }

    hide () {
        viewer.removeOverlay(this.element);
        this.element = null;
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
