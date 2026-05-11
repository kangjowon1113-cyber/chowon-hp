//CITY
class recBuilding {
  float x, y, w, h;
  int startFillColor, endFillColor;
  int startStrokeColor, endStrokeColor;
  int startWindowColor, endWindowColor;
  int building_order;
  
  recBuilding(float x, float y, float w, float h, int building_order) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.startFillColor = color(0, 140, 134, 200);
    this.endFillColor = color(191, 157, 170, 200);
    this.startStrokeColor = color(0, 98, 94);
    this.endStrokeColor = color(112, 75, 95);
    this.startWindowColor = color(252, 152, 3);
    this.endWindowColor = color(112, 75, 95);
    this.building_order = building_order;
  }
  
  void draw() {
    int currentFillColor = lerpColor(startFillColor, endFillColor, building_color_ratio[building_order]);
    int currentStrokeColor = lerpColor(startStrokeColor, endStrokeColor, building_color_ratio[building_order]);
    int currentWindowColor = lerpColor(startWindowColor, endWindowColor, building_color_ratio[building_order]);

    fill(currentFillColor);
    stroke(currentStrokeColor);
    strokeWeight(2);
    rect(x, y, w, h);
    
    // Draw windows inside the rectangle
    float space = 10; // Space between windows
    int numWindowsPerRow = floor(w / ((w / 8) + space)); // Number of windows per row
    int numRows = floor(h / ((h / 10) + space)); // Number of rows
    float windowWidth = (w - ((numWindowsPerRow + 1) * space)) / numWindowsPerRow;
    float windowHeight = (h - ((numRows + 2) * space)) / numRows;

    for (int j = 0; j < numRows; j++) {
      for (int i = 0; i < numWindowsPerRow; i++) {
        float windowX = x + (i + 1) * space + i * windowWidth;
        float windowY = y + (j + 1) * space + j * windowHeight;
        
        fill(currentWindowColor);
        strokeWeight(0);
        rect(windowX, windowY, windowWidth * 0.8, windowHeight * 0.8);
      }
    }
  }
}

class verticalBuilding {
  float x, y, w, h;
  int numLines = 10; // Number of vertical lines
  int startFillColor, endFillColor;
  int startStrokeColor, endStrokeColor;
  int startInnerStrokeColor, endInnerStrokeColor;
  int building_order;

  verticalBuilding(float x, float y, float w, float h, int building_order) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.startFillColor = color(252, 81, 23, 200);
    this.endFillColor = color(184, 172, 180, 200);
    this.startStrokeColor = color(205, 64, 40);
    this.endStrokeColor = color(110, 69, 75);
    this.startInnerStrokeColor = color(255); // White
    this.endInnerStrokeColor = color(110, 69, 75);
    this.building_order = building_order;
  }

  void draw() {
    int currentFillColor = lerpColor(startFillColor, endFillColor, building_color_ratio[building_order]);
    int currentStrokeColor = lerpColor(startStrokeColor, endStrokeColor, building_color_ratio[building_order]);
    int currentInnerStrokeColor = lerpColor(startInnerStrokeColor, endInnerStrokeColor, building_color_ratio[building_order]);

    // Draw the outer rectangle
    fill(currentFillColor);
    stroke(currentStrokeColor);
    strokeWeight(2);
    rect(x, y, w, h);

    // Define the dimensions for the inner rectangle as a percentage of the outer rectangle
    float innerWidth = w * 0.75;
    float innerHeight = h * 0.93;

    // Calculate the position for the inner rectangle
    float innerX = x + (w - innerWidth) / 2 - 9;
    float innerY = y + (h - innerHeight) / 2 + 18;

    // Draw the inner rectangle
    strokeWeight(w/56.66);
    stroke(currentInnerStrokeColor);
    rect(innerX, innerY, innerWidth, innerHeight);

    // Draw vertical lines inside the inner rectangle
    float lineSpacing = innerWidth / numLines;
    for (int i = 1; i < numLines; i++) {
      float lineX = innerX + i * lineSpacing;
      line(lineX, innerY, lineX, innerY + innerHeight);
    }
  }
}


