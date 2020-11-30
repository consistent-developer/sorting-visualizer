let values = [];
let w = 10;
let animeSpeed;
let colNum;
let states = [];
let speed;
let colNumber;

function setup() {
  animeSpeed  = createSlider(0.1, 100, 10, 1); 
  colNum = createSlider(5, 250, 100, 5);

  colNumber = colNum.value();


  speed = animeSpeed.value();
  animeSpeed.parent('slider-Animation');

  var canvas = createCanvas(1920, 1080);
  canvas.parent('sketch-holder');

  values = new Array(250);
  for (let i = 0; i < values.length; i++) {
    values[i] = noise(i/50)*height;
    states[i] = -1;
  }
  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  background(18,18,18);
  colNumber = colNum.value();
  textSize(32);
  text('Slow Control', 10, 30);

  speed = animeSpeed.value();

  for (let i = 0; i < values.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill('#073b4c');
    } else if (states[i] == 1) {
      fill('#00f5d4');
    } else {
      fill('#80ed99');
    }
    rect(i * w, height - values[i], w, values[i]);
  }
}



async function swap(arr, a, b) {
  await sleep(speed);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
