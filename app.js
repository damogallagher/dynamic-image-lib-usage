const express = require('express');
const watermark = require('dynamic-image-lib');
const fileUpload = require('express-fileupload');
var fs = require('fs');

const app = express();
app.use(fileUpload());
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World !');
 
    var optionsImageWatermark = {
        type: "image",
        source: "./images/input/image.jpeg",
        logo: "./images/input/watermark.png", // This is optional if you have provided text Watermark
        destination: "./images/output/output-local-file-image.png",
        position: {
            logoX: 10,
            logoY: 10,
            logoHeight: 200,
            logoWidth: 200
        }
        //position: 'left-top'
    }; 
 
    var optionsTextWatermark = {
        type: "text",
        text: "Watermark text", // This is optional if you have provided text Watermark
        destination: "./images/output/output-local-file-text.jpeg",
        source: "./images/input/image.jpeg",
        position: {
            logoX : 10,
            logoY : 20,
            logoHeight: 200,
            logoWidth: 200
        },
        textOption: {
            fontSize: 20, //In px default : 20
            color: '#AAF122' // Text color in hex default: #000000
        }
    };

    //optionsImageWatermark or optionsTextWatermark
    watermark.embedWatermark(optionsImageWatermark, function (status) {
        //Do what you want to do here
        console.log('Status:',status);
    });
    watermark.embedWatermark(optionsTextWatermark, function (status) {
        //Do what you want to do here
        console.log('Status:',status);
    });    
});
 
app.post('/', (req, res) => {
    res.send('Hello World - File Upload!');
 
    //console.log(req); 
    //console.log(req.files);
    console.log(req.files.imageFile);
  
    var optionsImageWatermark = {
        type: "image",
        source: req.files.imageFile,
        logo: "./images/input/watermark.png", // This is optional if you have provided text Watermark
        destination: "./images/output/output-file-upload-image.jpeg",
        position: {
            logoX: 10,
            logoY: 10,
            logoHeight: 200,
            logoWidth: 200
        }
        //position: 'left-top'
    };   
 
    var optionsTextWatermark = {
        type: "text",
        text: "Watermark text", // This is optional if you have provided text Watermark
        destination: "./images/output/output-file-upload-text.jpeg",
        source: req.files.imageFile,
        position: {
            logoX : 10,
            logoY : 20,
            logoHeight: 200,
            logoWidth: 200
        },
        textOption: {
            fontSize: 20, //In px default : 20
            color: '#AAF122' // Text color in hex default: #000000
        }
    };

        //optionsImageWatermark or optionsTextWatermark
        watermark.embedWatermarkFromFile(optionsImageWatermark, function (status) {
            //Do what you want to do here
            console.log('1. Status:',status); 

            var wstream = fs.createWriteStream(optionsImageWatermark.destination);
            wstream.write(status);
            wstream.end();
        }); 

        watermark.embedWatermarkFromFile(optionsTextWatermark, function (status) {
            //Do what you want to do here
            console.log('2. Status:',status); 

            var wstream = fs.createWriteStream(optionsTextWatermark.destination);
            wstream.write(status);
            wstream.end();
        }); 
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))