class triBuilding {
  float x, y, w, h;
  int numLines = 10; // Number of vertical lines
  color c;
  int startFillColor, endFillColor;
  int startStrokeColor, endStrokeColor;
  int building_order;

  triBuilding(float x, float y, float w, float h, color c, int building_order) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
    this.startFillColor = c;
    this.endFillColor = color(209, 193, 178, 200);
    this.startStrokeColor = c == color(251, 155, 0) ? color(230, 112, 0) : color(0, 98, 94);
    this.endStrokeColor = color(155, 123, 113);
    this.building_order = building_order;
  }

  void draw() {
    int currentFillColor = lerpColor(startFillColor, endFillColor, building_color_ratio[building_order]);
    int currentStrokeColor = lerpColor(startStrokeColor, endStrokeColor, building_color_ratio[building_order]);

    fill(currentFillColor);
    stroke(currentStrokeColor);
    strokeWeight(2);
    rect(x, y, w, h);
    triangle(x, y, x + w, y, x, y - h / 3);

    int numCols = 2;
    int numRows = int(h / 26);

    float windowWidth = w / 6;
    float windowHeight = h / (numRows * 2);
    float horizontalSpacing = windowWidth / 1.3;
    float verticalSpacing = windowHeight / 2;

    for (int row = 0; row < numRows; row++) {
      for (int col = 0; col < numCols; col++) {
        float winX = x + horizontalSpacing + col * (windowWidth + horizontalSpacing);
        float winY = y + (row + 1) * (windowHeight + verticalSpacing);
        fill(255);
        strokeWeight(0);
        rect(winX, winY, windowWidth, windowHeight);
      }
    }
  }

  void drawFlipped(float flipX) {
    pushMatrix(); // Save the current transformation state
    translate(2 * flipX, 0); // Move the object to the flip position
    scale(-1, 1); // Scale the Y-axis by a factor of -1 to flip vertically

    draw(); // Draw the building

    popMatrix(); // Restore the previous transformation state
  }
}


class stripeBuilding {
  float x, y, w, h;
  int numLines = 10; // Number of horizontal lines

  int startFillColor, endFillColor;
  int startStripeColor, endStripeColor;
  int startStrokeColor, endStrokeColor;
  int building_order;

  stripeBuilding(float x, float y, float w, float h, color c, color c2, int building_order) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.startFillColor = c;
    this.endFillColor = color(209, 193, 178, 200);
    this.startStripeColor = c2;
    this.endStripeColor = color(209, 193, 178, 200);
    this.startStrokeColor = color(230, 112, 0);
    this.endStrokeColor = color(155, 123, 113);
    this.building_order = building_order;
  }

  void draw() {
    int currentFillColor = lerpColor(startFillColor, endFillColor, building_color_ratio[building_order]);
    int currentStripeColor = lerpColor(startStripeColor, endStripeColor, building_color_ratio[building_order]);
    int currentStrokeColor = lerpColor(startStrokeColor, endStrokeColor, building_color_ratio[building_order]);
    
    fill(currentFillColor);
    stroke(currentStrokeColor);
    strokeWeight(2);
    rect(x, y, w, h);

    // Draw stripes
    float spaceBetweenLines = h / (numLines - 1);
    float stripeHeight = spaceBetweenLines / 1.5; // Modify this to change the height of the rectangles
    strokeWeight(0);
    fill(currentStripeColor);

    for (int i = 1; i <= numLines - 3; i++) {
      float stripeY = y + spaceBetweenLines * i - stripeHeight / 2;
      rect(x, stripeY, w, stripeHeight);
    }
  }
}


class combBuilding {
  float x, y, w, h;
  int startFillColor, endFillColor, startStrokeColor, endStrokeColor;
  int startWindowColor, endWindowColor;
  int building_order;

