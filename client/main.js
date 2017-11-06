import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Resolutions } from '../lib/collections.js';

import './main.html';

Template.body.helpers({
  resolutions: function () {
    // return Resolutions.find();
    if (Session.get('hideFinished')) {
      return Resolutions.find({ checked: { $ne: true } });
    } else {
      return Resolutions.find();
    } 
  }
});

Template.body.events({
  'submit .new-resolution': function (event) {
    // form itself is the target.
    const title = event.target.title.value;

    Resolutions.insert({
      title: title,
      createdAt: new Date()
    });

    event.target.title.value = '';
    return false;
  },
  'change .hide-finished': function (event) {
    // $meteor add sesson
    Session.set('hideFinished', event.target.checked)
    console.log(Session.get('hideFinished'))
  }
});

Template.resolution.events({
  'click .toggle-checked': function () {
    Resolutions.update(this._id, { $set: { checked: !this.checked } })
  },
  'click .delete': function () {
    Resolutions.remove(this._id);
  }
});