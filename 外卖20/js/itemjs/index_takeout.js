
 

var address;//经度，纬度，城市
var curr=1;//分页页码
var myself;//结束div     
var refishmark = 0;
var mark=1;


 // 
(function($) {
 


 // 右滑动是否开启
   mui.init({
      swipeBack: true ,
     
    });

  //阻尼系数
  var deceleration = mui.os.ios?0.003:0.00006;
  $('.mui-scroll-wrapper').scroll({
    indicators: true, //是否显示滚动条
    deceleration:deceleration
    });

 


 var longitude= JSON.parse(localStorage.getItem("LocationData"))
   if (longitude) {
        // var cityb="厦门市";
        var addres=longitude.address
      if(addres){
         GeoLocation2(longitude.cityb,addres,longitude.positionx,longitude.positiony);
         // GeoLocation2(cityb,addres,24.524984,118.161720);
      }
 }



 function getlocation(){
    var longitude= JSON.parse(localStorage.getItem("LocationData"))
    if (longitude) {
      GeoLocation2(longitude.cityb,longitude.address,longitude.positionx,longitude.positiony);
    };
 }
 // broad_heading();

//阻尼系数


      // 下拉刷新
     $.ready(function() {
            // GeoLocation()
             // broad_heading()
            

               //循环初始化所有下拉刷新，上拉加载。
               $.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
                 $(pullRefreshEl).pullToRefresh({
                   up: {
                     contentnomore: '没有更多数据了',
                     callback: function() {
                       var self = this;

                       myself=this;//结束div赋值

                       mark=2;

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
                 takeout(curr);//本页函数
                 return fragment;
                 
               };
       })

  })(mui);






// 阻止屏幕滑动
 $('body').on('touchmove',function(event){
      event.preventDefault();
  });

 // 商家详情页跳转
function link_details(data,index){
    data=JSON.stringify(data)
    mui.openWindow({
          url:'index_details.html?data='+encodeURIComponent(data)+'&index='+index,
      });
}

      // function link_details (data,index) { //list点击item后的事件
      //   mui.plusReady(function(){
      //     var nwaiting = plus.nativeUI.showWaiting();//显示原生等待框
      //     webviewContent= plus.webview.create('index_details.html?data='+encodeURIComponent(data)+'&index='+index);//后台创建webview并打开show.html
      //     webviewContent.addEventListener("loaded", function() { //注册新webview的载入完成事件
      //         nwaiting.close(); //新webview的载入完毕后关闭等待框
      //         webviewContent.show("slide-in-right",200); //把新webview窗体显示出来，显示动画效果为速度200毫秒的右侧移入动画
      //     }, false);
      //     });
      //   }





 
//
//// 定位
//function GeoLocation(){
//    var geolocation = null,result;
//
//    geolocation = new AMap.Geolocation({
//        enableHighAccuracy: true, //是否使用高精度定位，默认:true
//        timeout: 5000, //超过10秒后停止定位，默认：无穷大
//        maximumAge: 0, //定位结果缓存0毫秒，默认：0
//        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
//        showButton: true, //显示定位按钮，默认：true
//        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
//        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
//        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
//        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
//        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//    });
//
//    AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
//    AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
//
//    /*
//     *获取当前位置信息
//     */
//     getCurrentPosition(); //预加载定位
//    function getCurrentPosition() {
//        geolocation.getCurrentPosition();
//    };
//    /*
//     *监控当前位置并获取当前位置信息
//     */
//    function watchPosition() {
//        geolocation.watchPosition();
//    };
//    /*
//     *解析定位结果
//     */
//    function onComplete(data) {
//        positionx = data.position.getLng();
//        positiony = data.position.getLat();
//        address = data.addressComponent.city;
//        MapAddress();
//        $('#GeoLocation b').html(data.addressComponent.district+data.addressComponent.street+data.addressComponent.streetNumber)
//        localStorage.setItem("LocationData",JSON.stringify(data))
//        takeout(curr);//定位
//    };
//    /*
//     *解析定位错误信息
//     */
//    function onError(data) {
//        var str = '定位失败';
//        str += '错误：'
//        switch (data.info) {
//            case 'PERMISSION_DENIED':
//                str += '浏览器阻止了定位操作';
//                break;
//            case 'POSITION_UNAVAILBLE':
//                str += '无法获得当前位置';
//                break;
//            case 'TIMEOUT':
//                str += '定位超时';
//                break;
//            default:
//                str += '未知错误';
//                break;
//        }
//        $('#GeoLocation b').html(str)
//    };
//}
function GeoLocation2(city,addres,Locationx,Locationy){

if(!addres||!city){
  return
}
var LocationData={
    cityb:city,
    address:addres,
    positionx:Locationx,
    positiony:Locationy
    }
      localStorage.setItem("LocationData",JSON.stringify(LocationData))//储存经纬度到本地
    
    $('#GeoLocation b').html(addres) 
    $(".mui-table-view").html("")
    takeout(curr);//定位

}

// 店家列表
function takeout(curr,type,key){

  //判断是否为搜索进入
  if (key==1) {
    window.WebViewJavascriptBridge.callHandler(
    'search_btn'
    );
  };

  var keyword = $("#search").val();//获取关键字

//选择筛选时 重置下拉刷新
  if (type) {
    if(mark==2){
     myself.endPullUpToRefresh(false);
     myself.refresh(true);
    }
     $(".mui-table-view").html("")
  };

   var longitude= JSON.parse(localStorage.getItem("LocationData"))//获取本地经纬度

  if (!longitude) {
   return
  };
 
  var pageSize =5//开始加载的数量
  var radnum = RndNum(8);
  var ajaxdata = {
      "locationx":longitude.positionx,
      "locationy":longitude.positiony,
      "type":type,
      "keyword":keyword,
      "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
      "pagesize":5,
      "nonce_str": radnum
  }
  if (keyword=="") {
    delete ajaxdata.keyword;
  };//关键字为空时删除对象属性keyword
  var ajaxsdata = {
      "locationx":longitude.positionx,
      "locationy":longitude.positiony,
      "type":type,
      "keyword":keyword,
      "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
      "pagesize":5,
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
       //满减活动接口
    
          } else {
              mui.toast(data.msg);
          }
      },
      error: function () {
          console.log("请求失败！");
      }
  })
}


