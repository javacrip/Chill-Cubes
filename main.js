initializeBoxes();

function initializeBoxes() {

  const boxes = document.getElementsByClassName('box');
  console.log(boxes);

  for (let i = 0; i < boxes.length; i++) {

    //Give each box an event listener
    boxes[i].addEventListener("mouseover", function () {
      escapeFunction(boxes[i], i);
    })
  }
}

//Controls the movement of the "escaping" elements
function escapeFunction(box, i) {
  console.log("####################");
  console.log("Box Number: " + i);

  //get the dimensions of the surrounding container and the current element
  var containerRect = document.getElementById('container').getBoundingClientRect();
  var elementRect = box.getBoundingClientRect();
  console.log("BODY: ")
  console.log(containerRect.top, containerRect.right, containerRect.bottom, containerRect.left);
  console.log("Element: ")
  console.log(elementRect.top, elementRect.right, elementRect.bottom, elementRect.left)

  //Create measurements object to store the distances from the current element to the surrounding container
  var measurements = {}
  measurements.distanceTop = elementRect.top - containerRect.top;
  measurements.distanceBot = elementRect.bottom - containerRect.bottom;
  measurements.distanceRight = elementRect.right - containerRect.right;
  measurements.distanceLeft = elementRect.left - containerRect.left;

  console.log("INITIAL DISTANCE REPORT: \n");
  console.log("Top: " + measurements.distanceTop);
  console.log("Right: " + measurements.distanceRight);
  console.log("Bot: " + measurements.distanceBot);
  console.log("Left: " + measurements.distanceLeft);

  //The farthest the box can move on the x axis is determined by the shortest distance to the left or to the right
  var xCord = Math.floor(Math.random() * 400) + 1;
  xCord *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

  var yCord = Math.floor(Math.random() * 400) + 1;
  yCord *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;

  console.log("calculated xCord: " + xCord);
  console.log("calculated yCord: " + yCord);

  //This detects the boundaries, gives them "padding", then reverses the movement direction if they meet the condition
  if (xCord < 0) {
    if ((Math.abs(xCord) > measurements.distanceLeft - 400)) {
      console.log("LEFT VECTOR REVERSED");
      xCord *= -1;
    }
  } else if (xCord < measurements.distanceRight - 200) {
    console.log("RIGHT VECTOR REVERSED");
    xCord *= -1;
  }

  if (yCord < 0) {
    if (Math.abs(yCord) > measurements.distanceTop - 400) {
      console.log("TOP VECTOR REVERSED");
      yCord *= -1;
    }
  } else if (yCord > (Math.abs(measurements.distanceBot) + 400)) {
    console.log("BOT VECTOR REVERSED");
    yCord *= -1;
  }

  console.log(xCord);
  console.log(yCord);

  anime({

    targets: box,
    translateX: (xCord),
    translateY: (yCord)
  })

}