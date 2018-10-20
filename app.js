const express = require('express');
const {embedWatermark, resize} = require('dynamic-image-lib');
//var watermark = require('dynamic-watermark');
const fileUpload = require('express-fileupload');
var fs = require('fs');
 
const app = express();
app.use(fileUpload());
const port = 3000
   

app.post('/', (req, res) => {
    res.send('Hello World - File Upload!');

    var optionsImageWatermarkFileLoc = {
        type: "image",
        source: "./images/input/image.jpeg",
        logo: "./images/input/watermark.png", // This is optional if you have provided text Watermark
        destination: "./images/output/output-local-file-image.png",
        position: {
            logoX: 10,
            logoY: 10,
            logoHeight: 200,
            logoWidth: 200
        },
        resize: {
            width: 700,
            height: 700            
        }
        //position: 'left-top'
    };
    
    var optionsTextWatermarkFileLoc = {
        type: "text",
        text: "Watermark text", // This is optional if you have provided text Watermark
        destination: "./images/output/output-local-file-text.jpeg",
        source: "./images/input/image.jpeg",
        position: {
            logoX: 10,
            logoY: 20,
            logoHeight: 200,
            logoWidth: 200
        },
        textOption: {
            fontSize: 20, //In px default : 20
            color: '#AAF122' // Text color in hex default: #000000
        },
        resize: {
            width: 100,
            height: 100            
        }
    };

    var optionsImageWatermark = {
        type: "image",
        sourceUpload: req.files.imageFile,
        logo: "./images/input/watermark.png", // This is optional if you have provided text Watermark
        destination: "./images/output/output-file-upload-image.jpeg",
        position: {
            logoX: 10,
            logoY: 10,
            logoHeight: 200,
            logoWidth: 200
        },
        resize: {
            width: 700,
            height: 700            
        }
        //position: 'left-top'
    };
 
    var optionsTextWatermark = {
        type: "text",
        text: "Watermark text", // This is optional if you have provided text Watermark
        destination: "./images/output/output-file-upload-text.jpeg",
        sourceUpload: req.files.imageFile,
        position: {
            logoX: 10,
            logoY: 20,
            logoHeight: 200,
            logoWidth: 200
        },
        textOption: {
            fontSize: 20, //In px default : 20
            color: '#AAF122' // Text color in hex default: #000000
        },
        resize: {
            width: 100,
            height: 100            
        }
    }; 

    //optionsImageWatermark or optionsTextWatermark
    embedWatermark(optionsImageWatermarkFileLoc).then((status) => {
        console.log('1. Status:', status);
        optionsImageWatermarkFileLoc.source = optionsImageWatermarkFileLoc.destination;
        resize(optionsImageWatermarkFileLoc).then((resizeStatus) => {
            console.log('1. resizeStatus:', status);
        });
    }).catch((err) => {
        console.log("1. Err:", err);
    });


    
    embedWatermark(optionsTextWatermarkFileLoc).then((status) => {
        console.log('2. Status:', status);
        optionsTextWatermarkFileLoc.source = optionsImageWatermarkFileLoc.destination;
        resize(optionsTextWatermarkFileLoc).then((resizeStatus) => {
            console.log('2. resizeStatus:', status);
        });
    }).catch((err) => {
        console.log("1. Err:", err);
    });
   
  
    // // //optionsImageWatermark or optionsTextWatermark
    embedWatermark(optionsImageWatermark).then((buffer) => {
        console.log('3. Status:', status)
  
        var wstream = fs.createWriteStream(optionsImageWatermark.destination);
        wstream.write(buffer);
        wstream.end(); 
 
        optionsImageWatermark.source = optionsImageWatermark.destination;
        resize(optionsImageWatermark).then((resizeStatus) => {
            console.log('3. resizeStatus:', resizeStatus);
        }).catch((err) => {
            console.log("1.1. Err:", err);
        });
    }).catch((err) => {
        console.log("1. Err:", err);
    });

       
    embedWatermark(optionsTextWatermark).then((buffer) => {
        console.log('4. Status:', status)

        var wstream = fs.createWriteStream(optionsTextWatermark.destination);
        wstream.write(buffer);
        wstream.end();

        optionsTextWatermark.source = optionsTextWatermark.destination;
        resize(optionsTextWatermark).then((resizeStatus) => {
            console.log('4. resizeStatus:', resizeStatus);
        }).catch((err) => {
            console.log("1.1. Err:", err);
        });
    }).catch((err) => {
        console.log("1. Err:", err);
    });

});
   


app.listen(port, () => console.log(`Example app listening on port ${port}!`))