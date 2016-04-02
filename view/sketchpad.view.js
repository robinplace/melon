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
    },
    events: {
    },
})

module.exports = ShortlistView

