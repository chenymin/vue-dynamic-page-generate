const applyInfo = {
  pagenavigateInfo: ['申请企业信息', '法定代表人信息', '补充材料', '材料上传', '提交成功'],
  enterpriseInfo: {
    nextJumpUrl: '',
    preJumpUrl: '',
    formData: {
      email: null,
      phone: null,
      smsCode: null,
      legalPersonIdPeriod: null,
      legalLiveProp: null,
      validityPeriod: 12
    },
    schema: [
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '申请额度',
        placeholder: '1-50万',
        rules: {
          required: true,
          between: {
            min: 1,
            max: 50
          }
        },
        unit: '万元',
        customComponentCss: 'col-md-4'
      },
      {
        fieldType: 'MyInput',
        model: 'validityPeriod',
        label: '额度有效期',
        unit: '个月',
        disabled: true,
        customInputCss: 'read-input-text',
        hasBorder: false
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '企业名称',
        placeholder: '企业名称',
        rules: {
          required: true,
          between: {
            min: 1,
            max: 50
          }
        },
        customComponentCss: 'clear-float'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '统一社会信用代码',
        placeholder: '统一社会信用代码',
        rules: {
          required: true
        }
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '企业实际经营地址',
        placeholder: '省/市/区',
        rules: {
          required: true
        },
        customComponentCss: 'clear-float'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '详细地址',
        placeholder: '如道路、门牌号等',
        rules: {
          required: true
        },
        customComponentCss: 'clear-float'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '企业账户开户行',
        placeholder: '企业账户开户银行',
        rules: {
          required: true
        },
        customComponentCss: 'clear-float'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '企业账户号',
        placeholder: '请输入企业账户号码',
        rules: {
          required: true
        }
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '账户登录名',
        placeholder: '征信账户登录名(选填）',
        customComponentCss: 'clear-float'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '账户密码',
        placeholder: '征信账户密码(选填)'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '账户身份验证码',
        placeholder: '账户身份验证码(选填）'
      }
    ]
  },
  corporateInfo: {
    nextJumpUrl: '',
    preJumpUrl: '',
    formData: {
      email: null,
      phone: null,
      smsCode: null
    },
    schema: [
      {
        fieldType: 'MyLabel',
        labelText: 'slw显示'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: 'slw电子邮箱',
        placeholder: '请输入电子邮箱',
        rules: {
          required: true
        },
        slot: 'sdsdsd'
      },
      {
        fieldType: 'MyInput',
        model: 'phone',
        label: 'ysw手机号',
        placeholder: '请输入手机号',
        rules: {
          required: true,
          phone: true
        }
      },
      {
        fieldType: 'SmsCode',
        model: 'smsCode',
        label: 'slw短信验证码',
        placeholder: '请输入短信验证码',
        mobile: '',
        rules: {
          required: true
        }
      }
    ]
  },
  materialInfo: {
    nextJumpUrl: '',
    preJumpUrl: '',
    formData: {
      email: null,
      phone: null,
      smsCode: null
    },
    schema: [
      {
        fieldType: 'MyLabel',
        labelText: 'slw企业信息显示'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '电子邮箱',
        placeholder: '请输入电子邮箱',
        rules: {
          required: true
        },
        slot: 'sdsdsd'
      },
      {
        fieldType: 'MyInput',
        model: 'phone',
        label: '手机号',
        placeholder: '请输入手机号',
        rules: {
          required: true,
          phone: true
        }
      },
      {
        fieldType: 'SmsCode',
        model: 'smsCode',
        label: '短信验证码',
        placeholder: '请输入短信验证码',
        mobile: '',
        rules: {
          required: true
        }
      }
    ]
  }
}

export default applyInfo
