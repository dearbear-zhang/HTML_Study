/**
 * Created by Administrator on 2017/7/21.
 */
window.onload = function () {
    var info = [
        "11111"
        , "2222"
        , "3333"
        , "44444"
        , "5555"
        , "6666"
        , "7777"
        , "8888"
        , "9999"
        , "10"
        , "11"
        , "12"
    ]

    var titleDiv = document.getElementById("titleId");
    var buttons = titleDiv.getElementsByTagName("li");
    var contextDivs = titleDiv.getElementsByTagName("div")[0];

    for (var i = 0; i < buttons.length; i++){
        buttons[i].index = i;
        buttons[i].onmouseover = function () {
            for (var x = 0; x < buttons.length; x++){
                buttons[x].className = "";
                // contextDivs[x].style.display="none";
            }
            this.className = "active"
            contextDivs.innerHTML = '<h2>'+(this.index+1)+'月活动</h2><p>快过年了,大家商量去哪玩吧'+info[this.index]+'</p>'
        }
    }
    var arr = [1,2,3,4,5,6,111];
    var arrb = [5,5,5]
    arr.sort(function (n1,n2) {
        return n2-n1;
    })
    // arr.splice(1,0,[33,44])
    // alert(arr)
    function show() {
        alert("a")
    }
    function toDouble(x) {
        if (x<10){
            return "0" + x;
        }else {
            return "" + x;
        }
    }
    var oDate = new Date();
    var imgs = document.getElementsByClassName("img")
    var sDate = toDouble(oDate.getHours()) + toDouble(oDate.getMinutes()) + toDouble(oDate.getSeconds());
    // alert(sDate)
    imgs.offsetLeft -= 5+"px"

    var btn = document.getElementById("btn1");
    var text1 = document.getElementById("text1");
    var ul1 = document.getElementById("ul1");

    btn.onclick = function () {
        var aLi = ul1.getElementsByTagName("li");
        var oFrag = document.createDocumentFragment();

        for(var xx = 0; xx < 10000; xx++){
            var oLi = document.createElement("li");
            oLi.innerHTML = text1.value;
            // ul1.appendChild(oLi)
            oFrag.appendChild(oLi);
        }
        if (aLi.length > 0){
            ul1.insertBefore(oFrag, aLi[0])
        }else {
            ul1.appendChild(oFrag)
        }
    };
    // var aLi = ul1.getElementsByTagName("li");
    // for (var x = 0; x < aLi.length; x++){
    //     aLi[x].onclick = function () {
    //         // ul1.removeChild(this.parentNode);
    //         ul1.removeChild(aLi[x])
    //     }
    // }
    var timer = null;
    var oSlidingMenu = document.getElementById("slidingMenu");
    var oShareBtn = oSlidingMenu.getElementsByTagName("span")[0];
    oSlidingMenu.onmouseover = function () {
        startMove(0, 10);
    };
    oSlidingMenu.onmouseout = function () {
        startMove(-150, -10);
    }
    function startMove(toPostion, speed) {
        clearInterval(timer);
        timer = setInterval(function () {
            if (oSlidingMenu.offsetLeft == toPostion){
                clearInterval(timer);
            }else {
                oSlidingMenu.style.left = oSlidingMenu.offsetLeft + speed + "px";
            }
        }, 30)
    }
}




















