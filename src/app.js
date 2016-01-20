"use strict";

import * as robot from './lib/robot.js';
import * as gfx from './lib/gfx.js';

window.addEventListener('load', init);

function init() {
    console.log('init()');
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    gfx.maximiseCanvas(canvas);
    
    // createBuffer
    let canvas2 = document.createElement('canvas');
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    let context2 = canvas2.getContext('2d');
    
    let contextBuffers = [ context, context2 ];
    let bufferCounter = 0;

    let size = Math.min(canvas.width, canvas.height)*0.25;    
    let x = -size;
    let y = canvas.height / 2;
    
    let speed = canvas.width/14000; // pixels / ms
    let distanceToTravel = canvas.width+size*2;
     
    let robot1 = robot.makeRobot(x, y, size);
    // robot.renderRobot(context, robot1);
    // let robot2 = robot1.moveRelative(robot1.size);
    // robot.renderRobot(context, robot2);

    window.requestAnimationFrame((currentTime) => {
        draw(currentTime, currentTime, speed, distanceToTravel, robot1);
    });    

    function draw(currentTime, lastTime, speed, distanceToTravel, aRobot) {
        let deltaTime = currentTime - lastTime;
        let deltaDistance = speed * deltaTime;
        
        let newRobot = aRobot.moveRelative(deltaDistance);
        

        let renderBuffer = contextBuffers[bufferCounter];       
        
        gfx.clearCanvas(renderBuffer);       
        //renderBuffer.clearRect(aRobot.x-aRobot.size/2-1, aRobot.y-aRobot.size/2-1, aRobot.size+2, aRobot.size+2);
        //contextBuffer.clearRect(0, 0, contextBuffer.canvas.width, contextBuffer.canvas.height);
        gfx.drawLine(renderBuffer, 0, aRobot.y+aRobot.size/2, context.canvas.width, aRobot.y+aRobot.size/2, 'white');
        robot.renderRobot(renderBuffer, newRobot);
        
        let newLastTime = currentTime;
        let newDistanceToTravel = distanceToTravel - deltaDistance;
        
        if (newDistanceToTravel <= 0 || speed === 0) {
            // restart
            console.log('Restarting');
            distanceToTravel = context.canvas.width + aRobot.size*2 + deltaDistance;
            newRobot = robot.makeRobot(-newRobot.size, newRobot.y, newRobot.size);
        }
        
        //gfx.clearCanvas(context);
        //context.clearRect(aRobot.x-aRobot.size/2-1, aRobot.y-aRobot.size/2-1, aRobot.size+2, aRobot.size+2);
        //context.drawImage(canvas2, 0, 0);
        
        contextBuffers[1-bufferCounter].canvas.style.visibility = 'hidden'; 
        contextBuffers[bufferCounter].canvas.style.visibility = 'visible';
        bufferCounter = 1-bufferCounter;
        
        
        window.requestAnimationFrame((currentTime) => {
            draw(currentTime, newLastTime, speed, distanceToTravel-deltaDistance, newRobot);
        });    
    }
}