// // 大类列表
// function broad_heading(curr){
  
//   var pageSize =3//开始加载的数量
//   var radnum = RndNum(8);
//   var ajaxdata = {
//       "nonce_str": radnum
//   }
//   var ajaxsdata = {
//       "nonce_str": radnum,
//       "sign": encrypt(ajaxdata)
//   }
//   $.ajax({
//       type: "post",
//       url: server_ip + 'Member/MemberManagementType.ashx',
//       data: ajaxsdata,
//       success: function (data) {
//         var html = "";
//         var DataList = data.data;
//           if (data.status == 1) {
//             $.each(DataList,function(index){
//               html+=  '<li onclick="link_cate(\''+DataList[index].managementtypename+'\','+DataList[index].managementtypeid+')"><a href="#"><img src="'+DataList[index].managementpic+'" alt=""></a><p>'+DataList[index].managementtypename+'</p></li>'
                     
//             })
//        $(".mui-table-view2").append(html)
    
//           } else {
//               mui.toast(data.msg);
//           }
//       },
//       error: function () {
//           console.log("请求失败！");
//       }
//   })
// }

var app=new Vue({
  el:"#top_banner",
  data:{
    ListBroad:""
  },
  mounted:function(){
    this.getList();
  },
  methods:{
    getList:function(){
      var _this = this;
      var pageSize =3//开始加载的数量
      var radnum = RndNum(8);
      var ajaxdata = {
          "nonce_str": radnum
      }
      var ajaxsdata = {
          "nonce_str": radnum,
          "sign": encrypt(ajaxdata)
      }
      $.ajax({
          type: "post",
          url: server_ip + 'Member/MemberManagementType.ashx',
          data: ajaxsdata,
          success: function (data) {
            _this.ListBroad = data.data;
          },
          error: function () {
              mui.toast(data.msg);
          }
      })
    },
    link_cate:function(managementtypename,managementtypeid){
          mui.openWindow({
          url:'index_particulars.html?managementtypeid='+managementtypeid+'&managementtypename='+managementtypename,   
        });
    },
  
  }
})


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








//点击弹出搜索窗体
// reginboxid=document.getElementById('GeoLocation');
// reginboxid.addEventListener("click", function () {
//     $(".searchbar").show(function () {
//         beginplace4.focus();
//     })
//     $('#beginplace4').val($(this).val())
//     $('#city').html(address)
// });


