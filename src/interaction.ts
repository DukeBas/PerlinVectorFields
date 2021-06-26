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
  }
}

// called when time shift button is clicked
function toggleTime() {
  console.log("test")
  const button = document.getElementById('time-button');
  console.log(button)
  if (!settings.timeShift){
    // enable
    button.innerText = "Disable time shift";
    settings.timeShift = true;
  } else {
    // disable
    button.innerText = "Enable time shift";
    settings.timeShift = false;
  }
}
