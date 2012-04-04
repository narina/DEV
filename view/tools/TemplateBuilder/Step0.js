Ext.define('DEV.view.tools.TemplateBuilder.Step0', {
	extend : 'DEV.view.tools.TemplateBuilder.AbstractStep',

	alias : 'widget.tb_step0',

	title : '화면 기본정보 선택',
	description : '이 단계에서는 만들고자 하는 폼 화면의 기본정보를 설정합니다.',

	initComponent : function() {
		this.callParent();
		
		var self = this;
		
		this.add({
			xtype : 'container',
			flex : 1,
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [ {
				xtype : 'container',
				flex : 1,
				height : 500,
				layout : 'anchor',
				defaults : {
					bubbleEvents : ['change']
				},
				items : this.buildItems()
			}, {
				xtype : 'tb_preview',
				itemId : 'tb_preview',
				flex : 1
			} ]
		});
		
		this.on('change', function(field, value) {
			if(field.templateField) {
				self.getTemplateModel()[field.templateField] = value;
			}
			self.getTemplate().overwrite(self.sub('tb_preview').body, self.getTemplateModel());
		});
	},

	buildItems : function() {
		return [ {
			xtype : 'textfield',
			templateField : 'module',
			fieldLabel : '모듈 이름'
		}, {
			xtype : 'textfield',
			templateField : 'category',
			fieldLabel : '폼 용도 분류'
		}, {
			xtype : 'textfield',
			templateField : 'className',
			fieldLabel : '폼 클래스 이름'
		} ];
	}
});