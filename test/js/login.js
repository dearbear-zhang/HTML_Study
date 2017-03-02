/**
 * Created by BYPC006 on 2017/3/1.
 */
function onLoginIn() {
    var service_ip = "http://120.26.208.28:8088/";
    var login_in = "Shoper/ShoperLogin.ashx";

    var account = $("#account").val();
    var pwd = $("#pwd").val();

    if ($.trim(account) == ""){
        alert("手机号不能为空");
        return;
    }
    if ($.trim(pwd) == ""){
        alert("密码不能为空");
        return;
    }

    var radnum = Math.random();
    var data = {
        "phone": account,
        "pwd": pwd,
        "nonce_str": radnum
    };

    var dataSign = {
        "phone": account,
        "pwd": pwd,
        "nonce_str": radnum,
        "sign": getSignParm(data)
    }

    $.ajax({
        type:"post",
        url: service_ip + login_in,
        data: dataSign,
        success : function (res) {
            if (res.status){
                setTimeout(function () {
                    location.href="home.html";
                }, 2000)
            }else {
                alert(data.msg);
            }
        },
        error:function () {
            console.log("请求失败");
        }
    })

}





