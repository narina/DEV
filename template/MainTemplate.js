Ext.define('DEV.template.MainTemplate', {
	singleton : true,

	requires : [],

	tplMainForm : new Ext.XTemplate([
		"<pre>",
		"Ext.define('{[ this.formClass(values) ]}', {",
		"	extend : '{[ this.baseFormClass(values) ]}',\n",
		"	initComponent : function() {",
		"	}",
		"});",
		"</pre>"].join('\n'),
		{
			formClass : function(values) {
				return values.formClassName();
			},
			baseFormClass : function(values) {
				return values.baseForm;
			}
		}
	)
});