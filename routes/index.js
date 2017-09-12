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

/* GET home page. */
router.get('/', function (request, response, next) {
    var sql = 'SELECT * from `news`';




    //    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        //        console.log(results);
        response.render('index', {

            title: '百度新闻后台管理系统',
            panelTitle: '新闻发布台',
            newsTitle: '新闻标题',
            newsContent: '新闻正文',
            newsImgUrl: '新闻图片来源',
            newsOrigin: '新闻来源',
            newsDate: '新闻日期',
            newsKeywords: '新闻标签',
            newsList: '新闻列表',
            newsId: '新闻编号',
            newsTime: '操作'
//            newsResults: results

        });


    });

});
router.get('/split', function (request, response, next) {
    var sqlCount = 'SELECT COUNT(news_id) FROM news';
    connection.query(sqlCount, function (error, results, fields) {
        //        console.log(results);
        var count;

        for (var k in results[0]) {
            count = results[0][k];
        }
        console.log(count);
        response.json(count);
    });
});

router.post('/splitBind', function (request, response, next) {
    var dataStart = (request.body.pageNum - 1) * 4 + 1;
    var dataEnd = request.body.pageNum * 4;

    console.log(request.body.pageNum)
    var sqlCount = `SELECT * FROM news limit ${dataStart},${dataEnd}`;
    connection.query(sqlCount, function (error, results, fields) {
        console.log(results);
        response.render('index', {
            newsResults: results
        });


    });
});

router.post('/newsLaunching', function (request, response, next) {
    // 取到 mysql返回回来的对象 去user表中查询所有的数据 返回给客户端
    //    var sql = 'SELECT * FROM `news` WHERE news_id=data.selectedId';

    //    var sql = 'SELECT * FROM `news` WHERE news_id=1';
    //    console.log(sql);
    //console.log(typeof request.body.selectedId);
    var id = request.body.selectedId;
    //    console.log(typeof id);
    var sql = `SELECT * FROM news WHERE news_id="${id}"`;
    //    console.log(sql);
    //console.log(JSON.parse(request.body));
    connection.query(sql, function (error, results, fields) {
        //         console.log(results[0]);
        response.send(results[0]);
    })



});

//'DELETE FROM `user` WHERE id=?',[req.body.id]
//
//con.query('DELETE FROM `user` WHERE id=?',[req.body.id],function(err,results,f){
//        console.log(results);
//    })
router.post('/submitData', function (request, response, next) {
    //    console.log(request.body);


    var title = request.body.inputNewsTitle;
    //    console.log(title);
    //    console.log(typeof title);
    var newsTitle = request.body.inputNewsTitle;
    var newsContent = request.body.news_content;
    var newsImgUrl = request.body.news_img_url;
    var newsOrigin = request.body.news_origin;
    var newsDate = request.body.news_date;
    var newsKeyword = request.body.news_keyword;
    var flag = request.body.flag;
    var selectedId = request.body.selectedId;

    console.log(flag);
    console.log(typeof flag);








    if (flag === 'true') {
        var sql = `UPDATE news SET news_title="${newsTitle}",news_content="${newsContent}",news_keyword="${newsKeyword}",news_date="${newsDate}",news_img_url="${newsImgUrl}",news_origin="${newsOrigin}" WHERE news_id="${selectedId}"`;
        connection.query(sql, function (error, r, fields) {
            var sql1 = 'SELECT * from `news`';
            connection.query(sql1, function (error, results, fields) {
                //                console.log(flag);
                //                console.log(flag,response);
                response.json(results);
            });

        });
    } else {
        var sql2 = `INSERT INTO news ( news_title, news_content, news_keyword, news_date, news_img_url, news_origin) VALUES ("${newsTitle}","${newsContent}","${newsKeyword}","${newsDate}","${newsImgUrl}","${newsOrigin}")`;
        console.log(sql2);
        connection.query(sql2, function (error, r, fields) {
            var sql3 = 'SELECT * from `news`';
            connection.query(sql3, function (error, results, fields) {
                console.log(results);
                response.send(results);
            });
        });
    }

})





router.post('/newsDeleting', function (request, response, next) {
    //    console.log(request.body);
    var idToBeDeleted = request.body.idToBeDeleted;
    var sql = `DELETE FROM news WHERE news_id=${idToBeDeleted}`;
    //    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        //        console.log(results);
        //alert('are you sure that you wanna delete this piece of data?');
        response.send(results);

    });
    var sql1 = 'SELECT * from `news`';
    connection.query(sql1, function (error, results, fields) {
        response.render('index', {
            newsResults: results

        });
    });


});
module.exports = router;
