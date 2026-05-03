// ═══════════════════════════════════════════════
// 多国签证申请表填写工具 - 主程序
// ═══════════════════════════════════════════════

// ── 区域分类 ──
const REGIONS = [
  { id: 'all', label: '🌍 全部' },
  { id: 'europe', label: '🇪🇺 欧洲' },
  { id: 'asia', label: '🌏 亚洲' },
  { id: 'americas', label: '🌎 美洲' },
  { id: 'oceania', label: '🏝️ 大洋洲' }
];

const COUNTRY_REGION = {
  spain:'europe', italy:'europe', greece:'europe', sweden:'europe',
  iceland:'europe', austria:'europe', france:'europe', germany:'europe',
  uk:'europe',
  korea:'asia', japan:'asia', thailand:'asia', singapore:'asia',
  usa:'americas',
  australia:'oceania', newzealand:'oceania'
};

const SCHENGEN_COUNTRIES = ['spain','italy','greece','sweden','iceland','austria'];

// ── 国家数据 ──
const VISA_COUNTRIES = [
  { id:'spain', flag:'🇪🇸', name:'西班牙', embassy:'Embajada de España', status:'ready', note:'已内置官方申请表' },
  { id:'italy', flag:'🇮🇹', name:'意大利', embassy:'Ambasciata d\'Italia', status:'ready', note:'已内置官方申请表' },
  { id:'greece', flag:'🇬🇷', name:'希腊', embassy:'Ελληνική Πρεσβεία', status:'ready', note:'已内置官方申请表' },
  { id:'sweden', flag:'🇸🇪', name:'瑞典', embassy:'Svenska Ambassaden', status:'ready', note:'已内置官方申请表' },
  { id:'iceland', flag:'🇮🇸', name:'冰岛', embassy:'Íslenski sendiráðinn', status:'ready', note:'已内置官方申请表' },
  { id:'austria', flag:'🇦🇹', name:'奥地利', embassy:'Österreichische Botschaft', status:'ready', note:'已内置官方申请表' },
  { id:'france', flag:'🇫🇷', name:'法国', embassy:'Ambassade de France', status:'link', link:'https://france-visas.gouv.fr', note:'法国签证通过官方网站在线申请' },
  { id:'germany', flag:'🇩🇪', name:'德国', embassy:'Deutsche Botschaft', status:'link', link:'https://videx.diplo.de', note:'德国签证通过VIDEX系统在线申请' },
  { id:'uk', flag:'🇬🇧', name:'英国', embassy:'British Embassy', status:'link', link:'https://www.gov.uk/standard-visitor', note:'英国签证通过GOV.UK官网在线申请' },
  { id:'korea', flag:'🇰🇷', name:'韩国', embassy:'주중국 대한민국 대사관', status:'link', link:'https://overseas.mofa.go.kr/cn-ko/', note:'韩国签证通过大使馆/领事馆申请' },
  { id:'japan', flag:'🇯🇵', name:'日本', embassy:'在中国日本国大使館', status:'link', link:'https://www.cn.emb-japan.go.jp/', note:'日本签证需通过指定代办机构申请' },
  { id:'usa', flag:'🇺🇸', name:'美国', embassy:'U.S. Embassy', status:'link', link:'https://ceac.state.gov/genniv/', note:'美国签证通过DS-160系统在线申请' },
  { id:'australia', flag:'🇦🇺', name:'澳大利亚', embassy:'Australian Embassy', status:'link', link:'https://online.immi.gov.au/', note:'澳大利亚签证通过ImmiAccount在线申请' },
  { id:'newzealand', flag:'🇳🇿', name:'新西兰', embassy:'New Zealand Embassy', status:'link', link:'https://www.immigration.govt.nz/', note:'新西兰签证通过移民局官网在线申请' },
  { id:'thailand', flag:'🇹🇭', name:'泰国', embassy:'Royal Thai Embassy', status:'link', link:'https://www.thaiembbeij.org/', note:'中国公民可落地签或提前办理旅游签' },
  { id:'singapore', flag:'🇸🇬', name:'新加坡', embassy:'Embassy of Singapore', status:'link', link:'https://www.ica.gov.sg/', note:'新加坡签证通过指定代办机构申请' }
];

