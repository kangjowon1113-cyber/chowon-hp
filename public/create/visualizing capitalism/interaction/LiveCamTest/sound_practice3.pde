import ddf.minim.*;
import ddf.minim.analysis.*;
Minim minim;
AudioInput input;
FFT fft;
PVector[] vectors;
PVector noiseOff;
void setup() {
  size(512, 512);
  // setting audio input and fft
  minim = new Minim(this);
  input = minim.getLineIn(Minim.MONO, width, 44100, 16);
  fft = new FFT(input.bufferSize(), input.sampleRate());
  fft.logAverages(22, 22);
  // make vectors
  vectors = new PVector[fft.avgSize()];
  for (int i = 0; i < vectors.length; i++) {
    vectors[i] = new PVector(random(width), random(height));
  }
  // for initialize noise
  noiseOff = new PVector(random(width), random(height));
  colorMode(HSB);
  blendMode(ADD);
}

void draw() {
  background(0);
  // run FFT
  fft.forward(input.mix);
  noStroke();
  for (int i = 0; i < vectors.length; i++) {
    // poistion is detemined by noise.
    vectors[i].x = noise(i*1000 + noiseOff.x) * width;
    vectors[i].y = noise(i*1000 + noiseOff.y) * height;
    // style and size is determined by ampltidue (getAvg).
    fill(i*.5, i*10, 255); // arbitrary scaling
    float sz = pow(max(fft.getAvg(i),0.1),0.9);
    ellipse(vectors[i].x, vectors[i].y, sz, sz);
  }
  noiseOff.x += .005;
  noiseOff.y += .005;
}
