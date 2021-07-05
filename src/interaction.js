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
        case "trails":
        case "strands":
            settingsContainer.appendChild(createParticleSystemSlider());
            settingsContainer.appendChild(createMaxSpeedSlider());
            settingsContainer.appendChild(createFieldStrengthSlider());
            settingsContainer.appendChild(createNoiseDetailSlider());
            break;
        case "n-line":
            settingsContainer.appendChild(createNSystemSlider());
            settingsContainer.appendChild(createMaxSpeedSlider());
            settingsContainer.appendChild(createFieldStrengthSlider());
            settingsContainer.appendChild(createNoiseDetailSlider());
            break;
        case "polygon":
            settingsContainer.appendChild(createNSystemSlider());
            settingsContainer.appendChild(createMaxSpeedSlider());
            settingsContainer.appendChild(createFieldStrengthSlider());
            settingsContainer.appendChild(createPolygonSidelengthSlider());
            settingsContainer.appendChild(createPolygonStrengthSlider());
            settingsContainer.appendChild(createNoiseDetailSlider());
            break;
    }
}
function createSliderElement(Name, settingName, minSliderValue, maxSliderValue, stepSize, updateFunction) {
    var SliderBox = document.createElement('div');
    SliderBox.innerText = Name + ": ";
    SliderBox.id = settingName;
    var TextBox = document.createElement('span');
    TextBox.innerHTML = settings[settingName].toString();
    SliderBox.appendChild(TextBox);
    var Slider = document.createElement('input');
    Slider.type = "range";
    Slider.min = minSliderValue.toString();
    Slider.max = maxSliderValue.toString();
    Slider.step = stepSize.toString();
    Slider.value = settings[settingName].toString();
    Slider.oninput = function () {
        TextBox.innerHTML = Slider.value;
    };
    Slider.onchange = function () {
        updateFunction(parseFloat(Slider.value));
    };
    SliderBox.append(document.createElement('br'));
    SliderBox.appendChild(Slider);
    return SliderBox;
}
function createParticleSystemSlider() {
    return createSliderElement("Number of particles", "numParticles", settings.minNumParticles, settings.maxNumParticles, 1, function (val) {
        settings.numParticles = val;
        particleSystem.updateNumberOfParticles(val);
    });
}
function createNSystemSlider() {
    return createSliderElement("Number of particles", "numberOfParticlesNSystem", settings.minNumParticlesNSystem, settings.maxNumParticlesNSystem, 2, function (val) {
        settings.numberOfParticlesNSystem = val;
        nSystem.updateNumberOfParticles(val);
    });
}
function createFieldStrengthSlider() {
    return createSliderElement("Field strength", "fieldStrength", settings.minFieldStrength, settings.maxFieldStrength, 0.001, function (val) { settings.fieldStrength = val; });
}
function createPolygonSidelengthSlider() {
    return createSliderElement("Polygon sidelength", "polygonSideLength", settings.minPolygonSideLength, settings.maxPolygonSideLength, 1, function (val) { settings.polygonSideLength = val; });
}
function createPolygonStrengthSlider() {
    return createSliderElement("Polygon strength", "polygonStrength", settings.minPolygonStrength, settings.maxPolygonStrength, 0.001, function (val) { settings.fieldStrength = val; });
}
function createMaxSpeedSlider() {
    return createSliderElement("Maximum speed", "maxSpeed", settings.minMaxSpeed, settings.maxMaxSpeed, 0.1, function (val) { settings.maxSpeed = val; });
}
function createNoiseDetailSlider() {
    return createSliderElement("Noise detail", "noiseOctaves", 1, 9, 1, function (val) {
        noiseDetail(val, 0.5);
        grid.generateNoisedCells();
        settings.noiseOctaves = val;
    });
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