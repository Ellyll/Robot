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
    
    let speed = size/2000; // pixels / ms
    let distanceToTravel = size*3;
     
    let robot1 = robot.makeRobot(x, y, size);
    //robot.renderRobot(context, robot1);

    window.requestAnimationFrame((currentTime) => {
        draw(context, currentTime, currentTime, speed, distanceToTravel, robot1);
    });    
}

function draw(context, currentTime, lastTime, speed, distanceToTravel, aRobot) {
    let deltaTime = currentTime - lastTime;
    let deltaDistance = speed * deltaTime;
    
    let newRobot = aRobot.moveRelative(deltaDistance);
    gfx.clearCanvas(context);
    robot.renderRobot(context, newRobot);
    
    let newLastTime = currentTime;
    let newDistanceToTravel = distanceToTravel - deltaDistance;
    
    if (newDistanceToTravel <= 0) return;
    
    window.requestAnimationFrame((currentTime) => {
        draw(context, currentTime, newLastTime, speed, distanceToTravel-deltaDistance, newRobot);
    });    
}