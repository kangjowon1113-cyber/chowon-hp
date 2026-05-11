//import ddf.minim.*;
//import ddf.minim.analysis.*;
//Minim minim;
//AudioInput input;
//FFT fft;
//void setup() {
//  size(512, 200);
//  minim = new Minim(this);
//  input = minim.getLineIn(Minim.MONO, width, 44100, 16);
//  fft = new FFT(input.bufferSize(), input.sampleRate());
//  fft.logAverages(22, 3);
//  colorMode(HSB);
//}
//void draw() {
//  background(0);
//  fft.forward(input.mix);
//  stroke(255);
//  for (int i = 0; i < fft.avgSize(); i++) {
//    float x = map(i, 0, fft.avgSize(), 0, width);
//    float h = fft.getAvg(i) * 2;
//    fill(i*10, 255, 255);
//    rect(x, height, width / fft.avgSize(), -h);
//} }
