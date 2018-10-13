const express = require('express');
const watermark = require('dynamic-image-lib');
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
        }
    };

    //optionsImageWatermark or optionsTextWatermark
    watermark.embedWatermark(optionsImageWatermarkFileLoc).then((status) => {
        console.log('1. Status:', status);
    }).catch((err) => {
        console.log("1. Err:", err);
    });
    watermark.embedWatermark(optionsTextWatermarkFileLoc).then((status) => {
        console.log('1. Status:', status);
    }).catch((err) => {
        console.log("1. Err:", err);
    });


    // //optionsImageWatermark or optionsTextWatermark
    watermark.embedWatermark(optionsImageWatermark).then((status) => {
        console.log('3. Status:', status)

        var wstream = fs.createWriteStream(optionsImageWatermark.destination);
        wstream.write(status);
        wstream.end();
    }).catch((err) => {
        console.log("1. Err:", err);
    });

    watermark.embedWatermark(optionsTextWatermark).then((status) => {
        console.log('4. Status:', status)

        var wstream = fs.createWriteStream(optionsTextWatermark.destination);
        wstream.write(status);
        wstream.end();
    }).catch((err) => {
        console.log("1. Err:", err);
    });

});
   


app.listen(port, () => console.log(`Example app listening on port ${port}!`))