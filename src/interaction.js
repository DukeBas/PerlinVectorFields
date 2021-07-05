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
        case "particles":
        case "trails":
        case "strands":
        case "n-line":
        case "polygon":
            background(0);
            break;
    }
    updateSettings(state);
}
function updateSettings(state) {
    var settingsContainer = document.getElementById('settings');
    settingsContainer.innerHTML = "";
    switch (state) {
        case "particles":
            var particleSliderBox = document.createElement('div');
            particleSliderBox.innerText = "Particles" + ": ";
            settingsContainer.appendChild(particleSliderBox);
            var particleText_1 = document.createElement('span');
            particleSliderBox.appendChild(particleText_1);
            var particleSlider_1 = document.createElement('input');
            particleSlider_1.type = "range";
            particleSlider_1.min = "0";
            particleSlider_1.max = settings.maxNumParticles.toString();
            particleSlider_1.value = settings.numParticles.toString();
            particleSlider_1.oninput = function () {
                particleText_1.innerHTML = particleSlider_1.value;
            };
            settingsContainer.appendChild(particleSlider_1);
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
function resetParticles() {
    particleSystem.generateParticles(settings.numParticles);
    nSystem.generateParticles(settings.numberOfParticlesNSystem);
}
function downloadCanvas() {
    saveCanvas(settings.seed.toString(), "png");
}
//# sourceMappingURL=TS/interaction.js.map