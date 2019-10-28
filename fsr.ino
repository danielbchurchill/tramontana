
int fsrPinOne = A5;
int fsrPinTwo = A4;
int fsrPinThree = A3;

int LEDpin = 13; 
int LEDbrightness;
    
int fsrReadingOne;  
int fsrReadingTwo;      
int fsrReadingThree;      
    
 
void setup(void) {
  Serial.begin(9600);  
  pinMode(LEDpin, OUTPUT);
  pinMode(fsrPinOne, INPUT);
  pinMode(fsrPinTwo, INPUT);
  pinMode(fsrPinThree, INPUT);

}
 
void loop(void) {
  fsrReadingOne = analogRead(fsrPinOne);
  fsrReadingTwo = analogRead(fsrPinTwo);
  fsrReadingThree = analogRead(fsrPinThree);
  
  Serial.println(fsrReadingOne); 
  Serial.println(fsrReadingTwo);
  Serial.println(fsrReadingThree);

  
  //writing fsrOne to turn on LED
  LEDbrightness = map(fsrReadingOne, 0, 1023, 0, 255);
  analogWrite(LEDpin, LEDbrightness);
  //
  
  delay(100);
}
