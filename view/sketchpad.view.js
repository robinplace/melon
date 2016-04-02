'use strict'
const app = require ('ampersand-app')

const AndView = require ('ampersand-view')

const ShortlistView = AndView.extend ({
    template: require ('../template/sketchpad.html'),
    initialize: function () {
        this.render ()
    },
    render: function () {
        this.renderWithTemplate ()

        this.canvas = this.queryByHook ('pad')
        this.ctx = this.canvas.getContext ('2d')
    },
    drawDot: function (x,y,size) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI*2, true); 
        this.ctx.closePath();
        this.ctx.fill();
    },
    drawLine: function (x,y,dx,dy,size){
        this.ctx.beginPath();
        this.ctx.moveTo(x,y);
        this.ctx.lineTo(dx,dy);
        this.ctx.lineWidth = size;
        this.ctx.stroke();
    },
    events: {
        'mousedown [data-hook=pad]': function (ev) {
            this.down (ev.offsetX, ev.offsetY)
        },
        'mousemove [data-hook=pad]': function (ev) {
            this.move (ev.offsetX, ev.offsetY)
        },
        'mouseup [data-hook=pad]': function (ev) {
            this.up (ev.offsetX, ev.offsetY)
        },
    },
    down: function (mouseX, mouseY) {
        this.mouseXPrev = mouseX
        this.mouseYPrev = mouseY

        this.mousedown = 1
        this.drawDot (mouseX, mouseY, 0)
    },
    move: function (mouseX, mouseY) {
        if (this.mousedown === 1) {
            this.drawLine(mouseX,mouseY,this.mouseXPrev,this.mouseYPrev,10);
            this.drawDot(mouseX,mouseY,4.5);

            this.mouseXPrev = mouseX
            this.mouseYPrev = mouseY
        }
    },
    up: function (mouseX, mouseY) {
        this.mousedown = 0
    },
})

module.exports = ShortlistView

