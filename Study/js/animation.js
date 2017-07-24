/**
 * Created by Administrator on 2017/7/24.
 */
window.onload = function () {
    var btn = document.getElementsByTagName("input")[0];
    btn.onclick = function () {
        moveSta_speedChange(300);
    }
};

/***
 * 变速
 */
function moveSta_speedChange(toPosition) {
    var oDiv1 = document.getElementById("div1");
    var timer = setInterval(function () {
        var speed = 0.1 * (toPosition - oDiv1.offsetLeft);
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (oDiv1.offsetLeft == toPosition){
            clearInterval(timer)
        }else {
            oDiv1.style.left = oDiv1.offsetLeft + speed + "px";
        }
    }, 30)
}

/***
 * 匀速
 */
function moveStart_speed_constant(toPosition) {
    var oDiv1 = document.getElementById("div1");
    var timer = setInterval(function () {
        var speed;
        if (oDiv1.offsetLeft < toPosition){
            speed = 10;
        }else {
            speed = -10;
        }
        if (Math.abs(oDiv1.offsetLeft - toPosition) <= Math.abs(speed)){
            clearInterval(timer)
            oDiv1.style.left = toPosition + "px";
        }else {
            oDiv1.style.left = oDiv1.offsetLeft + speed + "px";
        }
    }, 30)
}