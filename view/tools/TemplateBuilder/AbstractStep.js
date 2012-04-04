Ext.define('DEV.view.tools.TemplateBuilder.AbstractStep', {
	extend : 'Ext.container.Container',
	
	bodyCls : 'paddingAll10',
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	defaults : {
		cls : 'paddingAll5'
	},
	
	initComponent : function() {
		var title = {
			xtype : 'fieldset',
			title : this.title,
			collapsible: true,
			items : [{
				xtype : 'displayfield',
				hideLabel : true,
				value : this.description
			}]
		};
		
		if(!this.items) {
			this.items = [title]; 
		} else {
			Ext.Array.insert(this.items, 0, title);
		}

		this.callParent();
	},
	
	getTemplateModel : function() {
		if(!this.templateModel)
			this.templateModel = this.up().getTemplateModel();
		return this.templateModel;
	},

	getTemplate : function() {
		return this.up().getTemplate();
	}
});