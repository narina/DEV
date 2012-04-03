Ext.define('DEV.view.tools.TemplateBuilder.Step3', {
	extend : 'DEV.view.tools.TemplateBuilder.AbstractStep',
	
	alias : 'widget.tb_step3',
	description : '이 단계에서는 버튼의 구성과 동작을 정의합니다.',
	
	title : 'Step3',
	
	initComponent : function() {
		this.callParent();
		
		this.add(this.buildItems());
	},
	
	buildItems : function() {
		return [ {
			xtype : 'checkboxgroup',
			fieldLabel : '폼의 데이타 가져오기 방법',
			items : [ {
				fieldLabel : 'View 버튼'
			}, {
				fieldLabel : 'Create 버튼'
			}, {
				fieldLabel : 'Update '
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