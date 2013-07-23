var app = {};

(function () {
    "use strict";

    app.Contact = Backbone.Model.extend({

    });

    app.ContactList = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("backbone-workshop"), // localStorage replaces URL
        model: app.Contact
    });

    app.CreateContactView = Backbone.View.extend({
        el: $('div#createContainer'),
        events: {
            'click input[type="button"]': 'create'
        },
        create: function () {
            console.log('createView: create');
        }
    });

    app.ContactRecordView = Backbone.View.extend({
        tagName: 'tr',
        template: Handlebars.compile($('script#contactRecordViewTemplate').html()),
        render: function () {
            console.log('recordView: render');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    app.ContactEditView = Backbone.View.extend({

    });

    app.ContactApp = Backbone.Router.extend({
        routes: {
            "*actions": "list"
        },
        initialize: function () {
            this.contacts = new app.ContactList();
            this.createView = new app.CreateContactView({el: $('div#createContainer')});
            this.listenTo(this.contacts, 'reset', this.addAll);
            //this.contacts.fetch();
            this.contacts.reset([
                {
                    firstName: 'Mike',
                    lastName: 'Munhall',
                    phone: '303-514-9144',
                    email: 'munhall.mike@gmail.com'
                },
                {
                    firstName: 'Agent',
                    lastName: 'Smith',
                    phone: '303-555-1234',
                    email: 'wantanderson99@gmail.com',
                    foo: 'bar',
                    baz: 'qux'
                }
            ]);
            Backbone.history.start();
        },
        list: function () {
            console.log('route: list');
        },
        addOne: function (contact) {
            console.log('router: addOne');
            var recordView = new app.ContactRecordView({model: contact});
            recordView.render();
            $('table tbody').append(recordView.el);
        },
        addAll: function () {
            console.log('addAll');
            this.contacts.each(this.addOne, this);
        }
    });
})()

$(function () {
    var runtime = new app.ContactApp();
})