"use strict";
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
