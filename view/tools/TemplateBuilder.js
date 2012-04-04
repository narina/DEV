Ext.define('DEV.view.tools.TemplateBuilder', {
	extend : 'Ext.panel.Panel',

	requires : [ 'DEV.view.tools.TemplateBuilder.AbstractStep', 'DEV.view.tools.TemplateBuilder.Preview', 'DEV.view.tools.TemplateBuilder.Step0',
			'DEV.view.tools.TemplateBuilder.Step1', 'DEV.view.tools.TemplateBuilder.Step2', 'DEV.view.tools.TemplateBuilder.Step3' ],

	title : 'TemplateBuilder',

	layout : 'card',

	activeItem : 0,

	initComponent : function() {
		this.callParent();

		var self = this;
		
		this.templateModel = {
			module : 'MES',
			category : '',
			className : '',
			baseForm : 'MES.view.form.BaseForm',
			formClassName : function() {
				return this.module + '.view.' + this.category + '.' + this.className;
			}
		};

		function navigate(direction) {
			var layout = self.getLayout();
			layout[direction]();
			self.sub('prev').setDisabled(!layout.getPrev());
			self.sub('next').setDisabled(!layout.getNext());
		}

		this.sub('prev').on('click', function() {
			navigate('prev');
		});

		this.sub('next').on('click', function() {
			navigate('next');
		});
	},

	bbar : [ '->', {
		itemId : 'prev',
		text : '&laquo; Previous',
		disabled : true
	}, {
		itemId : 'next',
		text : 'Next &raquo;'
	} ],

	items : [ {
		xtype : 'tb_step0',
		itemId : 'step0'
	}, {
		xtype : 'tb_step1',
		itemId : 'step1'
	}, {
		xtype : 'tb_step2',
		itemId : 'step2'
	}, {
		xtype : 'tb_step3',
		itemId : 'step3'
	} ],
	
	getTemplateModel : function() {
		return this.templateModel;
	},
	
	getTemplate : function() {
		return DEV.template.MainTemplate.tplMainForm;
//		this.template = this.buildTemplate();
//		
//		return this.template;
//	},
//	
//	buildTemplate : function() {
//		return DEV.template.MainTemplate.tplMainForm.apply(this.templateModel);
	}
});