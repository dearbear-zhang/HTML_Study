
$(".payment tit h5").html()
function payment(){
		 var getcar = JSON.parse(localStorage.getItem("payment_data"))
		 console.log(getcar.orderid)
         var orderid =getcar.orderid;//订单ID 
         var type=1;//余额支付


         var radnum = RndNum(8);
         var ajaxdata = {
            "orderid":orderid,
            "type":type,
            "nonce_str": radnum
         }
         var ajaxsdata = {
            "orderid":orderid ,
            "type":type,
            "nonce_str": radnum,
            "sign": encrypt(ajaxdata)
         }
         $.ajax({
             type: "get",
             url: server_ip + 'Member/MemberPayMoney.ashx',
             data: ajaxsdata,
             success: function (data) {
                if (data.status==1) {
    
                	mui.alert(data.msg, '', function() {
    	                   location.href="index_order.html";
    	               });
    	

                };
                if (data.status==0) {
                	mui.toast(data.msg);
                };
                
             },
             error: function () {
                 mui.toast(data.msg);
             }
         })
}

mui('.payment').on('tap', 'a', function(e) {
	if ($(this).hasClass("mui-active")) {
		console.log($(this).find("em").html())
		if ($(this).find("em").html()!="余额支付") {
				$(".payment button").attr("disabled","true").css("background","#cac2c1")
				mui.toast("暂只支持余额支付")
		}else {$(".payment button").removeAttr("disabled").css("background","#0176ff")};
	};
})