  combBuilding(float x, float y, float w, float h, int building_order) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.startFillColor = color(251, 155, 0,200);
    this.endFillColor = color(209, 193, 178, 200);
    this.startStrokeColor = color(230, 112, 0);
    this.endStrokeColor = color(155, 123, 113);
    this.building_order = building_order;
  }

  void draw() {
    int currentFillColor = lerpColor(startFillColor, endFillColor, building_color_ratio[building_order]);
    int currentStrokeColor = lerpColor(startStrokeColor, endStrokeColor, building_color_ratio[building_order]);

    float outerRectHeight = h;
    int numHoles = int(outerRectHeight / 40);
    float holeWidth = w / 1.6;
    float holeHeight = h / 40;

    // Calculate space between holes and hole Y positions
    float totalHoleHeight = numHoles * holeHeight;
    float totalSpace = h - totalHoleHeight;
    float holeSpacing = totalSpace / (numHoles + 10);

    // Draw an outer custom shape
    fill(currentFillColor);
    stroke(currentStrokeColor);
    strokeWeight(2);
    beginShape();
    vertex(x, y);
    vertex(x + w, y);
    vertex(x + w, y + h);
    vertex(x, y + h);
    for (int i = 0; i < numHoles; i++) {
      float holeY = y + (holeSpacing + holeHeight) * i + holeSpacing;
      beginContour();
      vertex(x + w - holeWidth, holeY);
      vertex(x + w - holeWidth, holeY + holeHeight);
      vertex(x + w, holeY + holeHeight);
      vertex(x + w, holeY);
      endContour();
    }
    endShape(CLOSE);
  }
}


class backgroundBuilding{
  float x,y,w,h;
  
  backgroundBuilding(float x, float y, float w, float h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  void draw(){
    fill(191, 176, 157);
    strokeWeight(0);
    rect(x,y,w,h);
    rect(x+w+20, y, w, h);
    rect(x+(2*w+20)*0.2, y-20-h/25, (2*w+20)*0.6, 30);
    rect(x+(2*w+20)*0.3, y-40-2*h/25, (2*w+20)*0.4, 30);
    rect(x+w, y-100-2*h/25, 20, 40);
  }
}

//infrastructure
class ladder {
  float x, y, w, h;
  int numSteps;
  float rotation;

  ladder(float x, float y, float w, float h, int numSteps, float rotation) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.numSteps = numSteps;
    this.rotation = rotation;
  }

  void draw() {
    pushMatrix();
    translate(x, y);
    rotate(radians(rotation));

    stroke(65, 65, 65);
    strokeWeight(3);

    // Draw the ladder's side rails
    line(0, 0, 0, h);
    line(w, 0, w, h);

    float stepHeight = h / (numSteps + 1);
    // Draw ladder steps
    for (int i = 1; i <= numSteps; i++) {
      float stepY = i * stepHeight;
      line(0, stepY, w, stepY);
    }

    popMatrix();
  }
}


//house


class house1 {
  float x, y, topWidth, bottomWidth, h, type, windowType, maxLength;
  int numWindows;
  float padding = 3;
  //type1 = 1*1 / type2 = 1*2 / type3 = 2*1 / type4 = 2*2
  house1(float x, float y, float maxLength, float type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.windowType = floor(random(1, 5)); // Generate random window type
    numWindows = int(random(3, 7));
    if (type==1){
      topWidth = random(maxLength-5, maxLength);
      bottomWidth = random(maxLength-5, maxLength);
      h = random(maxLength-5, maxLength);
    }
    if (type==2){
      topWidth = random(maxLength-5, maxLength);
      bottomWidth = random(maxLength-5, maxLength);
      h = random(maxLength*2-5, maxLength*2);
    }
    if (type==3){
      topWidth = random(maxLength*2-5, maxLength*2);
      bottomWidth = random(maxLength*2-5, maxLength*2);
      h = random(maxLength-5, maxLength);
    }
    if (type==4){
      topWidth = random(maxLength*2-5, maxLength*2);
      bottomWidth = random(maxLength*2-5, maxLength*2);
      h = random(maxLength*2-5, maxLength*2);
    }
  }

