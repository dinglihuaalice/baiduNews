//console.log(require);
require.config({

    baseUrl: './javascripts',
    paths: {
        'jquery': './jquery',
        'split': './split'

    }
});
require(['jquery', 'split'], function ($, Split) {
    //console.log(stu.eat);
    //console.log($);
    var $insertData = $('.insertData');
    //    console.log($insertData);
    $insertData.on('click', function () {
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
            success: function (response) {

                $('#inputNewsTitle').val(response.news_title);
                $('#inputNewsContent').val(response.news_content);
                $('#inputNewsImgUrl').val(response.news_img_url);
                $('#inputNewsDate').val(response.news_date);
                $('#inputNewsKeyword').val(response.news_keyword);
                $('#inputNewsOrigin').val(response.news_origin);
            }

        });

        $('form').on('submit', function (event) {
            //            var title = $('#inputNewsTitle').val();
            //            var content = $('#inputNewsContent').val();
            //            console.log(title);
            //            if (title === '' && content === ' ') {
            //                $('#inputNewsTitle').addClass('border');
            //                $('#inputNewsContent').addClass('border');
            //            }


            event.preventDefault();

            var $inputNewsTitle = $('#inputNewsTitle').val();
            var flag = window.confirm('Do you wanna update the database or just add data to it? If you wanna update it, click OK. If you would like to add data to it, click CANCAL');
            console.log(flag);
            console.log(typeof flag);

            $.ajax('/submitData', {
                type: 'post',
                data: {
                    inputNewsTitle: $inputNewsTitle,
                    flag: flag,
                    'news_title': $('#inputNewsTitle').val(),
                    'news_content': $('#inputNewsContent').val(),
                    'news_img_url': $('#inputNewsImgUrl').val(),
                    'news_origin': $('#inputNewsOrigin').val(),
                    'news_date': $('#inputNewsDate').val(),
                    'news_keyword': $('#inputNewsKeyword').val(),
                    selectedId: $selectedIdNoSpace
                },
                success: function (response) {
                    console.log(response);
                    console.log(response[response.length - 1]);
                    console.log(response[response.length - 1].news_title);
                    var newsTitle = response[response.length - 1].news_title;
                    console.log(newsTitle);
                    var length = response.length;
                    if (flag) {
                        for (var i = 0; i < response.length; i++) {
                            $('.data3').eq(i).text(response[i].news_title);
                            $('.data2').eq(i).text(response[i].news_date);
                            console.log('nnnn');
                        }
                    } else {

                        $('.insertData').parent().append('<tr class = "insertData" ></tr>');
                        $('.insertData').eq(length - 1).append('<td class = "data1" >zxzx</td>');
                        $('.insertData').eq(length - 1).append('<td class = "data2" >xzz</td>');
                        $('.insertData').eq(length - 1).append('<td class = "data3" >zxz</td>');
                        $('.insertData').eq(length - 1).append('<td><button type="submit" class="btn btn-danger btn-delete">删除</button></td>');

                        $('.data1').eq(length - 1).text(response[response.length - 1].news_id);
                        $('.data2').eq(length - 1).text(response[response.length - 1].news_date);
                        $('.data3').eq(length - 1).text(response[response.length - 1].news_title);
                    }

                }

            });

        });


    });

    $('.btn-delete').on('click', function (event) {
        event.stopPropagation();
        //        console.log($(this));
        var idToBeDeleted = $(this).parent().prev().prev().prev().text().trim();
        //        console.log(idToBeDeleted);
        var $this = $(this);
        var flag = window.confirm("Do you really wanna delete this piece of data? If it's a yes, click OK. Otherwise, click CANCAL");
        if (flag) {
            $.ajax('/newsDeleting', {
                type: 'post',
                data: {
                    idToBeDeleted: idToBeDeleted
                },
                success: function (response) {
                    console.log($this.parent().parent());
                    $this.parent().parent().remove();

                }

            });
        }

    });
    var maxData = null;


    $(document).ready(function () {

        $.ajax('/split', {
            type: 'get',
            success: function (response) {
                //                console.log(response);
                maxData = response;
                console.log(maxData);

                var spl = new Split({
                    maxPage: maxData,
                    dataPerPage: 4,
                    container: '.pagination'
                });


            }
        });

    });


});
