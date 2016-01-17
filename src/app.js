"use strict";

import * as robot from './lib/robot.js';
import * as gfx from './lib/gfx.js';

window.addEventListener('load', init);

function init() {
    console.log('init()');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    gfx.maximiseCanvas(canvas);
    
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let size = Math.min(canvas.width, canvas.height)/4;
     
    let robot1 = robot.makeRobot(x, y, size);
    robot.renderRobot(context, robot1);
}
