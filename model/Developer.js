Ext.define('DEV.model.Developer', {
	extend: 'Ext.data.Model',
	
	fields: [
		{ name: 'id', type: 'string'},
		{ name: 'name', type: 'string' },
		{ name: 'status', type: 'string' }
  ]
});