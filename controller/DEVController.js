Ext.define('DEV.controller.DEVController', {
	extend : 'Ext.app.Controller',

	stores : [ ],
	models : [ ],
	views : [ ],

	init : function() {
		this.control({
			'viewport' : {
				afterrender : this.onViewportRendered
			}
		});
	},

	onViewportRendered : function() {
		SmartFactory.addNav('DEV.view.NavDeveloper', {
			iconCls : 'iconsetDockDeveloper',
			itemId : 'navDeveloper',
			title : T('Caption.Other.Developer')
		});
		
		SmartFactory.addSideMenu('Ext.button.Button', {
			text : 'Templates(개발용)',
			handler : function() {
				SmartFactory.doMenu({
					viewModel : 'DEV.view.tools.TemplateBuilder',
					itemId : 'WDEV1002'
				});
			}
		});		
	}

});