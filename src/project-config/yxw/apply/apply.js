const applyInfo = {
  pagenavigateInfo: ['申请企业信息', '法定代表人信息', '材料上传', '提交成功'],
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
        unit: '万元'
      },
      {
        fieldType: 'MyInput',
        model: 'validityPeriod',
        label: '额度有效期',
        unit: '个月'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: '企业名称',
        placeholder: '1-50万',
        rules: {
          required: true,
          between: {
            min: 1,
            max: 50
          }
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
      },
      {
        fieldType: 'IdCalendar',
        model: 'legalPersonIdPeriod',
        label: '身份证有效期',
        placeholder: '请设置有效期限',
        mobile: '',
        rules: {
          required: true
        }
      },
      {
        fieldType: 'SelectSearch',
        label: '居住状况',
        placeholder: '居住状况',
        list: [
          {label: '自有房产', value: '01'},
          {label: '租赁', value: '02'},
          {label: '与亲戚同住', value: '03'},
          {label: '公司宿舍', value: '04'},
          {label: '其他', value: '05'},
          {label: '共有住宅', value: '06'},
          {label: '按揭', value: '07'}
        ],
        model: 'legalLiveProp',
        rules: {
          required: true
        }
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
        labelText: 'yxw显示'
      },
      {
        fieldType: 'MyInput',
        model: 'email',
        label: 'ysw电子邮箱',
        placeholder: '请输入电子邮箱',
        rules: {
          required: true
        }
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
        label: 'yxw短信验证码',
        placeholder: '请输入短信验证码',
        mobile: '',
        rules: {
          required: true
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
      },
      {
        fieldType: 'IdCalendar',
        model: 'legalPersonIdPeriod',
        label: '身份证有效期',
        placeholder: '请设置有效期限',
        mobile: '',
        rules: {
          required: true
        }
      },
      {
        fieldType: 'SelectSearch',
        label: '居住状况',
        placeholder: '居住状况',
        list: [
          {label: '自有房产', value: '01'},
          {label: '租赁', value: '02'},
          {label: '与亲戚同住', value: '03'},
          {label: '公司宿舍', value: '04'},
          {label: '其他', value: '05'},
          {label: '共有住宅', value: '06'},
          {label: '按揭', value: '07'}
        ],
        model: 'legalLiveProp',
        rules: {
          required: true
        }
      }
    ]
  }
}

export default applyInfo
