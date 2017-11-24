import broadwayPlayer from 'broadway-player'

//var Avc            = require('../broadway/Decoder');
var Avc            = broadwayPlayer.Decoder
var Size           = require('../utils/Size');
//var Class          = require('uclass');
//var Events         = require('uclass/events');
var debug          = require('debug');
var log            = debug("wsavc");
//var WebGLCanvas    = require("../canvas/WebGLCanvas")
var YUVWebGLCanvas = require('../canvas/YUVWebGLCanvas');
var YUVCanvas      = require('../canvas/YUVCanvas');

class WSAvcPlayer {
  
  constructor(canvastype) {
    this.canvastype = canvastype;

    // AVC codec initialization
    this.avc = new Avc();
    if(false) this.avc.configure({
      filter: "original",
      filterHorLuma: "optimized",
      filterVerLumaEdge: "optimized",
      getBoundaryStrengthsA: "optimized"
    });

    //WebSocket variable
    this.pktnum = 0;
  }

  connectCanvas(canvas) {
    this.canvas = canvas;
  }

  decode(data) {
    /*
    var naltype = "invalid frame";

    if (data.length > 4) {
      if (data[4] === 0x65) {
        naltype = "I frame";
      }
      else if (data[4] === 0x41) {
        naltype = "P frame";
      }
      else if (data[4] === 0x67) {
        naltype = "SPS";
      }
      else if (data[4] === 0x68) {
        naltype = "PPS";
      }
    }
    console.log("Passed " + naltype + " to decoder");
    */
    this.avc.decode(data);
  }

  connect(url, callback) {
    // Websocket initialization
    if (this.ws !== undefined) {
      this.ws.close();
    }
    this.ws = new WebSocket(url);
    this.ws.binaryType = "arraybuffer";

    this.ws.onopen = () => {
      callback.onopen();
      console.log("Connected to " + url);
    };

    var framesList = [];

    this.ws.onmessage = (evt) => {
      if(typeof evt.data === "string")
        return this.cmd(JSON.parse(evt.data));

      this.pktnum++;
      var frame = new Uint8Array(evt.data);
      //console.log("[Pkt " + this.pktnum + " (" + evt.data.byteLength + " bytes)]");
      //this.decode(frame);
      framesList.push(frame);
    };


    var running = true;

    var shiftFrame = function() {
      if(!running)
        return;

      if(framesList.length > 10) {
        console.log("Dropping frames", framesList.length);
        framesList = [];
      }

      var frame = framesList.shift();

      if(frame)
        this.decode(frame);

      requestAnimationFrame(shiftFrame);
    }.bind(this);

    shiftFrame();

    this.ws.onclose = () => {
      running = false;
      console.log("WSAvcPlayer: Connection closed")
    };

  }

  initCanvas(width, height) {
    var canvasFactory = this.canvastype === "webgl" || this.canvastype === "YUVWebGLCanvas"
                          ? YUVWebGLCanvas
                          : YUVCanvas;
    var canvas = new canvasFactory(this.canvas, new Size(width, height));
    this.avc.onPictureDecoded = (buffer, width, height, infos) => canvas.decode(buffer, width, height, infos);
    //this.emit("canvasReady", width, height);
  }

  cmd(cmd) {
    console.log("Incoming request", cmd);

    if(cmd.action === "init") {
      this.initCanvas(cmd.width, cmd.height);
      this.canvas.width  = cmd.width;
      this.canvas.height = cmd.height;
    }
  }

  disconnect() {
    console.log("disconnect");
    this.ws.close();
  }

  playStream() {
    var message = "REQUESTSTREAM ";
    this.ws.send(message);
    log("Sent " + message);
  }


  stopStream() {
    this.ws.send("STOPSTREAM");
    log("Sent STOPSTREAM");
  }
}


//module.exports = WSAvcPlayer;
//module.exports.debug = debug;

export default WSAvcPlayer
