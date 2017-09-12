var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({
    extended: false
}); //var parseUrlencoded=bodyParser.urlencoded({extended:false})；一定要写在路由之前

var connection = mysql.createConnection({

    host: 'localhost', //主机
    port: '8889', //端口号
    user: 'root', //用户名
    password: "root", //密码
    database: 'baiduNews' //数据库的名字
});
connection.connect();
var router = express.Router();

/* GET users listing. */
//  /users
router.get('/', function (request, response, next) {

    return response.render('baiduNews', {
        title: '百家'
    });


});
//  /users/news

router.get('/news', function (request, response, next) {
    var kk = '推荐';
//    console.log(kk);
    //response.json({kk:'6'});
// var sql = 'SELECT * from news where news_id=86 or news_id=87';

var sql = `SELECT * from news where news_keyword = '${kk}' order by modification_time desc`;

//    var sql = 'SELECT * from news where modification_time=(select max(modification_time) from news)';
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        console.log(results);
        response.send(results);
    });
});

router.get('/news1', function (request, response, next) {
    var kk = '百家';
//    console.log(kk);
    //response.json({kk:'6'});
// var sql = 'SELECT * from news where news_id=86 or news_id=87';

var sql = `SELECT * from news where news_keyword = '${kk}' order by modification_time desc`;

//    var sql = 'SELECT * from news where modification_time=(select max(modification_time) from news)';
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        console.log(results);
        response.send(results);
    });
});

router.get('/news2', function (request, response, next) {
    var kk = '本地';
//    console.log(kk);
    //response.json({kk:'6'});
// var sql = 'SELECT * from news where news_id=86 or news_id=87';

var sql = `SELECT * from news where news_keyword = '${kk}' order by modification_time desc`;

//    var sql = 'SELECT * from news where modification_time=(select max(modification_time) from news)';
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        console.log(results);
        response.send(results);
    });
});
router.get('/news3', function (request, response, next) {
    var kk = '娱乐';
//    console.log(kk);
    //response.json({kk:'6'});
// var sql = 'SELECT * from news where news_id=86 or news_id=87';

var sql = `SELECT * from news where news_keyword = '${kk}' order by modification_time desc`;

//    var sql = 'SELECT * from news where modification_time=(select max(modification_time) from news)';
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        console.log(results);
        response.send(results);
    });
});

router.get('/news4', function (request, response, next) {
    var kk = '社会';
//    console.log(kk);
    //response.json({kk:'6'});
// var sql = 'SELECT * from news where news_id=86 or news_id=87';

var sql = `SELECT * from news where news_keyword = '${kk}' order by modification_time desc`;

//    var sql = 'SELECT * from news where modification_time=(select max(modification_time) from news)';
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        console.log(results);
        response.send(results);
    });
});

module.exports = router;
