$(document).ready(function(){
address()
})

// 地址
function address(){

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
	    url: server_ip + 'Member/GetMemberAddress.ashx',
	    data: ajaxsdata,
	    success: function (data) {
	    	var htmldata=data.data
	    	var html="";
	        if (data.status == 1) {
	        	$.each(htmldata,function(index){
	        		html+='<div class="receipt_box">'
	                +'<div class="r_con">'
	                  +'<p>'
	                    +'<em>'+htmldata[index].div+'</em>'
	                    +'<span><img src="images/coomon/bj_address.png" alt=""></span>'
	                  +'</p>'
	                  +'<small>'+htmldata[index].address+'</small>'
	                +'</div>'
	                 +'</div>'
	        	})
			 $(".receipt_wrap").append(html)
			  //新建收货地址

			 
	        } else {
	            mui.toast(data.msg);
	        }
	    },
	    error: function () {
	        console.log("请求失败！");
	    }
	})
}

$('.r_tit span').click(function(){
	 mui.openWindow({
         url:'index_my_newaddress.html'
     });
})	