/**
 * Created by Administrator on 2017/7/24.
 */
window.onload = function () {
    var btn = document.getElementsByTagName("input")[0];
    btn.onclick = function () {
        moveStart();
    }
}
function moveStart() {
    var oDiv1 = document.getElementById("div1");
    var timer = setInterval(function () {
        var speed = 0.1 * (300 - oDiv1.offsetLeft);
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (oDiv1.offsetLeft == 300){
            clearInterval(timer)
        }else {
            oDiv1.style.left = oDiv1.offsetLeft + speed + "px";
        }
    }, 30)
}