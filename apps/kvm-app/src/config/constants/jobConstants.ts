const CareerApply = {
  plainText: {
    back: '<',
    allPosition: '所有职位',
    responsibility: '岗位职责',
    requirement: '任职资格',
    fullName: '姓名',
    phone: '联系方式',
    email: '邮箱地址',
    resume: '简历',
    productLink: '链接到作品集或其他网站',
    otherLink: '其它链接',
    applicationLetter: '求职信',
    attachment: '额外的附件',
    source: '您从何处得知这个职位',
    gender: '性别',
    sendApplication: '发送申请',
    pushCode: '内推码',

    genderIdentityInfo:
      'This information is optional. We are gathering gender information for statistical data to improve our diversity outreach initiatives.',
    recruitInfo:
      'We at Supercell collect your application data to manage and plan our \n recruitment activities globally. In the unhappy event that you don’t \n get selected, we will store your details for future opportunities. \nIf you do not wish to be contacted in the future, please let us know.',
    selectOption: 'Select an option',
  },
  sourceValues: [
    'IndustryEvent',
    'Artstation',
    'Instagram',
    'Facebook',
    'Twitter',
    'Glassdoor',
    'LinkedIn',
  ],
  genderValues: [
    { value: 0, text: 'I choose not to identify as either' },
    { value: 1, text: 'Man' },
    { value: 2, text: 'Women' },
  ],
};

const CareerList = {
  plainText: {
    openPosition: '在招职位',
    function: '职能',
    art: '美术',
    development: '技术',
    design: '策划',
    administration: '职能',
    operations: '运营',
    marketing: '市场',
    title: '职位',
    location: '工作地点',
    position: '职位性质',
    apply: '申请',
    noDataTips: '抱歉，该类职位暂时没有空缺',
  },
};
export { CareerApply, CareerList };
