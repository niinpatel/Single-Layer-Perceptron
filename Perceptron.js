function activationFn(input) {
  return input >= 0 ? 1 : -1;
}

class Perceptron {
  constructor(n, learningRate = 0.01) {
    this.weights = [];
    this.learningRate = learningRate;
    this.error = 0;
    this.accuracy = 0;
    this.iterations = 0;
    this.correctGuesses = 0;
    for (let i = 0; i < n; i++) {
      this.weights.push(random(-1, 1));
    }
  }

  predict(inputs) {
    let weightedSum = 0;
    for (let i in this.weights) {
      weightedSum += inputs[i] * this.weights[i];
    }
    return activationFn(weightedSum);
  }

  train(inputs, target) {
    let guess = this.predict(inputs);
    this.error = target - guess;

    for (let i in this.weights) {
      this.weights[i] += this.error * inputs[i] * this.learningRate;
    }
    this.iterations++;

    this.learningRate =
      this.iterations > 350
        ? this.iterations > 900
          ? 0.001
          : 0.005
        : this.learningRate;

    if (this.error == 0) {
      this.correctGuesses++;
    }
    this.accuracy = (this.correctGuesses / this.iterations) * 100;
    console.log("iteration:", this.iterations, ", error:", this.error);
  }

  getY(x) {
    let w0 = this.weights[0];
    let w1 = this.weights[1];
    let w2 = this.weights[2];

    return -w2 / w1 - (w0 / w1) * x;
  }
}
