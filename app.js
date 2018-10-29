const express = require('express');
const {embedWatermark, resize} = require('dynamic-image-lib');
//var watermark = require('dynamic-watermark');
const fileUpload = require('express-fileupload');
var fs = require('fs');
const empty = require('empty-folder');

const app = express();
app.use(fileUpload());
const port = 3000
   
  
app.post('/', (req, res) => {
    res.send('Hello World - File Upload!');
    empty('./images/output', false, (o)=>{
        if(o.error) console.error(o.error);
        //console.log(o.removed);
        //console.log(o.failed);
      });

    var optionsImageWatermarkFileLoc = {
        type: "image",
        source: "./images/input/image.jpeg",
        watermark: "./images/input/watermark.png", // This is optional if you have provided text Watermark
        destination: "./images/output/output-local-file-image.png",
        position: {
            watermarkTextX: 10,
            watermarkTextY: 10,
            watermarkTextHeight: 200,
            watermarkTextWidth: 200    
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
        // position: {
        //     watermarkTextX: 10,
        //     watermarkTextY: 20,
        //     watermarkTextHeight: 200,
        //     watermarkTextWidth: 200
        // },
        position: 'center',
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
        watermark: "./images/input/watermark.png", // This is optional if you have provided text Watermark
        destination: "./images/output/output-file-upload-image.jpeg",
        position: {
            watermarkTextX: 10,
            watermarkTextY: 10,
            watermarkTextHeight: 200,
            watermarkTextWidth: 200
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
            watermarkTextX: 10,
            watermarkTextY: 20,
            watermarkTextHeight: 200,
            watermarkTextWidth: 200
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

    var optionsImageWatermark_WatermarkUpload = {
        type: "image",
        sourceUpload: req.files.imageFile,
        watermarkUpload: req.files.watermarkImageFile,
        destination: "./images/output/output-file-upload-image-watermarkUpload.jpeg",
        position: 'center',
        resize: {
            width: 700,
            height: 700            
        }
        //position: 'left-top'
    }; 
            
    // optionsImageWatermark or optionsTextWatermark
    resize(optionsImageWatermarkFileLoc).then((resizeStatus) => {
        console.log('1. resizeStatus:', resizeStatus);
        optionsImageWatermarkFileLoc.source = optionsImageWatermarkFileLoc.destination;
        embedWatermark(optionsImageWatermarkFileLoc).then((watermarkStatus) => {
            console.log('1. watermarkStatus:', watermarkStatus);
        });
    }).catch((err) => {
        console.log("1. Err:", err);
    });
  
     
    resize(optionsTextWatermarkFileLoc).then((resizeStatus) => {
        console.log('2. resizeStatus:', resizeStatus);
        optionsTextWatermarkFileLoc.source = optionsImageWatermarkFileLoc.destination;
        embedWatermark(optionsTextWatermarkFileLoc).then((watermarkStatus) => {
            console.log('2. watermarkStatus:', watermarkStatus);
        });
    }).catch((err) => {
        console.log("1. Err:", err);
    });
     
  
    // // //optionsImageWatermark or optionsTextWatermark
    embedWatermark(optionsImageWatermark).then((buffer) => {
        console.log('3. buffer:', buffer)
  
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
        console.log('4. buffer:', buffer)

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

    embedWatermark(optionsImageWatermark_WatermarkUpload).then((buffer) => {
        console.log('5. buffer:', buffer)

        var wstream = fs.createWriteStream(optionsImageWatermark_WatermarkUpload.destination);
        wstream.write(buffer);
        wstream.end();

        optionsImageWatermark_WatermarkUpload.source = optionsImageWatermark_WatermarkUpload.destination;
        // resize(optionsImageWatermark_WatermarkUpload).then((resizeStatus) => {
        //     console.log('5. resizeStatus:', resizeStatus);
        // }).catch((err) => {
        //     console.log("1.1. Err:", err);
        // });
    }).catch((err) => {
        console.log("1. Err:", err);
    }); 
}); 
   


app.listen(port, () => console.log(`Example app listening on port ${port}!`))