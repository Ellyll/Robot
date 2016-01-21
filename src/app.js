"use strict";

import * as robot from './lib/robot.js';
import * as gfx from './lib/gfx.js';

window.addEventListener('load', init);

function init() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    gfx.maximiseCanvas(canvas);
   

    let size = Math.min(canvas.width, canvas.height)*0.25;    
    let x = -size;
    let y = canvas.height / 2;
    
    let speed = canvas.width/14000; // pixels / ms
    let distanceToTravel = canvas.width+size*2;
     
    let robot1 = robot.makeRobot(x, y, size);

    window.requestAnimationFrame((currentTime) => {
        draw(currentTime, currentTime, speed, distanceToTravel, robot1);
    });    

    function draw(currentTime, lastTime, speed, distanceToTravel, aRobot) {
        let deltaTime = currentTime - lastTime;
        let deltaDistance = speed * deltaTime;
        
        let newRobot = aRobot.moveRelative(deltaDistance);            
        
        gfx.clearCanvas(context);       
        gfx.drawLine(context, 0, aRobot.y+aRobot.size/2, context.canvas.width, aRobot.y+aRobot.size/2, 'white');
        robot.renderRobot(context, newRobot);
        
        let newLastTime = currentTime;
        let newDistanceToTravel = distanceToTravel - deltaDistance;
        
        if (newDistanceToTravel <= 0) {
            // restart
            console.log('Restarting');
            distanceToTravel = context.canvas.width + aRobot.size*2 + deltaDistance;
            newRobot = robot.makeRobot(-newRobot.size, newRobot.y, newRobot.size);
        }              
        
        window.requestAnimationFrame((currentTime) => {
            draw(currentTime, newLastTime, speed, distanceToTravel-deltaDistance, newRobot);
        });    
    }
}