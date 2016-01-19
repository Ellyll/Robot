"use strict";

function _beginDraw(context, strokeStyle, fillStyle) {
    context.beginPath();
    if (strokeStyle) context.strokeStyle = strokeStyle;
    if (fillStyle) context.fillStyle = fillStyle;    
}

function _finishDraw(context, strokeStyle, fillStyle) {
    if (strokeStyle) context.stroke();
    if (fillStyle) context.fill();    
}


function drawLine(context, x1, y1, x2, y2, strokeStyle) {
    _beginDraw(context, strokeStyle, null);
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    _finishDraw(context, strokeStyle, null);
}

function drawRectangle(context, x, y, width, height, strokeStyle, fillStyle) {
    _beginDraw(context, strokeStyle, fillStyle);
    context.rect(x, y, width, height);
    _finishDraw(context, strokeStyle, fillStyle);
}

function drawCircle(context, x, y, radius, strokeStyle, fillStyle) {
    drawArc(context, x, y, radius, 0, Math.PI*2, false, strokeStyle, fillStyle);
}

function drawArc(context, x, y, radius, startAngle, endAngle, anticlockwise, strokeStyle, fillStyle) {
    _beginDraw(context, strokeStyle, fillStyle);
    context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    _finishDraw(context, strokeStyle, fillStyle);
}

function drawPolygon(context, points, strokeStyle, fillStyle) {
    _beginDraw(context, strokeStyle, fillStyle);
    context.moveTo(points[0].x, points[0].y);
    for (let i=1 ; i<points.length ; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
    _finishDraw(context, strokeStyle, fillStyle);
}

function maximiseCanvas(canvas) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

function clearCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function degToRad(degrees) {
    return (degrees/360)*Math.PI*2;
}

export { drawLine, drawRectangle, drawCircle, drawArc, drawPolygon, maximiseCanvas, clearCanvas, degToRad };