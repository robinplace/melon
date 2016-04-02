const app = require ('ampersand-app')

const AndView = require ('ampersand-view')

const IdeaView = AndView.extend ({
    template: require ('../template/idea.html'),
    initialize: function () {
        this.render ()
    },
    bindings: {
        'model.text': {
            type: 'text',
            hook: 'text',
        },
    },
    events: {
        'click [data-hook=remove]': function (ev) {
            this.model.collection.remove (this.model.uuid)
        },
    },
})

module.exports = IdeaView