// ── 签证类型数据 ──
const VISA_TYPES_DATA = {
  'usa': [
    {id:'b1b2',name:'B1/B2旅游商务签证',stay:'6个月',fee:'约1350元',time:'面签后3-5天'},
    {id:'f1',name:'F1学生签证',stay:'根据I-20',fee:'约1350元',time:'面签后3-5天'}
  ],
  'australia': [
    {id:'tourism',name:'600类旅游签证',stay:'90天',fee:'约900元',time:'15-30天'},
    {id:'student',name:'500类学生签证',stay:'根据CoE',fee:'约3400元',time:'1-3个月'}
  ],
  'japan': [
    {id:'tourism',name:'单次旅游签证',stay:'15-30天',fee:'约300元',time:'5-10天'},
    {id:'tourism3',name:'三年多次',stay:'每次30天',fee:'约400元',time:'5-10天'},
    {id:'tourism5',name:'五年多次',stay:'每次90天',fee:'约500元',time:'5-10天'}
  ],
  'korea': [
    {id:'tourism',name:'单次旅游签证',stay:'90天',fee:'约400元',time:'5-7天'},
    {id:'tourism5',name:'五年多次',stay:'每次90天',fee:'约800元',time:'5-7天'}
  ],
  'uk': [
    {id:'tourism6',name:'Standard Visitor(6个月)',stay:'180天',fee:'约900元',time:'15-20天'},
    {id:'tourism2',name:'Standard Visitor(2年)',stay:'每次180天',fee:'约3400元',time:'15-20天'}
  ],
  'thailand': [
    {id:'tourism',name:'贴纸签',stay:'60天',fee:'约230元',time:'3-5天'},
    {id:'arrival',name:'落地签',stay:'15天',fee:'约400元',time:'即时'}
  ],
  'singapore': [{id:'tourism',name:'旅游签证',stay:'30天',fee:'约300元',time:'3-5天'}],
  'newzealand': [{id:'tourism',name:'访客签证',stay:'90天',fee:'约900元',time:'20-25天'}],
  'spain': [{id:'schengen',name:'申根旅游签证',stay:'90天',fee:'约600元',time:'5-15天'}],
  'italy': [{id:'schengen',name:'申根旅游签证',stay:'90天',fee:'约600元',time:'5-15天'}],
  'greece': [{id:'schengen',name:'申根旅游签证',stay:'90天',fee:'约600元',time:'5-15天'}],
  'sweden': [{id:'schengen',name:'申根旅游签证',stay:'90天',fee:'约600元',time:'5-15天'}],
  'iceland': [{id:'schengen',name:'申根旅游签证',stay:'90天',fee:'约600元',time:'5-15天'}],
  'austria': [{id:'schengen',name:'申根旅游签证',stay:'90天',fee:'约600元',time:'5-15天'}],
  'france': [{id:'schengen',name:'申根旅游签证',stay:'90天',fee:'约600元',time:'5-15天'}],
  'germany': [{id:'schengen',name:'申根旅游签证',stay:'90天',fee:'约600元',time:'5-15天'}]
};