  void draw() {
    if (windowType == 1) {
    fill(191, 157, 170,200);
    stroke(112, 75, 95);
  } else if (windowType == 2) {
    fill(184, 172, 180,200);
    stroke(110, 69, 75);
  } else if (windowType == 3) {
    fill(209, 193, 178,200);
    stroke(155, 123, 113);
  } else if (windowType == 4) {
    fill(217, 174, 197,200);
    stroke(107, 34, 46);
  }
    strokeWeight(2);
    float bottomOffset = (bottomWidth - topWidth) / 2;
    beginShape();
    vertex(x, y);
    vertex(x + topWidth, y);
    vertex(x + topWidth + bottomOffset, y + h);
    vertex(x - bottomOffset, y + h);
    endShape(CLOSE);

    // Draw random window type
    if (windowType == 1) {
      float winWidth = topWidth * 0.85;
      float winHeight = h * 0.45;
      float winX = x + (topWidth - winWidth) / 2;
      float winY = y + (h - winHeight) * 0.2;

      fill(112, 75, 95);
      strokeWeight(0);
      rect(winX, winY, winWidth, winHeight);
    } else if (windowType == 2) {
      float winWidth = topWidth * 0.2;
      float winHeight = h * 0.3;
      float padding = 5;

      // Left window
      float winX1 = x + padding;
      float winY1 = y + padding;
      fill(110, 69, 75);
      strokeWeight(0);
      rect(winX1, winY1, winWidth, winHeight);

      // Right window
      float winX2 = x + topWidth - winWidth - padding;
      float winY2 = y + padding;
      rect(winX2, winY2, winWidth, winHeight);
    } else if (windowType == 3) {
      // windows
      float windowWidth = 0.4 * h / numWindows;
      float windowHeight = 0.45 * h;
      float xPos = x + padding;
      float yPos = y + padding;
      float availableSpace = bottomWidth - 2 * padding;
      float offset = (availableSpace - (numWindows * windowWidth)) / (numWindows - 1);
  
      for (int i = 0; i < numWindows; i++) {
        fill(155, 123, 113);
        strokeWeight(0);
        rect(xPos, yPos, windowWidth, windowHeight);
        xPos += windowWidth + offset;
      }
    } else if (windowType == 4) {
      int numWindows = int(map(topWidth, maxLength-5, maxLength, 0.45, 1));
      float winHeight = h / 4;
      float winWidth = (topWidth - (numWindows * 2) - 6) / numWindows;
      float paddingHorizontal = 1;
      float paddingVertical = 2;
      
      for (int r = 0; r < 2; r++) {
        for (int i = 0; i < numWindows; i++) {
          float winX = x + 3 + paddingHorizontal + i * (winWidth + paddingHorizontal * 2);
          float winY = y + 3 + paddingVertical + r * (winHeight + paddingVertical);
          fill(107, 34, 46);
          strokeWeight(0);
          rect(winX, winY, winWidth, winHeight);
        }
      }
    }
  }
}

class house_tower {

    int num_of_row;
    int num_of_col;
    int [][] array2D;
    float maxLength;
    float starting_x = 300;
    float starting_y = 300;
    int counter = 0;  // Counter variable for delaying iterations
    int delay = 10; // 속도 바꾸는 코드 숫자 커지면 느려짐

    int num_of_house = 0;
    int num_of_current_house = 0;
    int tower_order;
    ArrayList<house1> house1List = new ArrayList<house1>();


