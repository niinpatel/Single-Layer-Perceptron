var button;
let points = [];
let brain;
let trainingIndex = 0;
let noWrongGuesses = true;
let trainingInterval;
let iterations;
let isTraining = false;

function setup() {
  for (let i = 0; i < 100; i++) {
    points.push(new Point());
  }

  brain = new Perceptron(3, 0.01);
  let nextBtn = (button = createButton("Next Training Iteration"));
  button.position(600, 250);
  button.mousePressed(nextIteration);
  let trainBtn = (button = createButton("Train Continously"));
  button.position(600, 350);
  button.mousePressed(startTraining);
  let stopBtn = (button = createButton("Stop Training"));
  nextBtn.class("btn");
  trainBtn.class("btn");
  stopBtn.class("btn");
  button.position(600, 450);
  button.mousePressed(stopTraining);
  iterations = createDiv();
  iterations.style("font-size", "32");
  iterations.position(600, 10);

  createCanvas(500, 500);
}

function draw() {
  background(255);

  stroke(0);

  iterations.html(
    `<p>Iterations: ${brain.iterations}</p><p>Accuracy: ${
      brain.accuracy
    }%</p><p>Learning Rate: ${brain.learningRate}</p>`
  );

  let p1 = new Point(-1, brain.getY(-1));
  let p2 = new Point(1, brain.getY(1));
  line(p2.pixelX(), p2.pixelY(), p1.pixelX(), p1.pixelY());

  let p3 = new Point(-1, eq(-1));
  let p4 = new Point(1, eq(1));
  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());

  noWrongGuesses = true;
  for (let point of points) {
    point.show();
    let inputs = [point.x, point.y, point.bias];
    let target = point.label;
    let guess = brain.predict(inputs);
    if (guess == target) {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
      noWrongGuesses = false;
    }
    noStroke();
    ellipse(point.pixelX(), point.pixelY(), 4, 4);
  }
}

function startTraining() {
  if (!isTraining) {
    isTraining = true;
    trainingInterval = setInterval(nextIteration, 100);
  }
}

function nextIteration() {
  training = points[trainingIndex];
  let inputs = [training.x, training.y, training.bias];
  let target = training.label;
  brain.train(inputs, target);
  trainingIndex++;

  if (trainingIndex == points.length) {
    trainingIndex = 0;
  }
  if (noWrongGuesses) {
    clearInterval(trainingInterval);
    isTraining = false;
    console.log("Training Complete");
  }
}

function stopTraining() {
  clearInterval(trainingInterval);
  isTraining = false;
}
