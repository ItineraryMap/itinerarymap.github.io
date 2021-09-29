"use strict";
class DataManager {

    constructor() {
        this.loadMapData();
        this.loadFigures();
    }

    getCity(name) {
        for (let c of this.cities) {
            if (c.name == name) {
                return c;
            }
        }
        return null;
    }

    getFigure(id) {
        for (let f of this.figures) {
            if (f.id == id) {
                return f;
            }
        }
        return null;
    }

    getLoadedFigure() {
        return this.loadedFigure;
    }

    setLoadedFigure(figure) {
        if (this.loadedFigure != null) {
            this.loadedFigure.hide();
        }
        this.loadedFigure = figure;
        figure.display();
    }

    loadFigures() {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let selector = document.querySelector("#figure");
                let options = "";
                DATA.figures = JSON.parse(this.responseText);
                for (let f of DATA.figures) {
                    Object.setPrototypeOf(f, Figure.prototype);
                    options += "<option value='" + f.id + "'>" + f.listEntry + "</option>";
                    let xmlhttp = new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            f.waypoints = JSON.parse(this.responseText);
                            if (f == DATA.figures[0]) {
                                DATA.setLoadedFigure(DATA.figures[0]);
                            }
                        }
                    };
                    xmlhttp.open("GET", "resources/waypoints/" + f.id + ".json", true);
                    xmlhttp.send();
                }
                selector.innerHTML = options;
                selector.addEventListener("change", function() {
                    let figure = DATA.getFigure(this.value);
                    if (figure != null) {
                        DATA.setLoadedFigure(figure);
                    }
                });
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

}

function compare(date, year) {
    return date.substring(0, 4) - year;
}

const DATA = new DataManager();
