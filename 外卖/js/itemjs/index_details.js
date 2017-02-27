
  var offset = $("#end").offset();
// details()
$(document).ready(function(){
  details()
})


//左侧栏
 function details(){
   var dataall=JSON.parse(localStorage.getItem("Dataall"))
   var controls = document.getElementById("segmentedControls");

    $(".intro h5").html(dataall.data[getQueryString("index")].cusname)
    $(".imgl img").attr("src",dataall.data[getQueryString("index")].logo)

   var radnum = RndNum(8);
   var ajaxdata = {
      "warehouseid":getQueryString("warehouseid"),
      "customerid":getQueryString("customerid"),
       "nonce_str": radnum
   }
   var ajaxsdata = {
      "warehouseid":getQueryString("warehouseid"),
      "customerid":getQueryString("customerid"),
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
              html+='<a class="mui-control-item lsit_l" onclick="detailslist('+DataList[index].customerid+','+DataList[index].goodstypeid+')">'+DataList[index].goodstypename+'</a>'
            })
          
            $('#segmentedControls').html(html)
              controls.querySelector('.mui-control-item').classList.add('mui-active');
              detailslist(DataList[0].customerid,DataList[0].goodstypeid)


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
      "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
      "pagesize":pageSize,
       "nonce_str": radnum
   }
   var ajaxsdata = {
      "customerid":customerid,
      "goodstypeid":goodstypeid,
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
         if (DataList=="") {
           $("#listgood").html("<p>无数据</p>");

         };
        
           if (data.status == 1) {  
            
             $.each(DataList,function(index){
                html += '<li class="be-box box-p-j"><div class="intro_imgl"><img src="images/coomon/merchant_01.jpg" alt="" /></div><div class="intro_mess box-flex1"><h5>'+DataList[index].goodsname+'</h5><span><em>月销量100份</em>好评率89%</span><p>￥<span class="price">'+DataList[index].productprice+'</span><small><img class="reduce" src="images/coomon/list_remove.png" alt="" /><b>0</b><img class="addcar" src="images/coomon/list_add.png" alt="" /></small></p></div><div class="intro_add"></div></li>';
             })
             
              $('#listgood').html(html)
                   
              if (DataList=="") {$("#listgood").html("<li style='color:red;background:none;text-algin:center;'>对不起没搜到产品</li>")}


              // 加入购物车动效

              //左侧栏
               function details(){
                 var memberid=3;
                 var warehouseid =3;
                 var customerid =8;
                 var productid =6;
                 var qty =1;

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
                       console.log(data)
                     },
                     error: function () {
                         console.log("请求失败！");
                     }
                 })


                    

               }


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
                  details();
                  $('.num').show()
                  $('.num').text(num)
                  $(".total em").text(smoney);
                  $(".footer button").css("background","#0176ff");
                }
             }
            $(function(){
             $(".addcar").bind("click",function(event){
                   var addcar = $(this);
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
                       addcar.css("cursor","default");
                       this.destory();
                     }
                   });
                   //加
                    
                    var bnum=$(this).siblings("b");
                    bnum.text(parseInt(bnum.text())+1);
                    selectNum(this,1);

                         
                       
                });
                
                  //减
                $(".reduce").bind("click",function(event){
                        var bnum=$(this).siblings("b");
                        if (parseInt(bnum.text())>0) 
                        {
                            bnum.text(parseInt(bnum.text())-1);
                            selectNum(this,0);
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



(function(){
  $(".shopping").click(function(){
    
  })
})