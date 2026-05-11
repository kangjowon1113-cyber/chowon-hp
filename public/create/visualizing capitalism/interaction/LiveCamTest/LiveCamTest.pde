import gab.opencv.*;
//import processing.video.*;
//import java.awt.*;

//Capture video;
//OpenCV opencv;

//void setup() {
//  size(640, 480);
//  video = new Capture(this, "pipeline:autovideosrc");
//  opencv = new OpenCV(this, 640, 480);
//  opencv.loadCascade(OpenCV.CASCADE_FRONTALFACE);  

//  video.start();
//}

//void draw() {
//  opencv.loadImage(video);

//  image(video, 0, 0 );

//  fill(0);
//  stroke(0, 255, 0);
//  strokeWeight(0);
//  Rectangle[] faces = opencv.detect();
//  println(faces.length);

//  for (int i = 0; i < faces.length; i++) {
//    println(faces[i].x + "," + faces[i].y);
//    rect(faces[i].x+110, faces[i].y+90, faces[i].width/4, faces[i].height/16);
//    ellipse(faces[i].x+80, faces[i].y+100, faces[i].width/3, faces[i].height/5);
//    ellipse(faces[i].x+200, faces[i].y+100, faces[i].width/3, faces[i].height/5);
//  }
//}

//void captureEvent(Capture c) {
//  c.read();
//}
