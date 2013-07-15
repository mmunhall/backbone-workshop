var app = {};

(function () {
    "use strict";

    _.extend(app, Backbone.Events);

    app.Contact = Backbone.Model.extend({
        validate: function () {
            
        }
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
        className: 'recordView',
        template: Handlebars.compile($('script#contactRecordViewTemplate').html()),
        id: function () {
            return 'recordView_' + this.model.get('id');
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        events: {
            'click a.deleteLink': 'delete'
        },
        render: function () {
            console.log('recordView: render');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        delete: function () {
            console.log('recordView: delete');
            this.model.destroy();
        }
    });

    app.ContactEditView = Backbone.View.extend({
        tagName: 'tr',
        className: 'hidden editView',
        id: function () {
            return 'editView_' + this.model.get('id');
        },
        template: Handlebars.compile($('script#contactRecordEditTemplate').html()),
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        events: {
            'click a': 'cancel',
            'click input[type="button"]': 'save'
        },
        render: function () {
            console.log('editView: render');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        cancel: function (e) { // this would be better using a custom event.
            console.log('editView: cancel');
            e.preventDefault();
            this.render();
            app.trigger('edit:done');
        },
        save: function (e) {
            console.log('editView: save');
            e.preventDefault();
            this.model.save({
                lastName: this.$el.find('span:eq(0)').text(),
                firstName: this.$el.find('span:eq(1)').text(),
                email: this.$el.find('span:eq(2)').text(),
                phone: this.$el.find('span:eq(3)').text()
            });
            app.trigger('edit:done');
        }
    });

    app.ContactApp = Backbone.Router.extend({
        routes: {
            "create": "create",
            "edit/:id": "edit",
            "*actions": "list"
        },
        initialize: function () {
            this.contacts = new app.ContactList();
            this.listenTo(this.contacts, 'reset', this.addAll);
            this.listenTo(app, 'edit:done', this.afterEdit);
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
            $('tr#recordView_' + id).addClass('hidden');;
            $('tr#editView_' + id).removeClass('hidden');
        },
        afterEdit: function () {
            console.log('router: doneEditing');
            $('tr.recordView').removeClass('hidden');
            $('tr.editView').addClass('hidden');
            this.navigate('/');
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
            $('table tbody').append(editView.el);
        },
        cancel: function () {
            console.log('router: cancel edit');
        }
    });
})()

$(function () {
    var runtime = new app.ContactApp();
})