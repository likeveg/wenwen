const globalVar = {
  commonApis: {
    baseUrl: '/soa-system-authority/',
    service: {
      login: {
        url: '/system/login',
        method: 'post'
      },
      query: {
        url: '/sales/sauserdetail',
        method: 'post'
      },
      income: {
        url: '/wechat/gross',
        method: 'post'
      },
      users: {
        url: '/wechat/consumer',
        method: 'post'
      },
      qcode: {
        url: '/wechat/ticket',
        method: 'post'
      },
      lastSeveralGross: {
        url: '/wechat/lastSeveralGross',
        method: 'post'
      },
      lastSeveralConsumer: {
        url: '/wechat/lastSeveralConsumer',
        method: 'post'
      },
      monthGrossDetail: {
        url: '/wechat/monthGrossDetail', // 用户充值详情
        method: 'post'
      },
      monthConsumerDetail: {
        url: '/wechat/monthConsumerDetail', // 用户注册详情
        method: 'post'
      },
      getMonthGross: {
        url: '/wechat/getMonthGross', // 获取某个月的提成
        method: 'post'
      },
      add: {
        url: '/salesApply/add', // 分销人员申请
        method: 'post'
      },
      applyList: {
        url: '/salesApply/list', // 申请列表
        method: 'post'
      },
      auditList: {
        url: '/salesAudit/list', // 审核列表
        method: 'post'
      },
      detail: {
        url: '/salesAudit/detail', // 审核明细信息
        method: 'post'
      },
      update: {
        url: '/salesAudit/update', // 审核
        method: 'post'
      }
    }
  }
}
export default globalVar
