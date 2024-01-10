const locationData = [
  { 
    code: 10000001, 
    state: 0, 
    name: '대학본부',
    short: '대학본부',
    bgColor: '#D32F2F',
    fontColor: '#fff'
  },
  { 
    code: 10000002, 
    state: 0, 
    name: '무도대학',
    short: '무도대',
    bgColor: '#D81B60',
    fontColor: '#fff'
  },
  { 
    code: 10000003, 
    state: 0, 
    name: '체육과학대학',
    short: '체과대',
    bgColor: '#AB47BC',
    fontColor: '#fff'
  },
  { 
    code: 10000004, 
    state: 0, 
    name: '문화예술대학',
    short: '문예대',
    bgColor: '#7E57C2',
    fontColor: '#fff'
  },
  { 
    code: 10000005, 
    state: 0, 
    name: '보건복지과학대학1동',
    short: '보과1',
    bgColor: '#5C6BC0',
    fontColor: '#fff'
  },
  { 
    code: 10000006, 
    state: 0, 
    name: '보건복지과학대학2동',
    short: '보과2',
    bgColor: '#1976D2',
    fontColor: '#fff'
  },
  { 
    code: 10000007, 
    state: 0, 
    name: 'AI융합대학',
    short: '에융대',
    bgColor: '#0277BD',
    fontColor: '#fff'
  },
  { 
    code: 10000008, 
    state: 0, 
    name: '학생군사교육단',
    short: '학군단',
    bgColor: '#006064',
    fontColor: '#fff'
  },
  { 
    code: 10000009, 
    state: 0, 
    name: '종합체육관',
    short: '종체',
    bgColor: '#00796B',
    fontColor: '#fff'
  },
  { 
    code: 10000010, 
    state: 0, 
    name: '중앙도서관',
    short: '도서관',
    bgColor: '#2E7D32',
    fontColor: '#fff'
  },
  { 
    code: 10000011, 
    state: 0, 
    name: '생활관',
    short: '생활관',
    bgColor: '#D32F2F',
    fontColor: '#fff'
  },
  { 
    code: 10000012, 
    state: 0, 
    name: '학생회관',
    short: '학생회관',
    bgColor: '#D81B60',
    fontColor: '#fff'
  },
  { 
    code: 10000013, 
    state: 0, 
    name: '골프실기장',
    short: '골프장',
    bgColor: '#AB47BC',
    fontColor: '#fff'
  },
  { 
    code: 10000014, 
    state: 0, 
    name: '종합운동장',
    short: '운동장',
    bgColor: '#7E57C2',
    fontColor: '#fff'
  },
  { 
    code: 10000015, 
    state: 0, 
    name: '야외공연장',
    short: '공연장',
    bgColor: '#5C6BC0',
    fontColor: '#fff'
  },
  { 
    code: 10000016, 
    state: 0, 
    name: '글로벌사회공헌원', 
    short: '공헌원',
    bgColor: '#1976D2',
    fontColor: '#fff'
  },
  { 
    code: 11000001, 
    state: 0, 
    name: '이마트', 
    short: '이마트',
    bgColor: '#0277BD',
    fontColor: '#fff'
  },
  { 
    code: 11000002, 
    state: 0, 
    name: '광장', 
    short: '광장',
    bgColor: '#006064',
    fontColor: '#fff'
  },
  { 
    code: 11000003, 
    state: 0, 
    name: '명지대사거리', 
    short: '명사',
    bgColor: '#00796B',
    fontColor: '#fff'
  },
  { 
    code: 11000004, 
    state: 0, 
    name: '럭스나인', 
    short: '럭스나인',
    bgColor: '#2E7D32',
    fontColor: '#fff'
  },
  { 
    code: 11000005, 
    state: 0, 
    name: '카페거리', 
    short: '카페거리',
    bgColor: '#D32F2F',
    fontColor: '#fff'
  },
  { 
    code: 11000006, 
    state: 0, 
    name: '경찰서', 
    short: '경찰서',
    bgColor: '#D81B60',
    fontColor: '#fff'
  },
  { 
    code: 11000007, 
    state: 0, 
    name: 'CGV', 
    short: 'CGV',
    bgColor: '#AB47BC',
    fontColor: '#fff'
  },
  { 
    code: 11000008, 
    state: 0, 
    name: '용인터미널', 
    short: '터미널',
    bgColor: '#7E57C2',
    fontColor: '#fff'
  },
  { 
    code: 12000000, 
    state: 0, 
    name: '기흥', 
    short: '기흥',
    bgColor: '#5C6BC0',
    fontColor: '#fff'
  },
  { 
    code: 12000001, 
    state: 0, 
    name: '강남대', 
    short: '강남대',
    bgColor: '#1976D2',
    fontColor: '#fff'
  },
  { 
    code: 12000002, 
    state: 0, 
    name: '지석', 
    short: '지석',
    bgColor: '#0277BD',
    fontColor: '#fff'
  },
  { 
    code: 12000003, 
    state: 0, 
    name: '어정',
    short: '어정',
    bgColor: '#006064',
    fontColor: '#fff'
  },
  { 
    code: 12000004, 
    state: 0, 
    name: '동백', 
    short: '동백',
    bgColor: '#00796B',
    fontColor: '#fff'
  },
  { 
    code: 12000005, 
    state: 0, 
    name: '초당', 
    short: '초당',
    bgColor: '#2E7D32',
    fontColor: '#fff'
  },
  { 
    code: 12000006, 
    state: 0, 
    name: '삼가', 
    short: '삼가',
    bgColor: '#D32F2F',
    fontColor: '#fff'
  },
  { 
    code: 12000007, 
    state: 0, 
    name: '시청용인대', 
    short: '시청',
    bgColor: '#D81B60',
    fontColor: '#fff'
  },
  { 
    code: 12000008, 
    state: 0, 
    name: '명지대', 
    short: '명지대역',
    bgColor: '#AB47BC',
    fontColor: '#fff'
  },
  { 
    code: 12000009, 
    state: 0, 
    name: '김량장',
    short: '김량장',
    bgColor: '#7E57C2',
    fontColor: '#fff'
  },
  { 
    code: 12000010, 
    state: 0, 
    name: '운동장송담대',
    short: '송담대역',
    bgColor: '#5C6BC0',
    fontColor: '#fff'
  },
  { 
    code: 12000011, 
    state: 0, 
    name: '고진', 
    short: '고진',
    bgColor: '#1976D2',
    fontColor: '#fff'
  },
  { 
    code: 12000012, 
    state: 0, 
    name: '보정', 
    short: '보정',
    bgColor: '#0277BD',
    fontColor: '#fff'
  },
  { 
    code: 12000013, 
    state: 0, 
    name: '둔전', 
    short: '둔전',
    bgColor: '#006064',
    fontColor: '#fff'
  },
  { 
    code: 12000014, 
    state: 0, 
    name: '전대에버랜드', 
    short: '에버랜드',
    bgColor: '#00796B',
    fontColor: '#fff'
  },
  { 
    code: 13000001, 
    state: 0, 
    name: '상갈', 
    short: '상갈',
    bgColor: '#2E7D32',
    fontColor: '#fff'
  },
  { 
    code: 13000002, 
    state: 0, 
    name: '기흥', 
    short: '기흥',
    bgColor: '#D32F2F',
    fontColor: '#fff'
  },
  { 
    code: 13000003, 
    state: 0, 
    name: '신갈', 
    short: '신갈',
    bgColor: '#D81B60',
    fontColor: '#fff'
  }  
]

export default locationData;