    house_tower(int num_of_row, int num_of_col, float maxLength, float starting_x, float starting_y, int num_of_house, int tower_order) {
        this.num_of_row = num_of_row;
        this.num_of_col = num_of_col;
        this.maxLength = maxLength;
        this.starting_x = starting_x;
        this.starting_y = starting_y;
        this.tower_order = tower_order;
        this.num_of_house = num_of_house;
        array2D = new int[num_of_row][num_of_col];
        for (int i = 0; i < num_of_row; i++) {
            for (int j = 0; j < num_of_col; j++) {
                array2D[i][j] = 0;
            }
        }

        for (int i = 0; i < num_of_house; i++) {
            float isVisible = random(1,10);
            int type = (int) random(1,5);
            int windowtype = (int) random(1,3);
            int checking_empty = 0;
            boolean found_empty = false;
            while(found_empty == false && checking_empty < num_of_row * num_of_col){
                if(type == 1) {
                    if(array2D[checking_empty % num_of_row][checking_empty / num_of_row] == 0) {
                        array2D[checking_empty % num_of_row][checking_empty / num_of_row] = 1;
                        found_empty = true;
                        if((checking_empty % num_of_row) > 0 && (checking_empty % num_of_row) < num_of_row - 1) {
                            house1List.add(new house1(starting_x + maxLength * (checking_empty % num_of_row), starting_y - maxLength * (checking_empty / num_of_row + 1), maxLength, type));
                        }
                    }
                }
                else if (type == 2) {
                    if((checking_empty / num_of_row + 1) < num_of_col){
                        if(array2D[checking_empty % num_of_row][checking_empty / num_of_row] == 0 && array2D[checking_empty % num_of_row][checking_empty / num_of_row + 1] == 0 ) {
                            array2D[checking_empty % num_of_row][checking_empty / num_of_row] = 1;
                            array2D[checking_empty % num_of_row][(checking_empty / num_of_row) + 1] = 1;
                            found_empty = true;
                            house1List.add(new house1(starting_x + maxLength * (checking_empty % num_of_row), starting_y - maxLength * (checking_empty / num_of_row + 2), maxLength, type));
                        }
                    }
                }
                else if (type == 3) {
                    if(((checking_empty % num_of_row) + 1) < num_of_row){
                        if(array2D[checking_empty % num_of_row][checking_empty / num_of_row] == 0 && array2D[checking_empty % num_of_row + 1][checking_empty / num_of_row] == 0 ) {
                            array2D[checking_empty % num_of_row][checking_empty / num_of_row] = 1;
                            array2D[checking_empty % num_of_row + 1][checking_empty / num_of_row] = 1;
                            found_empty = true;
                            house1List.add(new house1(starting_x + maxLength * (checking_empty % num_of_row), starting_y - maxLength * (checking_empty / num_of_row + 1), maxLength, type));
                        }
                    }
                }
                else {
                    if((checking_empty / num_of_row + 1) < num_of_col){
                        if(((checking_empty % num_of_row) + 1) < num_of_row){
                            if(array2D[checking_empty % num_of_row][checking_empty / num_of_row] == 0 && array2D[checking_empty % num_of_row + 1][checking_empty / num_of_row] == 0 && array2D[checking_empty % num_of_row][checking_empty / num_of_row + 1] == 0 && array2D[checking_empty % num_of_row + 1][checking_empty / num_of_row + 1] == 0 ) {
                                array2D[checking_empty % num_of_row][checking_empty / num_of_row] = 1;
                                array2D[checking_empty % num_of_row + 1][checking_empty / num_of_row] = 1;
                                array2D[checking_empty % num_of_row][checking_empty / num_of_row + 1] = 1;
                                array2D[checking_empty % num_of_row + 1][checking_empty / num_of_row + 1] = 1;
                                found_empty = true;
                                house1List.add(new house1(starting_x + maxLength * (checking_empty % num_of_row), starting_y - maxLength * (checking_empty / num_of_row + 2), maxLength, type));
                            }
                        }
                    }
                }
                checking_empty += 1;
            }
        }
    }

    void draw() {
      if(counter < delay) {
        counter ++;
      }
      if (counter == delay) {
        counter = 0;
        if (num_of_current_house < house1List.size()) {
          num_of_current_house++;
          building_color_ratio[tower_order] = (float) num_of_current_house / house1List.size();
        }
      }
      for(int i = 0; i < num_of_current_house; i++) {
          house1 h = house1List.get(i);
          h.draw();
      }
    }

    void remove(int n) {
      if(num_of_current_house <= n) {
        num_of_current_house = 0;
        building_color_ratio[tower_order] = 0;
      }
      else {
        num_of_current_house = num_of_current_house - 5;
        building_color_ratio[tower_order] = (float) num_of_current_house / house1List.size();
      }
    }
}

//CITY

combBuilding combBuilding1;

stripeBuilding stripeBuilding1;
stripeBuilding stripeBuilding2;
stripeBuilding stripeBuilding3;