// // 手动输入位置
// function MapAddress() {
//     var btn = new AMap.Autocomplete({
//         input: "beginplace4",
//         city: address
//     });
//     AMap.event.addListener(btn, "select", function (e) {
//         setTimeout('addaddress()', 100)
//          positiony = e.poi.location.getLat(); //获取纬度
//          positionx = e.poi.location.getLng(); //获取经度
//     });
// }

/*//载入地址
function addaddress() {
    $('#GeoLocation b').html($('#beginplace4').val());
    $(".searchbar").hide(500) //处理事件
}


//点击重新定位
 mui('#again_position').on('tap','img',function(e) {
   GeoLocation()
 })*/



  //  底部导航
 mui('.mui-bar-tab').on('tap', 'a', function(e) {
      if(this.querySelector('.mui-tab-label').innerHTML == '外卖'){
         mui.openWindow({
           url:'index.html',
           waiting: {
                    autoShow: true, //自动显示等待框，默认为true
                    }
       });
      }
      if(this.querySelector('.mui-tab-label').innerHTML == '订单'){

           mui.openWindow({
           url:'index_order.html',
           waiting: {
                    autoShow: true, //自动显示等待框，默认为true
                    }
         });
      }
      if(this.querySelector('.mui-tab-label').innerHTML == '我的'){
           mui.openWindow({
           url:'index_my.html',
           waiting: {
             title:'loading....',
             options:{
                 width:"200px",
                 height:"200px",
                 background:"#f0000"
             }
                  
           }
         });
      }
})


//大类详情页
// function link_cate(managementtypename,managementtypeid){
//     mui.openWindow({
//     url:'index_particulars.html?managementtypeid='+managementtypeid+'&managementtypename='+managementtypename,
//     waiting: {
//       title:'loading....',
//       options:{
//           width:"200px",
//           height:"200px",
//           background:"#f0000"
//       }
           
//     }    
//   });
//  }




// 排序

 mui('#px_list').on('tap', 'li', function(e) {
 
  $("#px_list").find("li").removeClass("active")
  $("#px_list").find("img").attr("src","images/coomon/head_jt02.png");

  $(this).addClass("active")
  $(this).find("img").attr("src","images/coomon/head_jt01.png");
  if ($(this).attr("data")==0) {
    takeout(1,1)
    
  };
  if ($(this).attr("data")==1) {
    takeout(1,2)
   
  };
  if ($(this).attr("data")==2) {
    takeout(1,1)
    
  };
 })


// address=localStorage.getItem("address")
 //    if(address!="undefined")
 //    {  
 //    position=JSON.parse(localStorage.getItem("longitude"))
 //    if ($.trim(position)!='') {
 //      GeoLocation(address,position.locationx,position.locationy);//定位
 //    };

 //  }else{
 //      $('#GeoLocation b').html("定位中....")
 //  };





// 定位
// function GeoLocation(address,positionx,positiony){

//     if (address!="undefined") {
//       var longitude = {
//       locationx:positionx,
//       locationy:positiony
//       };
//        localStorage.setItem("address",address)
//        localStorage.setItem("longitude",JSON.stringify(longitude))
//         takeout(curr)
//        $('#GeoLocation b').html(address)
//     }else{
//           address=localStorage.getItem("address")
//           $('#GeoLocation b').html(address)

//       }

  
    

// }   




 //点击弹出搜索窗体
 mui('.takeout_head').on('tap','p',function(e) {
      window.WebViewJavascriptBridge.callHandler(
     'reginboxid'
     );

 })

 //点击重新定位
 mui('#again_position').on('tap','img',function(e) {

      window.WebViewJavascriptBridge.callHandler(
     'again_postion'
     );
 })




 //IOS独立跳转函数
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

setupWebViewJavascriptBridge(function(bridge) {
  var uniqueId = 1
  function log(message, data) {
      var log = document.getElementById('log')
      var el = document.createElement('div')
      el.className = 'logLine'
      el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
      if (log.children.length) { log.insertBefore(el, log.children[0]) }
      else { log.appendChild(el) }
  }

  bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
      log('ObjC called testJavascriptHandler with', data)
      var responseData = { 'Javascript Says':'Right back atcha!' }
      log('JS responding with', responseData)
      responseCallback(responseData)
  })
})

function myFunction(){
  //判断是否为回车事件
  if(event.keyCode==13){
    takeout(1,1,1)
    $("#search").blur() //移除焦点
  }
}

//搜索
$('.btn').click(function(){
  takeout(1,1,1)
})




