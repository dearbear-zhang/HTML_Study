
(function($) {

     //启用右滑关闭功能
     mui.init({
       swipeBack: true 
     });


})(mui);

   $(document).ready(function(){
     order_detail()

   })


   function order_detail() {

     var temdat_all = JSON.parse(localStorage.getItem("temdat_all"))
     var index2 = getQueryString("index")

     var radnum = RndNum(8);
     var ajaxdata = {
       "orderid":temdat_all[index2].orderid,
       "nonce_str": radnum
     }
     var ajaxsdata = {
       "orderid":temdat_all[index2].orderid,
       "nonce_str": radnum,
       "sign": encrypt(ajaxdata)
     }


     $.ajax({
       type: "post",
       url: server_ip+"Customer/orderDetail.ashx",
       data:ajaxsdata,
       success: function(rs) {


         if(rs.status==1) {
           var resultHtml = rs.data;
           var html = "";


         	//下单时间拼接
           var time =temdat_all[index2].addtime;
           var time1=time.substr(0,10);
           var time2=time.substr(11,5);
           var timeall=time1+'&nbsp;&nbsp;'+time2;

             //状态判断
             var sta=temdat_all[index2].status
             switch(sta){
               case  0:
               sta ="未支付"; 
               $(".pj_btn").html("去支付");
               break;
               case  1:
               sta ="已支付" ;
               $(".pj_btn").hide()
               break;
               case  2:
               sta ="未接单" ;
               $(".pj_btn").hide()
               break;
               case  3:
               sta ="已接单" ;
               $(".pj_btn").hide()
               break;
               case  4:
               sta ="做餐中" ;
               break;
               case  5:
               sta ="配送中" ;
               break;
               case  6:
               sta ="已完成" ;
               $(".pj_btn").show("评价")
               $(".pj_btn").attr("onclick","pj_btn()")
               break;
               case  7:
               sta ="取消" ;
               break;
               case  8:
               sta ="申请退款中" ;
               break;
               case  9:
               sta ="已退款" ;
               break;

             }
             var paytype = temdat_all[index2].paytype
             console.log(temdat_all[index2].returnmoney)
             console.log(temdat_all[index2].minmoney)
             console.log(temdat_all[index2].paytype)
             switch (paytype){
               case null:
               paytype ="无支付方式"
               break;
               case 1:
               paytype ="余额支付"
               break;
               case 2:
               paytype ="微信支付"
               break;
               case 3:
               paytype ="支付宝支付"
               break;
             }  
             var zkbt
             if (temdat_all[index2].returnmoney<=0) {
                zkbt="&nbsp;"
             }else{zkbt="折扣：-￥"+temdat_all[index2].returnmoney};


    $(".tit h5").html(sta)//状态
    $(".img img").attr("src",temdat_all[index2].logo)//logo
		$(".title h2").html(temdat_all[index2].goodsname)//店名
		$(".arrive_time").html(temdat_all[index2].arrivetime)//下单时间
		$(".rests span em").html('￥'+temdat_all[index2].realpay)//总计
    $(".rests small em").html(zkbt)//折扣
		$(".address").html(temdat_all[index2].toaddress)//收货地址
		$(".name").html(temdat_all[index2].membername)//会员名
		$(".phone").html(temdat_all[index2].memberphone)//电话
		$(".order_id").html(temdat_all[index2].ordercode)//订单号
		$(".pay_money").html(paytype)//支付方式
		$(".data_time").html(timeall)//下单时间

		var htmlall="";
   $.each(resultHtml, function(index) {
    htmlall+='<p class="be-box be-p-a"><span style="width:75%;">'+resultHtml[index].goodsname+'</span><span class="box-flex1">x<em>'+resultHtml[index].qty+'</em></span><span>￥'+resultHtml[index].marketcost+'</span></p>'
           
  })
   $(".indent").append(htmlall)
   $(".indent").append('<p class="be-box be-p-a"><span style="width:75%;">配送费</span><span class="box-flex1"></span><span>￥'+temdat_all[index2].deliverycost+'</span></p>')




 }
},
error: function() {
 console.log("请求失败！");

}
})

}


// 订单状态跳转
function pj_btn(){

  switch (status){
    case 0://未支付
    mui.openWindow({
      url:'index_my_evaluate.html',
    });
    break;
    case 1://已支付
    mui.openWindow({
      url:'index_order_details.html?index='+index,
    });
    break;
    case 2://未接单
    mui.openWindow({
      url:'index_order_details.html?index='+index,
    });
    break;
    case 3:
    mui.openWindow({
      url:'index_order_details.html?index='+index,
    });
    break;
  }

  
}

$('.pj_btn').click(function(){
  location.href="index_my_evaluate.html"
})