// ── 签证类型特定数据 ──
const VISA_TYPE_DETAILS = {
  'usa': {
    'b1b2': {
      docs: [{name:'DS-160确认页',desc:'打印带条形码的确认页',required:true},{name:'预约确认函',desc:'打印预约确认',required:true},{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'5.1cm×5.1cm照片',desc:'白底，近6个月内拍摄',required:true},{name:'在职证明',desc:'英文，写明职位、薪资',required:true},{name:'银行流水',desc:'近6个月',required:true},{name:'行程单',desc:'英文，详细行程',required:true}],
      costs: [{name:'签证费',price:1350},{name:'照片',price:50},{name:'快递费',price:50}],
      rate: 65, rateLabel: '中等', rateLevel: 'mid',
      tips: ['面签是关键，要自信、简洁','DS-160填写要准确','准备充分的国内约束力证明'],
      pitfalls: ['DS-160填写错误','面签时紧张、回答含糊','无法证明国内约束力']
    },
    'f1': {
      docs: [{name:'DS-160确认页',desc:'打印',required:true},{name:'I-20表格',desc:'学校签发',required:true},{name:'SEVIS缴费收据',desc:'$350',required:true},{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'5.1cm×5.1cm照片',desc:'白底',required:true},{name:'录取通知书',desc:'美国学校',required:true},{name:'资金证明',desc:'覆盖学费+生活费',required:true},{name:'语言成绩',desc:'TOEFL/IELTS',required:true}],
      costs: [{name:'签证费',price:1350},{name:'SEVIS费',price:2550},{name:'照片',price:50}],
      rate: 72, rateLabel: '中等偏高', rateLevel: 'mid',
      tips: ['学生签证相对容易获批','要清楚说明学习计划','资金证明要充足'],
      pitfalls: ['无法说明学习目的','资金证明不足','有移民倾向']
    }
  },
  'australia': {
    'tourism': {
      docs: [{name:'护照扫描件',desc:'有效期6个月以上',required:true},{name:'在职证明（英文）',desc:'写明职位、薪资',required:true},{name:'银行流水（英文）',desc:'近6个月，余额10万以上',required:true},{name:'行程单（英文）',desc:'详细行程',required:true},{name:'酒店预订单',desc:'英文',required:true},{name:'54表格',desc:'家庭成员表',required:true}],
      costs: [{name:'签证费',price:900},{name:'材料翻译',price:400},{name:'照片',price:30}],
      rate: 75, rateLabel: '中等偏高', rateLevel: 'mid',
      tips: ['澳大利亚签证是电子签证','材料需翻译成英文','提前1-2个月申请'],
      pitfalls: ['材料未翻译成英文','银行流水余额不足','54表格填写不完整']
    },
    'student': {
      docs: [{name:'护照扫描件',desc:'有效期6个月以上',required:true},{name:'CoE',desc:'学校注册确认',required:true},{name:'OSHC保险',desc:'海外学生健康保险',required:true},{name:'资金证明',desc:'覆盖学费+生活费',required:true},{name:'语言成绩',desc:'IELTS/TOEFL',required:true},{name:'GTE声明',desc:'真实临时入境声明',required:true},{name:'体检报告',desc:'指定医院',required:true}],
      costs: [{name:'签证费',price:3400},{name:'OSHC保险',price:3000},{name:'体检费',price:800}],
      rate: 70, rateLabel: '中等', rateLevel: 'mid',
      tips: ['GTE声明是关键','资金证明要充足','提前3-6个月申请'],
      pitfalls: ['GTE声明不过关','资金证明不足','体检不合格']
    }
  },
  'korea': {
    'tourism': {
      docs: [{name:'护照原件',desc:'有效期6个月以上，至少2页空白',required:true},{name:'签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'身份证复印件',desc:'正反面',required:true},{name:'户口本复印件',desc:'整本复印',required:true},{name:'在职证明',desc:'写明职位、薪资',required:true},{name:'银行流水',desc:'近6个月，余额5万以上',required:true},{name:'行程单',desc:'详细行程',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'机票预订单',desc:'往返机票',required:true}],
      costs: [{name:'签证费',price:400},{name:'代办服务费',price:200},{name:'照片',price:30}],
      rate: 80, rateLabel: '较高', rateLevel: 'high',
      tips: ['首次建议申请单次签','银行流水要体现稳定收入','通过指定旅行社代办'],
      pitfalls: ['材料不齐全','银行流水不足','在职证明信息不符']
    },
    'tourism5': {
      docs: [{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'身份证复印件',desc:'正反面',required:true},{name:'在职证明',desc:'写明职位、薪资',required:true},{name:'银行流水',desc:'近6个月，余额10万以上',required:true},{name:'韩国出入境记录',desc:'曾访问韩国4次以上，或OECD国家签证',required:true}],
      costs: [{name:'签证费',price:800},{name:'代办服务费',price:200},{name:'照片',price:30}],
      rate: 70, rateLabel: '中等', rateLevel: 'mid',
      tips: ['需要有良好的出入境记录','或持有OECD国家有效签证','年收入建议20万以上'],
      pitfalls: ['出入境记录不足','有非法滞留记录']
    }
  },
  'japan': {
    'tourism': {
      docs: [{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'4.5cm×4.5cm',required:true},{name:'身份证复印件',desc:'正反面',required:true},{name:'在职证明',desc:'写明收入',required:true},{name:'银行流水',desc:'近6个月，年收入10万以上',required:true},{name:'行程单',desc:'每日行程安排',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'机票预订单',desc:'往返机票',required:true}],
      costs: [{name:'签证费',price:300},{name:'代办服务费',price:200},{name:'照片',price:30}],
      rate: 78, rateLabel: '中等偏高', rateLevel: 'mid',
      tips: ['年收入建议10万以上','有发达国家出境记录更容易获批','照片尺寸是4.5×4.5cm'],
      pitfalls: ['通过非指定代办机构递交会被拒','材料造假会被永久拒签','照片尺寸错误']
    },
    'tourism3': {
      docs: [{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'4.5cm×4.5cm',required:true},{name:'在职证明',desc:'写明收入',required:true},{name:'银行流水',desc:'近6个月，年收入20万以上',required:true},{name:'首次入境行程',desc:'首次需在冲绳或东北三县住宿',required:true}],
      costs: [{name:'签证费',price:400},{name:'代办服务费',price:200},{name:'照片',price:30}],
      rate: 70, rateLabel: '中等', rateLevel: 'mid',
      tips: ['首次必须在冲绳或东北三县住宿一晚','年收入要求20万以上'],
      pitfalls: ['首次未在指定地区住宿','年收入不达标']
    },
    'tourism5': {
      docs: [{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'4.5cm×4.5cm',required:true},{name:'在职证明',desc:'写明收入',required:true},{name:'银行流水',desc:'近6个月，年收入50万以上',required:true},{name:'个人所得税完税证明',desc:'年纳税10万以上',required:true}],
      costs: [{name:'签证费',price:500},{name:'代办服务费',price:200},{name:'照片',price:30}],
      rate: 65, rateLabel: '中等', rateLevel: 'mid',
      tips: ['年收入要求50万以上，或年纳税10万以上','这是最高级别的旅游签证'],
      pitfalls: ['收入或纳税不达标','材料造假会被永久拒签']
    }
  },
  'uk': {
    'tourism6': {
      docs: [{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'在线申请表',desc:'GOV.UK填写后打印',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'在职证明（英文）',desc:'写明职位、薪资',required:true},{name:'银行流水（英文）',desc:'近6个月，余额10万以上',required:true},{name:'行程单（英文）',desc:'详细行程',required:true},{name:'酒店预订单',desc:'英文',required:true},{name:'机票预订单',desc:'英文',required:true}],
      costs: [{name:'签证费',price:900},{name:'材料翻译',price:400},{name:'照片',price:30}],
      rate: 70, rateLabel: '中等', rateLevel: 'mid',
      tips: ['所有材料必须翻译成英文','建议提前1-2个月申请','有申根/美国签证记录会加分'],
      pitfalls: ['材料未翻译成英文','银行流水余额不足','行程单与酒店/机票不匹配']
    },
    'tourism2': {
      docs: [{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'在线申请表',desc:'GOV.UK填写后打印',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'在职证明（英文）',desc:'写明职位、薪资',required:true},{name:'银行流水（英文）',desc:'近6个月，余额15万以上',required:true},{name:'行程单（英文）',desc:'详细行程',required:true}],
      costs: [{name:'签证费',price:3400},{name:'材料翻译',price:400},{name:'照片',price:30}],
      rate: 65, rateLabel: '中等', rateLevel: 'mid',
      tips: ['性价比最高的多次签证','有良好出入境记录更容易获批','首次建议申请6个月'],
      pitfalls: ['首次申请直接申请2年可能被拒','材料不充分']
    }
  },
  'thailand': {
    'tourism': {
      docs: [{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'银行流水',desc:'近1个月，余额1万以上',required:true}],
      costs: [{name:'签证费',price:230},{name:'照片',price:30}],
      rate: 95, rateLabel: '很高', rateLevel: 'high',
      tips: ['泰国签证最容易','建议提前办贴纸签','落地签排队时间长'],
      pitfalls: ['护照有效期不足6个月','照片不符合规格']
    },
    'arrival': {
      docs: [{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'落地签申请表',desc:'机场填写',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'回程机票',desc:'15天内',required:true},{name:'现金',desc:'个人1万泰铢/家庭2万泰铢',required:true}],
      costs: [{name:'落地签费',price:400},{name:'照片',price:30}],
      rate: 90, rateLabel: '很高', rateLevel: 'high',
      tips: ['排队时间长，建议提前办贴纸签','必须携带现金','只有15天停留期'],
      pitfalls: ['现金不足被遣返','超期停留被罚款']
    }
  },
  'newzealand': {
    'tourism': {
      docs: [{name:'护照扫描件',desc:'有效期6个月以上',required:true},{name:'在职证明（英文）',desc:'写明职位、薪资',required:true},{name:'银行流水（英文）',desc:'近6个月，余额8万以上',required:true},{name:'行程单（英文）',desc:'详细行程',required:true},{name:'酒店预订单',desc:'英文',required:true},{name:'机票预订单',desc:'英文',required:true}],
      costs: [{name:'签证费',price:900},{name:'材料翻译',price:400},{name:'照片',price:30}],
      rate: 80, rateLabel: '较高', rateLevel: 'high',
      tips: ['新西兰签证是电子签证','与澳大利亚签证可同时申请','有澳洲签证记录会加分'],
      pitfalls: ['材料未翻译成英文','银行流水余额不足']
    }
  },
  'singapore': {
    'tourism': {
      docs: [{name:'护照原件',desc:'有效期6个月以上',required:true},{name:'签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'在职证明',desc:'写明职位、薪资',required:true},{name:'银行流水',desc:'近3个月',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true}],
      costs: [{name:'签证费',price:300},{name:'代办服务费',price:150},{name:'照片',price:30}],
      rate: 85, rateLabel: '较高', rateLevel: 'high',
      tips: ['新加坡签证是电子签证','有发达国家出境记录更容易获批','过境可申请96小时免签'],
      pitfalls: ['材料不齐全','银行流水余额不足']
    }
  }
};

// 申根国家各自数据
const SCHENGEN_DATA = {
  spain: {
    docs: [{name:'护照原件',desc:'有效期6个月以上，至少2页空白',required:true},{name:'申根签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'行程单',desc:'详细行程',required:true},{name:'在职证明',desc:'英文或西班牙文',required:true},{name:'银行流水',desc:'近3个月',required:true},{name:'申根保险',desc:'保额3万欧元以上',required:true}],
    costs: [{name:'签证费',price:600},{name:'申根保险',price:300},{name:'照片',price:30},{name:'材料翻译',price:300}],
    rate: 85, rateLabel: '较高', rateLevel: 'high',
    tips: ['西班牙申根签证通过率较高','建议提前1个月申请','本站可生成填写好的PDF申请表'],
    pitfalls: ['材料未翻译','申根保险不符合要求','行程单与酒店/机票不匹配']
  },
  italy: {
    docs: [{name:'护照原件',desc:'有效期6个月以上，至少2页空白',required:true},{name:'申根签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'行程单',desc:'详细行程',required:true},{name:'在职证明',desc:'英文或意大利文',required:true},{name:'银行流水',desc:'近3个月',required:true},{name:'申根保险',desc:'保额3万欧元以上',required:true},{name:'户口本复印件',desc:'整本复印',required:true}],
    costs: [{name:'签证费',price:600},{name:'申根保险',price:300},{name:'照片',price:30},{name:'材料翻译',price:300},{name:'户口本翻译',price:100}],
    rate: 82, rateLabel: '较高', rateLevel: 'high',
    tips: ['意大利需要户口本复印件','有申根记录更容易获批','本站可生成填写好的PDF申请表'],
    pitfalls: ['户口本未翻译','银行流水不足','行程单不详细']
  },
  greece: {
    docs: [{name:'护照原件',desc:'有效期6个月以上，至少2页空白',required:true},{name:'申根签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'行程单',desc:'详细行程',required:true},{name:'在职证明',desc:'英文',required:true},{name:'银行流水',desc:'近3个月',required:true},{name:'申根保险',desc:'保额3万欧元以上',required:true}],
    costs: [{name:'签证费',price:600},{name:'申根保险',price:300},{name:'照片',price:30},{name:'材料翻译',price:300}],
    rate: 88, rateLabel: '很高', rateLevel: 'high',
    tips: ['希腊签证通过率很高','夏季是旅游旺季','本站可生成填写好的PDF申请表'],
    pitfalls: ['材料未翻译','申根保险不符合要求']
  },
  sweden: {
    docs: [{name:'护照原件',desc:'有效期6个月以上，至少2页空白',required:true},{name:'申根签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'行程单',desc:'详细行程',required:true},{name:'在职证明',desc:'英文或瑞典文',required:true},{name:'银行流水',desc:'近3个月',required:true},{name:'申根保险',desc:'保额3万欧元以上',required:true},{name:'邀请函',desc:'如探亲访友需提供',required:false}],
    costs: [{name:'签证费',price:600},{name:'申根保险',price:300},{name:'照片',price:30},{name:'材料翻译',price:300}],
    rate: 80, rateLabel: '较高', rateLevel: 'high',
    tips: ['瑞典签证审核相对严格','建议提供详细行程','本站可生成填写好的PDF申请表'],
    pitfalls: ['行程单不够详细','银行流水不足','申根保险不符合要求']
  },
  iceland: {
    docs: [{name:'护照原件',desc:'有效期6个月以上，至少2页空白',required:true},{name:'申根签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'行程单',desc:'详细行程',required:true},{name:'在职证明',desc:'英文',required:true},{name:'银行流水',desc:'近3个月',required:true},{name:'申根保险',desc:'保额3万欧元以上',required:true}],
    costs: [{name:'签证费',price:600},{name:'申根保险',price:300},{name:'照片',price:30},{name:'材料翻译',price:300}],
    rate: 85, rateLabel: '较高', rateLevel: 'high',
    tips: ['冰岛是热门旅游目的地','夏季6-8月最佳','本站可生成填写好的PDF申请表'],
    pitfalls: ['材料未翻译','申根保险不符合要求']
  },
  austria: {
    docs: [{name:'护照原件',desc:'有效期6个月以上，至少2页空白',required:true},{name:'申根签证申请表',desc:'本站可生成PDF',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'行程单',desc:'详细行程',required:true},{name:'在职证明',desc:'英文或德文',required:true},{name:'银行流水',desc:'近3个月',required:true},{name:'申根保险',desc:'保额3万欧元以上',required:true}],
    costs: [{name:'签证费',price:600},{name:'申根保险',price:300},{name:'照片',price:30},{name:'材料翻译',price:300}],
    rate: 83, rateLabel: '较高', rateLevel: 'high',
    tips: ['奥地利是音乐之都维也纳所在地','建议与德国、捷克联游','本站可生成填写好的PDF申请表'],
    pitfalls: ['材料未翻译','申根保险不符合要求']
  },
  france: {
    docs: [{name:'护照原件',desc:'有效期6个月以上，至少2页空白',required:true},{name:'申根签证申请表',desc:'在线填写后打印',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'行程单',desc:'详细行程',required:true},{name:'在职证明',desc:'英文或法文',required:true},{name:'银行流水',desc:'近3个月',required:true},{name:'申根保险',desc:'保额3万欧元以上',required:true}],
    costs: [{name:'签证费',price:600},{name:'申根保险',price:300},{name:'照片',price:30},{name:'材料翻译',price:300}],
    rate: 82, rateLabel: '较高', rateLevel: 'high',
    tips: ['法国申根签证通过率较高','建议提前1个月申请','有申根记录更容易获批'],
    pitfalls: ['材料未翻译','申根保险不符合要求','行程单不详细']
  },
  germany: {
    docs: [{name:'护照原件',desc:'有效期6个月以上，至少2页空白',required:true},{name:'VIDEX申请表',desc:'在线填写后打印',required:true},{name:'2寸白底照片',desc:'3.5cm×4.5cm',required:true},{name:'机票预订单',desc:'往返机票',required:true},{name:'酒店预订单',desc:'覆盖全部住宿',required:true},{name:'行程单',desc:'详细行程',required:true},{name:'在职证明',desc:'英文或德文',required:true},{name:'银行流水',desc:'近3个月',required:true},{name:'申根保险',desc:'保额3万欧元以上',required:true}],
    costs: [{name:'签证费',price:600},{name:'申根保险',price:300},{name:'照片',price:30},{name:'材料翻译',price:300}],
    rate: 80, rateLabel: '较高', rateLevel: 'high',
    tips: ['德国签证审核较严格','材料要非常齐全','建议提前1个月申请'],
    pitfalls: ['材料未翻译','申根保险不符合要求','材料不齐全']
  }
};

// ── 申请步骤数据 ──
const STEPS_DATA = {
  'korea': [
    {title:'确定签证类型',content:'根据出行目的选择合适的签证类型。个人旅游需通过指定旅行社代办。'},
    {title:'准备材料',content:'根据所选签证类型准备相应材料，注意银行流水、在职证明等要求。'},
    {title:'选择代办机构',content:'韩国签证必须通过指定旅行社代办（如携程、中青旅等）。'},
    {title:'递交申请',content:'将材料交给代办机构，支付签证费和服务费。'},
    {title:'等待审核',content:'一般5-7个工作日出签。加急可缩短至3-4个工作日。'},
    {title:'领取签证',content:'出签后从代办机构领取护照，检查签证信息。'}
  ],
  'japan': [
    {title:'确定签证类型',content:'单次/三年多次/五年多次，根据收入和出入境记录选择。'},
    {title:'选择代办机构',content:'日本签证必须通过指定旅行社代办。'},
    {title:'准备材料',content:'基础材料+经济能力证明。三年/五年多次对收入有明确要求。'},
    {title:'递交申请',content:'材料交给代办机构，支付签证费+服务费。'},
    {title:'等待审核',content:'一般5-10个工作日。旺季可能更长。'},
    {title:'领取签证',content:'出签后领取护照，核对信息。'}
  ],
  'uk': [
    {title:'在线填写申请',content:'访问GOV.UK官网，创建账号，在线填写申请表（全英文）。'},
    {title:'支付签证费',content:'在线支付签证费，支持信用卡/借记卡。'},
    {title:'预约录指纹',content:'预约前往签证中心录指纹和拍照。'},
    {title:'准备材料',content:'所有材料需翻译成英文。准备齐全后按预约时间前往签证中心。'},
    {title:'前往签证中心',content:'带齐材料，按时到达。录指纹、拍照、递交材料。'},
    {title:'等待审核',content:'一般15-20个工作日。可选择加急服务。'},
    {title:'领取护照',content:'审核完成后，前往签证中心领取或选择快递寄送。'}
  ],
  'usa': [
    {title:'在线填写DS-160',content:'访问ceac.state.gov，填写DS-160表格（全英文）。上传照片，打印确认页。'},
    {title:'支付签证费',content:'在线支付$185签证费，保留收据编号。'},
    {title:'预约面签',content:'登录ustraveldocs.com，预约面签时间。'},
    {title:'准备材料',content:'DS-160确认页、预约确认函、护照、照片、支持性文件。'},
    {title:'前往使馆面签',content:'按时到达，排队安检、录指纹、面签。面签通常2-5分钟。'},
    {title:'等待结果',content:'面签当场告知结果。通过则留下护照，拒签则当场退还护照。'},
    {title:'领取护照',content:'通过后3-5个工作日，前往指定地点领取或快递。'}
  ],
  'australia': [
    {title:'创建ImmiAccount',content:'访问immi.gov.au，注册ImmiAccount。'},
    {title:'在线填写申请',content:'选择对应签证类型，在线填写申请表（全英文）。'},
    {title:'上传材料',content:'将所有材料扫描上传，需翻译成英文。'},
    {title:'支付签证费',content:'在线支付签证费。'},
    {title:'等待审核',content:'一般15-30个工作日。可能需要体检或补充材料。'},
    {title:'获得签证',content:'签证批准后会收到邮件通知，签证信息关联护照号码。'}
  ],
  'newzealand': [
    {title:'在线注册',content:'访问immigration.govt.nz，创建RealMe账号。'},
    {title:'在线填写申请',content:'选择对应签证类型，在线填写申请表。'},
    {title:'上传材料',content:'扫描上传所有材料，需翻译成英文。'},
    {title:'支付签证费',content:'在线支付签证费。'},
    {title:'等待审核',content:'一般20-25个工作日。可能需要补充材料。'},
    {title:'获得签证',content:'签证批准后，电子签证关联护照号码。'}
  ],
  'thailand': [
    {title:'选择签证方式',content:'贴纸签（提前办理，60天）或落地签（到达泰国办理，15天）。'},
    {title:'准备材料',content:'贴纸签：护照、照片、申请表、机票、酒店、银行流水。落地签：护照、照片、回程机票、酒店、现金。'},
    {title:'递交申请',content:'贴纸签：前往泰国使馆/领事馆或通过代办机构递交。落地签：到达泰国机场办理。'},
    {title:'等待审核',content:'贴纸签3-5个工作日。落地签即时。'},
    {title:'领取签证',content:'贴纸签出签后领取护照。落地签当场办理。'}
  ],
  'singapore': [
    {title:'选择代办机构',content:'新加坡签证必须通过指定旅行社代办。'},
    {title:'准备材料',content:'护照、照片、身份证、在职证明、银行流水、行程单等。'},
    {title:'递交申请',content:'将材料交给代办机构，支付签证费和服务费。'},
    {title:'等待审核',content:'一般3-5个工作日。'},
    {title:'领取签证',content:'出签后从代办机构领取电子签证。'}
  ]
};

// ── 术语解释 ──
const TERMS = {
  '申根签证': '申根签证是欧洲26个申根国家通用的签证，持有一个国家的申根签证可以在有效期内访问所有申根国家。',
  '申根保险': '去欧洲申根国家必须购买的旅行医疗保险，保额至少3万欧元（约24万人民币）。',
  '银行流水': '去银行打印的银行卡进出账记录，一般需要近3-6个月的。',
  '在职证明': '你所在公司开具的证明文件，写明你的职位、入职时间、月薪等。',
  '面签': '去美国大使馆/领事馆和签证官面对面谈话，一般2-5分钟。',
  'DS-160': '美国签证在线申请表，全英文填写。',
  '领区': '各使馆/领事馆分管的区域，你必须去自己所属领区申请。'
};

// ═══════════════════════════════════════════════
// 全局变量
// ═══════════════════════════════════════════════
let currentRegion = 'all';
let selectedCountry = '';

// ═══════════════════════════════════════════════
// 首页功能
// ═══════════════════════════════════════════════

function renderLanding(region) {
  currentRegion = region || 'all';
  
  // 渲染区域标签
  const tabsEl = document.getElementById('region-tabs');
  tabsEl.innerHTML = REGIONS.map(r =>
    `<div class="region-tab ${currentRegion===r.id?'active':''}" onclick="renderLanding('${r.id}')">${r.label}</div>`
  ).join('');
  
  // 过滤国家
  const list = currentRegion === 'all'
    ? VISA_COUNTRIES
    : VISA_COUNTRIES.filter(c => COUNTRY_REGION[c.id] === currentRegion);
  
  // 渲染卡片
  const grid = document.getElementById('landing-grid');
  grid.innerHTML = list.map(c => {
    const isReady = c.status === 'ready';
    const badge = isReady
      ? '<span class="cbadge-landing badge-ready">✓ 可导出PDF</span>'
      : '<span class="cbadge-landing badge-link">🔗 官网申请</span>';
    return `<div class="country-card-landing" onclick="enterCountry('${c.id}')">
      ${badge}
      <div class="cflag">${c.flag}</div>
      <div class="cname">${c.name}</div>
      <div class="cnote">${c.note||''}</div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════
// 签证类型选择
// ═══════════════════════════════════════════════

function enterCountry(id) {
  selectedCountry = id;
  const c = VISA_COUNTRIES.find(x => x.id === id);
  
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('type-page').style.display = '';
  document.getElementById('guide-page').style.display = 'none';
  document.getElementById('form-page').style.display = 'none';
  
  document.getElementById('type-country-bar').innerHTML = `${c.flag} <strong>${c.name}</strong> — ${c.embassy||''}`;
  
  const types = VISA_TYPES_DATA[id] || [{id:'default',name:'申根旅游签证',stay:'90天',fee:'约600元',time:'5-15天'}];
  
  let html = '<div class="guide-section"><div class="guide-title">🎯 请选择签证类型</div><p style="font-size:12px;color:#64748b;margin-bottom:16px">选择后我们将为您定制申请方案</p><div class="type-cards">';
  types.forEach(t => {
    html += `<div class="type-card" onclick="showGuide('${id}','${t.id}')"><div class="type-card-name">${t.name}</div><div class="type-card-info"><span class="type-tag">📅 ${t.stay}</span><span class="type-tag">💰 ${t.fee}</span><span class="type-tag">⏱ ${t.time}</span></div></div>`;
  });
  html += '</div></div><div class="guide-actions"><button class="btn btn-s" onclick="backToLanding()">← 返回选择国家</button></div>';
  
  document.getElementById('type-content').innerHTML = html;
}

// ═══════════════════════════════════════════════
// 申请指南
// ═══════════════════════════════════════════════

function showGuide(countryId, typeId) {
  const c = VISA_COUNTRIES.find(x => x.id === countryId);
  
  document.getElementById('type-page').style.display = 'none';
  document.getElementById('guide-page').style.display = '';
  document.getElementById('guide-country-bar').innerHTML = `${c.flag} <strong>${c.name}</strong> — ${c.embassy||''}`;
  
  renderGuide(countryId, c, typeId);
}

function getTypeData(countryId, typeId) {
  // 先检查 VISA_TYPE_DETAILS
  if (VISA_TYPE_DETAILS[countryId] && VISA_TYPE_DETAILS[countryId][typeId]) {
    return VISA_TYPE_DETAILS[countryId][typeId];
  }
  // 申根国家使用各自的定制数据
  if (SCHENGEN_DATA[countryId]) {
    return SCHENGEN_DATA[countryId];
  }
  // 默认数据
  return {
    docs: [],
    costs: [{name:'签证费',price:600},{name:'照片',price:30},{name:'快递费',price:50}],
    rate: 75, rateLabel: '中等偏高', rateLevel: 'mid',
    tips: ['提前准备材料','确保材料真实'],
    pitfalls: ['材料不齐全','信息不真实']
  };
}

function explainTerms(text) {
  let result = text;
  Object.entries(TERMS).forEach(([term, explanation]) => {
    const regex = new RegExp(term, 'g');
    result = result.replace(regex, `<span class="term">${term}<span class="term-tip">${explanation}</span></span>`);
  });
  return result;
}

function renderGuide(countryId, c, typeId) {
  const container = document.getElementById('guide-content');
  const data = getTypeData(countryId, typeId);
  let html = '';
  
  // 概览卡片
  html += '<div class="guide-section"><div class="guide-title">📋 签证概览</div><div class="guide-overview">';
  html += `<div class="overview-item"><span class="ov-label">签证类型</span><span class="ov-value">${typeId}</span></div>`;
  html += `<div class="overview-item"><span class="ov-label">成功率</span><span class="ov-value">${data.rate}%</span></div>`;
  html += '</div></div>';
  
  // 申请步骤
  const steps = STEPS_DATA[countryId] || [];
  if (steps.length > 0) {
    html += '<div class="guide-section"><div class="guide-title">📝 申请步骤</div><div class="guide-steps">';
    steps.forEach((step, i) => {
      html += `<div class="step-card"><div class="step-num">${i+1}</div><div class="step-content"><div class="step-title">${step.title}</div><div class="step-desc">${explainTerms(step.content)}</div></div></div>`;
    });
    html += '</div></div>';
  }
  
  // 材料清单
  if (data.docs && data.docs.length > 0) {
    const totalRequired = data.docs.filter(d => d.required).length;
    html += '<div class="guide-section"><div class="guide-title">📄 所需材料 <span style="font-size:11px;font-weight:400;color:#64748b">（点击可勾选）</span></div>';
    html += '<div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>';
    html += `<div class="progress-text">必选材料已准备：0/${totalRequired}（0%）</div>`;
    html += '<div class="doc-checklist">';
    data.docs.forEach(doc => {
      html += `<div class="doc-check-item" onclick="toggleDoc(this,${totalRequired})"><div class="doc-checkbox"></div><div><div class="doc-check-name">${doc.required?'✓ ':'○ '}${doc.name}</div><div class="doc-check-desc">${explainTerms(doc.desc)}</div></div></div>`;
    });
    html += '</div></div>';
  }
  
  // 费用预估
  if (data.costs && data.costs.length > 0) {
    let total = 0;
    html += '<div class="guide-section"><div class="guide-title">💰 费用预估</div><div class="cost-grid">';
    data.costs.forEach(item => {
      html += `<div class="cost-item"><span class="cost-label">${item.name}</span><span class="cost-value">¥${item.price}</span></div>`;
      total += item.price;
    });
    html += `</div><div class="cost-total"><span style="font-size:14px;font-weight:700;color:#1a56db">预估总计</span><span style="font-size:14px;font-weight:700;color:#1a56db">¥${total}</span></div></div>`;
  }
  
  // 成功率评估
  html += '<div class="guide-section"><div class="guide-title">📊 成功率参考</div><div class="rate-card">';
  html += `<div class="rate-circle rate-${data.rateLevel}">${data.rate}%</div>`;
  html += `<div class="rate-label">预估通过率：${data.rateLabel}</div></div></div>`;
  
  // 申请技巧
  if (data.tips && data.tips.length > 0) {
    html += '<div class="guide-section"><div class="guide-title">💡 申请技巧</div><div class="guide-tips">';
    data.tips.forEach(tip => {
      html += `<div class="tip-item">• ${explainTerms(tip)}</div>`;
    });
    html += '</div></div>';
  }
  
  // 常见拒签原因
  if (data.pitfalls && data.pitfalls.length > 0) {
    html += '<div class="guide-section"><div class="guide-title">⚠️ 常见拒签原因</div><div class="guide-pitfalls">';
    data.pitfalls.forEach(pitfall => {
      html += `<div class="pitfall-item">✗ ${explainTerms(pitfall)}</div>`;
    });
    html += '</div></div>';
  }
  
  // 相关链接
  if (c.link) {
    html += '<div class="guide-section"><div class="guide-title">🔗 相关链接</div>';
    html += `<a href="${c.link}" target="_blank" class="guide-link">🌐 前往${c.name}签证官网 →</a></div>`;
  }
  
  // 操作按钮
  const hasForm = c.status === 'ready';
  html += '<div class="guide-actions">';
  if (hasForm) html += `<button class="btn btn-dl" onclick="enterForm('${countryId}')">📄 开始填写签证申请表</button>`;
  html += '<button class="btn btn-s" onclick="backToTypes()">← 返回选择签证类型</button>';
  html += '<button class="btn btn-s" onclick="backToLanding()">← 返回选择国家</button></div>';
  
  container.innerHTML = html;
}

// ═══════════════════════════════════════════════
// 材料清单交互
// ═══════════════════════════════════════════════

function toggleDoc(el, totalRequired) {
  el.classList.toggle('checked');
  const checkbox = el.querySelector('.doc-checkbox');
  checkbox.textContent = el.classList.contains('checked') ? '✓' : '';
  
  const section = el.closest('.guide-section');
  const checkedCount = section.querySelectorAll('.doc-check-item.checked').length;
  const progress = totalRequired > 0 ? Math.round((checkedCount / totalRequired) * 100) : 0;
  
  section.querySelector('.progress-fill').style.width = Math.min(progress, 100) + '%';
  section.querySelector('.progress-text').textContent = `必选材料已准备：${checkedCount}/${totalRequired}（${Math.min(progress, 100)}%）`;
}

// ═══════════════════════════════════════════════
// 导航功能
// ═══════════════════════════════════════════════

function backToLanding() {
  document.getElementById('type-page').style.display = 'none';
  document.getElementById('guide-page').style.display = 'none';
  document.getElementById('form-page').style.display = 'none';
  document.getElementById('landing-page').style.display = '';
}

function backToTypes() {
  document.getElementById('guide-page').style.display = 'none';
  document.getElementById('type-page').style.display = '';
}

function enterForm(id) {
  const c = VISA_COUNTRIES.find(x => x.id === id);
  document.getElementById('guide-page').style.display = 'none';
  document.getElementById('form-page').style.display = '';
  document.getElementById('selected-country-bar').innerHTML = `${c.flag} <strong>${c.name}</strong> — ${c.embassy||''}`;
  go(1);
}

// ═══════════════════════════════════════════════
// 表单功能
// ═══════════════════════════════════════════════

let cur = 1;
const labels = ['','个人信息','旅行证件','联系方式','旅行信息','确认导出'];

function go(n) {
  if (n < 1 || n > 5) return;
  document.getElementById('s' + cur).classList.remove('active');
  cur = n;
  document.getElementById('s' + cur).classList.add('active');
  for (let i = 1; i <= 5; i++) {
    document.getElementById('d' + i).className = 'dot ' + (i < cur ? 'done' : i === cur ? 'active' : 'idle');
    if (i < 5) document.getElementById('l' + i).className = 'ln ' + (i < cur ? 'done' : 'idle');
  }
  document.getElementById('slbl').textContent = labels[cur];
  if (cur === 5) buildSummary();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function next() { go(cur + 1); }
function prev() { go(cur - 1); }

function v(id) { const e = document.getElementById(id); return e ? e.value.trim() : ''; }
function rv(name) { const c = document.querySelector('input[name="' + name + '"]:checked'); return c ? c.value : ''; }
function fd(s) { if (!s) return ''; const p = s.split('-'); return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : s; }

function buildSummary() {
  const rows = [
    ['姓名', v('f01_surname') + ' ' + v('f03_firstname')],
    ['出生日期', fd(v('f04_dob'))],
    ['现国籍', v('f07_nationality')],
    ['证件号', v('f13_passport_num')],
    ['有效期', fd(v('f15_expiry_date'))],
    ['电话', v('f19_phone')],
    ['目的地', v('f25_main_dest')],
    ['抵达', fd(v('f28_arrival'))],
    ['离开', fd(v('f28_departure'))]
  ].filter(([, val]) => val);
  
  document.getElementById('sumgrid').innerHTML = rows.map(([k, val]) =>
    `<div class="sumrow"><span class="sumlbl">${k}:</span><span class="sumval">${val}</span></div>`
  ).join('');
}

// ═══════════════════════════════════════════════
// PDF生成
// ═══════════════════════════════════════════════

async function generate() {
  if (typeof PDFLib === 'undefined') {
    alert('PDF库正在加载，请稍候再试');
    return;
  }
  
  document.getElementById('ov').classList.add('show');
  document.getElementById('dl-btn').disabled = true;
  
  try {
    const { PDFDocument } = PDFLib;
    
    // 获取PDF数据
    const countryConfig = VISA_COUNTRIES.find(c => c.id === selectedCountry);
    let pdfB64 = typeof PDF_B64 !== 'undefined' ? PDF_B64 : null;
    
    // 尝试从PDF_B64_MAP获取
    if (typeof PDF_B64_MAP !== 'undefined' && PDF_B64_MAP[selectedCountry]) {
      pdfB64 = PDF_B64_MAP[selectedCountry];
    }
    
    if (!pdfB64) {
      alert('该国家的PDF模板暂未配置');
      document.getElementById('ov').classList.remove('show');
      document.getElementById('dl-btn').disabled = false;
      return;
    }
    
    const bin = atob(pdfB64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    
    const doc = await PDFDocument.load(bytes.buffer);
    const font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
    
    // 填写PDF表单（简化版）
    const pages = doc.getPages();
    const firstPage = pages[0];
    
    // 示例：在第一个页面填写姓名
    firstPage.drawText(v('f01_surname') + ' ' + v('f03_firstname'), {
      x: 100, y: 700, size: 12, font: font
    });
    
    const out = await doc.save();
    const url = URL.createObjectURL(new Blob([out], {type: 'application/pdf'}));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedCountry}_Visa_${v('f01_surname') || 'Application'}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
  } catch (e) {
    console.error('PDF生成错误:', e);
    alert('PDF生成失败：' + e.message);
  }
  
  document.getElementById('ov').classList.remove('show');
  document.getElementById('dl-btn').disabled = false;
}

// ═══════════════════════════════════════════════
// 页面初始化
// ═══════════════════════════════════════════════

renderLanding('all');
