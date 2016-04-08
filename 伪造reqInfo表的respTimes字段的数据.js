/*
var adxAccountUser = {
    "_id": "70fb7a398153efb81909",
    "email": "liuying@goyoo.com",
    "passwd": "Y1MqMEQ+Wdu7jVnH/F2z6g==",
    "name": "刘英",
    "created": ISODate("2016-04-07T07:55:33.002Z"),
    "state": 0,
    "authorize": {
        "managerID": ["9b2f26e4214f827e0234"],
        "type": 5,
        "secret": "ea7ce597bac863cab514b153efb8190b"
    },
    "info": { "telphone": "", "company": "", "address": "", "website": "" },
    "dspId": "57061275fdda00b9420d0eec"
};


var dspMain = {
    "_id": ObjectId("57061275fdda00b9420d0eec"),
    "contentType": "application/json",
    "version": "v2_2",
    "bidType": "cpm",
    "admType": "json",
    "abbreviation": "",
    "hostname": "www.liuying.com",
    "port": 80,
    "path": "/",
    "QPS": 23,
    "bidders": [{
        "id": "57061275464070b942bf17b1",
        "name": "mac",
        "path": "/",
        "QPS": 23,
        "selected": 1,
        "url": "http://www.liuying.com",
        "hostname": "www.liuying.com",
        "port": 80
    }, {
        "id": "57061275464070b942bf17b2",
        "name": "ipad",
        "path": "/",
        "QPS": 23,
        "selected": 0,
        "url": "http://www.liuying.com",
        "hostname": "www.liuying.com",
        "port": 80
    }, {
        "id": "57061275464070b942bf17b3",
        "name": "mobile",
        "path": "/",
        "QPS": 23,
        "selected": 0,
        "url": "http://www.liuying.com",
        "hostname": "www.liuying.com",
        "port": 80
    }, {
        "id": "57061275464070b942bf17b4",
        "name": "PC",
        "selected": 0,
        "url": "http://www.liuying.com",
        "QPS": 23,
        "hostname": "www.liuying.com",
        "port": 80,
        "path": "/"
    }],
    "email": "liuying@goyoo.com",
    "name": "刘英",
    "i_key": "af0401bcaa64645f3085330132780dec82394bcb2ea988faf9dd0a969ef6418a",
    "e_key": "cd311d538c05bfadd7ba8906a633c7a82c542e38bcc648763ec9369e6843e1a5"
};

*/
// 伪造reqInfo的respTimes字段的数据
var async = require('async');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/dsp', {
    numberOfRetries: 1,
    retryMilliSeconds: 500,
    safe: true,
    native_parser: true
}, {
    socketOptions: { timeout: 5000 }
});
var collection = db.collection('reqInfo');

// mac ipad mobile PC
var bidders = [
    '57061275464070b942bf17b1',
    '57061275464070b942bf17b2', 
    '57061275464070b942bf17b3',
    '57061275464070b942bf17b4'
];

// 
var dataReqInfo = {
    "date": '',
    "dspId": "",
    "slotId": null,
    "req": 19,
    "networkError": 19,
    "respTimes": {
        "50": 0,
        "85": 0,
        "99": 0
    }
};

// 04-01 ~ 04-07

var dateArr = [];
var date = null;
for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 24; j++) {
        date = new Date('2016-04-0' + (i + 1));
        date.setHours(j);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        dateArr.push(date);
    }
}

var dataArr = [];
dataReqInfo = null;
// 此时dateArr里面存放的是04-01~04-07 24小时之间的时间
for (var k = 0; k < bidders.length; k++) {
	for (var i = 0; i < dateArr.length; i++) {
		dataReqInfo = {
		    "date": '',
		    "dspId": "",
		    "slotId": null,
		    "req": 19,
		    "networkError": 19,
		    "respTimes": {
		        "50": 0,
		        "85": 0,
		        "99": 0
		    }
		};
		dataReqInfo.date = dateArr[i];
		dataReqInfo.dspId = bidders[k];
		dataReqInfo.respTimes['50'] = getRandomNum();
		dataReqInfo.respTimes['85'] = getRandomNum();
		dataReqInfo.respTimes['99'] = getRandomNum();
		dataArr.push(dataReqInfo);
		dataReqInfo = null;
	}
}

function getRandomNum() {
    var num = Math.ceil(Math.random() * 100);
    return num;
}

console.log(dataArr);

async.forEach(dataArr, function (item, done) {
    collection.insert(item, function (err, result) {
        done(err, result);
    });
}, function (err) {
    console.log(err);
});


