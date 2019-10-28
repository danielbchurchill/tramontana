var device = new tramontana();


function setup() {
    createCanvas(windowWidth, windowHeight);

    ///////////////////////////////////////////////////////////////////
    //Begin serialport library methods, this is using callbacks
    ///////////////////////////////////////////////////////////////////    


    // Instantiate our SerialPort object
    serial = new p5.SerialPort();

    // Get a list the ports available
    // You should have a callback defined to see the results
    serial.list();

    // Assuming our Arduino is connected, let's open the connection to it
    // Change this to the name of your arduino's serial port
    serial.open("/dev/cu.usbmodem142201");

    // Here are the callbacks that you can register

    // When we connect to the underlying server
    serial.on('connected', serverConnected);

    // When we get a list of serial ports that are available
    serial.on('list', gotList);
    // OR
    //serial.onList(gotList);

    // When we some data from the serial port
    serial.on('data', gotData);
    // OR
    //serial.onData(gotData);

    // When or if we get an error
    serial.on('error', gotError);
    // OR
    //serial.onError(gotError);

    // When our serial port is opened and ready for read/write
    serial.on('open', gotOpen);
    // OR
    //serial.onOpen(gotOpen);

    // Callback to get the raw data, as it comes in for handling yourself
    //serial.on('rawdata', gotRawData);
    // OR
    //serial.onRawData(gotRawData);

    ////////////////////////////////////////////////////////////////////////////
    // End serialport callbacks
    ///////////////////////////////////////////////////////////////////////////
    device.start("192.168.50.250", function (e) {

        if (e == undefined) {

            //SUCCESS TRAMONTANA CONNECTED

            device.makeVibrate();

        }

    });



}

function serverConnected() {
    console.log("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
    console.log("List of Serial Ports:");
    // theList is an array of their names
    for (var i = 0; i < thelist.length; i++) {
        // Display in the console
        console.log(i + " " + thelist[i]);
    }
}

// Connected to our serial device
function gotOpen() {
    console.log("Serial Port is Open");
}

// Uh oh, here is an error, let's log it
function gotError(theerror) {
    console.log(theerror);
}

// There is data available to work with from the serial port
function gotData() {
    var currentString = serial.readLine(); // read the incoming string
    trim(currentString); // remove any trailing whitespace
    if (!currentString) return; // if the string is empty, do no more
    console.log("currentString  ", currentString); // println the string
    latestData = currentString; // save it for the draw method
    console.log("latestData" + latestData); //check to see if data is coming in
    splitter = split(latestData, ','); // split each number using the comma as a delimiter
    //console.log("splitter[0]" + splitter[0]); 
    diameter0 = splitter[0]; //put the first sensor's data into a variable
    diameter1 = splitter[1];
    diameter2 = splitter[2];

    if (currentString >= 500) {
        device.setColor(47, 86, 233, 255);
    } else {
        device.setColor(255, 40, 40, 255);
    }
}

function draw() {

}
