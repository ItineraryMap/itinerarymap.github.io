"use strict";
class DataManager {

    constructor() {
        this.loadMapData();
        this.loadFigures();
    }

    getFigure(id) {
        for (let i in this.figures) {
            if (this.figures[i].id == id) {
                return this.figures[i];
            }
        }
        return null;
    }

    loadFigures() {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let selector = document.querySelector("#figure");
                let options = "";
                DATA.figures = JSON.parse(this.responseText);
                for (let i in DATA.figures) {
                    Object.setPrototypeOf(DATA.figures[i], Figure.prototype);
                    options += "<option value='" + DATA.figures[i].id + "'>" + DATA.figures[i].listEntry + "</option>";
                }
                selector.innerHTML = options;
                selector.addEventListener("change", function() {
                    let figure = DATA.getFigure(this.value);
                    if (figure != null) {
                         figure.printToInfobox();
                    }
                });
                DATA.figures[0].printToInfobox();
                DATA.test();
            }
        };
        xmlhttp.open("GET", "resources/figures.json", true);
        xmlhttp.send();
    }

    loadMapData() {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let mapData = JSON.parse(this.responseText);
                DATA.cities = mapData.cities;
                for (let c of mapData.cities) {
                    Object.setPrototypeOf(c, City.prototype);
                    c.type = "city";
                    c.display();
                }
                DATA.regions = mapData.regions;
                for (let r of mapData.regions) {
                    Object.setPrototypeOf(r, Region.prototype);
                    r.type = "region";
                    r.display();
                }
            }
        };
        xmlhttp.open("GET", "resources/map.json", true);
        xmlhttp.send();
    }

    test() {
        new Waypoint(DATA.figures[1], .415, .39).display();
        new Waypoint(DATA.figures[0], .415, .39).display();
        new Waypoint(DATA.figures[0], .4425, .385).display();
        new Waypoint(DATA.figures[0], .422, .488).display();
        new Waypoint(DATA.figures[0], .381, .398).display();
        new Waypoint(DATA.figures[0], .378, .379).display();
    }

}

const DATA = new DataManager();
