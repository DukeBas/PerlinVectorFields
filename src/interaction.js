function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}
function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}
function getCurrentState() {
    var selector = document.getElementById('state-selector');
    return selector.value;
}
function updateFps() {
    fpsBuffer.shift();
    fpsBuffer.push(frameRate());
    var sum = fpsBuffer.reduce(function (a, b) { return a + b; });
    var avg = sum / fpsBuffer.length;
    if (eval(document.getElementById('sidebar').style.width.charAt(0))) {
        document.getElementById('fps').innerHTML = avg.toFixed(0).toString();
    }
}
function changedState() {
    var state = getCurrentState();
    switch (state) {
        case "vector":
        case "heatmap":
            frameRate(settings.slowFrameRate);
            break;
        case "particles":
            frameRate(settings.maxFrameRate);
            background(0);
            break;
        case "trails":
            frameRate(settings.maxFrameRate);
            background(0);
        case "strands":
            frameRate(settings.maxFrameRate);
            background(0);
            break;
        case "x-line":
            frameRate(settings.maxFrameRate);
            background(0);
            break;
    }
}
function toggleTime() {
    var button = document.getElementById('time-button');
    if (!settings.timeShift) {
        button.innerText = "Disable time shift";
        settings.timeShift = true;
    }
    else {
        button.innerText = "Enable time shift";
        settings.timeShift = false;
    }
}
function toggleColors() {
    var button = document.getElementById('color-button');
    if (!settings.coloring) {
        button.innerText = "Disable coloring";
        settings.coloring = true;
    }
    else {
        button.innerText = "Enable coloring";
        settings.coloring = false;
    }
}
function setButtonStates() {
    var time = document.getElementById('time-button');
    var color = document.getElementById('color-button');
    if (settings.timeShift) {
        time.innerText = "Disable time shift";
    }
    else {
        time.innerText = "Enable time shift";
    }
    if (settings.coloring) {
        color.innerText = "Disable coloring";
    }
    else {
        color.innerText = "Enable coloring";
    }
}
//# sourceMappingURL=TS/interaction.js.map