function openSidebar() {
  document.getElementById("sidebar").style.width = "250px";
}

function closeSidebar() {
  document.getElementById("sidebar").style.width = "0";
}

// function to get the current state from selector
function getCurrentState(): State {
  const selector: any = document.getElementById('state-selector');
  return selector.value;
}

// update the fps counter in the sidebar
function updateFps(): void {
  // smooth out fps
  fpsBuffer.shift(); // remove first entry
  fpsBuffer.push(frameRate()); // add latest framerate

  const sum = fpsBuffer.reduce((a, b) => a + b);
  const avg = sum / fpsBuffer.length;

  // only update it when sidebar is shown
  if (eval(document.getElementById('sidebar').style.width.charAt(0))) {
    document.getElementById('fps').innerHTML = avg.toFixed(0).toString();
  }

}

// called when state gets changed
function changedState() {
  const state = getCurrentState();

  // change things based on the new state
  switch (state) {
    case "particles":
    case "trails":
    case "strands":
    case "n-line":
    case "polygon":
      background(0);
      break;
  }

  // update settings box
  updateSettings(state);
}

// called when the simulation specific settings need to be altered
function updateSettings(state: State) {
  const settingsContainer = document.getElementById('settings');

  // clear current settings
  settingsContainer.innerHTML = "";

  // add settings based on the current state
  switch (state) {
    case "particles":
      settingsContainer.appendChild(createParticleSystemSlider());
      settingsContainer.appendChild(createFieldStrengthSlider());

      break;
  }
}

// create custom slider element
function createSliderElement(
  Name: string, // Word used above slider
  // Name of setting that is altered by the slider
  settingName: keyof typeof settings, 
  minSliderValue: number,
  maxSliderValue: number,
  stepSize: number,
  updateFunction: Function, // function to be called to put the setting into effect
  ): HTMLElement {
  // slider box to contain the slider and some text
  const SliderBox = document.createElement('div');
  SliderBox.innerText = Name + ": ";

  // add text
  const TextBox = document.createElement('span');
  TextBox.innerHTML = settings[settingName].toString();
  SliderBox.appendChild(TextBox);

  // add  slider
  const Slider = document.createElement('input');
  Slider.type = "range";
  Slider.min = minSliderValue.toString()
  Slider.max = maxSliderValue.toString();
  Slider.step = stepSize.toString();
  Slider.value = settings[settingName].toString();
  // update DOM element
  Slider.oninput = () => {
    TextBox.innerHTML = Slider.value;
  }
  // update simulation
  Slider.onchange = () => {
    const val = parseInt(Slider.value);
    settings.numParticles = val;
    updateFunction(val);
  }
  SliderBox.append(document.createElement('br'));
  SliderBox.appendChild(Slider);

  return SliderBox;
}

function createParticleSystemSlider(): HTMLElement {
  return createSliderElement(
    "Number of particles",
    "numParticles",
    settings.minNumParticles,
    settings.maxNumParticles,
    1,
    (val: number) => {particleSystem.updateNumberOfParticles(val)}
  )
}

function createFieldStrengthSlider(): HTMLElement {
  return createSliderElement(
    "Field strength",
    "fieldStrength",
    settings.minFieldStrength,
    settings.maxFieldStrength,
    0.001,
    (val: number) => {settings.fieldStrength = val}
  )
}

// called when time shift button is clicked
function toggleTime() {
  const button = document.getElementById('time-button');
  if (!settings.timeShift) {
    // enable
    button.innerText = "Disable time shift";
    settings.timeShift = true;
  } else {
    // disable
    button.innerText = "Enable time shift";
    settings.timeShift = false;
  }
}

// called when time shift button is clicked
function toggleColors() {
  const button = document.getElementById('color-button');
  if (!settings.coloring) {
    // enable
    button.innerText = "Disable coloring";
    settings.coloring = true;
  } else {
    // disable
    button.innerText = "Enable coloring";
    settings.coloring = false;
  }
}

// sets the buttons to the state appropriate to the current settings
function setButtonStates() {
  const time = document.getElementById('time-button');
  const color = document.getElementById('color-button');

  if (settings.timeShift) {
    time.innerText = "Disable time shift";
  } else {
    time.innerText = "Enable time shift";
  }
  if (settings.coloring) {
    color.innerText = "Disable coloring";
  } else {
    color.innerText = "Enable coloring";
  }
}

// regenerates the particles in the particles systems
function resetParticles() {
  particleSystem.generateParticles(settings.numParticles);
  nSystem.generateParticles(settings.numberOfParticlesNSystem);
}

// function to download the current canvas
function downloadCanvas() {
  saveCanvas(settings.seed.toString(), "png");
}
