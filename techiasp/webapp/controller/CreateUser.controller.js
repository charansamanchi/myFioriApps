sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/m/MessageToast",
    "sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Button",
    "sap/ui/core/ValueState",
    "sap/m/ButtonType",
    "sap/m/Text",
    "sap/m/MessageBox"
], function (BaseController, JSONModel, formatter, Filter, MessageToast, FilterOperator, Dialog, DialogType, Button, ValueState, ButtonType, Text, MessageBox) {
    "use strict";

    return BaseController.extend("techiasp.controller.CreateUser", {

        formatter: formatter,
        /** 
		onNavBack : function() {
			// eslint-disable-next-line sap-no-history-manipulation
			history.go(-1);
		},
*/
        onInit: function () {
            this.getRouter().getRoute("createUser");
        },
        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("TargetUserlist", {}, true);
            }
        },

        onCancel: function () {
            history.go(-1);

        },

        onSave: function (e) {

            var username = this.getView().byId("user1").getValue();
            var displayname = this.getView().byId("display1").getValue();
            var family = this.getView().byId("family").getValue();
            var middle = this.getView().byId("middle").getValue();
            var emailid = this.getView().byId("email1").getValue();

            this.getView().getModel("createUserbody").setProperty("/userName", username);
            this.getView().getModel("createUserbody").setProperty("/displayName", displayname);
            this.getView().getModel("createUserbody").setProperty("/name/familyName", family);
            this.getView().getModel("createUserbody").setProperty("/name/givenName", middle);

            var emailprop = this.getView().getModel("createUserbody").getProperty("/emails");
            emailprop[0].value = emailid;
            var body = JSON.stringify(this.getView().getModel("createUserbody").oData);
            var that = this;
            var sPath = 'IAS/Users';
            var xurl =  this.getOwnerComponent().getManifestObject().resolveUri(sPath);
            $.ajax({
                type: "POST",
                contentType: "application/scim+json",
                url: xurl,
                data: body,
                success: function (data, txtStatus, jqXHR) {
                    var msg = 'User in IAS with unique id: ' + data.id + ' is created succesfully';
                    //MessageToast.show(msg);
                    debugger;
                    MessageBox.success(msg);
                 //   sg }),
                 /*
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "OK",
                            press: function () {
                                debugger;
                                that.close();
                            }.bind(dialogbox)
                        })
                    });
                    var that = dialogbox;
                    dialogbox.open(); */
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    debugger;
                    var msg = 'Error:' + jqXhr.responseText;
                    MessageToast.show(msg);
                }
            })

        },

        onClear: function () {
            this.getView().byId("user1").setValue();
            this.getView().byId("display1").setValue();
            this.getView().byId("family").setValue();
            this.getView().byId("middle").setValue();
            this.getView().byId("email1").setValue();


        },

        onCancel: function () {
            history.go(-1);
            

        }

    });
});