triBuilding triBuilding1;
triBuilding triBuilding2;
triBuilding triBuilding3;

verticalBuilding verticalBuilding1;
verticalBuilding verticalBuilding2;
verticalBuilding verticalBuilding3;

recBuilding building1;
recBuilding building2;

backgroundBuilding bkB1;

ladder ladder1;
ladder ladder2;
ladder ladder3;
ladder ladder4;
ladder ladder5;

//house_tower
house_tower ht1;
house_tower ht2;
house_tower ht3;
house_tower ht4;
house_tower ht5;
house_tower ht6;
house_tower ht7;

float[] b1 ={0, 330, 100,330};
float[] sb1 = {60, 450, 170, 450};
float[] cb1 = {280, 390, 70, 390};
float[] tb1 = {575, 300, 70, 300};
float[] yb1 = {360,340,95,340};

float[] building_color_ratio = {0, 0, 0, 0, 0, 0, 0};

void setup() {
  size(650, 1000);
  
  frameRate(60);
  ht1 = new house_tower(6, 30, 20, 0,height-330 ,60, 0); //내가 조절할 부분_HOUSES
  ht2 = new house_tower(9, 60, 20, 60,height-450 ,110, 1);
  ht3 = new house_tower(4, 25, 20, 280, height-390, 60, 2); //빗 위
  ht4 = new house_tower(5, 25, 20, 360, height-340, 50, 3); //노란빌딩위
  ht5 = new house_tower(2, 25, 20, 240, height-480, 9, 4); //연결?
  ht6 = new house_tower(4, 25, 20, 575, height-400, 20, 5); //노란삼각형 꼭지
  ht7 = new house_tower(6, 25, 20, 460, height-530, 30, 6);//오른쪽 연결

  //CITY
  building1 = new recBuilding(b1[0], height-b1[1], b1[2], b1[3], 0);
  building2 = new recBuilding(260, height-200, 80, 200, 2);
  
  verticalBuilding1 = new verticalBuilding(60, height-450, 170, 450, 1);
  verticalBuilding2 = new verticalBuilding(0, height-150, 40, 150, 0);
  verticalBuilding3 = new verticalBuilding(380, height-190, 100, 190, 3);
  
  triBuilding1 = new triBuilding(tb1[0], height-tb1[1], tb1[2], tb1[3], color(251, 155, 0), 5);
  triBuilding2 = new triBuilding(400, height-200, 60, 200, color(251, 155, 0), 1);
  triBuilding3 = new triBuilding(540, height-100, 110, 100, color(0, 140, 134), 5);
  
  stripeBuilding1 = new stripeBuilding(75, height-150, 100, 150, color(255, 240, 23), color(251, 155, 0), 0);
  stripeBuilding2 = new stripeBuilding(350, height-80, 85, 80, color(255, 240, 23), color(251, 155, 0), 3);
  stripeBuilding3 = new stripeBuilding(500, height-170, 100, 170, color(251, 155, 0), color(252, 81, 23), 5);
  
  combBuilding1 = new combBuilding(cb1[0], height-cb1[1], cb1[2], cb1[3], 2);
  
  bkB1 = new backgroundBuilding(450,480,80,520);
  ladder1 = new ladder(width-25, height-420, 20,120,15,0);
  ladder2 = new ladder(210, height-530, 20,80,10,0);
  ladder3 = new ladder(360,height-420, 20,80,11,0);
  ladder4 = new ladder(280,height-770, 10,50,11,90);
  ladder5 = new ladder(280,height-830, 10,70,15,90);
}

