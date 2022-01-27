song = "";
leftx = 0;
rightx = 0;
lefty = 0;
righty = 0;
leftscore = 0;
rightscore = 0;

function preload() {
  song = loadSound("music.mp3")
}

function setup() {
  canvas = createCanvas(500, 500)
  canvas.center()
  video = createCapture(VIDEO)
  video.hide()
  posenet = ml5.poseNet(video, modelLoaded)
  posenet.on("pose", gotPoses)
}

function modelLoaded() {
  console.log("model is loaded")
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results)
    leftx = results[0].pose.leftWrist.x
    lefty = results[0].pose.leftWrist.y
    rightx = results[0].pose.rightWrist.x
    righty = results[0].pose.rightWrist.y
    leftscore = results[0].pose.keypoints[9].score
    rightscore = results[0].pose.keypoints[10].score
  }
}

function btn1() {
  song.play()
  song.setVolume(1)
  song.rate(1)
}

function draw() {
  image(video, 0, 0, 500, 500)
  if (leftscore > 0.2) {
    circle(leftx, lefty, 30)
    lefty = Number(lefty);
    lefty = floor(lefty);
    volume = lefty / 500;
    document.getElementById("th1").innerHTML = "volume=" + volume;
    song.setVolume(volume);
  }
  if (rightscore > 0.2) {
    circle(rightx, righty, 30)
    if (righty > 0 && righty <= 100) {
      document.getElementById("th2").innerHTML = "speed=0.5x";
      song.rate(0.5);
    }

    if (righty > 100 && righty <= 200) {
      document.getElementById("th2").innerHTML = "speed=1x";
      song.rate(1);
    }

    if (righty > 200 && righty <= 300) {
      document.getElementById("th2").innerHTML = "speed=1.5x";
      song.rate(1.5);
    }


if (righty > 300 && righty <= 400) {
      document.getElementById("th2").innerHTML = "speed=2x";
      song.rate(2);
    }

    if (righty > 400 && righty <= 500) {
      document.getElementById("th2").innerHTML = "speed=2.5x";
      song.rate(2.5);
    }

  }


}