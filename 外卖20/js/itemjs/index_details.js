
var Request=GetRequest();
var datall= JSON.parse(decodeURIComponent(Request.data));//附近时空仓商家信息

var offset = $("#end").offset();
var enshrineID;//收藏ID

// details()
$(document).ready(function(){
  details()
  $(".deliverycost").text(datall.deliverycost)
  mui('.footer').on('tap', '.shopping', function(e) {

  })
  
})


merchant_message()
function merchant_message(){


  $("#merchant_phone").html(datall.phone+'<a href="tel:'+datall.phone+'"></a>')
  $("#merchant_address").html(datall.address)
  $("#merchant_time").html('配送时间：'+datall.deliverytime)
  $("#merchant_serve").html('配送服务：'+datall.servicedescription     )


}

//左侧栏
function details(){
 var dataall=JSON.parse(localStorage.getItem("Dataall"))
 var controls = document.getElementById("segmentedControls");

 $(".intro h5").html(dataall.data[getQueryString("index")].cusname)
 $(".imgl img").attr("src",dataall.data[getQueryString("index")].logo)

 var radnum = RndNum(8);
 var ajaxdata = {
  "warehouseid":datall.warehouseid,
  "customerid":datall.customerid,
  "nonce_str": radnum
}
var ajaxsdata = {
  "warehouseid":datall.warehouseid,
  "customerid":datall.customerid,
  "nonce_str": radnum,
  "sign": encrypt(ajaxdata)
}
$.ajax({
 type: "post",
 url: server_ip + 'Member/MemberGetGoodsType.ashx',
 data: ajaxsdata,
 success: function (data) {
   var DataList = data.data;

   var html=""
   if (data.status == 1) {
    $.each(DataList,function(index){
      html+='<a class="mui-control-item lsit_l goodstypelist" data-id="'+DataList[index].goodstypeid+'" onclick="detailslist('+DataList[index].customerid+','+DataList[index].goodstypeid+')">'+DataList[index].goodstypename+'<div class="num2" style="display: none;"></div></a>'
    })



    $('#segmentedControls').html(html)
    controls.querySelector('.mui-control-item').classList.add('mui-active');
    detailslist(DataList[0].customerid,DataList[0].goodstypeid)
    enshrine()//收藏接口


  } else {
   mui.toast(data.msg);
 }
},
error: function () {
 console.log("请求失败！");
}
})




}

