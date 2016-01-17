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
    let _mainBody = mainBody(x, y+size/6, size/3);
    let _head = head(x, y+size/6-size/3+(size/4)/2, size/4);

    let robot = {
        get size() { return _size; },
        get mainBody() { return _mainBody; },
        get head() { return _head; }
    };
    
    return Object.assign(robot, location(x, y)); 
};

const renderMainBody = (context, mainBody) => {
    console.log('renderMainBody()', context, mainBody);
    gfx.drawCircle(context, mainBody.x, mainBody.y, mainBody.radius, 'white');
};

const renderHead = (context, head) => {
    console.log('renderHead()');
    let startAngle = (3*Math.PI/2) - (Math.PI/3);
    let endAngle = (3*Math.PI/2) + (Math.PI/3);
    gfx.drawArc(context, head.x, head.y, head.radius, startAngle, endAngle, false, 'red');
    
    let x1 = head.x + head.radius*Math.cos(startAngle);
    let y1 = head.y + head.radius*Math.sin(startAngle);
    let x2 = head.x + head.radius*Math.cos(endAngle);
    let y2 = head.y + head.radius*Math.sin(endAngle);
    gfx.drawLine(context, x1, y1, x2, y2, 'red');

};

const renderRobot = (context, robot) => {
    console.log('renderRobot()', context, robot);
    gfx.drawRectangle(context, robot.x-robot.size/2, robot.y-robot.size/2, robot.size, robot.size, 'green');

    renderMainBody(context, robot.mainBody);
    renderHead(context, robot.head);
};



export { makeRobot, renderRobot };