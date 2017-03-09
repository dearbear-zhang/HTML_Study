$(document).ready(function(){
	usermessage()
	my_message()
})




// 获取会员资料
function my_message(){
	if (userlocal!=null) {
		var radnum = RndNum(8);
		var ajaxdata = {
		    "memberid": userlocal.memberid,
		    "nonce_str": radnum,
		}
		var ajaxsdata = {
		    "memberid": userlocal.memberid,
		    "nonce_str": radnum,
		    "sign": encrypt(ajaxdata)
		}
		$.ajax({
		    type: "post",
		    url: server_ip + 'member/GetMemberMessage.ashx',
		    data: ajaxsdata,
		    success: function (data) {
		    	var htmldata=data.data[0]
		        if (data.status == 1) {
		        	$(".img img").attr("src",htmldata.photo)
		           	$(".title").html(htmldata.membername)
		           	$(".phone3").html(htmldata.phone)
		           	$('.balance').html(htmldata.balance)

		           	localStorage.setItem("user_message",JSON.stringify(htmldata))
		           	console.log(htmldata)
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

// 登陆状态显示
function usermessage(){
	if (userlocal==null) {
	 $(".my_head").hide();
	 $(".my_head2").show();         
	}else{$(".my_head").show();$(".my_head2").hide()};
}