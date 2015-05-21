window.onload=function(){
		function showPage(n,id,pn){
			//根据显示项数目生成Ajax式页码栏
			if(n<=24){
				$("#"+id).html("No More");
				return;
			}
			var max=10;
			var half=Math.floor((max-1)/2);
			var pages=Math.ceil(n/8);
			var gridrecord=0;
			var grid,pagerecord=1;
			if(pages<=max){
				for(var i=1;i<=pages;i++){
					$("#"+id).append("<div>"+i+"</div>");
				}
				$("#"+id).append("<div>></div>");
				grid=pages;
				$("#"+id+" div").click(function(){
					if(pn){
						var c=parseInt(pn);
					}
					else{
						var c=parseInt($(this).text());
					}
					if(!c){
						if(pagerecord<pages)
							c=pagerecord+1;
						else
							return;
					}
					$("#"+id+" div:eq("+gridrecord+")").css("background-color","white");
					$("#"+id+" div:eq("+(c-1)+")").css("background-color","#c1c1c1");
					gridrecord=c-1;
					pagerecord=c;
				});
			}
			else{
				for(var i=1;i<=max-1;i++){
					$("#"+id).append("<div>"+i+"</div>");
				}
				$("#"+id).append("<div>...</div><div>"+pages+"</div>")
				$("#"+id).append("<div>></div>");
				grid=max+1;
				$("#"+id+" div").click(function(){
					if(pn){
						var c=parseInt(pn);
					}
					else{
						var c=parseInt($(this).text());
					}
					if(!c){
						var clickText=$(this).text();
						if(clickText=="..."){
							if($(this).prev().text()=="1"){
								c=pagerecord-4;
							}
							else{
								c=pagerecord+4;
							}
						}
						else if(pagerecord<pages)
							c=pagerecord+1;
						else
							return;
					}
					if(c-half>2&&c+half<pages-1){
						$("#"+id+" div:eq("+1+")").text("...");
						$("#"+id+" div:eq("+(max-1)+")").text("...");
						for(var i=2;i<(max-1);i++){
							$("#"+id+" div:eq("+i+")").text(i+c-(half+1));
						}
						$("#"+id+" div:eq("+gridrecord+")").css("background-color","white");
						$("#"+id+" div:eq("+(half+1)+")").css("background-color","#c1c1c1");
						gridrecord=(half+1);
					}
					else if(c-half<=2){
						$("#"+id+" div:eq("+(max-1)+")").text("...");
						for(var i=1;i<(max-1);i++){
							$("#"+id+" div:eq("+i+")").text(i+1);
						}
						$("#"+id+" div:eq("+gridrecord+")").css("background-color","white");
						$("#"+id+" div:eq("+(c-1)+")").css("background-color","#c1c1c1");
						gridrecord=c-1;
					}
					else if(c+half>=pages-1){
						$("#"+id+" div:eq("+1+")").text("...");
						for(var i=2;i<max;i++){
							$("#"+id+" div:eq("+i+")").text(i+pages-max);
						}
						$("#"+id+" div:eq("+gridrecord+")").css("background-color","white");
						$("#"+id+" div:eq("+(max-(pages-c))+")").css("background-color","#c1c1c1");
						gridrecord=max-(pages-c);
					}
					else{
						alert("Error!")
					}
					pagerecord=c;
				});
			}
			
		}
		showPage(100,"page");
		$("#page div:eq(0)").click();
}