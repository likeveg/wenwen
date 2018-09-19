const baseUrl = ''
const config = {
  locale: 'zh-CN', // en-US, zh-CN
  url: baseUrl,
  ajaxUploadUrl: `${baseUrl}/admin/api/upload`,
  debug: {
    mock: true, // enable mock
    http: false // http request log
  },
  api: `${baseUrl}`
}

global.config = config

export default config
