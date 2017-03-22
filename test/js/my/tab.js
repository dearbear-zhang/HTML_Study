/**
 * Created by BYPC006 on 2017/3/20.
 */
var index = 0;
var subPages = ["waimai.html", "waimai.html", "waimai.html"];

mui.init();
mui.plusReady(function () {
    pageInit();
})

function pageInit() {
    //获取当前页面所属的webview窗口对象
    var self = plus.webview.currentWebview();
    // var  self = mui.currentWebview();
    for(var i = 0; i < 3; i++){
        // 创建webview子页
        var sub = plus.webview.create(
            subPages[i],
            subPages[i],
            {
                top :"45px",
                bottom  :   "50px"
            }
        );
        // 如果不是我们设置的默认的子页则隐藏,否则添加到窗口中
        if (i != index){
            sub.hide();
        }
        // 将webview 对象填充到窗口
        self.append(sub);
    }
    mui.toast("准备成功");

}