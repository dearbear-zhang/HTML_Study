$(document).ready(function(){

})





//用户普通注册
function UserRegister(phone) {
    var phone = $("#phone").val();
    var code = $("#code").val();
    var pwd = $("#pwd").val();
        

    if (!$("input[type='checkbox']").is(':checked')) {
        mui.toast("未同意用户协议")
        return;
    };
    if (phone=='') {
        mui.alert("请输入手机号！");   
        return;
    };
    if (code=='') {
        mui.alert("请输入验证码！");   
        return;
    };
    if (pwd=='') {
        mui.alert("请输入密码！");   
        return;
    };

    var radnum = RndNum(8);
    var ajaxdata = {
        "phone": phone,
        "code": code,
        "pwd": hcx_md5(pwd),
        "nonce_str": radnum,
    }
    var ajaxsdata = {
        "phone": phone,
        "code": code,
        "pwd": hcx_md5(pwd),
        "nonce_str": radnum,
        "sign": encrypt(ajaxdata)
    }
    $.ajax({
        type: "post",
        url: server_ip + 'Member/MemberRegister.ashx',
        data: ajaxsdata,
        success: function (data) {
            if (data.status == 1) {
                mui.alert(data.data[0].message);
                setTimeout(function(){location.href = 'index_my.html';},2000)  
               
            } else {
                mui.alert(data.msg);
            }
        },
        error: function () {
            console.log("请求失败！");
        }
    })
}









//获取验证码
function verifyCode(phone) {

    var msg = '';
    var radnum = RndNum(8);
    var ajaxdata = {
        "phone": phone,
        "nonce_str": radnum,
    }
    var ajaxsdata = {
        "phone": phone,
        "nonce_str": radnum,
        "sign": encrypt(ajaxdata)
    }
    $.ajax({
        type: "post",
        url: server_ip + 'Member/GetIdentityCode.ashx',
        data: ajaxsdata,
        async: false,
        success: function (data) {
            if (data.status == 1) {

            } else {
                msg = data.msg;
            }
        },
        error: function () {
            msg = "请求失败！";
        }
    })
    return msg;
}
//验证码倒计时
var isverify = true;

function verifyCount() {
    // 获取手机号
    var phone = $("#phone").val();
    //判断手机号是否为空
    if (!checkPhone(phone)) {
        mui.alert("手机号有误请重新输入！");
        return;
    }

    //控制60秒后才能点击
    if (!isverify) {
        return;
    }
    // 设置时间
    var second = 60;
    //获取验证码
    var msg = verifyCode(phone);
    if (msg == '') {
        var interval_id = setInterval(function () {
            if (second <= 0) {
                $("#yzm_code").text("获取验证码");
                clearInterval(interval_id);
                isverify = true;
            } else {
                $("#yzm_code").text("重新获取" + second + "秒");
                $("#yzm_code").css({"color":"#fff"});
                isverify = false;
            }
            second--;
        }, 1000)
    } else {
        mui.alert(msg);
    }

}