//右侧栏
function detailslist(customerid,goodstypeid){
 var contents = document.getElementById("listgood");
 var curr=1;
   var pageSize =5//开始加载的数量
   var radnum = RndNum(8);
   var ajaxdata = {
    "customerid":customerid,
    "goodstypeid":goodstypeid,
    "warehouseid":datall.warehouseid,
    "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
    "pagesize":pageSize,
    "nonce_str": radnum
  }
  var ajaxsdata = {
    "customerid":customerid,
    "goodstypeid":goodstypeid,
    "warehouseid":datall.warehouseid,
    "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
    "pagesize":pageSize,
    "nonce_str": radnum,
    "sign": encrypt(ajaxdata)
  }
  $.ajax({
   type: "post",
   url: server_ip + 'Member/MemberGetGoodsList.ashx',
   data: ajaxsdata,
   success: function (data) {
     var html = ""; 
     var DataList = data.data;
     console.log(DataList)
     if (DataList=="") {
       $("#listgood").html('<p class="textc">无数据</p>');

     };

     if (data.status == 1) {  

       $.each(DataList,function(index){

        html += '<li class="be-box box-p-j" productid="'+DataList[index].productid+'"><div class="intro_imgl"><img src="'+DataList[index].goodspic+'" alt="" /></div><div class="intro_mess box-flex1"><h5>'+DataList[index].goodsname+'</h5><span><em>剩余'+DataList[index].stockqty+'份</em>好评率89%</span><p><span class="price">￥'+DataList[index].marketprice+'</span><small><img class="reduce" src="images/coomon/list_remove.png" alt="" /><b id="goodsid'+DataList[index].goodsid+'">0</b><img class="addcar" src="images/coomon/list_add.png" alt="" /></small></p></div><div class="intro_add"></div></li>';
      })

       $('#listgood').html(html)
       GetCarList()
       if (DataList=="") {$("#listgood").html("<li style='color:red;background:none;text-algin:center;'>对不起没搜到产品</li>")}

       var smoney=0;
       function selectNum(_this,type){
        var snum=$(".intro_mess small b");

        var num=0;
        for (var i = 0; i < snum.length; i++) {
         if (parseInt($(snum[i]).text())>0) 
         {
          num+=parseInt($(snum[i]).text());
        };
      };
      var money=$(_this).parents("li").find(".price");
      if (type==1) {
       smoney += parseInt(money.text());
     }
     else{
      smoney -= parseInt(money.text());
    }

    if (num<=0) 
    {
     $('.num').hide()
     $('.num').text()
     $(".total em").text(0);
     $(".footer button").css("background","#535354");
   }
   else{
    $('.num').show()
    $('.num').text(num)
    $(".total em").text(smoney);
    $(".footer button").css("background","#0176ff");
  }
}



$(function(){
 $(".addcar").bind("click",function(event){
  //判断用户是否登录
  IsLoginUser()


    var addcar = $(this);
    var img = $('.intro_imgl img').attr('src');
    var flyer = $('<div style="width:15px;height:15px;border-radius:50%;background:#1296db;">&nbsp;</div>');
    flyer.fly({
      start: {
        left: event.pageX,
        top: event.pageY
      },
      end: {
        left: offset.left+10,
        top: offset.top+10,
        width: 0,
        height: 0
      },
      onEnd: function(){
        $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
        addcar.css("cursor","default");
        this.destory();
      }
    });
                  //加
                  var productid=$(this).parents("li").attr("productid");
                  var bnum=$(this).siblings("b");
                  bnum.text(parseInt(bnum.text())+1);
                   //selectNum(this,1);
                   AddCarList(1,productid)
         



               });

                  //减
                  $(".reduce").bind("click",function(event){
                    var bnum=$(this).siblings("b");
                    var productid=$(this).parents("li").attr("productid");
                    if (parseInt(bnum.text())>0) 
                    {
                      bnum.text(parseInt(bnum.text())-1);
                            //selectNum(this,0);
                            AddCarList(-1,productid)
                          };

                        })


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


  // 结算隐藏
  mui('#sliderSegmentedControl').on('tap','a',function(){
    if ($(this).attr('href')=="#item1mobile"){$(".footer").fadeIn()}else{$(".footer").fadeOut("slow")};
  })


              // 加入购物车动效

              //加入购物车
              function AddCarList(qty,productid){
               var memberid=userlocal.memberid;
               var warehouseid =datall.warehouseid;
               var customerid =datall.customerid;
               var productid =productid;
               var qty =qty;

               var radnum = RndNum(8);
               var ajaxdata = {
                "memberid":memberid,
                "warehouseid":warehouseid,
                "customerid":customerid,
                "productid":productid,
                "qty":qty,
                "nonce_str": radnum
              }
              var ajaxsdata = {
                "memberid":memberid,
                "warehouseid":warehouseid,
                "customerid":customerid,
                "productid":productid,
                "qty":qty,
                "nonce_str": radnum,
                "sign": encrypt(ajaxdata)
              }
              $.ajax({
               type: "get",
               url: server_ip + 'Member/MemberNewOrder.ashx',
               data: ajaxsdata,
               success: function (data) {
                 GetCarList();
               },
               error: function () {
                 console.log("请求失败！");
               }
             })




            }


               //获取购物车
               function GetCarList(){
               
                var memberid=userlocal.memberid;
                var customerid =datall.customerid;

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

                   goodstypenum(data.data);

                   if (data.status==0){
                    $(".num").hide();
                    $(".total b em").text(0);
                    $(".intro_mess b").html(0)
                    $(".footer button").css("background","#535354");
                    $("#Settlement").removeClass("Settlement");
                    $("#Settlement").html('满￥'+parseInt(datall.startprice)+'   起送').css("color","#ccc")
                    $("#myCar").empty();
                    return;
                  }
                  $("#Settlement").addClass("Settlement");
                  vm.CarList=data.data;
                  var sumqty=0;
                  var sumoney=0;
                  for (var i = 0; i < data.data.length; i++) {
                    var qty =data.data[i].qty;
                    sumqty +=parseFloat(qty);
                    var marketprice=data.data[i].marketprice;
                    sumoney+=parseFloat(qty)*parseFloat(marketprice);//总费用

                   

                         //判断购车数量在DOM插入数量
                         if (data.status==1) { 
                          $("#goodsid"+data.data[i].goodsid).html(data.data[i].qty)
                        }

                      }

                      //判断起送有没满足阻止按钮下单
                      var psmoney=parseInt(datall.deliverycost)//配送费
                      var dimoney=parseInt(datall.startprice)//满送费

                      if (sumoney>=dimoney) {
                        $(".footer button").css("background","#0176ff"); 
                        $("#Settlement").addClass("Settlement");
                        $("#Settlement").html('去结算').css("color","#fff")
                      }else{ 
                        $(".footer button").css("background","#535354");
                        $("#Settlement").removeClass("Settlement");
                        $("#Settlement").html('还差￥'+(dimoney-parseInt(sumoney))+'   起送').css("color","#ccc")
                      }

                      if (true) {};
                      

                      $(".num").show();
                      $(".num").text(sumqty);
                      $(".total b em").text(sumoney.toFixed(2));
                      // $(".footer button").css("background","#0176ff");

                    },
                    error: function () {
                     console.log("请求失败！");
                   }
                 })




}

//左侧导航 数量
function goodstypenum(data){
  for (var i = 0; i < $(".goodstypelist").length; i++) {
    var num =0;
    if (data.length) {
      for (var y = 0; y < data.length; y++) {
       if ($($(".goodstypelist")[i]).attr("data-id")==data[y].goodstypeid) 
       {
         num +=parseInt(data[y].qty)
       }
     }
   }
   else{
    $($(".goodstypelist .num2")[i]).hide()
  }
  if (num) {
    $($(".goodstypelist .num2")[i]).show()
    $($(".goodstypelist .num2")[i]).text(num)}
    else{
      $($(".goodstypelist .num2")[i]).hide()
    }

  }
}




var vm=new Vue({
  el:"#myCar",
  data:{
    CarList:''
  },
  methods:{
    getList:function(){


    },caraddcar:function(event){
      var _this = $(event.currentTarget);
      var img = $('.intro_imgl img').attr('src');
      var flyer = $('<img class="u-flyer" src="'+img+'">');
      flyer.fly({
       start: {
         left: event.pageX,
         top: event.pageY
       },
       end: {
         left: offset.left+10,
         top: offset.top+10,
         width: 0,
         height: 0
       },
       onEnd: function(){
         $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000);
         _this.css("cursor","default");
         this.destory();
       }
     });
                   //加
                   var productid=_this.parents("li").attr("productid");
                   var bnum=_this.siblings("b");
                   bnum.text(parseInt(bnum.text())+1);
                    //selectNum(this,1);
                    AddCarList(1,productid)
                  },carreduce:function(event){
                   var _this = $(event.currentTarget);
                   var bnum=_this.siblings("b");
                   var productid=_this.parents("li").attr("productid");
                   if (parseInt(bnum.text())>0) 
                   {
                    bnum.text(parseInt(bnum.text())-1);
                            //selectNum(this,0);
                            AddCarList(-1,productid)
                          };

                        }
                      },
                      updated:function(){

                      }
                    })
vm.getList();


$(function() {
 $(".clearCar").click(function(){
  if (parseInt($(".num").text())<=0) {return}
    mui.confirm('是否清空购物车？', '提示', ['否', '是'], function(e) {
     if(e.index==0){return;}
     var memberid=userlocal.memberid;
     var customerid =datall.customerid;

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
     url: server_ip + 'Member/MemberCrearCart.ashx',
     data: ajaxsdata,
     success: function (data) {
      vm.CarList='';
      $(".intro_mess b").html(0);
      $(".num").hide();
      $(".total b em").text(0);
      $(".footer button").css("background","#535354");
      $("#Settlement").html('￥'+datall.startprice+'   起送').css("color","#ccc")
      $($(".goodstypelist .num2")).text('')
      $(".goodstypelist .num2").hide()
    },
    error: function () {
     console.log("请求失败！");
   }
 })    
  })
})


})







//判断是否收藏商家
function enshrine(){
      IsLoginUser()//判断是否有登录ID
      var radnum = RndNum(8);
      var ajaxdata = {
      "memberid":userlocal.memberid,
       "warehouseid":datall.warehouseid,
       "customerid":datall.customerid,
       "nonce_str": radnum
     }
     var ajaxsdata = {
       "memberid":userlocal.memberid,
       "warehouseid":datall.warehouseid,
       "customerid":datall.customerid,
       "nonce_str": radnum,
       "sign": encrypt(ajaxdata)
     }
     $.ajax({
      type: "post",
      url: server_ip + 'Member/MemberIsCollection.ashx',
      data: ajaxsdata,
      success: function (data) {
         
       if (data.status==1) {
          enshrineID=data.data[0].id
          $(".enshrine").attr("data","1")
          $(".enshrine img").attr("src","images/coomon/enshrine.png")

        }else if (data.status==0) {
          enshrineID="";
          $(".enshrine").attr("data","0")
          $(".enshrine img").attr("src","images/coomon/enshrine_active.png")
        };
     },
     error: function () {
      console.log(msg.data);
    }
  })
}








//判断是否收藏了
function judge_enshrine(){

if ($(".enshrine").attr("data")=="0") {
    add_enshrine()
    return;
};
if($(".enshrine").attr("data")=="1"){
    cler_enshrine()
     return;
};


}




//收藏
function add_enshrine(){

      var radnum = RndNum(8);
      var ajaxdata = {
        "memberid":userlocal.memberid,
       "warehouseid":datall.warehouseid,
       "customerid":datall.customerid,
       "nonce_str": radnum
     }
     var ajaxsdata = {
      "memberid":userlocal.memberid,
       "warehouseid":datall.warehouseid,
       "customerid":datall.customerid,
       "nonce_str": radnum,
       "sign": encrypt(ajaxdata)
     }
     $.ajax({
      type: "post",
      url: server_ip + 'Member/MemberCollectionCustomer.ashx',
      data: ajaxsdata,
      success: function (data) {
        if (data.status==1) {
          enshrineID=data.data[0].id;
          $(".enshrine").attr("data","1")
          $(".enshrine img").attr("src","images/coomon/enshrine.png")
           mui.toast("收藏成功")
        }

        if (data.status==0) {};{
          $(".enshrine").attr("data","1")
          $(".enshrine img").attr("src","images/coomon/enshrine.png")
        };
          
      
     },
     error: function () {
      console.log("请求失败！");
    }
  })
}


//取消收藏
function cler_enshrine(){
   if (enshrineID=="") {
    return;
   };
      var radnum = RndNum(8);
      var ajaxdata = {
       "id":enshrineID,
       "nonce_str": radnum
     }
     var ajaxsdata = {
       "id":enshrineID,
       "nonce_str": radnum,
       "sign": encrypt(ajaxdata)
     }
     $.ajax({
      type: "post",
      url: server_ip + 'Member/MemberCancelCollection.ashx',
      data: ajaxsdata,
      success: function (data) {
        if(data.status==1){
           $(".enshrine").attr("data","0")
           $(".enshrine img").attr("src","images/coomon/enshrine_active.png")
           mui.toast("取消收藏")
        }
        
     },
     error: function () {
      console.log("请求失败！");
    }
  })
}