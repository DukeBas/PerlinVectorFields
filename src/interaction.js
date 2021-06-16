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
            break;
    }
}
function toggleTime() {
    console.log("test");
    var button = document.getElementById('time-button');
    console.log(button);
    if (!settings.timeShift) {
        button.innerText = "Disable time shift";
        settings.timeShift = true;
    }
    else {
        button.innerText = "Enable time shift";
        settings.timeShift = false;
    }
}
//# sourceMappingURL=TS/interaction.js.map