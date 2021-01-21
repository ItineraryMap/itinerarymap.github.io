"use strict";
class Marker {

    constructor(type, x, y) {
        this.type = type;
        this.x = x;
        this.y = y;
    }

    display() {
        let element = document.createElement("div");
        element.className = this.type;
        viewer.addOverlay(element, new OpenSeadragon.Point(this.x, this.y), OpenSeadragon.Placement.CENTER);
        return element;
    }

}

class Waypoint extends Marker {

    constructor(figure, x, y) {
        super("waypoint", x, y);
        this.figure = figure;
    }

    display() {
        let element = super.display();
        element.innerHTML = this.figure.getCoatOfArmsImg() + "<span class='tooltiptext'>" + "Test" + "</span>";
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
        super.display().innerHTML = "<img src='resources/city_" + this.level + ".png'>";//"<br><span class='city'>" + this.name + "</span>";
    }

}
