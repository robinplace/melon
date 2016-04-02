'use strict'
const app = require ('ampersand-app')

const AndView = require ('ampersand-view')

const ItemView = require ('./item.view')

const ShortlistView = AndView.extend ({
    template: require ('../template/shortlist.html'),
    initialize: function () {
        this.render ()
    },
    render: function () {
        this.renderWithTemplate ()

        this.renderCollection (this.collection, ItemView,
                               this.queryByHook ('list'))

        this.input = this.queryByHook ('input')
    },
    events: {
        'submit [data-hook=add]': function (ev) {
            ev.preventDefault ()

            let text = this.input.value
            this.input.value = ''

            this.collection.add ({
                text: text,
            })
        },
    },
})

module.exports = ShortlistView
