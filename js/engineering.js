window.onload=function(){
		var flag=0;
		$("#subtitle>ul>li").on({
			"click":function(){
				if(flag==0){
					$("#flag").remove();
				}
				else if(flag==1){
					flag=0;
				}
				$("#subtitle>ul>li").css({
					"background-color":"white",
					"color":"#22222a"
				});
				$(this).css({
					"background-color":"rgba(65,65,65,0.3)",
					"color":"white"
				});
				$(">span",this).css({
					"border-bottom":"none"
				});
				$(".all").hide();
				$("."+this.id).show();
				//处理mouseout的不同性
				$("#subtitle>ul>li").unbind("mouseout");
				$("#subtitle>ul>li").mouseout(function(){
					$(">span",this).css({
						"border-bottom":"none"
					});
					$(".second_class",this).hide();
				});
				$(this).unbind("mouseout");
				$("#subtitle>ul>li").mouseout();
				$(this).mouseout(function(){
					$(".second_class",this).hide();
				});
				//处理mouseover的不同性
				$("#subtitle>ul>li").unbind("mouseover");
				$("#subtitle>ul>li").mouseover(function(){
					$(">span",this).css({
						"border-bottom":"2px solid"
					});
					$(".second_class",this).show();
				});
				$(this).unbind("mouseover");
				$(this).mouseover(function(){
					$(".second_class",this).show();
				});
			}
		});
		$(".second_class li").click(function(){
			flag=1;
			$("#flag").remove();
			$(this).parent().prev().append("<span id='flag'> ＞"+$(this).text()+"</span>");
		});
		$(".engineer_box img").click(function(){
			$("#p_details").show();
		});
		$("#subtitle li:eq(0)").click();

		//图片点击显示
		$("#engineer_box img").click(function(){
			$("#engineer_nav span:last").text($(this).next().text());
			$("#engineer_show img").attr({"src":$(this).attr("src")})
		});
}