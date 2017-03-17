/**
 * Created by BYPC006 on 2017/3/17.
 */
function serach() {
    var search = document.getElementById("search");
    var searchInput = document.getElementById("search_input");
    search.className = "be-box box-p-s";
    searchInput.setAttribute("placeholder", "");
}

$(document).ready(function () {
    $("#search_input").hover(function () {
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
})