Ext.define('DEV.view.tools.TemplateBuilder.Step2', {
	extend : 'DEV.view.tools.TemplateBuilder.AbstractStep',

	alias : 'widget.tb_step2',

	title : 'Step2',
	description : '이 단계에서는 서버와 통신하는 방법을 정의합니다.',

	initComponent : function() {
		this.callParent();
		
		this.add(this.buildItems());
	},

	buildItems : function() {
		return [ {
			xtype : 'radiogroup',
			fieldLabel : '폼의 데이타 가져오기 방법',
			items : [ {
				fieldLabel : '표준 폼 로드'
			}, {
				fieldLabel : '외부에서 레코드 제공'
			}, {
				fieldLabel : '그리드 정보를 포함한 폼 로드'
			}, {
				fieldLabel : '없음'
			} ]
		}, {
			xtype : 'radiogroup',
			fieldLabel : '폼 데이타 업로드 방법',
			items : [ {
				fieldLabel : '표준 폼 SUBMIT'
			}, {
				fieldLabel : '그리드 정보를 포함한 폼 SUBMIT'
			}, {
				fieldLabel : '없음'
			} ]
		}, {
			xtype : 'textfield',
			fieldLabel : '폼 데이타 가져오는 서비스 명'
		}, {
			xtype : 'textfield',
			fieldLabel : '폼 데이타를 업로드하는 서비스 명'
		} ];
	}

});