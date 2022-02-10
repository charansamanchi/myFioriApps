sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
     "sap/m/Dialog",
    "sap/m/DialogType",
    "sap/m/Button",
    "sap/ui/core/ValueState",
    "sap/m/ButtonType",
    "sap/m/Text"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, MessageToast, Dialog, DialogType, Button, ValueState, ButtonType, Text  ) {
    "use strict";

    return BaseController.extend("techiasp.controller.Userlist", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
        onInit: function () {
          //  this.getRouter().getRoute("TargetUserlist");
            var that = this;
            debugger;
            var sPath = 'IAS/Users';
     // to make the URL work outside of CF (Eg: launchpad), pass the relative url to below method.
           var xurl =  this.getOwnerComponent().getManifestObject().resolveUri(sPath);
            var tdata = $.ajax({
                type: "GET",
                contentType: "application/json",
                url: xurl,
                success: function (data, txtStatus, jqXHR) {
                    //console.log("*****************Inside success "+data);
                    //var resource = data.Resources;
                    var oModel = new sap.ui.model.json.JSONModel(data);
                    //oModel.setData(resource);
                    var json = oModel.getJSON();
                    debugger;
                    that.getView().setModel(oModel, "myModel");
                    var msg = data.totalResults + ' Users found in directory';
                    MessageToast.show(msg);                   
                }
            })
            debugger;
            this.getView().getModel("myModel");
        },

        formatEmail: function (aEmail) {
            debugger;
            return aEmail.map(function (emails) { return emails.value; });
            //  return aEmail[0].value;

        },

        onSearch: function (oEvent) {
            debugger;
            var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("userName", FilterOperator.Contains, sQuery);
                aFilters.push(filter);

			}

			// update list binding
			var oList = this.byId("table");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");            
        },

        onPress : function() {
            this.getOwnerComponent().getRouter().navTo("fileUpload");
    
        },

        onCreate: function () {
             this.getOwnerComponent().getRouter().navTo("createUser");

        },

        onDelete: function (x) {
            debugger;
            var t = location;
          var spathArray = this.byId("table").getSelectedContextPaths(true);
          var element = spathArray[0].split('/')[2];
        
          var context = this.byId("table").getSelectedContexts();
          var selectedId = context[0].oModel.oData.Resources[element].id;
          var sPath = 'IAS/Users/' +selectedId;
           var xurl =  this.getOwnerComponent().getManifestObject().resolveUri(sPath);
          $.ajax({
                type: "DELETE",
                contentType: "application/scim+json",
                url: xurl,
                success: function (data, txtStatus, jqXHR) {
                    debugger;
                 //   var newModel = context[0].oModel.oData.Resources;
                 //   newModel.splice(element,1);
                    var msg = 'User ' + selectedId + ' is deleted from directory.'
                  //  MessageToast.show(msg);    
                    
                     var dialogbox = new Dialog({
                        type: DialogType.Message,
                        title: "Success",
                        state: ValueState.Success,
                        content: new Text({ text: msg }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "OK",
                            press: function () {
                                debugger;
                                that.close();
                                t.reload();
                            }.bind(dialogbox)
                        })
                    });
                    var that = dialogbox;
                    dialogbox.open();
                },
                  error: function (jqXhr, textStatus, errorThrown) {
                    debugger;

                }
            })
            
        }


    })
});