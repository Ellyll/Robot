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
    let mainBodyRadius = size/3;
    let headRadius = mainBodyRadius*3/5;
    
    let _size = size;
    let _mainBody = mainBody(x, y+mainBodyRadius/2, mainBodyRadius);
    let _head = head(x, _mainBody.y-_mainBody.radius-headRadius/8, headRadius);

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
    gfx.drawArc(context, head.x, head.y, head.radius, Math.PI, 0, false, 'red');
    gfx.drawRectangle(context, head.x-head.radius, head.y, head.radius*2, head.radius/8, 'red');
    let points = [
        {
            x: head.x-head.radius,
            y: head.y+head.radius/8 
        },
        {
            x: (head.x-head.radius)+(head.radius/6),
            y: (head.y+head.radius/8)+(head.radius/6)            
        },
        {
            x: (head.x-head.radius)+(head.radius/6),
            y: (head.y+head.radius/8)+(head.radius/6)            
        },
        {
            x: (head.x+head.radius)-(head.radius/6),
            y: (head.y+head.radius/8)+(head.radius/6),
        },
        {
            x: head.x+head.radius,
            y: head.y+head.radius/8            
        }
    ];
    gfx.drawPolygon(context, points, 'red', 'yellow');
};

const renderRobot = (context, robot) => {
    console.log('renderRobot()', context, robot);
    gfx.drawRectangle(context, robot.x-robot.size/2, robot.y-robot.size/2, robot.size, robot.size, 'green');

    renderMainBody(context, robot.mainBody);
    renderHead(context, robot.head);
};



export { makeRobot, renderRobot };