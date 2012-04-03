Ext.define('DEV.view.NavDeveloper', {
	extend : 'Ext.panel.Panel',

	tbar : [ {
		cls : 'navRefreshBtn',
		listeners : {
			click : function(button) {
				var store = Ext.StoreManager.lookup('DEV.store.DeveloperStore');
				store.load();
			}
		}
	}, {
		cls : 'navClearBtn',
		listeners : {
			click : function() {
				var store = Ext.StoreManager.lookup('DEV.store.DeveloperStore');
				store.removeAll(false);
			}
		}
	} ],

	items : [ {
		xtype : 'dataview',
		store : Ext.StoreManager.lookup('DEV.store.DeveloperStore'),
		autoScroll : true,

		cls : 'developer-list',
		itemSelector : '.developer-list-item',
		overItemCls : 'developer-list-item-hover',
		tpl : '<tpl for="."><div class="developer-list-item {status}">{name} - {id}</div></tpl>',

		listeners : {
			itemclick : function(view, record, item, index, e, opt) {
				SmartFactory.doMenu({
					viewModel : 'DEV.view.common.TemplateBuilder',
					itemId : 'dev_tbuilder'
				});
			}
		}
	} ]

});