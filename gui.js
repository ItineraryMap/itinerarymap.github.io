"use strict";
FIGURES[0].printToInfobox();

var selector = document.querySelector("#figure");
var options = "";
for (var i in FIGURES) {
    options += "<option value='" + FIGURES[i].id + "'>" + FIGURES[i].listEntry + "</option>";
}
selector.innerHTML = options;
selector.addEventListener("change", function() {
    var figure = getFigure(this.value);
    if (figure != null) {
        figure.printToInfobox();
    }
});
document.querySelector("#toggle-region-names").addEventListener("change", function() {
    if (this.checked) {
        for (let e of document.getElementsByClassName("region")) {
            e.style.visibility = "visible";
        }
    } else {
        for (let e of document.getElementsByClassName("region")) {
            e.style.visibility = "hidden";
        }
    }
});
document.querySelector("#toggle-city-markers").addEventListener("change", function() {
    if (this.checked) {
        for (let e of document.getElementsByClassName("city")) {
            e.style.visibility = "visible";
        }
    } else {
        for (let e of document.getElementsByClassName("city")) {
            e.style.visibility = "hidden";
        }
    }
});
document.querySelector("#toggle-infobox").addEventListener("change", function() {
    if (this.checked) {
        document.getElementById("infobox-overlay").style.visibility = "visible";
    } else {
        document.getElementById("infobox-overlay").style.visibility = "hidden";
    }
});
document.querySelector("#toggle-waypoints").addEventListener("change", function() {
    if (this.checked) {
        for (let e of document.getElementsByClassName("waypoint")) {
            e.style.visibility = "visible";
        }
    } else {
        for (let e of document.getElementsByClassName("waypoint")) {
            e.style.visibility = "hidden";
        }
    }
});
document.querySelector("#toggle-debug").addEventListener("change", function() {
    if (this.checked) {
        document.getElementById("debug-overlay").style.visibility = "visible";
    } else {
        document.getElementById("debug-overlay").style.visibility = "hidden";
    }
});
