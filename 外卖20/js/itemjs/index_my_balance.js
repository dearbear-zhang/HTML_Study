// 会员充值
$(".money h5 span").html(user_mea.balance)	//获取本地储存的金额
function my_message(){

var money_numb = $("#money_numb").val();
if (money_numb=="") {
	mui.toast("金额不能为空")
	return;
};

	if (userlocal!=null) {
		var radnum = RndNum(8);
		var ajaxdata = {
		    "memberid": userlocal.memberid,
		    "money":money_numb,
		    "type":0,
		    "nonce_str": radnum
		}
		var ajaxsdata = {
		    "memberid": userlocal.memberid,
		    "money":money_numb,
		    "type":0,
		    "nonce_str": radnum,
		    "sign": encrypt(ajaxdata)
		}
		$.ajax({
		    type: "post",
		    url: server_ip + 'member/RemmberMemberWithdrawals.ashx',
		    data: ajaxsdata,
		    success: function (data) {
		    	var htmldata=data.data[0]
		        if (data.status == 1) {
		        	mui.alert(htmldata.message)//提示信息
		        	$(".money h5 span").html(htmldata.Column1)//插入最新金额
		        	localStroage.balance=htmldata.Column1//更新本地金额
		        } else {
		            mui.toast(data.msg);
		        }
		    },
		    error: function () {
		        console.log("请求失败！");
		    }
		})
	};
}

