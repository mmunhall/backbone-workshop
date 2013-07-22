var app = {};

(function () {
    "use strict";

    app.Contact = Backbone.Model.extend({

    });

    app.ContactList = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("backbone-workshop"), // localStorage replaces URL
        model: app.Contact
    });

    app.ContactRecordView = Backbone.View.extend({

    });

    app.ContactEditView = Backbone.View.extend({

    });

    app.ContactApp = Backbone.Router.extend({
        routes: {
            "*actions": "list"
        },
        initialize: function () {
            this.contacts = new app.ContactList();
            this.listenTo(this.contacts, 'reset', this.addAll);
            //this.contacts.fetch();
            this.contacts.reset({
                firstName: 'Mike',
                lastName: 'Munhall',
                phone: '303-514-9144',
                email: 'munhall.mike@gmail.com'
            });
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