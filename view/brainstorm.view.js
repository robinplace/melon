const app = require ('ampersand-app')

const AndView = require ('ampersand-view')

const IdeaView = require ('./idea.view')

const BrainstormView = AndView.extend ({
    template: require ('../template/brainstorm.html'),
    initialize: function () {
        this.render ()
    },
    render: function () {
        this.renderWithTemplate ()

        this.renderCollection (this.collection, IdeaView,
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

module.exports = BrainstormView
