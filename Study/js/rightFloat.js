var timer = null;

window.onscroll = function () {

    var oDiv = document.getElementById("div1");
    var scrollTop= document.scrollTop || document.body.scrollTop;
    // oDiv.style.top = document.documentElement.clientHeight - oDiv.offsetHeight + scrollTop + "px";
    // oDiv.style.top = oDiv.offsetTop + scrollTop + "px";
    startMove(document.documentElement.clientHeight - oDiv.offsetHeight + scrollTop)
};

function startMove(toPosition) {
    var oDiv = document.getElementById("div1");

    clearInterval(timer);
    timer = setInterval(function () {
        var speed = 0.2 * (toPosition-oDiv.offsetTop);
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (oDiv.offsetTop == toPosition){
            clearInterval(timer);
        }else {
            oDiv.style.top = oDiv.offsetTop + speed + "px";
        }
    }, 30)
}