//道具一覽
var itemlist={};

itemlist.name="Tooloos Puli 裝備店";
itemlist.items=[
  {name:"黃色藥水",price:"500",cate:"藥品",buy_num:"0",pic_src:"https://imgur.com/i5sxuSL.png"},
  {name:"暗色羽絨帽",price:"400",cate:"帽子",buy_num:"0",pic_src:"https://imgur.com/jb6NuFs.png"},
  {name:"綠色藥水",price:"300",cate:"藥品",buy_num:"0",pic_src:"https://imgur.com/k2m1iMN.jpg"},
  {name:"濕透的破帽子",price:"50",cate:"帽子",buy_num:"0",pic_src:"https://imgur.com/33dA5hB.jpg"},
  {name:"潛行雨鞋",price:"888",cate:"下裝",buy_num:"0",pic_src:"https://imgur.com/u6Gnuw4.jpg"},
  {name:"素色條紋棉衣",price:"620",cate:"上裝",buy_num:"0",pic_src:"https://imgur.com/PG9ScII.jpg"},
  {name:"保暖靴子",price:"450",cate:"下裝",buy_num:"0",pic_src:"https://imgur.com/NXXhKGK.jpg"},
  {name:"加工出包的指環",price:"500",cate:"飾品",buy_num:"0",pic_src:"https://imgur.com/Z0Wv8Zt.jpg"},
  {name:"紅色藥水",price:"800",cate:"藥品",buy_num:"0",pic_src:"https://imgur.com/8oGVo3e.jpg"}
];

//style='background-image:url('')'  將圖片直接用style分開塞進去

//左邊item格子 {{cate}} {{name}} {{price}} {{pic}} {{id}}
var item_html="<div class='item' ><div class='item_pic' {{pic}}><h5 class='item_cate'>{{cate}}</h5></div><div class='bottom_intro'><div class='intro'><h4 class='name'>{{name}}</h4><div class='money'><div class='mon'></div><h3 class='price'>{{price}}</h3></div></div><div class='blue_btn add_btn' id='{{id}}'>＋</div></div>";

//右邊購物籃格 {{name}} {{cate}} {{price}} {{num}} {{item_id}}
var shoplist_html="<div class='list' id='{{item_id}}'><div class='item_pic' {{pic}}></div><div class='intro'><h4 class='name'>{{name}}</h4><h5 class='item_cate'>{{cate}}</h5><div class='money'><div class='mon'></div><h3 class='price'>{{price}}</h3></div></div><div class='last'><div class='count'><div class='add'>+</div><div class='num'>{{num}}</div><div class='subtract'>-</div></div><div class='blue_btn remove_btn'>移除全部</div></div></div>";



//生成item格
function renew_two_list(){
  $("#items_box").html("");
  $("#basket_box").html("");
  
  //生成左方裝備一覽
  for(var i=0;i<itemlist.items.length;i++){
    var current_left_html=
      item_html.replace("{{cate}}",itemlist.items[i].cate)
               .replace("{{price}}",itemlist.items[i].price)
               .replace("{{id}}",i) //add按鈕的id
               .replace("{{pic}}","style='background-image:url("+itemlist.items[i].pic_src+")'")
               .replace("{{name}}",itemlist.items[i].name);

    $("#items_box").append(current_left_html);
  };  
};
renew_two_list();



//點擊＋按鈕
  $(".add_btn").on({
    click:function(){
      var this_item_info=itemlist.items[parseInt(this.id)];
      var this_item_buynum=parseInt(itemlist.items[parseInt(this.id)].buy_num);
      
      $("#basket_box").removeClass("hole_text");
      
      //加入購物籃
      if(this_item_buynum<=0){
        
        
        //設立變數簡寫 計算+1 覆蓋陣列裡的buy_num數字
        this_item_buynum=parseInt(this_item_buynum)+1;
        itemlist.items[parseInt(this.id)].buy_num=this_item_buynum;
        
        
        var this_item_html=
          shoplist_html.replace("{{cate}}",this_item_info.cate)
                       .replace("{{price}}",this_item_info.price)
                       .replace("{{num}}",parseInt(this_item_buynum)) //顯示數字
                       .replace("{{pic}}","style='background-image:url("+this_item_info.pic_src+");background-size:cover'")
                       .replace("{{item_id}}",this.id)
                       .replace("{{name}}",this_item_info.name);
         
        $("#basket_box").append(this_item_html);
        total();
        
      }else{
        
        this_item_buynum=parseInt(this_item_buynum)+1;
        // add_item();
        
        itemlist.items[parseInt(this.id)].buy_num=this_item_buynum;
        
        
        //find 尋找指定位置中的id（#就是id .是class）
        $("#basket_box").find("#" + this.id + " .num").text(this_item_buynum); 
        
        total();
      };
    }
  });


//總價計算
function total(){
  var total=0;
  
   $("#basket_box .list").each(
    function(){
      var price=parseInt($(this).find(".price").text());
      var shop_item_num=parseInt($(this).find(".num").text());
      total+=price*shop_item_num;

   });
    
    //計算總價，方法2
    //for(var i=0;i<itemlist.items.length;i++){
    //    var price=parseInt(itemlist.items[i].price);
    //    var shop_item_num=parseInt(itemlist.items[i].buy_num);
    //    total+=price*shop_item_num;

    //    console.log(total);
    //};
  
    $(".total").find(".total_price").text(total);
  
};


//購物籃增加數量
$("#basket_box").on("click",".add",function(){
    
    
    itemlist.items[this.closest(".list").id].buy_num+=1;
  
    // .siblings()找兄弟／臨近元素 .closest()往回找父元素
    $(this).siblings(".num").text(itemlist.items[this.closest(".list").id].buy_num); 
    
    console.log(itemlist.items[this.closest(".list").id].buy_num);
    
    total();
  
});

//購物籃減少數量 .subtract
$("#basket_box").on("click",".subtract",function(){
    
    
    itemlist.items[this.closest(".list").id].buy_num-=1;
  
    $(this).siblings(".num").text(itemlist.items[this.closest(".list").id].buy_num); 
  
    if(itemlist.items[this.closest(".list").id].buy_num==0){
      $(this).closest(".list").remove();
      
      if($("#basket_box").text()==""){
        $("#basket_box").addClass("hole_text");
      };
      
    };
   
    
    total();
  
});

//移除全部： 移除按鈕非開場即存在，只好綁定在別人（這裡綁#basket_box）身上，讓程式有地方掛著運作
$("#basket_box").on("click",".remove_btn",function(){
      
    $(this).closest(".list").remove();
    itemlist.items[this.closest(".list").id].buy_num=0;
    
    if($("#basket_box").text()==""){
      $("#basket_box").addClass("hole_text");
    };
  
    total();
  
});
    



//篩選器 （未寫完）
var now_cate="全部";
$(".category").click(function(){
  
    //選取該篩選的css變化
    $(".category").removeClass("filter_choose"),
    $(this).addClass("filter_choose");
    
    //抓取當前點選的篩選項目類別
    now_cate=$(this).text();
    console.log(now_cate);
  
    
    for(var i=0;i<itemlist.items.length;i++){
      
      
      //抓取當前for正查看項目的cate eq()->第幾個符合條件的指定元素
      var this_item_cate=$("#items_box .item").eq(i).find(".item_cate").text();
      console.log(this_item_cate);
      
      //根據類別顯示項目與否
      if(this_item_cate==now_cate||now_cate=="全部"){
        $("#"+i).closest(".item").css("display","block");  //("").closest("") 是向回抓取父元素的用法
      }else{
        $("#"+i).closest(".item").css("display","none");
      };
     
     };
  
});