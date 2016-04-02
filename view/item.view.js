'use strict'
const app = require ('ampersand-app')

const AndView = require ('ampersand-view')

const ItemView = AndView.extend ({
    template: require ('../template/item.html'),
    initialize: function () {
        this.render ()
    },
    props: {
        editing: 'boolean',
    },
    bindings: {
        'model.done': [
            { type: 'booleanClass', name: 'done' },
            {
                type: 'switchAttribute',
                selector: '[data-hook=done]',
                name: 'src',
                cases: {
                    true: 'assets/todo.svg',
                    false: 'assets/unchecked.svg',
                }
            },
        ],
        'model.text': {
            type: 'text',
            hook: 'text',
        },
        'editing': [
            { type: 'toggle', hook: 'input' },
            { type: 'toggle', hook: 'text', invert: true },
        ],
    },
    events: {
        'click [data-hook=remove]': function (ev) {
            this.model.collection.remove (this.model.uuid)
        },
        'click [data-hook=edit]': function (ev) {
            this.queryByHook ('input').value = this.model.text
            this.editing = true
            this.queryByHook ('input').select ()
        },
        'blur [data-hook=input]': function (ev) {
            if (!this.editing) return
            this.editing = false
            this.model.collection.add ({
                counter: this.model.counter,
                creator: this.model.creator,
                created: this.model.created,
                done: this.model.done,
                text: this.queryByHook ('input').value,
            })
            this.model.collection.remove (this.model.uuid)
        },
        'keydown [data-hook=input]': function (ev) {
            if (!this.editing) return
            if (ev.keyCode !== 13) return
            this.editing = false
            this.model.collection.add ({
                counter: this.model.counter,
                creator: this.model.creator,
                created: this.model.created,
                done: this.model.done,
                text: this.queryByHook ('input').value,
            })
            this.model.collection.remove (this.model.uuid)
        },
        'click [data-hook=done]': function (ev) {
            this.model.collection.add ({
                counter: this.model.counter,
                creator: this.model.creator,
                created: this.model.created,
                done: !this.model.done,
                text: this.model.text,
            })
            this.model.collection.remove (this.model.uuid)
        },
    },
})

module.exports = ItemView
