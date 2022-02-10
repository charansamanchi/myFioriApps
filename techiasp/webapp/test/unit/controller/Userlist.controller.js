/*global QUnit*/

sap.ui.define([
	"techiasp/controller/Userlist.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Userlist Controller");

	QUnit.test("I should test the Userlist controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
