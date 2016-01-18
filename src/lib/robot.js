"use strict";

import * as gfx from './gfx.js';

const hasLocation = (x,y) => {
    let _x = x;
    let _y = y;
    
    return {
        get x() { return _x; },
        get y() { return _y; }
    };
};

const hasRadius = (radius) => {
    let _radius = radius;
    
    return { get radius() { return _radius; } };
};

const hasAngle = (angle) => {
    let _angle = angle;
    
    return { get angle() { return _angle; } };
};

const head = (x, y, radius) => {
    return Object.assign({}, hasLocation(x,y), hasRadius(radius) );
};

const makeMainBody = (x, y, radius, angle) => {
    let newMainBody;
    let _moveRelative = (xDistance) => {
        //console.log('_moveRelative', newMainBody);
        let newAngle = newMainBody.angle + (xDistance/(2*Math.PI*newMainBody.radius))*Math.PI*2;
        if (newAngle > 2*Math.PI) newAngle = newAngle % (2*Math.PI);
        if (newAngle < -2*Math.PI) newAngle = newAngle % (-2*Math.PI);
        if (newAngle < 0) newAngle = 2*Math.PI - newAngle;
        return makeMainBody(newMainBody.x+xDistance, newMainBody.y, newMainBody.radius, newAngle);
    };  
    
    newMainBody = Object.assign({}, hasLocation(x,y), hasRadius(radius), hasAngle(angle), { moveRelative: _moveRelative });
    return newMainBody;
};

const makeRobot = (x, y, size, mainBody) => {
    let mainBodyRadius = size/3;
    let headRadius = mainBodyRadius*3/5;
    
    let _size = size;
    let _mainBody = mainBody || makeMainBody(x, y+mainBodyRadius/2, mainBodyRadius, 0);
    let _head = head(x, _mainBody.y-_mainBody.radius-headRadius/8, headRadius);
    
    let newRobot;
    
    let _moveRelative = (xDistance) => {
        let newMainBody = _mainBody.moveRelative(xDistance);
        return makeRobot(newRobot.x+xDistance, newRobot.y, newRobot.size, newMainBody);
    };

    newRobot = {
        get size() { return _size; },
        get mainBody() { return _mainBody; },
        get head() { return _head; },
        moveRelative: _moveRelative
    };
    
    newRobot = Object.assign(newRobot, hasLocation(x, y));
    return newRobot; 
};

const renderMainBody = (context, mainBody) => {
    //console.log('renderMainBody()', context, mainBody);
    gfx.drawCircle(context, mainBody.x, mainBody.y, mainBody.radius, 'white');
    
    let x2 = mainBody.x + mainBody.radius*Math.cos(mainBody.angle+Math.PI*3/2);
    let y2 = mainBody.y + mainBody.radius*Math.sin(mainBody.angle+Math.PI*3/2);
    gfx.drawLine(context, mainBody.x, mainBody.y, x2, y2, 'white');
};

const renderHead = (context, head) => {
    //console.log('renderHead()');
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
    //console.log('renderRobot()', context, robot);
    //gfx.drawRectangle(context, robot.x-robot.size/2, robot.y-robot.size/2, robot.size, robot.size, 'green');

    renderMainBody(context, robot.mainBody);
    renderHead(context, robot.head);
};



export { makeRobot, renderRobot };