void draw() {
  background(232, 222, 207);
  ellipse(mouseX, mouseY, 1, 1);
  
  bkB1.draw();
  fill(191, 176, 157);
  strokeWeight(0);
  rect(width/5+30,2*height/5,width*0.25,3*height/5);
  rect(0,3*height/7,width*0.18,4.2*height/7);
  if(building_color_ratio[5] > 0.1) {
    ladder1.draw();
  }

  if(building_color_ratio[1] > 0.24) {
    ladder2.draw();
  }

  if(building_color_ratio[1] > 0.6 && building_color_ratio[2] > 0.7) {
    ladder4.draw();  
  }
  if(building_color_ratio[1] > 0.76 && building_color_ratio[2] > 0.8) {
    ladder5.draw();    
  }
  
 //CITY
 combBuilding1.draw();
 triBuilding1.draw();
 verticalBuilding1.draw();
  
 building1.draw();
 building2.draw();
 triBuilding2.drawFlipped(width/2); // Draw the flipped building
  
  verticalBuilding2.draw();
  stripeBuilding1.draw(); //왼쪽노랑stripeBuilding
  ////
  float t = float(millis()) / 8000;
  t = constrain(t, 0, 1);
  // 청록색 작대
  color startFillColor1 = color(0, 140, 134, 200);
  color endFillColor1 = color(217, 174, 197, 200);
  color startStrokeColor1 = color(0, 98, 94);
  color endStrokeColor1 = color(107, 34, 46);
  color currentFillColor1 = lerpColor(startFillColor1, endFillColor1, building_color_ratio[3]);
  color currentStrokeColor1 = lerpColor(startStrokeColor1, endStrokeColor1, building_color_ratio[3]);

  fill(currentFillColor1);
  stroke(currentStrokeColor1);
  strokeWeight(2);
  rect(460, height - 300, 30, 300);
  
  color currentFillColor2 = lerpColor(startFillColor1, endFillColor1, building_color_ratio[1]);
  color currentStrokeColor2 = lerpColor(startStrokeColor1, endStrokeColor1, building_color_ratio[1]);
  fill(currentFillColor2);
  stroke(currentStrokeColor2);

  rect(150, height - 120, 70, 120);

  // 노란건물
  color startFillColor3 = color(251, 155, 0, 200);
  color endFillColor3 = color(217, 174, 197, 200);
  color startStrokeColor3 = color(230, 112, 0);
  color endStrokeColor3 = color(107, 34, 46);
  color currentFillColor3 = lerpColor(startFillColor3, endFillColor3, building_color_ratio[3]);
  color currentStrokeColor3 = lerpColor(startStrokeColor3, endStrokeColor3, building_color_ratio[3]);

  fill(currentFillColor3);
  stroke(currentStrokeColor3);
  strokeWeight(2);
  rect(360, height - 340, 95, 340);

  //fill(252, 81, 23, 200);
  //rect(425, height - 220, 13, 220);
  ////
  
  verticalBuilding3.draw();
  stripeBuilding2.draw(); //오른노랑stripeBuilding
  stripeBuilding3.draw();
  triBuilding3.draw();

  ht2.draw();
  ht1.draw();
  ht3.draw();
  ht4.draw();
  ht5.draw();
  ht6.draw();
  ht7.draw();
}

void keyPressed() {
  if (key == 's' || key == 'S') {
    saveFrame("output-####.png");
  } 
}

void mousePressed() {
  if (mouseX >= b1[0] && mouseX <= b1[0] + b1[2] 
      && mouseY >= height-b1[1] && mouseY <= height-b1[1] + b1[3]) {
        ht1.remove((int) random(5,10));
  }
  if (mouseX >= sb1[0] && mouseX <= sb1[0] + sb1[2] 
      && mouseY >= height-sb1[1] && mouseY <= height-sb1[1] + sb1[3]) {
        ht2.remove((int) random(5,10));
  }
  if (mouseX >= cb1[0] && mouseX <= cb1[0] + cb1[2] 
      && mouseY >= height-cb1[1] && mouseY <= height-cb1[1] + cb1[3]) {
        ht3.remove((int) random(5,10));
  }
  if (mouseX >= tb1[0] && mouseX <= tb1[0] + tb1[2] 
      && mouseY >= height-tb1[1] && mouseY <= height-tb1[1] + tb1[3]) {
        ht6.remove((int) random(5,10));
  }
  if (mouseX >= yb1[0] && mouseX <= yb1[0] + yb1[2] 
      && mouseY >= height-yb1[1] && mouseY <= height-yb1[1] + yb1[3]) {
        ht4.remove((int) random(5,10));
  }
}
