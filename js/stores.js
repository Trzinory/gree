window.onload=function(){
	var flag=0;
		$(".second_class li").click(function(){
			flag=1;
			$("#flag").remove();
			$(this).parent().prev().append("<span id='flag'> ＞"+$(this).text()+"</span>");
		});
		$("#stores_box>p>div").click(function(){
			var s=$(this).find("p").text();
			$("#stores_nav span:last").text($(this).find("p").text());
			$("#stores_title").html(s);
					data={content:"这里是文章内容"};
					$("#text").html(data.content);
			$.ajax({
				url:"getStore",
				type:"post",
				data:{amount:"one",storename:s},
				success:function(data){
				},
				error:function(){}
			});
		});
		$("#stores_box>p>div:eq(0)").click();

		//移动动画
			var n=Math.ceil($("#stores_box>p>div").length/6);
			var count=0;
			$("#stores_box>div:eq(0)").click(function(){
				if(count-1<0){
					return;
				}
				count--;
				$("#stores_box>p>div").animate({left:"+=1012px"});
			});
			$("#stores_box>div:eq(1)").click(function(){
				if(count+1>=n){
					return;
				}
				count++;
				$("#stores_box>p>div").animate({left:"-=1012px"});
			});
}