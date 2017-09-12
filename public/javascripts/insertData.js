define(['jquery'], function ($) {
    console.log($);
    var a = 12;

    function Stu() {
        this.a = a;
    }
    Stu.prototype.eat = function () {
        console.log(this.a);
    };
    var stu = new Stu();
    return stu;



 var $insertData = $('.insertData');
       console.log($insertData);
    $insertData.on('click', function() {
        //        console.log($(this));
        var selectedIdTr = $(this)[0];
        var $selectedId = $(selectedIdTr).children('td').eq(0).html()
        console.log($selectedId);

        $selectedIdNoSpace = $selectedId.trim();
        $.ajax('/newsLaunching', {
            type: 'post',
            data: {
                selectedId: $selectedIdNoSpace
            },
            success: function(response) {

                $('#inputNewsTitle').val(response.news_title);
                $('#inputNewsContent').val(response.news_content);
                $('#inputNewsImgUrl').val(response.news_img_url);
                $('#inputNewsDate').val(response.news_date);
                $('#inputNewsKeyword').val(response.news_keyword);
                $('#inputNewsOrigin').val(response.news_origin);
            }

        });
});
