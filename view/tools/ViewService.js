Ext.define('DEV.view.inquiry.ViewService', {
	extend : 'MES.view.form.BaseFormTabs',

	title : T('Caption.Other.ServiceView'),

	initComponent : function() {
		this.callParent();

		this.getTabPanel().add(this.buildDefBrief());
		this.getTabPanel().add(this.buildDefInMessage());
		this.getTabPanel().add(this.buildDefOutMessage());
		this.getTabPanel().add(this.buildDefErrorMessage());
		this.getTabPanel().add(this.buildDefSource());

		var self = this;

		this.on('afterrender', function() {
			var supplement = self.getSupplement();

			supplement.on('supplementSelected', function(record) {
				self.reloadForm(record);
			});

			supplement.sub('cdvFuncGroup').on('change', function(recod) {
				supplement.refreshGrid(true);
			});
		});

	},

	camelize : function(src) {
		return src.replace(/[A-Z]([A-Z]+)|(?:^|[-_])(\w)/g, function(x, c) {
			var x0 = x.charAt(0);

			if (x0 == '-' || x0 == '_')
				return x.substr(1).toUpperCase();
			return x0 + x.substr(1).toLowerCase();
		});
	},

	reloadForm : function(record) {
		this.loadRecord(record);

		var serviceName = this.camelize(record.get('serviceName'));

		var defUrl = 'service/' + serviceName + '.def';
		var self = this;

		Ext.Ajax.request({
			url : defUrl,
			params : {},
			success : function(response) {
				self.buildDefinitions(Ext.JSON.decode(response.responseText));
			},
			failure : function() {
				self.resetDefinitions();
			}
		});
	},

	resetDefinitions : function() {
		this.sub('txtDefinition').setValue('');
		this.sub('txtName').setValue('');
		this.sub('txtProcsteps').setValue('');
		this.sub('txtMaxResultSize').setValue('');
		this.sub('txtDescriptions').setValue('');
		this.sub('txtInputType').setValue('');
		this.sub('txtOutputType').setValue('');
		this.sub('txtErrorType').setValue('');
	},

	buildDefinitions : function(definition) {
		this.sub('txtDefinition').setValue(JSON.stringify(definition, null, '\t'));

		this.sub('txtName').setValue(this.camelize(definition.name));
		this.sub('txtProcsteps').setValue(definition.procsteps);
		this.sub('txtDescriptions').setValue(definition.descriptions.toString());
		this.sub('txtMaxResultSize').setValue(definition.maxResultSize);
		this.sub('txtInputType').setValue(definition.inputType);
		this.sub('txtOutputType').setValue(definition.outputType);
		this.sub('txtErrorType').setValue(definition.errorType);

		var clazzName = definition.inputType.substr(definition.inputType.lastIndexOf('.') + 1);
		var module = clazzName.substr(0, clazzName.search(/[a-z|0-9]([A-Z])/) + 1).toUpperCase();
		var path = window.location.pathname;
		var baseUrl = window.location.protocol + '//' + window.location.host + path.substr(0, path.lastIndexOf('/'));
		
		this.sub('txtInputModel').setValue(module + '.model.' + clazzName);
		this.sub('txtInputModelUrl').setValue(baseUrl + '/module/' + module + '/model/' + clazzName + '.js');
		this.sub('txtInputStore').setValue(module + '.store.' + clazzName);
		this.sub('txtInputStoreUrl').setValue(baseUrl + '/module/' + module + '/store/' + clazzName + '.js');
		
		var typeDef = Ext.Array.filter(definition.types, function(item) { return item.name === definition.inputType; })[0];
		this.sub('txtInputTypeSource').setValue(JSON.stringify(typeDef, null, '\t'));

		clazzName = definition.outputType.substr(definition.outputType.lastIndexOf('.') + 1);

		this.sub('txtOutputModel').setValue(module + '.model.' + clazzName);
		this.sub('txtOutputModelUrl').setValue(baseUrl + '/module/' + module + '/model/' + clazzName + '.js');
		this.sub('txtOutputStore').setValue(module + '.store.' + clazzName);
		this.sub('txtOutputStoreUrl').setValue(baseUrl + '/module/' + module + '/store/' + clazzName + '.js');

		typeDef = Ext.Array.filter(definition.types, function(item) { return item.name === definition.outputType; })[0];
		this.sub('txtOutputTypeSource').setValue(JSON.stringify(typeDef, null, '\t'));

		typeDef = Ext.Array.filter(definition.types, function(item) { return item.name === definition.errorType; })[0];
		this.sub('txtErrorTypeSource').setValue(JSON.stringify(typeDef, null, '\t'));
	},

	buildTopPart : function() {
		return {
			xtype : 'container',
			layout : {
				type : 'ncolumn',
				columns : 2
			},
			defaults : {
				xtype : 'textfield',
				labelSeparator : ''
			},
			items : [{
				name : 'serviceName',
				fieldLabel : T('Caption.Other.Name')
			}, {
				name : 'moduleName',
				fieldLabel : '모듈'
			// fieldLabel : T('Caption.Other.ModuleName')
			}, {
				name : 'serviceDesc1',
				fieldLabel : T('Caption.Other.Description'),
				colspan : 2
			}, {
				name : 'serviceMode',
				fieldLabel : '서비스 모드'
			// fieldLabel : T('Caption.Other.ServiceMode')
			}, {
				name : 'serviceCategory',
				fieldLabel : '서비스 범주'
			// fieldLabel : T('Caption.Other.ServiceCategory')
			}]
		};
	},

	buildDefSource : function() {
		return {
			title : 'Definition Source',
			cls : 'paddingAll5',
			layout : 'fit',
			items : [ {
				xtype : 'textarea',
				itemId : 'txtDefinition',
				readOnly : true,
				emptyText : '이 서비스는 아직 구현되지 않았습니다. 구현된 서비스를 선택해주세요.'
			} ]
		};
	},

	buildDefBrief : function() {
		return {
			title : 'Brief',
			cls : 'paddingAll5',
			layout : 'anchor',
			autoScroll : true,
			defaults : {
				xtype : 'textfield',
				readOnly : true,
				anchor : '100%',
				labelSeparator : ''
			},
			items : [ {
				itemId : 'txtName',
				fieldLabel : 'Name',
				emptyText : '이 서비스는 아직 구현되지 않았습니다. 구현된 서비스를 선택해주세요.'
			}, {
				itemId : 'txtProcsteps',
				fieldLabel : 'Procsteps'
			}, {
				itemId : 'txtDescriptions',
				fieldLabel : 'Descriptions'
			}, {
				itemId : 'txtMaxResultSize',
				fieldLabel : 'Max Result Size'
			} ]
		};
	},

	buildDefInMessage : function() {
		return {
			title : 'Input Type',
			cls : 'paddingAll5',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			autoScroll : true,
			defaults : {
				xtype : 'textfield',
				readOnly : true,
				labelSeparator : ''
			},
			items : [ {
				itemId : 'txtInputType',
				fieldLabel : 'In Type(JAVA)'
			}, {
				itemId : 'txtInputModel',
				fieldLabel : 'In Model(JS)'
			}, {
				itemId : 'txtInputModelUrl',
				fieldLabel : 'In Model(URL)'
			}, {
				itemId : 'txtInputStore',
				fieldLabel : 'In Store(JS)'
			}, {
				itemId : 'txtInputStoreUrl',
				fieldLabel : 'In Store(URL)'
			}, {
				xtype : 'separator'
			}, {
				xtype : 'textarea',
				itemId : 'txtInputTypeSource',
				flex : 1
			} ]
		};
	},

	buildDefOutMessage : function() {
		return {
			title : 'Output Type',
			cls : 'paddingAll5',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			autoScroll : true,
			defaults : {
				xtype : 'textfield',
				readOnly : true,
				labelSeparator : ''
			},
			items : [ {
				itemId : 'txtOutputType',
				fieldLabel : 'Out Type(JAVA)'
			}, {
				itemId : 'txtOutputModel',
				fieldLabel : 'Out Model(JS)'
			}, {
				itemId : 'txtOutputModelUrl',
				fieldLabel : 'Out Model(URL)'
			}, {
				itemId : 'txtOutputStore',
				fieldLabel : 'Out Store(JS)'
			}, {
				itemId : 'txtOutputStoreUrl',
				fieldLabel : 'Out Store(URL)'
			}, {
				xtype : 'separator'
			}, {
				xtype : 'textarea',
				itemId : 'txtOutputTypeSource',
				flex : 1
			} ]
		};
	},

	buildDefErrorMessage : function() {
		return {
			title : 'Error Type',
			cls : 'paddingAll5',
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			autoScroll : true,
			defaults : {
				xtype : 'textfield',
				readOnly : true,
				labelSeparator : ''
			},
			items : [ {
				itemId : 'txtErrorType',
				fieldLabel : 'Error Type(JAVA)'
			}, {
				xtype : 'separator'
			}, {
				xtype : 'textarea',
				itemId : 'txtErrorTypeSource',
				flex : 1
			} ]
		};
	},

	buildSupplement : function() {
		return {
			xtype : 'gridsup',

			title : T('Caption.Other.Service List'),

			fields : [ {
				xtype : 'fieldset',
				itemId : 'filters',
				layout : 'anchor',
				defaults : {
					labelSeparator : '',
					anchor : '100%'
				},
				items : {
					xtype : 'codeview',
					fieldLabel : T('Caption.Other.Function Group'),
					allowBlank : false,
					labelStyle : 'font-weight:bold',
					itemId : 'cdvFuncGroup',
					codeviewName : 'secFuncGrp',
					txtFieldName : [ 'FUNCTION_GROUP' ],
					name : 'moduleName',
					flex : 1
				}
			} ],

			grid : {
				store : Ext.create('SVM.store.SvmViewServiceListOut.serviceList'),
				columns : [ {
					header : T('Caption.Other.Name'),
					dataIndex : 'serviceName',
					flex : 2
				}, {
					header : T('Caption.Other.Description'),
					dataIndex : 'serviceDesc1',
					flex : 1
				} ]
			}
		};
	}

});