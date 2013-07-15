var app = {};

(function () {
    "use strict";

    app.Contact = Backbone.Model.extend({

    });

    app.ContactList = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("backbone-workshop"),
        model: app.Contact,
        comparator: function (contact) {
            return contact.get('lastName') + ' ' + contact.get('firstName');
        }
    });

    app.ContactRecordView = Backbone.View.extend({
        tagName: 'tr',
        template: Handlebars.compile($('script#contactRecordViewTemplate').html()),
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        render: function () {
            console.log('recordView: render');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        remove: function () {
            console.log('recordView: remove');
        }
    });

    app.ContactEditView = Backbone.View.extend({

    });

    app.ContactApp = Backbone.Router.extend({
        routes: {
            "create": "create",
            "edit/:id": "edit",
            "delete/:id": "delete",
            "*actions": "list"
        },
        initialize: function () {
            this.contacts = new app.ContactList();
            this.listenTo(this.contacts, 'reset', this.addAll);
            //this.contacts.fetch();
            this.contacts.reset([
                {
                    id: 1,
                    lastName: 'Smith',
                    firstName: 'Agent',
                    phone: '303-555-8033',
                    email: 'wantanderson99@gmail.com'
                },
                {
                    id: 2,
                    lastName: 'Munhall',
                    firstName: 'Mike',
                    phone: '303-514-9144',
                    email: 'munhall.mike@gmail.com'
                }
            ]);
            Backbone.history.start();
        },
        list: function () {
            console.log('route: list');
        },
        create: function () {
            console.log('route: create');
        },
        edit: function (id) {
            console.log('route: edit ' + id);
        },
        delete: function (id) {
            console.log('route: delete ' + id);
        },
        addAll: function () {
            console.log('router: addAll');
            this.contacts.each(this.addOne, this);
        },
        addOne: function (contact) {
            console.log('router: addOne');
            var recordView = new app.ContactRecordView({model: contact});
            var editView = new app.ContactEditView({model: contact});
            recordView.render();
            editView.render();
            $('table tbody').append(recordView.el);
        }
    });
})()

$(function () {
    var runtime = new app.ContactApp();
})