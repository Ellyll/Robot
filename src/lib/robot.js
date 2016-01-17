"use strict";

import * as gfx from './gfx.js';

class Component {
    constructor(x,y) {
        this._x = x;
        this._y = y;
        this._subComponents = [];
    }
    
    addSubComponent(component) {
        this._subComponents.push(component);
    }
    
    get subComponents() {
        return this._subComponents;
    }
    
    get x() {
        return this._x;
    }
    
    get y() { return this._y; }
}

class Robot extends Component {
    constructor(x, y, size) {
        super(x, y);
        this._size = size;
        this.addSubComponent(new MainBody(x, y+size/4, size/4));
    }
    
    get size() { return this._size; }
}

class MainBody extends Component {
    constructor(x, y, radius) {
        super(x, y);
        this._radius = radius;
    }
    
    get radius() { return this._radius; }
}

class Head extends Component {
    constructor(x, y, radius) {
        super(x, y);
        this._radius = radius;
    }
    
    get radius() { return this._radius; }
}


function makeRobot(x, y, size) {
    return new Robot(x,y, size);
}

function renderRobot(context, robot) {
    console.log('renderRobot()', context, robot);
    gfx.drawRectangle(context, robot.x-robot.size/2, robot.y-robot.size/2, robot.size, robot.size, 'green');
    robot.subComponents.forEach( component => renderComponent(context, component) );
}

function renderComponent(context, component) {
    console.log('renderComponent()', context, component);
    if (component instanceof MainBody) {
        renderMainBody(context, component);
    };
}

function renderMainBody(context, mainBody) {
    console.log('renderMainBody()', context, mainBody);
    gfx.drawCircle(context, mainBody.x, mainBody.y, mainBody.radius, 'white');
}

export { makeRobot, renderRobot, renderComponent };