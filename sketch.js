var button;
let points = [];
let brain;
let trainingIndex = 0;
let noWrongGuesses = true;
let trainingInterval;
let iterations;
let isTraining = false;

function setup() {
  for (let i = 0; i < 200; i++) {
    points.push(new Point());
  }

  brain = new Perceptron(3, 0.01);
  let nextBtn = (button = createButton("Next Training Iteration"));
  button.position(600, 250);
  button.mousePressed(nextIteration);
  let trainBtn = (button = createButton("Train Continously"));
  button.position(600, 350);
  button.mousePressed(startTraining);
  let stopBtn = (button = createButton("Pause Training"));
  nextBtn.class("btn");
  trainBtn.class("btn");
  stopBtn.class("btn");
  button.position(600, 450);
  button.mousePressed(pauseTraining);
  iterations = createDiv();
  iterations.style("font-size", "32");
  iterations.position(600, 10);

  createCanvas(500, 500);
  background(255);

  stroke(255, 0, 0);
  let p1 = new Point(-1, brain.getY(-1));
  let p2 = new Point(1, brain.getY(1));
  line(p2.pixelX(), p2.pixelY(), p1.pixelX(), p1.pixelY());

  iterations.html(
    `<p>Iterations: ${brain.iterations}</p><p>Accuracy: ${
      brain.accuracy
    }%</p><p>Learning Rate: ${brain.learningRate}</p>`
  );
}

function draw() {
  for (let point of points) {
    point.show();
  }
}

function startTraining() {
  if (!isTraining) {
    isTraining = true;
    trainingInterval = setInterval(nextIteration, 100);
  }
}

function nextIteration() {
  clear();

  training = points[trainingIndex];
  let inputs = [training.x, training.y, training.bias];
  let target = training.label;

  let guess = brain.predict(inputs);
  if (guess == target) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  ellipse(training.pixelX(), training.pixelY(), 16, 16);

  brain.train(inputs, target);
  // training.show();
  trainingIndex++;

  if (trainingIndex == points.length) {
    trainingIndex = 0;
  }

  iterations.html(
    `<p>Iterations: ${brain.iterations}</p><p>Accuracy: ${
      brain.accuracy
    }%</p><p>Learning Rate: ${brain.learningRate}</p>`
  );

  stroke(255, 0, 0);
  let p1 = new Point(-1, brain.getY(-1));
  let p2 = new Point(1, brain.getY(1));
  line(p2.pixelX(), p2.pixelY(), p1.pixelX(), p1.pixelY());

  // if (noWrongGuesses) {
  //   clearInterval(trainingInterval);
  //   isTraining = false;
  //   console.log("Training Complete");
  //   alert("Training Complete");
  // }
}

function pauseTraining() {
  clearInterval(trainingInterval);
  isTraining = false;
  console.log("Training Paused");
  alert("Training Paused");
}
