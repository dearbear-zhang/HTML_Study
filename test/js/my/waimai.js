/**
 * Created by BYPC006 on 2017/3/17.
 */
$(document).ready(function () {
    search();
    swiperInit();
    sortRule()
});

/***
 * 搜索框控制
 */
function search() {
    $("#search_input").focus(function () {
        // $(this).hide();
        $("#search").removeClass("box-p-c");
        $("#search").addClass("box-p-s");
        $(this).attr("placeholder", "");
    })
    $("#search_input").blur(function () {
        $("#search").removeClass("box-p-s");
        $("#search").addClass("box-p-c");
        $(this).attr("placeholder", "搜索商家,商品名称");
    })
}

/***
 * 滑动控制
 */
function swiperInit() {
    var mySwiper = new Swiper('.swiper-container',{
        pagination : '.swiper-pagination',
        paginationClickable:true,
        paginationElement:"li"
//pagination : '#swiper-pagination1',
    });
}

/***
 * 商品排序规则
 */
function sortRule() {
    var sortItem = 0;
    $(".sortItem2").click(function () {
        var itemIdx = $(this).attr("data-index");
        // confirm(itemIdx)
        $(".sortRule").find("li").removeClass("active");
        $(".sortRule").find("img").attr("src", "images/coomon/head_jt02.png");
        $(this).addClass("active");
        $(this).find("img").attr("src", "images/coomon/head_jt01.png")
    })
}