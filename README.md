backbone-workshop
=================

This project is used in a guided workshop to help learn the Backbone library/framework. The master branch contains the finished, working application. The application uses a local storage adapter so no server-side technology is required.

You can do the "workshop" on your own by checking out, in order, the branches below and diffing the changes between branches and writing the code yourself. Be aware that there are a few errors scattered across the branches that are usually corrected by checking out the next step. I will get around to correcting those errors soon.

The advantage of having a separate branch for each step of the workshop is that participants can simply checkout a branch to catch up or if they understand the step and don't feel like typing. The disadvantage is the tedious nature of making changes to the workshop: changes must be made to the master branch, the branch where the change is introduced, and all branches following that branch. This is made easier by merging or cherry picking, but it's still tedious. There may be a better way. Would I create a workshop this way again in the future? Maybe. It really is very effective as a teaching tool.

###TODO###
1. Annotate the source for parsing in [Docco](http://jashkenas.github.io/docco/).
2. Find and fix the inconsistencies between branches:
    1. Missing workshop/swap-views-after-edit branch.

workshop/start
--------------
Begin here. This branch contains the JavaScript dependencies, some CSS and an index.html file to get started.

workshop/add-dependencies
-------------------------
Create an application.js file with some bootstrap code to get started.

workshop/create-first-objects
-----------------------------
We'll build the first Backbone objects we plan to use in our application.

workshop/start-html-file
------------------------
Begin building the HTML of our application.

workshop/add-list-table
-----------------------
Create the HTML table for the listing of contacts.

workshop/create-list-route
--------------------------
Create a default route for listing contacts.

workshop/init-collection
------------------------
Intialize a collection of contacts, fetch existing saved contacts, and start Backbone.history.start() to route the default URL.

workshop/temp-reset
-------------------
Since we have no exiting contacts to fetch, we'll replace fetch() with reset() until we have implemented the create feature of the application.

workshop/create-recordview-template
-----------------------------------
Create a template for our record view.

workshop/begin-recordview
-------------------------
Add some properties to the record view object so that contacts will be rendered into the page.

workshop/add-another-contact
----------------------------
Add another object to the collection for good measure. Notice that we are now passing an array to reset rather than a single object. Also, note that any name/value pair can be sent and the model will be dutifully created using that inforamtion.

workshop/add-create-form
------------------------
Add a form to the HTML page for creating new contacts.

workshop/start-create-view
--------------------------
Begin building the view to control the create form, and instantiate the new view from the application router.

workshop/extend-app-with-events
-------------------------------
Extend the application with Backbone.Events, which will allow us to trigger and listen for custom events.

workshop/persist-new-contact
----------------------------
Trigger an event when the save button is clicked, listen for the triggered event in the router, add the new model to the collection, listen for the add event on the model.

workshop/remove-temp-reset
--------------------------
Now that we are successfully creating and persisting new models, we can remove the temporary workaround for fetch() that we implemented using reset().

workshop/cleanup-after-create
-----------------------------
Reset the create form after clicking the Save button by implementing a clear function on the create view, listening for a particular event from the create view, and trigger the event from the router.

workshop/add-delete-link
------------------------
Add a delete link to the record view template.

workshop/destroy-model
----------------------
Destroy the model when clicking the delete link.

workshop/remove-model-on-destroy
--------------------------------
Listen for a model's destroy event and remove its associated view.

workshop/add-edit-template
--------------------------
Create a template for editing individual models, and put an Edit link on the record view.

workshop/add-edit-route
-----------------------
Create a route and a route handler for editing a model.

workshop/hide-recordview-on-edit
--------------------------------
Add an ID to our record view, and hide the record view (identifying it by the new ID element), and show the yet-to-be-created edit view.

workshop/implement-edit-view
----------------------------
Implement the edit view and then create an edit view when a new model is added to the collection.

workshop/persist-changes-on-save
--------------------------------
Save changes to the model when the Save button is clicked.

workshop/swap-views-after-edit
------------------------------
Switch from edit view to record view after editing a model.

workshop/update-views-after-edit
--------------------------------
Add listeners to the views that will re-render the views when changes to models occur. We will also add a listener to the edit view for when a model is destroyed.

workshop/cancel-edit
--------------------
Implement a cancel link when editing.