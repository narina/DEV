Ext.define('DEV.store.DeveloperStore', {
	extend : 'Ext.data.Store',

	storeId : 'dev.developer_store',

	autoLoad : true,

	model : 'DEV.model.Developer',

	proxy : {
		type : 'ajax',
		url : 'module/DEV/data/developers.json',
		reader : {
			type : 'json'
		}
	}
});