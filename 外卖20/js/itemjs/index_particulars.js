var refishmark = 0;
var Request=GetRequest();//字符串转码对象
var datall= decodeURIComponent(Request.managementtypename);//字符串转码
$('.mui-title').html(datall)//标题插入
var mark=1;//用来判断无数据时self.endPullUpToRefresh(true)不执行
var curr=1;//分页页码
var myself;//结束div
mui.init({
 swipeBack: true
});
 //阻止触摸
$('body').on('touchmove',function(event){
     event.preventDefault();
 });


 // 下拉刷新
(function($) {
       //阻尼系数
         var deceleration = mui.os.ios?0.003:0.00006;
         $('.mui-scroll-wrapper').scroll({
           indicators: true, //是否显示滚动条
           deceleration:deceleration
           });

     
       $.ready(function() {

               collect(curr);//本页函数

                 //循环初始化所有下拉刷新，上拉加载。
                 $.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
                   $(pullRefreshEl).pullToRefresh({
                     up: {
                       contentnomore: '没有更多数据了',
                       callback: function() {
                        mark=2;
                         var self = this;
                         myself=this;//结束div赋值
                         setTimeout(function() {
                           var ul = self.element.querySelector('.mui-table-view');
                           ul.appendChild(createFragment(ul, index , 3));
                           self.endPullUpToRefresh();
                           if(refishmark==1){
                             self.endPullUpToRefresh(true);
                           }
                         }, 1000);
                       }
                     }
                   });
                 });

                 
                 var createFragment = function(ul, index, count, reverse) {
                   curr++;
                   var fragment = document.createDocumentFragment();
                   collect(curr);//本页函数
                   return fragment;
                   
                 };
         });
       })(mui);











 // 店家列表
 function collect(curr,type){

    var longitude= JSON.parse(localStorage.getItem("LocationData"))
   if (type) {
     if(mark==2){
      myself.endPullUpToRefresh(false);
      myself.refresh(true);
     }
      $(".mui-table-view").html("")
   };
       //console.log( longitude.positionx)
   if (!longitude) {
    return
   };
  
   var pageSize =5//开始加载的数量
   var radnum = RndNum(8);
   var ajaxdata = {
       "locationx":longitude.positionx,
       "locationy":longitude.positiony,
       "managementtypeid":getQueryString("managementtypeid"),
       "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
       "pagesize":pageSize,
       "nonce_str": radnum
   }
   var ajaxsdata = {
      "locationx":longitude.positionx,
       "locationy":longitude.positiony,
       "managementtypeid":getQueryString("managementtypeid"),
       "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
       "pagesize":pageSize,
       "nonce_str": radnum,
       "sign": encrypt(ajaxdata)
   }
   $.ajax({
       type: "post",
       url: server_ip + 'Member/MemberGetNearWareHouse.ashx',
       data: ajaxsdata,
       success: function (data) {
         var html = "";
         var DataList = data.data;
        //判断数据条没有时结束下拉刷新 
        if(DataList.length <= 0) {
          if (mark==2) {
             myself.endPullUpToRefresh(true);
           return;
          };
          
         }
         //判断开始加载的数据条小于等于时
         if(data <= pageSize) {
         refishmark = 1;
         }
           
           if (data.status == 1) {
             localStorage.setItem("Dataall",JSON.stringify(data))
             var photo; 
             $.each(DataList,function(index){
                 if (DataList[index].logo==null) {
                    photo = 'images/coomon/merchant_01.jpg'
                 }else{photo = DataList[index].logo};  
                 var tpl= JSON.stringify(DataList[index])
                 html+='<li class="be-box box-p-j" onclick=link_details('+tpl+','+index+')>'
                           +'<div class="merchant_l">'
                                +'<img src="'+photo+'" alt="">'
                            +'</div>'
                            +'<div class="merchant_r">'
                                +'<h5>'+DataList[index].cusname+'</h5>'
                               +'<p class="p1"><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx01.png" alt=""><span>月销量'+DataList[index].monthlysales+'单</span></p>'
                               +'<p class="p2"><span>起送￥'+DataList[index].startprice+'</span>|<span>配送￥'+DataList[index].deliverycost+'</span><em>距离'+DataList[index].distance+'公里</em></p>'
                               +'<div class="p5" id="activity'+DataList[index].customerid+'"></div>'
                            +'</div>'
                        +'</li>'
                        activity(index,DataList[index].customerid,DataList[index].warehouseid )//优惠接口
             })
        $(".mui-table-view").append(html)
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



  // 商家详情页跳转
 function link_details(data,index){
     data=JSON.stringify(data)
     mui.openWindow({
           url:'index_details.html?data='+encodeURIComponent(data)+'&index='+index,
           extras: {
                         entrance: data,
                         ProjectName: index
                     },
           waiting: {
                         autoShow: true, //自动显示等待框，默认为true
                     }
       });
 }







 //获取商家满减活动  
  function activity(index,customerid,warehouseid){
   
    var data_index = index;
    var radnum = RndNum(8);
    var ajaxdata = {
       "warehouseid":warehouseid,
       "customerid":customerid,
        "nonce_str": radnum
    }
    var ajaxsdata = {
       "warehouseid":warehouseid,
       "customerid":customerid,
        "nonce_str": radnum,
        "sign": encrypt(ajaxdata)
    }
    $.ajax({
        type: "post",
        url: server_ip + 'Member/GetCustomerActivity.ashx',
        data: ajaxsdata,
        success: function (data) {
         var resultdata=data.data;
         var html="";
         var html2=""
         if (data.status==1) {
          html='<p class="p4" id="act'+index+'"></p><p class="p3">新用户下单有好礼</p>';
          $("#activity"+customerid).html(html);
          $.each(resultdata,function(index){
                 html2+='<em>满'+resultdata[index].minmoney+'减'+resultdata[index].returnmoney+'</em>'
               })
               $("#act"+index).append(html2)
             
           
         };
           
        },
        error: function () {
            console.log("请求失败！");
        }
    })

  }





 // 排序

  mui('.head').on('tap', 'li', function(e) {
  
   $(".head").find("li").removeClass("active")
   $(".head").find("img").attr("src","images/coomon/head_jt02.png");

   $(this).addClass("active")
   $(this).find("img").attr("src","images/coomon/head_jt01.png");
   if ($(this).attr("data")==0) {
     collect(1,1)
   };
   if ($(this).attr("data")==1) {
     collect(1,1)
   };
   if ($(this).attr("data")==2) {
     collect(1,2)
   };
  })

