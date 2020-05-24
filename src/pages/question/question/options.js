/**
 * @Name: option.js
 * @Author: zhengzheng.tang
 * @Update: 13/05/2020
 * @Desc:
 */
const questions = [
  {
    title: '您家的网可卡吗？哪个地方的信号不好？',
    checkList: [
      {
        label: '书房信号差，比较卡',
        value: 'A'
      },
      {
        label: '卧室信号差，比较卡',
        value: 'B'
      },
      {
        label: '卫生间信号差，比较卡',
        value: 'C'
      },
      {
        label: '其他',
        value: 'D'
      }
    ]
  },
  {
    title: '您家可装监控了？想要装在哪里？天翼看家摄像头，打开手机随时看，看家护院、看老护幼、小孩学习辅导的首选！',
    checkList: [
      {
        label: '大门口',
        value: 'A'
      },
      {
        label: '客厅',
        value: 'B'
      },
      {
        label: '其他',
        value: 'C'
      }
    ]
  },
];
const radioQuestions = [
  {
    title: '现在的智能门铃服务很不错！想要装一台吗？',
    checkList: [
      {
        label: '不需要',
        value: 0
      },
      {
        label: '需要',
        value: 1
      },

    ]
  },
  {
    title: '家中宽带使用的哪家？',
    checkList: [
      {
        label: '移动',
        value: 0
      },
      {
        label: '电信',
        value: 1
      },
      {
        label: '联通',
        value: 2
      }
    ]
  },
  {
    title: '全家一个月话费多少元?',
    checkList: [
      {
        label: '月消费160元左右',
        value: 'A'
      },
      {
        label: '月消费180元左右',
        value: 'B'
      },
      {
        label: '月消费220元左右',
        value: 'C'
      }
    ]
  }
];

// {title: '主卡', num: 1, desc: '20G流量+300分钟语音'},
// {title: '特权卡', num: 2, desc: '共享主卡流量、语音'},
// {title: '宽带', num: 1, desc: '100M'},
// {title: 'ITV电视', num: 1, desc: '尊享版ITV'},
// {title: '智能组网', num: 1, desc: ''},
// {title: '天翼看家', num: 1, desc: ''},
// {title: '家庭云', num: '', desc: '赠送'}]
const result = {
  '130': {
    title: '',
    overview: '（20G流量+300分钟语音+2张特权卡+100M宽带+尊享版ITV+智能组网+天翼看家+家庭云）',
    component: {
      main: {title: '主卡', num: 1, desc: '20G流量+300分钟语音'},
      sp: {title: '特权卡', num: 2, desc: '共享主卡流量、语音'},
      broadband: {title: '宽带', num: 1, desc: '100M'},
      tv: {title: 'ITV电视', num: 1, desc: '尊享版ITV'}
    }
  },
  '151': {
    title: '',
    overview: '（30G流量+500分钟语音+2张特权卡+300M宽带+尊享版ITV+智能组网+天翼看家+家庭云）',
    component: {
      main: {title: '主卡', num: 1, desc: '30G流量+500分钟语音'},
      sp: {title: '特权卡', num: 2, desc: '共享主卡流量、语音'},
      broadband: {title: '宽带', num: 1, desc: '300M'},
      tv: {title: 'ITV电视', num: 1, desc: '尊享版ITV'}
    }
  },
  '191': {
    title: '',
    overview: '（40G流量+800分钟语音+2张特权卡+300M宽带+尊享版ITV+智能组网+天翼看家+家庭云）',
    component: {
      main: {title: '主卡', num: 1, desc: '40G流量+800分钟语音'},
      sp: {title: '特权卡', num: 2, desc: '共享主卡流量、语音'},
      broadband: {title: '宽带', num: 1, desc: '300M'},
      tv: {title: 'ITV电视', num: 1, desc: '尊享版ITV'}
    }
  }
};

export default {questions, radioQuestions, result};
