"use strict";
class DataManager {

    constructor() {
        this.loadMapData();
        this.loadFigures();
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
                }
                selector.innerHTML = options;
                selector.addEventListener("change", function() {
                    let figure = DATA.getFigure(this.value);
                    if (figure != null) {
                        DATA.setLoadedFigure(figure);
                    }
                });
                DATA.setLoadedFigure(DATA.figures[0]);
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

    loadWaypoints(figure) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                figure.waypoints = JSON.parse(this.responseText);
                for (let w of figure.waypoints) {
                    w.figure = figure;
                    if (w.x == null || w.y == null) {
                        for (let c of DATA.cities) {
                            if (c.name == w.place) {
                                w.x = c.x;
                                w.y = c.y;
                                break;
                            }
                        }
                    }
                    w.marker = figure.getOrCreateMarker(w.place, w.x, w.y);
                    w.marker.addStay(w.date, w.comment);
                }
                for (let e of figure.markers) {
                    e[1].display();
                }
            }
        };
        xmlhttp.open("GET", "resources/waypoints/" + figure.id + ".json", true);
        xmlhttp.send();
    }

}

const DATA = new DataManager();
