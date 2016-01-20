"use strict";

import * as gfx from './gfx.js';
const PI = Math.PI;
const degToRad = gfx.degToRad;
const cos = Math.cos;
const sin = Math.sin;

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
        let newAngle = newMainBody.angle + (xDistance/(2*PI*newMainBody.radius))*PI*2;
        if (newAngle > 2*PI) newAngle = newAngle % (2*PI);
        if (newAngle < -2*PI) newAngle = newAngle % (-2*PI);
        if (newAngle < 0) newAngle = 2*PI - newAngle;
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
    const x = mainBody.x;
    const y = mainBody.y;
    const radius = mainBody.radius;
    const angle = mainBody.angle;
    const colour = 'white';
    
    // Outer shell
    gfx.drawCircle(context, x, y, radius, colour);
    
    // Inner rings
    const ring1Radius = radius*(0.67);
    const ring2Radius = radius*(5/8);
    const ring3Radius = radius*(1/2);
    gfx.drawCircle(context, x, y, ring1Radius, colour);
    gfx.drawCircle(context, x, y, ring3Radius, colour);
    
    // Inner rings decorations
    const drawRingLine = (startRingRadius, endRingRadius, angleOffset) => {
        gfx.drawLine(
            context,
            x + startRingRadius*cos(angle+angleOffset), y + startRingRadius*sin(angle+angleOffset),
            x + endRingRadius*cos(angle+angleOffset), y + endRingRadius*sin(angle+angleOffset),
            colour
        );        
    };
    drawRingLine(ring1Radius, ring3Radius, degToRad(20));
    drawRingLine(ring1Radius, ring3Radius, degToRad(50));
    gfx.drawCircle(
        context,
        x + ((ring3Radius+ring1Radius)/2)*cos(angle+degToRad(60)),
        y + ((ring3Radius+ring1Radius)/2)*sin(angle+degToRad(60)),
        ((ring1Radius-ring3Radius)*0.75)/2,
        colour
    );
    drawRingLine(ring1Radius, ring2Radius, degToRad(100));
    drawRingLine(ring1Radius, ring2Radius, degToRad(140));
    gfx.drawArc(context, x, y, ring2Radius, angle+degToRad(100), angle+degToRad(140), false, colour);
    drawRingLine(ring1Radius, ring3Radius, degToRad(150));
    gfx.drawArc(context, x, y, ring2Radius, angle+degToRad(150), angle+degToRad(290), false, colour);
    drawRingLine(ring1Radius, ring3Radius, degToRad(290));
    drawRingLine(ring2Radius, ring3Radius - (ring2Radius-ring1Radius), degToRad(295));
    drawRingLine(ring2Radius, ring3Radius - (ring2Radius-ring1Radius), degToRad(300));
    drawRingLine(ring2Radius, ring3Radius - (ring2Radius-ring1Radius), degToRad(305));

    // Spokes    
    for (let a=angle, r=radius*(6/16); a < angle+PI*2; a += PI/2) {
        const xs = x + r*cos(a);
        const ys = y + r*sin(a);
        gfx.drawCircle(context, xs, ys, r/11, colour);
        gfx.drawCircle(context, xs, ys, r/27, colour);

        const b = (12/360)*PI*2;
        // line 1
        const x1 = x + radius*(0.5)*cos(a-b*0.9);
        const y1 = y + radius*(0.5)*sin(a-b*0.9);
        const x2 = x + radius*(0.35)*cos(a-b);
        const y2 = y + radius*(0.35)*sin(a-b);
        gfx.drawLine(context, x1, y1, x2, y2, colour);  
        
        // line 2
        const x3 = x + radius*(0.5)*cos(a+b*0.9);
        const y3 = y + radius*(0.5)*sin(a+b*0.9);
        const x4 = x + radius*(0.35)*cos(a+b);
        const y4 = y + radius*(0.35)*sin(a+b);
        gfx.drawLine(context, x3, y3, x4, y4, colour);
        
        // arc 3
        const xc = (x2+x4)/2;
        const yc = (y2+y4)/2;
        const rc = Math.sqrt((x4-x2)*(x4-x2) + (y4-y2)*(y4-y2))/2;
        gfx.drawArc(context, xc, yc, rc, a-PI/2, a+PI/2, true, colour);
    }
};

const renderHead = (context, head) => {
    //console.log('renderHead()');
    const colour = 'white';
    const background = 'black';
    
    // Main shell
    gfx.drawArc(context, head.x, head.y, head.radius, PI, 0, false, colour);
    gfx.drawRectangle(context, head.x-head.radius, head.y, head.radius*2, head.radius/8, colour);
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
    gfx.drawPolygon(context, points, colour, background);
    
    // Main camera rim
    const mainCameraAngle = degToRad(-45);
    const a = degToRad(10);
    [-a, +a].forEach( angle => {
        gfx.drawLine(
            context,
            head.x + head.radius*cos(mainCameraAngle+angle),
            head.y + head.radius*sin(mainCameraAngle+angle),
            head.x + head.radius*1.05*cos(mainCameraAngle+angle),
            head.y + head.radius*1.05*sin(mainCameraAngle+angle),
            colour
        );        
    });
    gfx.drawArc(context, head.x, head.y, head.radius*1.05, mainCameraAngle-a, mainCameraAngle+a, false, colour);
    // Main camera lense
    const xc1s = head.x + head.radius*1.005*cos(mainCameraAngle-a);
    const yc1s = head.y + head.radius*1.005*sin(mainCameraAngle-a);
    const xc1e = head.x + head.radius*1.005*cos(mainCameraAngle+a);
    const yc1e = head.y + head.radius*1.005*sin(mainCameraAngle+a);
    const xc1 = (xc1s+xc1e) / 2;
    const yc1 = (yc1s+yc1e) / 2;
    const rc1 = Math.sqrt((xc1-xc1s)*(xc1-xc1s) + (yc1-yc1s)*(yc1-yc1s));
    gfx.drawArc(context, xc1, yc1, rc1, mainCameraAngle-PI/2, mainCameraAngle+PI/2, false, colour);
    
    
};

const renderRobot = (context, robot) => {
    //console.log('renderRobot()', context, robot);
    //gfx.drawRectangle(context, robot.x-robot.size/2, robot.y-robot.size/2, robot.size, robot.size, 'green');

    renderMainBody(context, robot.mainBody);
    renderHead(context, robot.head);
};



export { makeRobot, renderRobot };