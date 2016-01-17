"use strict";

function drawLine(context, x1, y1, x2, y2, strokeStyle) {
    context.beginPath();
    context.strokeStyle = strokeStyle;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawRectangle(context, x, y, width, height, strokeStyle, fillStyle) {
    context.beginPath();
    if (typeof strokeStyle !== 'undefined') context.strokeStyle = strokeStyle;
    if (typeof fillStyle !== 'undefined') context.fillStyle = fillStyle;
    context.rect(x, y, width, height);
    if (typeof strokeStyle !== 'undefined') context.stroke();
    if (typeof fillStyle !== 'undefined') context.fill();    
}

function drawCircle(context, x, y, radius, strokeStyle, fillStyle) {
    context.beginPath();
    if (typeof strokeStyle !== 'undefined') context.strokeStyle = strokeStyle;
    if (typeof fillStyle !== 'undefined') context.fillStyle = fillStyle;
    context.arc(x, y, radius, 0, Math.PI*2, false);
    if (typeof strokeStyle !== 'undefined') context.stroke();
    if (typeof fillStyle !== 'undefined') context.fill();
}

function maximiseCanvas(canvas) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

function clearCanvas(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

export { drawLine, drawRectangle, drawCircle, maximiseCanvas, clearCanvas };