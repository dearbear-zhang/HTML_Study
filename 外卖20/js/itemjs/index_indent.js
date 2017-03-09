IsLoginUser();

var Request=GetRequest();
var customer= JSON.parse(decodeURIComponent(Request.data)) ;
var longitude= JSON.parse(localStorage.getItem("LocationData"))

//获取购物车列表
var vm=new Vue({
	el:"#MyApp",
	data:{
		List:'',
		Customer:customer,
		Money:0,
		AddressList:''
	},
	methods:{
		getList:function(){
      var memberid=userlocal.memberid;
      var customerid =customer.customerid;

      var radnum = RndNum(8);
      var ajaxdata = {
        "memberid":memberid,
        "customerid":customerid,
        "nonce_str": radnum
      }
      var ajaxsdata = {
        "memberid":memberid,
        "customerid":customerid,
        "nonce_str": radnum,
        "sign": encrypt(ajaxdata)
      }
      $.ajax({
       type: "post",
       url: server_ip + 'Member/MemberGetCarMessage.ashx',
       data: ajaxsdata,
       success: function (data) {
        vm.List=data.data;
        for (var i = 0; i < data.data.length; i++) {
         vm.Money+=parseFloat(data.data[i].marketcost)
       }
     },
     error: function () {
       console.log("请求失败！");
     }
   })

      address()


    }
  },
  updated:function(){
    chkcaridlist();
  }
})
vm.getList();

function selectaddress(_this){
  var address=$(_this).find(".dtl1").text()
  $(".btn-address").empty()
  $(".btn-address").append("<b style='font-weight:normal;'>"+address+"</b>");
  $(".addlist").fadeOut()
}


function gone(_this){
   var address=$(_this).find(".dtl1").text()
  $(".btn-address").empty()
  $(".addlist").fadeOut()
}
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
    var resdata = data.data
    if (data.status == 1) {
      vm.AddressList=data.data;
      $.each(resdata,function(index){
        if (resdata[index].is_defaut==1) {
          $(".btn-address b").html(resdata[index].address)
        };

      })
    } else {
     mui.toast(data.msg);       
   }
 },
 error: function () {
   console.log("请求失败！");
 }
})
}





$(function(){
	$(".btn-address").click(function(){
		$(".addlist").fadeIn()
	})
	$(".btn_order").click(function(){
   var memberid=userlocal.memberid;
   var city=longitude.cityb
   var carid=strcarid
   var toaddress=$(".btn-address b").html();
   var remark=$(".remark").val()?$(".remark").val():"无"
   var radnum = RndNum(8);
   if (!toaddress||toaddress=="请选择一个地址") {
    mui.toast("请选择收货地址！");
    return;
  }
  var ajaxdata = {
    "memberid":memberid,
    "city":city,
    "carid":carid,
    "toaddress":toaddress,
    "remark":remark,
    "nonce_str": radnum
  }
  var ajaxsdata = {
    "memberid":memberid,
    "city":city,
    "carid":carid,
    "toaddress":toaddress,
    "remark":remark,
    "nonce_str": radnum,
    "sign": encrypt(ajaxdata)
  }
  $.ajax({
   type: "get",
   url: server_ip + 'Member/MemberconfirmCart.ashx',
   data: ajaxsdata,
   success: function (data) {
    MemberPayMoney(data.data[0]);
  },
  error: function () {
   console.log("请求失败！");
 }
})
})
})
//会员去结算订单
function MemberPayMoney(data){
  localStorage.setItem("payment_data",JSON.stringify(data))
  window.location.href="index_payment.html"
	             // var orderid =data.orderid;
	             // var type=1;
              //    var radnum = RndNum(8);
              //    var ajaxdata = {
              //       "orderid":orderid ,
              //       "type":type,
              //       "nonce_str": radnum
              //    }
              //    var ajaxsdata = {
              //       "orderid":orderid ,
              //       "type":type,
              //       "nonce_str": radnum,
              //       "sign": encrypt(ajaxdata)
              //    }
              //    $.ajax({
              //        type: "get",
              //        url: server_ip + 'Member/MemberPayMoney.ashx',
              //        data: ajaxsdata,
              //        success: function (data) {
              //           console.log(data)

              //        },
              //        error: function () {
              //            console.log("请求失败！");
              //        }
              //    })
}
var strcarid=''
function chkcaridlist(){ 
  strcarid=''
  var list=$(".indent p");
  for (var i = 0; i < list.length; i++) {
   strcarid+=$(list[i]).attr("carid")+","
 }
    // strcarid=','+strcarid;
    strcarid=strcarid.substr(0,strcarid.length-1);
  }

