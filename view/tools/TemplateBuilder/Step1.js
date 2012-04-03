Ext.define('DEV.view.tools.TemplateBuilder.Step1', {
	extend : 'DEV.view.tools.TemplateBuilder.AbstractStep',

	alias : 'widget.tb_step1',

	title : '화면 레이아웃 선택',
	description : '이 단계에서는 만들고자 하는 폼 화면의 기본 레이아웃을 선택합니다.',

	initComponent : function() {
		this.callParent();

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
				items : this.buildItems()
			}, {
				xtype : 'tb_preview',
				flex : 1
			} ]
		});
	},

	buildItems : function() {
		return [ {
			xtype : 'radiogroup',
			fieldLabel : '메인폼의 형태를 선택합니다.',
			items : [ {
				fieldLabel : '단순 폼형태 (전체스크롤)'
			}, {
				fieldLabel : '그리드를 포함한 폼형태'
			}, {
				fieldLabel : '탭을 포함한 폼형태'
			}, {
				fieldLabel : '여러 폼의 복합형태'
			} ]
		}, {
			xtype : 'radiogroup',
			fieldLabel : '상단부의 폼 필드 배치',
			items : [ {
				fieldLabel : '1 컬럼 단순배치'
			}, {
				fieldLabel : '2 컬럼 배치'
			}, {
				fieldLabel : '3 컬럼 배치'
			} ]
		}, {
			xtype : 'radiogroup',
			fieldLabel : '서브 폼의 형태',
			items : [ {
				fieldLabel : '단순 폼형태 (전체스크롤)'
			}, {
				fieldLabel : '그리드를 포함한 폼형태'
			}, {
				fieldLabel : '탭을 포함한 폼형태'
			} ]
		}, {
			xtype : 'radiogroup',
			fieldLabel : '보조화면 구성',
			items : [ {
				fieldLabel : '사용하지 않음'
			}, {
				fieldLabel : '그리드를 포함한 보조화면'
			}, {
				fieldLabel : '단순폼 형태 보조화면'
			} ]
		} ];
	}
});