define(['jquery'], function ($) {


    class Split {
        constructor(obj) {
            this.init(obj);

        }
        init(obj) {
            this.render(obj);
            this.bind(obj);
            console.log(obj);
        }

        render(obj) {
            var pageNumber = Math.ceil(obj.maxPage / obj.dataPerPage);

            for (var i = 0; i < pageNumber; i++) {

                $('<li></li>').addClass('li1').text(i + 1).appendTo(obj.container);
                //                $('<a href="#"></a>').text(i + 1).appendTo('.li1');

            }

        }
        bind(obj) {
            $(obj.container).on('click', 'li', function () {

                console.log($(this).text());
                $.ajax('/splitBind', {
                    type: 'post',
                    data: {
                        pageNum: $(this).text()
                    },
                    success: function (response) {

                        response.forEach(function (item, index) {


                            $('.data1').eq(index).text(response[index].news_id);
                            $('.data2').eq(index).text(response[index].news_date);
                            $('.data3').eq(index).text(response[index].news_title);

                            console.log(response[index]);

                        });


                        console.log(response);





                    }
                });







            });
        }


    }

    return Split;
});
