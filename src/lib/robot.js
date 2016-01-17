"use strict";

import * as gfx from './gfx.js';


const location = (x,y) => {
    let _x = x;
    let _y = y;
    
    return {
        get x() { return _x; },
        get y() { return _y; }
    };
};

const head = (x, y, radius) => {
    let _radius = radius;
    return Object.assign({}, location(x,y), { get radius() { return _radius; } });
};

const mainBody = (x, y, radius) => {
    let _radius = radius;
    return Object.assign({}, location(x,y), { get radius() { return _radius; } });
};

const makeRobot = (x, y, size) => {
    let _size = size;
    let _mainBody = mainBody(x, y+size/4, size/4);

    let robot = {
        get size() { return _size; },
        get mainBody() { return _mainBody; }
    };
    
    return Object.assign(robot, location(x, y)); 
};

const renderMainBody = (context, mainBody) => {
    console.log('renderMainBody()', context, mainBody);
    gfx.drawCircle(context, mainBody.x, mainBody.y, mainBody.radius, 'white');
};

const renderRobot = (context, robot) => {
    console.log('renderRobot()', context, robot);
    gfx.drawRectangle(context, robot.x-robot.size/2, robot.y-robot.size/2, robot.size, robot.size, 'green');

    renderMainBody(context, robot.mainBody);
};



export { makeRobot, renderRobot };