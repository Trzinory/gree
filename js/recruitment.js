window.onload=function(){
		var sTop=$("#rec_nav2").offset().top;
		$(window).scroll(function(){
			$("#rec_nav2").stop();
			var wScrollTop=$(window).scrollTop();
			var r=wScrollTop-sTop;
			if(r>0){
				$("#rec_nav2").offset({top:wScrollTop});
			}
			else{
				$("#rec_nav2").offset({top:sTop});
			}
		});
}