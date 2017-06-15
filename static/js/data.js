
var leaseWayData = [
    {'id': '0', 'value': '整租'},
    {'id': '1', 'value': '合租'}
];
var bedroomGradeData = [
    {'id': '0', 'value': '主卧'},
    {'id': '1', 'value': '次卧'},
    {'id': '2', 'value': '单间'}
];
var roomData = [
    {'id': '0', 'value': '0室', 'parentId': '0'},
    {'id': '01', 'value': '1室', 'parentId': '0'},
    {'id': '02', 'value': '2室', 'parentId': '0'},
    {'id': '03', 'value': '3室', 'parentId': '0'},
    {'id': '04', 'value': '4室', 'parentId': '0'}
];
var hallData = [
    {"id":"100", "value":"0厅", "parentId":"0"},
    {"id":"101", "value":"1厅", "parentId":"0"},
    {"id":"102", "value":"2厅", "parentId":"0"},
    {"id":"103", "value":"3厅", "parentId":"0"},

    {"id":"100", "value":"0厅", "parentId":"01"},
    {"id":"101", "value":"1厅", "parentId":"01"},
    {"id":"102", "value":"2厅", "parentId":"01"},
    {"id":"103", "value":"3厅", "parentId":"01"},

    {"id":"100", "value":"0厅", "parentId":"02"},
    {"id":"101", "value":"1厅", "parentId":"02"},
    {"id":"102", "value":"2厅", "parentId":"02"},
    {"id":"103", "value":"3厅", "parentId":"02"},

    {"id":"100", "value":"0厅", "parentId":"03"},
    {"id":"101", "value":"1厅", "parentId":"03"},
    {"id":"102", "value":"2厅", "parentId":"03"},
    {"id":"103", "value":"3厅", "parentId":"03"},

    {"id":"100", "value":"0厅", "parentId":"04"},
    {"id":"101", "value":"1厅", "parentId":"04"},
    {"id":"102", "value":"2厅", "parentId":"04"},
    {"id":"103", "value":"3厅", "parentId":"04"},
    {"id":"104", "value":"4厅", "parentId":"04"}
];
var kitchenData = [
    {"id":"200", "value":"0厨", "parentId":"100"},
    {"id":"201", "value":"1厨", "parentId":"100"},
    {"id":"202", "value":"2厨", "parentId":"100"},

    {"id":"200", "value":"0厨", "parentId":"101"},
    {"id":"201", "value":"1厨", "parentId":"101"},
    {"id":"202", "value":"2厨", "parentId":"101"},
    {"id":"203", "value":"3厨", "parentId":"101"},
    {"id":"204", "value":"4厨", "parentId":"101"},

    {"id":"200", "value":"0厨", "parentId":"102"},
    {"id":"201", "value":"1厨", "parentId":"102"},
    {"id":"202", "value":"2厨", "parentId":"102"},
    {"id":"203", "value":"3厨", "parentId":"102"},
    {"id":"204", "value":"4厨", "parentId":"102"},

    {"id":"200", "value":"0厨", "parentId":"103"},
    {"id":"201", "value":"1厨", "parentId":"103"},
    {"id":"202", "value":"2厨", "parentId":"103"},
    {"id":"203", "value":"3厨", "parentId":"103"},
    {"id":"204", "value":"4厨", "parentId":"103"},

    {"id":"200", "value":"0厨", "parentId":"104"},
    {"id":"201", "value":"1厨", "parentId":"104"},
    {"id":"202", "value":"2厨", "parentId":"104"},
    {"id":"203", "value":"3厨", "parentId":"104"},
    {"id":"204", "value":"4厨", "parentId":"104"}
];
var toiletData = [
    {"id":"300", "value":"0卫", "parentId":"200"},
    {"id":"301", "value":"1卫", "parentId":"200"},
    {"id":"302", "value":"2卫", "parentId":"200"},

    {"id":"300", "value":"0卫", "parentId":"201"},
    {"id":"301", "value":"1卫", "parentId":"201"},
    {"id":"302", "value":"2卫", "parentId":"201"},
    {"id":"303", "value":"3卫", "parentId":"201"},
    {"id":"304", "value":"4卫", "parentId":"201"},

    {"id":"300", "value":"0卫", "parentId":"202"},
    {"id":"301", "value":"1卫", "parentId":"202"},
    {"id":"302", "value":"2卫", "parentId":"202"},
    {"id":"303", "value":"3卫", "parentId":"202"},
    {"id":"304", "value":"4卫", "parentId":"202"},

    {"id":"300", "value":"0卫", "parentId":"203"},
    {"id":"301", "value":"1卫", "parentId":"203"},
    {"id":"302", "value":"2卫", "parentId":"203"},
    {"id":"303", "value":"3卫", "parentId":"203"},
    {"id":"304", "value":"4卫", "parentId":"203"},

    {"id":"300", "value":"0卫", "parentId":"204"},
    {"id":"301", "value":"1卫", "parentId":"204"},
    {"id":"302", "value":"2卫", "parentId":"204"},
    {"id":"303", "value":"3卫", "parentId":"204"},
    {"id":"304", "value":"4卫", "parentId":"204"}
];
var indoorData = [
    {'id': '1', 'value': '冰箱'},
    {'id': '2', 'value': '电视'},
    {'id': '3', 'value': '洗衣机'},
    {'id': '4', 'value': '电脑'},
    {'id': '5', 'value': '空调'},
    {'id': '6', 'value': '宽带'},
    {'id': '7', 'value': '热水器'},
    {'id': '8', 'value': '燃气灶'}
];
var bedroomDirectionData = [
    {'id': '1', 'value': '南'},
    {'id': '2', 'value': '西南'},
    {'id': '3', 'value': '西'},
    {'id': '4', 'value': '东南'},
    {'id': '5', 'value': '东'},
    {'id': '6', 'value': '北'}
];
var decorateDegreeData = [
    {'id': '1', 'value': '精装修'},
    {'id': '2', 'value': '简装修'},
    {'id': '3', 'value': '豪华装修'},
    {'id': '4', 'value': '毛坯'}
];
var payWayData = [
    {'id': '1', 'value': '押一付一'},
    {'id': '6', 'value': '押二付一'},
    {'id': '2', 'value': '押一付二'},
    {'id': '3', 'value': '押一付三'},
    {'id': '4', 'value': '押一付半年'},
    {'id': '5', 'value': '押一付全年'}
];
var sexLimitData = [
    {'id': '1', 'value': '男'},
    {'id': '2', 'value': '女'},
    {'id': '3', 'value': '不限'}
];
var villageNameData = [
    {'id': '1', 'value': '茶张村'},
    {'id': '2', 'value': '南窑头'},
    {'id': '3', 'value': '鱼化寨'},
    {'id': '4', 'value': '西辛庄'}
];
var roomPrice = [
    {'id': '1', 'value': '600以下'},
    {'id': '2', 'value': '600元-1000元'},
    {'id': '3', 'value': '1000元-2000元'},
    {'id': '4', 'value': '2000元-3000元'},
    {'id': '5', 'value': '3000元-4000元'},
    {'id': '6', 'value': '4000元以上'}
];