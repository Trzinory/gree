window.onload=function(){
		$("#right").css("width",(window.innerWidth-140)+"px");
   		window.onresize=function(){
    		$("#right").css("width",(window.innerWidth-140)+"px");
    	}

    //选项选择和点击时的效果
    	$("#list li").mouseover(function(){
    		$(this).css("background-color","rgba(65,65,65,0.2)");
    	});
    	$("#list li").mouseout(function(){
    		$(this).css("background-color","transparent");
    	});
    	$("#list li").click(function(){
    		$("#list li").css({"background-color":"transparent","color":"#f1f1f1"});
    		$(this).css({"background-color":"white","color":"#34333f"});
    		$("#list li").unbind("mouseover");
    		$("#list li").mouseover(function(){
    			$(this).css("background-color","rgba(65,65,65,0.2)");
    		});
    		$(this).unbind("mouseover");
    		$("#list li").unbind("mouseout");
    		$("#list li").mouseout(function(){
    			$(this).css("background-color","transparent");
    		});
    		$(this).unbind("mouseout");
    		$("#function ul").hide();
    		$("#function ."+this.className).show();
    		$("#function ."+this.className+" li:eq(0)").click();
    	});
    	$("#function li").click(function(){
    		$("#function li").css({"background-color":"transparent"});
    		$(this).css({"background-color":"white"});
    		$("#function li").unbind("mouseover");
    		$("#function li").mouseover(function(){
    			$(this).css("background-color","rgba(65,65,65,0.1)");
    		});
    		$(this).unbind("mouseover");
    		$("#function li").unbind("mouseout");
    		$("#function li").mouseout(function(){
    			$(this).css("background-color","transparent");
    		});
    		$(this).unbind("mouseout");
    	});
    	//选项点击后主页面内容显示对应内容
    	var liRecord="welcome_phrase";
    	$("#details ."+liRecord).show();
    	$("#function li").click(function(){
    		if(liRecord){
    			$("#details ."+liRecord).hide();
    		}
    		liRecord=this.className;
    		$("#details ."+liRecord).show();
    	});
    	$("#top>div").click(function(){
    		if(this.className){
    			$("#function ul").hide();
    			if(liRecord){
    				$("#details ."+liRecord).hide();
    			}
    			liRecord=this.className;
    			$("#details ."+liRecord).show();
    			$("#list li").css({"background-color":"transparent","color":"#f1f1f1"});
    			$("#list li").mouseover(function(){
    				$(this).css("background-color","rgba(65,65,65,0.2)");
    			});
    			$("#list li").mouseout(function(){
    				$(this).css("background-color","transparent");
    			});
    		}
    		else{
				var form=document.createElement("form");
				form.method="get";
				form.action="/logout";
				form.submit();
			}
    	});

	//页码生成函数
		function showPage(n,id,pn){
			//根据显示项数目生成Ajax式页码栏
			if(n<=10){
				return;
			}
			var max=10;
			var half=Math.floor((max-1)/2);
			var pages=Math.ceil(n/10);
			var gridrecord=0;
			var grid,pagerecord=1;
			var s="";
			if(pages<=max){
				for(var i=1;i<=pages;i++){
					s+="<div>"+i+"</div>";
				}
				s+="<div>></div>";
				$("#"+id).html(s);
				grid=pages;
				$("#"+id+" div").click(function(){
					if(pn){
						c=parseInt(pn);
					}
					else{
						c=parseInt($(this).text());
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
					s+="<div>"+i+"</div>";
				}
				s+="<div>...</div><div>"+pages+"</div>";
				s+="<div>></div>";
				$("#"+id).html(s);
				grid=max+1;
				$("#"+id+" div").click(function(){
					if(pn){
						c=parseInt(pn);
					}
					else{
						c=parseInt($(this).text());
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

	//编写框
		$(".click_edit").click(function(){
			$(".edit_box").remove();
			$(this).parent().append("<div class='edit_box .details'><div class='edit_function'><span>插入图片</span><span class='pub'>发布文章</span><p class='clear'></p></div><input id='news_title' maxlength='30'><div id='text_box' contenteditable><p> </p><p><br></p></div><form id='picform'><input type='file' id='file'></form></div>");
			$(this).hide();
		});


	//插入表格行函数
		function TrInsert(selector){
			var newTr="<tr>"+$(selector+" tr:eq(0)").html()+"</tr>";
			$(selector).append(newTr);
			var nTr=$(selector+" tr").length-1;
			var nTd=$(selector+" tr:eq(0) td").length;
			if($(selector+" tr:eq(0) td:eq(0)").hasClass("number")){
				$(selector+" tr:eq("+nTr+") td:eq(0) span").text(nTr);
			}
		}


	//-----------------------account_manage-----------------------
		$("#top .account_manage").click(function(){
			var table=$("#details .account_manage table table");
			var len=table.find("tr").length;
			for(var i=1;i<len;i++){
				table.find("tr:eq(1)").remove();
			}
			data={userinfo:[{account:"Trzinory",permission:1},{account:"ChanSea",permission:2},{account:"Hanin",permission:0},]};
					for(var i=0;i<data.userinfo.length;i++){
						TrInsert("#details .account_manage table table");
						$("#details .account_manage table table tr:last .account span").text(data.userinfo[i].account);
						$("#details .account_manage table table tr:last .permission span").text(data.userinfo[i].permission);
						if(data.userinfo[i].permission<2){
							$("#details .account_manage table table tr:last .operation").html("<span class='button'>编辑</span><span class='button'>删除</span>");
						}
						else{
							$("#details .account_manage table table tr:last .operation").html("无法修改");
						}
					}
			$.ajax({
				url:"getAccount",
				type:"get",
				data:null,
				success:function(data){
					for(var i=0;i<data.userinfo.length;i++){
						TrInsert("#details .account_manage table table");
						$("#details .account_manage table table tr:last .account span").text(data.userinfo[i].account);
						$("#details .account_manage table table tr:last .permission span").text(data.userinfo[i].permission);
						if(data.userinfo[i].permission<2){
							$("#details .account_manage table table tr:last .operation").html("<span class='button'>编辑</span><span class='button'>删除</span>");
						}
						else{
							$("#details .account_manage table table tr:last .operation").html("无法修改");
						}
					}
				}
			});
		});
		var number=0;//记录删除的行数
		$("#details .account_manage").delegate(".button","click",function(){
			var t=this;
			var permission=$(this).parent().siblings(".permission");
			if($(this).text()=="编辑"){
				var opms=permission.find("span").text();
				permission.find("span").hide();
				permission.append("<select><option>0</option><option>1</option></select>");
				permission.find("option:contains('"+opms+"')").attr("selected", "selected");
				$(this).text("确定");
				$(this).next().text("取消");
			}
			else if($(this).text()=="删除"){
				$("#bottom").show();
				var act=$(this).parent().siblings(".account").find("span").text();
				$("#full .account_manage .delete p span").text(act);
				$("#full .account_manage .delete").show();
			}
			else if($(this).text()=="确定"){
				$("#waiting").show();
				if(permission.find("option:selected").text()==permission.find("span").text()){
					$("#waiting").hide();
					permission.find("select").remove();
					permission.children().show();
					$(this).text("编辑");
					$(this).next().text("删除");
				}
				else{
					var pms=permission.find("option:selected").text();
					var act=$(this).parent().siblings(".account").find("span").text();
								$("#waiting").hide();
								permission.find("select").remove();
								permission.find("span").text(pms).show();
								$(t).text("编辑");
								$(t).next().text("删除");
					$.ajax({
						url:"manageAccount",
						type:"post",
						data:{"manage":"edit","account":act,"permission":pms},
						success:function(data){
							if(data.status=="success"){
								$("#waiting").hide();
								permission.find("select").remove();
								permission.find("span").text(pms).show();
								$(t).text("编辑");
								$(t).next().text("删除");
							}
						},
						error:function(){
							//alert("error");
							//permission.find("select").remove();
							//permission.children().show();
							//$(t).text("编辑");
							//$(t).next().text("删除");
						}
					});
				}
			}
			else if($(this).text()=="取消"){
				permission.find("select").remove();
				permission.children().show();
				$(this).text("删除");
				$(this).prev().text("编辑");
			}
		});
		$("#full .account_manage .delete .button").click(function(){
			if($(this).text()=="确定"){
				$("#bottom").hide();
				$("#full>div>div").hide();
				$("#waiting").show();
				var act=$(this).closest("div").find("p span").text();
							var len=$("#details .account_manage table table tr").length;
							for(var i=1;i<len;i++){
								if(act==$("#details .account_manage table table tr:eq("+i+")").find(".account span").text()){
									$("#details .account_manage table table tr:eq("+i+")").remove();
									break;
								}
							}
							$("#waiting").hide();
				$.ajax({
					url:"manageAccount",
					type:"post",
					data:{"manage":"delete","account":act},
					success:function(data){
							var len=$("#details .account_manage table table tr").length;
							for(var i=1;i<len;i++){
								if(act==$("#details .account_manage table table tr:eq("+i+")").find(".account span").text()){
									$("#details .account_manage table table tr:eq("+i+")").remove();
									break;
								}
							}
							$("#waiting").hide();
					},
					error:function(){}
				});
			}
		});
		$(".cancel,#bottom").click(function(){
			$("#bottom").hide();
			$("#full>div>div").hide();
		});
	//-----------------------my_account-----------------------
		//点击进入页面时发送ajax
			$("#top .my_account").click(function(){
				$("#details .my_account input").val("");
				$("#details .my_account p").text("");
				data={username:"Trzinory"};
						$("#details .my_account .account").text(data.username);
				$.ajax({
					url:"managePassword",
					type:"post",
					data:{manage:"get"},
					success:function(data){
						$("#details .my_account .account").text(data.username);
					},
					error:function(){}
				});
			});
		//确定按钮
			$("#details .my_account .button").click(function(){
				if($(this).text()=="确定"){
					var pas1=$("#details .my_account input:eq(0)").val();
					var pas2=$("#details .my_account input:eq(1)").val();
					var pas3=$("#details .my_account input:eq(2)").val();
					if(pas2!=pas3){
						$("#details .my_account input:eq(1)").next().text("新密码两次输入不同！");
					}
					else if(flag[0]&&pas1&&!pas2){
						$("#details .my_account input:eq(1)").next().text("值为空");
						$("#details .my_account input:eq(2)").next().text("值为空");
					}
					else if(pas2&&!pas1){
						$("#details .my_account input:eq(0)").next().text("值为空");
					}
					else if(pas1&&pas1==pas2){
						$("#details .my_account input:eq(1)").next().text("新旧密码相同");
					}
					else if(flag[0]&&flag[1]&&flag[2]){
						var op=$("#details .my_account input:eq(0)").val();
						var np=$("#details .my_account input:eq(1)").val();
						var data={status:"error"};
								if(data.status=="success"){
									var form=document.createElement("form");
									form.method="get";
									form.action="/logout";
									form.submit();
								}
								else{
									$("#details .my_account input:eq(0)").next().text(data.status);
								}
						$.ajax({
							url:"managePassword",
							type:"post",
							data:{manage:"change",oldpassword:op,newpassword:np},
							success:function(data){
								if(data.status=="success"){
									var form=document.createElement("form");
									form.method="get";
									form.action="/logout";
									form.submit();
								}
								else{
									$("#details .my_account input:eq(0)").next().text(data.status);
								}
							},
							error:function(){}
						});
					}
				}
			});
		//输入检测
			var flag=new Array();
			for(var i=0;i<3;i++){
				flag[i]=0;
			}
			var pattern1=/[^!-z]/,pattern2=/^[\u4e00-\u9fa5A-Za-z0-9_]+$/;
			var pi1=$("#details .my_account input:eq(0)"),pi2=$("#details .my_account input:eq(1)"),pi3=$("#details .my_account input:eq(2)");
			pi1.on({
				"input":function(){
					var str=$(this).val();
					if(pattern1.test(str)){
						$(this).next().text("字符有误");
						flag[0]=0;
					}
					else {
						$(this).next().text("");
						flag[0]=1;
						if(pi2.next().text()=="新旧密码相同"){
							pi2.next().text("");
						}
					}
				},
				"blur":function(){
					var str=$(this).val();
					if(str.length<8&&str.length>0){
						$(this).next().text("密码长度至少为8位");
						flag[0]=0;
					}
					else if(str.length==0){
						if(!pi2.val()&&!pi3.val()){
							pi2.next().text("");
							pi3.next().text("");
						}
						flag[0]=1;
					}
				}
			});
			pi2.on({"input":function(){checkPas1(1,this)},"blur":function(){checkPas2(1,this)}});
			pi3.on({"input":function(){checkPas1(2,this)},"blur":function(){checkPas2(2,this)}});
			function checkPas1(i,t){
				th=t;
				if(pi2.next().text()=="新密码两次输入不同！")
					pi2.next().text("");
				var str=$(th).val();
				if(pattern1.test(str)){
					$(th).next().text("字符有误");
					flag[i]=0;
				}
				else {
					$(th).next().text("");
					flag[i]=1;
				}
			 }
			function checkPas2(i,t){
				th=t;
				var str=$(th).val();
				if(str.length<8&&str.length>0){
					$(th).next().text("密码长度至少为8位");
					flag[i]=0;
				}
				if(str.length==0){
					flag[i]=1;
				}
				if(!pi2.val()&&!pi3.val()&&pi1.next().text()=="值为空"){
					pi1.next().text("");
				}
			}
	//-----------------------index_pic-----------------------
	//-----------------------index_phrase-----------------------
	//-----------------------products_pic-----------------------
	//-----------------------products_type-----------------------
		//点击进入页面时发送ajax
			$("#function .products_type").click(function(){
				var data="{classone:['家用空调','中央空调','生活电器']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.classone.length;i++){
							var option=document.createElement("option");
							option.text=data.classone[i];
							s.appendChild(option);
						}
						$("#details .products_type td.first_class").html(s);
				$.ajax({
					url:"getClassOne",
					type:"post",
					data:null,
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.classone.length;i++){
							option=document.createElement("option");
							option.text=data.classone[i];
							s.appendChild(option);
						}
						$("#details .products_type td.first_class").html(s);
					},
					error:function(){
						alert("页面获取失败");
					}
				});
			});
		//点击一级选项时发送ajax请求二级选项
			$("#details .products_type").delegate("select:eq(0)","change",function(){
				if($("option:selected",this).text()=="请选择分类"){
					$("#details .products_type select:eq(1)").html("");
					return;
				}
				var fc=$("#details .products_type select:eq(0) option:selected").text();
				var data="{classtwo:['柜式','挂式']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.classtwo.length;i++){
							option=document.createElement("option");
							option.text=data.classtwo[i];
							s.appendChild(option);
						}
						$("#details .products_type td.second_class").html(s);
				$.ajax({
					url:"getClassTwo",
					type:"post",
					data:{classone:fc},
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						for(var i=0;i<data.classtwo.length;i++){
							option=document.createElement("option");
							option.text=data.classtwo[i];
							s.appendChild(option);
						}
						$("#details .products_type td.second_class").html(s);
					},
					error:function(){
						alert("二级分类获取失败");
					}
				});
			});
		//点击功能按钮
			$("#details .products_type .button").click(function(){
				var sclass=$(this).closest("tr").find("option:selected").text();
				if($(this).closest("tr").hasClass("first_class")){
					$("#details .products_type .edit").hide();
					if($(this).text()=="添加"){
						$("#details .products_type .add1").show();
					}
					else if($(this).text()=="排序"){
						$("#bottom").show();
						var list="";
						for(var i=1;i<$(this).closest("tr").find("option").length;i++){
							var o=$(this).closest("tr").find("option:eq("+i+")").text();
							list+="<p><input type='radio' name='classname'><span>"+o+"</span></p>";
						}
						$("#full .products_type .sort1 div").html(list);
						$("#full .products_type .sort1").show();
					}
					else if(sclass!="请选择分类"){
						if($(this).text()=="删除"){
							$("#bottom").show();
							var fc=$(this).closest("tr").find("option:selected").text();
							$("#full .products_type .delete1 p span").text(fc);
							$("#full .products_type .delete1").show();
						}
						else if($(this).text()=="修改"){
							$("#details .products_type .alter1 input").val(sclass).select();
							$("#details .products_type .alter1").show();
						}
					}
				}
				else if($(this).closest("tr").hasClass("second_class")){
					$("#details .products_type .edit").hide();
					if($(this).text()=="添加"){
						$("#details .products_type .add2").show();
					}
					else if($(this).text()=="排序"){
						$("#bottom").show();
						var list="";
						for(var i=1;i<$(this).closest("tr").find("option").length;i++){
							var o=$(this).closest("tr").find("option:eq("+i+")").text();
							list+="<p><input type='radio' name='classname'><span>"+o+"</span></p>";
						}
						$("#full .products_type .sort2 div").html(list);
						$("#full .products_type .sort2").show();
					}
					else if(sclass!="请选择分类"){
						if($(this).text()=="删除"){
							$("#bottom").show();
							var fc=$(this).closest("tr").find("option:selected").text();
							$("#full .products_type .delete2 p span").text(fc);
							$("#full .products_type .delete2").show();
						}
						else if($(this).text()=="修改"){
							$("#details .products_type .alter2 input").val(sclass).select();
							$("#details .products_type .alter2").show();
						}
					}
				}
			});
		//确定取消按钮
			$("#details .products_type .add1 .button").click(function(){
				if($(this).text()=="确定"){
					var cn=$(this).closest("tr").find("input").val();
					//检查分类是否重复！
					var trop=$(this).closest("table").find("tr.first_class");
					if(!cn){
						return;
					}
					for(var i=1;i<trop.find("option").length;i++){
						if(trop.find("option:eq("+i+")").text()==cn){
							alert("分类名重复！");
							return;
						}
					}
					$("#waiting").show();
					$.ajax({
						url:"manageClassOne",
						type:"post",
						data:{"manage":"add","classname":cn},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_type .edit").hide();
							$("#details .products_type td.first_class select").append("<option>"+cn+"</option>");
						},
						error:function(){}
					});
				}
				else if($(this).text()=="取消"){
					$("#details .products_type .edit").hide();
				}
			});
			$("#details .products_type .add2 .button").click(function(){
				if($(this).text()=="确定"){
					var cn=$(this).closest("tr").find("input").val();
					var fcn=$("#details .products_type tr.first_class option:selected").text();
					//检查分类是否重复！
					var trop=$(this).closest("table").find("tr.second_class");
					if(!cn){
						return;
					}
					for(var i=1;i<trop.find("option").length;i++){
						if(trop.find("option:eq("+i+")").text()==cn){
							alert("分类名重复！");
							return;
						}
					}
					$("#waiting").show();
					$.ajax({
						url:"manageClassTwo",
						type:"post",
						data:{"manage":"add","classone":fcn,"classname":cn},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_type .edit").hide();
							$("#details .products_type td.second_class select").append("<option>"+cn+"</option>");
						},
						error:function(){}
					});
				}
				else if($(this).text()=="取消"){
					$("#details .products_type .edit").hide();
				}
			});
			$("#details .products_type .alter1 .button").click(function(){
				if($(this).text()=="确定"){
					var cn=$(this).closest("tr").find("input").val();
					//检查分类是否重复！
					var trop=$(this).closest("table").find("tr.first_class");
					var ocn=trop.find("option:selected").text();
					if(!cn){
						return;
					}
					for(var i=1;i<trop.find("option").length;i++){
						if(trop.find("option:eq("+i+")").text()==cn){
							$("#details .products_type .edit").hide();
							return;
						}
					}
					$("#waiting").show();
					$.ajax({
						url:"manageClassOne",
						type:"post",
						data:{"manage":"edit","classname":cn,"oldname":ocn},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_type .edit").hide();
							trop.find("option:selected").text(cn);
						},
						error:function(){}
					});
				}
				else if($(this).text()=="取消"){
					$("#details .products_type .edit").hide();
				}
			});
			$("#details .products_type .alter2 .button").click(function(){
				if($(this).text()=="确定"){
					var cn=$(this).closest("tr").find("input").val();
					var fcn=$("#details .products_type tr.first_class option:selected").text();
					//检查分类是否重复！
					var trop=$(this).closest("table").find("tr.second_class");
					if(!cn){
						return;
					}
					for(var i=1;i<trop.find("option").length;i++){
						if(trop.find("option:eq("+i+")").text()==cn){
							$("#details .products_type .edit").hide();
							return;
						}
					}
					$("#waiting").show();
					$.ajax({
						url:"manageClassTwo",
						type:"post",
						data:{"manage":"edit","classone":fcn,"classname":cn,"oldname":ocn},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_type .edit").hide();
							trop.find("option:selected").text(cn);
						},
						error:function(){}
					});
				}
				else if($(this).text()=="取消"){
					$("#details .products_type .edit").hide();
				}
			});
			$("#full .products_type .delete1 .button").click(function(){
				if($(this).text()=="确定"){
					var cn=$(this).closest("div").find("span.first_class").text();
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
							$("#waiting").hide();
							$("#details .products_type tr.first_class option:selected").remove();
					$.ajax({
						url:"manageClassOne",
						type:"post",
						data:{"manage":"delete","classname":cn},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_type tr.first_class option:selected").remove();
						},
						error:function(){}
					});
				}
			});
			$("#full .products_type .delete2 .button").click(function(){
				if($(this).text()=="确定"){
					var cn=$(this).closest("div").find("span.second_class").text();
					var fcn=$("#details .products_type tr.first_class option:selected").text();
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
							$("#waiting").hide();
							$("#details .products_type tr.second_class option:selected").remove();
					$.ajax({
						url:"manageClassTwo",
						type:"post",
						data:{"manage":"delete","classone":fcn,"classname":cn},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_type tr.second_class option:selected").remove();
						},
						error:function(){}
					});
				}
			});
			$("#full .products_type .sort1 .button").click(function(){
				if($(this).text()=="确定"){
					var list="";
					var s=document.createElement("select");
					var option=document.createElement("option");
					option.text="请选择分类";
					s.appendChild(option);
					for(var i=0;i<$(this).closest("div").find("div span").length;i++){
						if(i!=0){
							list+="#";
						}
						var option=document.createElement("option");
						option.text=$(this).closest("div").find("div span:eq("+i+")").text();
						list+=option.text;
						s.appendChild(option);
					}alert(list)
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
							$("#waiting").hide();
							$("#details .products_type td.first_class").html(s);
					$.ajax({
						url:"manageClassOne",
						type:"post",
						data:{"manage":"sort","sequence":list},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_type td.first_class").html(s);
						},
						error:function(){}
					});
				}
			});
			$("#full .products_type .sort2 .button").click(function(){
				if($(this).text()=="确定"){
					var fcn=$("#details .products_type tr.first_class option:selected").text();
					var list="";
					var s=document.createElement("select");
					var option=document.createElement("option");
					option.text="请选择分类";
					s.appendChild(option);
					for(var i=0;i<$(this).closest("div").find("div span").length;i++){
						if(i!=0){
							list+="#";
						}
						var option=document.createElement("option");
						option.text=$(this).closest("div").find("div span:eq("+i+")").text();
						list+=option.text;
						s.appendChild(option);
					}alert(list)
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
							$("#waiting").hide();
							$("#details .products_type td.second_class").html(s);
					$.ajax({
						url:"manageClassTwo",
						type:"post",
						data:{"manage":"sort","classone":fcn,"sequence":list},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_type td.second_class").html(s);
						},
						error:function(){}
					});
				}
			});
		//排序上下按钮
			$("#full .products_type .up").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.prev().is("p")){
					checked.prev().before(s);
					var newChecked=checked.prev().prev();
					newChecked.find("input").click();
					checked.remove();
				}
			});
			$("#full .products_type .down").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.next().is("p")){
					checked.next().after(s);
					var newChecked=checked.next().next();
					newChecked.find("input").click();
					checked.remove();
				}
			});
	//-----------------------products_details-----------------------
		//点击进入页面时发送ajax
			$("#function .products_details").click(function(){
				$("#details .products_details .click_edit").show();
				$("#details .edit_box").remove();
				var data="{classone:['家用空调','中央空调','生活电器']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.classone.length;i++){
							var option=document.createElement("option");
							option.text=data.classone[i];
							s.appendChild(option);
						}
						$("#details .products_details select:eq(0)").html(s.innerHTML);
						$("#details .products_details select:eq(0)").change();
				$.ajax({
					url:"getClassOne",
					type:"post",
					data:null,
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.classone.length;i++){
							option=document.createElement("option");
							option.text=data.classone[i];
							s.appendChild(option);
						}
						$("#details .products_details select:eq(0)").html(s.innerHTML);
						$("#details .products_details select:eq(0)").change();
					},
					error:function(){
						//alert("页面获取失败");
					}
				});
			});
		//点击一级选项时发送ajax请求二级选项
			$("#details .products_details").delegate("select:eq(0)","change",function(){
				if($("option:selected",this).text()=="请选择分类"){
					$("#details .products_details select:eq(1)").html("");
					$("#details .products_details select:eq(2)").html("");
					$("#details .products_details .details").hide();
					return;
				}
				var fc=$("option:selected",this).text();
				var data="{classtwo:['柜式','挂式']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.classtwo.length;i++){
							option=document.createElement("option");
							option.text=data.classtwo[i];
							s.appendChild(option);
						}
						$("#details .products_details select:eq(1)").html(s.innerHTML);
				$.ajax({
					url:"getClassTwo",
					type:"post",
					data:{classone:fc},
					success:function(data){
						var s=document.createElement("select");
						for(var i=0;i<data.classtwo.length;i++){
							option=document.createElement("option");
							option.text=data.classtwo[i];
							s.appendChild(option);
						}
						$("#details .products_details select:eq(1)").html(s.innerHTML);
					},
					error:function(){
						//alert("二级分类获取失败");
					}
				});
			});
		//点击二级选项时发送ajax请求对应产品
			$("#details .products_details").delegate("select:eq(1)","change",function(){
				if($("option:selected",this).text()=="请选择分类"){
					$("#details .products_details .details").hide();
					$("#details .products_details select:eq(2)").html("");
					return;
				}
				var fc=$("#details .products_details select:eq(0) option:selected").text();
				var sc=$("option:selected",this).text();
				var data="{products:['Q铂_KFR-36LW','Q铂_KFR-50LW','Q铂_KFR-72LW']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择产品";
						s.appendChild(option);
						for(var i=0;i<data.products.length;i++){
							option=document.createElement("option");
							option.text=data.products[i];
							s.appendChild(option);
						}
						$("#details .products_details select:eq(2)").html(s.innerHTML);
				$.ajax({
					url:"getProduct",
					type:"post",
					data:{classone:fc,classtwo:sc},
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择产品";
						for(var i=0;i<data.products.length;i++){
							option=document.createElement("option");
							option.text=data.products[i];
							s.appendChild(option);
						}
						$("#details .products_details select:eq(2)").html(s.innerHTML);
					},
					error:function(){
						//alert("二级分类获取失败");
					}
				});
			});
		//点击三级选项时发送ajax请求产品详细数据
			$("#details .products_details").delegate("select:eq(2)","change",function(){
				$("#details .products_details .click_edit").show();
				$("#details .edit_box").remove();
				$("#details .products_details .edit").hide();
				if($("option:selected",this).text()=="请选择产品"){
					$("#details .products_details .details").hide();
					return;
				}
				var classone=$("#details .products_details select:eq(0) option:selected").text();
				var classtwo=$("#details .products_details select:eq(1) option:selected").text();
				var product=$("#details .products_details select:eq(2) option:selected").text();
				var data={
					productpic:['picname1.jpg','picname2.jpg','picname3.jpg','picname4.jpg'],
					productinfo:'<p> </p><p>这里是文章</p>',
					content:"<table border='1'><tr class='table_title'><td colspan='4'>主体</td></tr><tr class='table_child'><td width='25%'>系列</td><td colspan='3'>Q铂</td></tr><tr class='table_child'><td width='25%'>型号</td><td colspan='3'>KFR-50LW</td></tr><tr class='table_child'><td width='25%'>类别</td><td colspan='3'>立柜式</td></tr><tr class='table_title'><td colspan='4'>功能</td></tr><tr class='table_child'><td width='25%'>制冷</td><td colspan='3'>冷暖</td></tr><tr class='table_child'><td width='25%'>匹数</td><td colspan='3'>2匹-3匹</td></tr><tr class='table_child'><td>变频/定频</td><td colspan='3'>直流变频</td></tr><tr class='table_child'><td>能效等级</td><td colspan='3'>3级</td></tr><tr class='table_child'><td>制冷量</td><td colspan='3'>5500-6000</td></tr><tr class='table_child'><td>制冷功率</td><td colspan='3'>1600-2500</td></tr><tr class='table_child'><td>内机噪音</td><td colspan='3'>22-46</td></tr><tr class='table_child'><td>外机噪音</td><td colspan='3'>42-56</td></tr><tr class='table_child'><td>适用面积</td><td colspan='3'>20-30</td></tr><tr class='table_child'><td>循环风量</td><td colspan='3'>800-1000</td></tr></tr><tr class='table_title'><td colspan='4'>规格</td></tr><tr class='table_child'><td>电压/频率</td><td colspan='3'>220/50</td></tr><tr class='table_child'><td>外机尺寸</td><td colspan='3'></td></tr><tr class='table_child'><td>内机尺寸</td><td colspan='3'></td></tr><tr class='table_child'><td>内机重量</td><td colspan='3'></td></tr><tr class='table_child'><td>外机重量</td><td colspan='3'></td></tr></table>"
				};
				$("#details .products_details .save_table").html(data.content);
				var s="";
						for(var i=0;i<data.productpic.length;i++){
							var div=document.createElement("div");
							var img=document.createElement("img");
							img.src=data.productpic[i];
							var input=document.createElement("input");
							input.type="checkbox";
							div.appendChild(img);
							div.appendChild(input);
							s+=div.outerHTML+"\n";
						}
						$("#details .products_details .products_pics").html(s);
						$("#details .products_details .article div:eq(0)").html(data.productinfo);
						$("#details .products_details .details").show();
				$.ajax({
					url:"getProductInfo",
					type:"post",
					data:{"classone":classone,"classtwo":classtwo,"product":product},
					success:function(data){
						var s="";
						for(var i=0;i<data.productpic.length;i++){
							var div=document.createElement("div");
							var img=document.createElement("img");
							img.src=data.productpic[i];
							var input=document.createElement("input");
							input.type="checkbox";
							div.appendChild(img);
							div.appendChild(input);
							s+=div.outerHTML+"\n";
						}
						$("#details .products_details .products_pics").html(s);
						$("#details .products_details .details").show();
					},
					error:function(){}
				});
			});
		//点击参数分类时从html的表格中抽出数据重组成分类下的参数表格
			$("#select_spec").change(function(){
				var sclass=$("option:selected",this).text();
				if(sclass!="选择参数分类"){
					var s="<tr><td><span>参数类型</span></td><td><span>具体描述</span></td><td><span>操作</span></td></tr>";
					var table=$("#details .products_details .save_table table");
					var count1=0,count2=0,flag=0;
					for(var i=0;i<table.find("tr").length;i++){
						var tr=table.find("tr:eq("+i+")");
						if(tr.hasClass("table_title")){
							if(tr.find("td:eq(0)").text()==sclass){
								count1=i;
								flag=1;
							}
							else if(flag==1){
								count2=i;
								break;
							}
						}
					}
					if(count2==0){
						count2=table.find("tr").length;
					}
					var spec=new Array();
					var value=new Array();
					for(var i=count1+1;i<count2;i++){
						var j=i-count1-1;
						spec[j]=table.find("tr:eq("+i+") td:eq(0)").text();
						value[j]=table.find("tr:eq("+i+") td:eq(1)").text();
					}
					for(var i=0;i<count2-count1-1;i++){
						s+="<tr><td><span class='spec1'>"+spec[i]+"</span><input class='spec2' type='text'></td><td><span class='spec1'>"+value[i]+"</span><input class='spec2' type='text'></td><td><span class='button spec1'>修改</span><span class='button spec1'>删除</span><span class='button spec2'>确定</span><span class='button spec2'>取消</span></td></tr>";
					}
					s+="<tr class='edit add_spec'><td><input type='text'></td><td><input type='text'></td><td><span class='button'>确定</span><span class='button'>取消</span></td></tr>"
					$("#details .products_details .spec_table").html(s);
					$(this).siblings("table").show();
				}
				else{
					$(this).siblings("table").hide();
				}
			});
		//点击功能按钮
			$("#details .products_details .series .button").click(function(){
				var sclass=$(this).closest("tr").find("option:selected").text();
				if($(this).closest("tr").hasClass("series")){
					$("#details .products_details .edit").hide();
					if($(this).text()=="添加"){
						$("#details .products_details .add_product").show();
					}
					else if($(this).text()=="排序"){
						$("#bottom").show();
						var list="";
						for(var i=1;i<$(this).closest("tr").find("option").length;i++){
							var o=$(this).closest("tr").find("option:eq("+i+")").text();
							list+="<p><input type='radio' name='series'><span>"+o+"</span></p>";
						}
						$("#full .products_details .sort1 div").html(list);
						$("#full .products_details .sort1").show();
					}
					else if(sclass!="请选择分类"){
						if($(this).text()=="删除"){
							$("#bottom").show();
							var fc=$(this).closest("tr").find("option:selected").text();
							$("#full .products_details .delete1 p span").text(fc);
							$("#full .products_details .delete1").show();
						}
						else if($(this).text()=="编辑"){
							$("#details .products_details .edit_product input:eq(0)").val(sclass.replace(/_.+/,"")).select();
							$("#details .products_details .edit_product input:eq(1)").val(sclass.replace(/.+_/,""));
							$("#details .products_details .edit_product").show();
						}
					}
				}
			});
			$("#details .products_details .edit_pic .button").click(function(){
				var sclass=$(this).closest("tr").find("option:selected").text();
				$("#details .products_details .edit").hide();
				if($(this).text()=="添加"){
					$("#details .products_details .add_pic").show();
				}
				else if(sclass!="请选择分类"){
					if($(this).text()=="删除"){
						var pic_name=new Array();
						var list="";
						var len=$("#details .products_details .products_pics").find("input:checked").length;
						if(len==0){
							return;
						}
						for(var i=0;i<len;i++){
							if(i!=0){
								list+=" ";
							}
							pic_name[i]=$("#details .products_details .products_pics").find("input:checked:eq("+i+")").prev().attr('src').replace(/.+\//,"").replace(/\..+/,"");
							list+=pic_name[i];
						}
						$("#full .products_details .delete2 p span").text(list);
						$("#bottom").show();
						$("#full .products_details .delete2").show();
					}
					if($(this).text()=="排序"){
						$("#bottom").show();
						var list="";
						for(var i=0;i<$("#details .products_details .products_pics img").length;i++){
							var o=$("#details .products_details .products_pics img:eq("+i+")").attr('src');
							list+="<div><img alt='"+i+"' src='"+o+"'><input type='radio' name='pic'></div>\n";
						}
						$("#full .products_details .sort2 div").html(list);
						$("#full .products_details .sort2").show();
					}
				}
			});
			$("#details .products_details .edit_spec").delegate(".button","click",function(){
				if($(this).siblings("select").find("option:selected").text()=="选择参数分类"){
					return;
				}
				if($(this).text()=="添加"){
					$("#details .products_details .edit").hide();
					$("#details .products_details .add_spec").show();
				}
				if($(this).text()=="排序"){
					$("#bottom").show();
					var list="";
					for(var i=1;i<$(this).siblings("table").find("tr").length-1;i++){
						var spec=$(this).siblings("table").find("tr:eq("+i+") td:eq(0) span").text();
						var value=$(this).siblings("table").find("tr:eq("+i+") td:eq(1) span").text();
						list+="<p><input type='radio' name='series'><span>"+spec+"</span> <span>"+value+"</span></p>";
					}
					$("#full .products_details .sort3 div").html(list);
					$("#full .products_details .sort3").show();
				}
				if($(this).text()=="删除"){
					$("#bottom").show();
					var s=$(this).closest("tr").find("span.spec1:eq(0)").text();
					$("#full .products_details .delete3 .spec_name").text(s);
					$("#full .products_details .delete3").show();
				}
				if($(this).text()=="修改"){
					$(this).closest("tr").find(".spec1").hide();
					$(this).closest("tr").find(".spec2:eq(0)").val($(this).closest("tr").find(".spec1:eq(0)").text());
					$(this).closest("tr").find(".spec2:eq(1)").val($(this).closest("tr").find(".spec1:eq(1)").text()).select();
					$(this).closest("tr").find(".spec2").show();
				}
			});
		//确定取消按钮
			$("#details .products_details").delegate(".button","click",function(){
				if($(this).text()=="取消"){
					$("#details .products_details .edit").hide();
					if($(this).hasClass("spec2")){
						$(this).closest("tr").find(".spec2").hide();
						$(this).closest("tr").find(".spec1").show();
					}
				}
			});
			$("#details .products_details .add_product .button").click(function(){
				if($(this).text()=="确定"){
					var s=$(this).closest("tr").find("input:eq(0)").val();
					s+="_"+$(this).closest("tr").find("input:eq(1)").val();
					for(var i=1;i<$("#details .products_details select:eq(2) option").length;i++){
						if(s==$("#details .products_details select:eq(2) option:eq("+i+")").text()){
							alert("产品名字重复！");
							return;
						}
					}
					var fc=$("#details .products_details select:eq(0) option:selected").text();
					var sc=$("#details .products_details select:eq(1) option:selected").text();
					$("#waiting").show();
							$("#waiting").hide();
							$("#details .products_details select:eq(2)").append("<option>"+s+"</option>");
							$("#details .products_details .edit").hide();
					$.ajax({
						url:"manageProduct",
						type:"post",
						data:{manage:"add",classone:fc,classtwo:sc,productname:s},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_details select:eq(2)").append("<option>"+s+"</option>");
							$("#details .products_details .edit").hide();
						},
						error:function(){}
					});
				}
			});
			$("#details .products_details .edit_product .button").click(function(){
				if($(this).text()=="确定"){
					var s=$(this).closest("tr").find("input:eq(0)").val();
					s+="_"+$(this).closest("tr").find("input:eq(1)").val();
					var os=$("#details .products_details select:eq(2) option:selected").text();
					for(var i=1;i<$("#details .products_details select:eq(2) option").length;i++){
						if(s==$("#details .products_details select:eq(2) option:eq("+i+")").text()){
							alert("产品名字重复！");
							return;
						}
					}
					var fc=$("#details .products_details select:eq(0) option:selected").text();
					var sc=$("#details .products_details select:eq(1) option:selected").text();
					$("#waiting").show();
							$("#details .products_details .edit").hide();
							for(var i=1;i<$("#details .products_details select:eq(2) option").length;i++){
								if(os==$("#details .products_details select:eq(2) option:eq("+i+")").text()){
									$("#details .products_details select:eq(2) option:eq("+i+")").text(s);
								}
							}
							$("#waiting").hide();
					$.ajax({
						url:"manageProduct",
						type:"post",
						data:{manage:"edit",classone:fc,classtwo:sc,productname:s,oldname:os},
						success:function(data){
							$("#details .products_details .edit").hide();
							for(var i=1;i<$("#details .products_details select:eq(2) option").length;i++){
								if(os==$("#details .products_details select:eq(2) option:eq("+i+")").text()){
									$("#details .products_details select:eq(2) option:eq("+i+")").text(s);
								}
							}
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
			$("#full .products_details .delete1 .button").click(function(){
				if($(this).text()=="确定"){
					var fc=$("#details .products_details select:eq(0) option:selected").text();
					var sc=$("#details .products_details select:eq(1) option:selected").text();
					var s=$(this).siblings("p").find(".product_name").text();
					$("#bottom").hide();
					$("#full .products_details .delete1").hide();
					$("#waiting").show();
							for(var i=1;i<$("#details .products_details select:eq(2) option").length;i++){
								if(s==$("#details .products_details select:eq(2) option:eq("+i+")").text()){
									$("#details .products_details select:eq(2) option:eq("+i+")").remove();
								}
							}
							$("#details .products_details .details").hide();
							$("#waiting").hide();
					$.ajax({
						url:"manageProduct",
						type:"post",
						data:{manage:"delete",classone:fc,classtwo:sc,productname:s},
						success:function(data){
							for(var i=1;i<$("#details .products_details select:eq(2) option").length;i++){
								if(s==$("#details .products_details select:eq(2) option:eq("+i+")").text()){
									$("#details .products_details select:eq(2) option:eq("+i+")").remove();
								}
							}
							$("#details .products_details .details").hide();
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
			$("#full .products_details .sort1 .button").click(function(){
				if($(this).text()=="确定"){
					var fc=$("#details .products_details select:eq(0) option:selected").text();
					var sc=$("#details .products_details select:eq(1) option:selected").text();
					var list="";
					var s=document.createElement("select");
					var option=document.createElement("option");
					option.text="请选择分类";
					s.appendChild(option);
					for(var i=0;i<$(this).closest("div").find("div span").length;i++){
						if(i!=0){
							list+="#";
						}
						var option=document.createElement("option");
						option.text=$(this).closest("div").find("div span:eq("+i+")").text();
						list+=option.text;
						s.appendChild(option);
					}
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
							$("#waiting").hide();
							$("#details .products_details select:eq(2)").html(s.innerHTML);
							$("#details .products_details .details").hide();
					$.ajax({
						url:"manageProduct",
						type:"post",
						data:{manage:"sort",classone:fc,classtwo:sc,productname:list},
						success:function(data){
							$("#waiting").hide();
							$("#details .products_details select:eq(2)").html(s.innerHTML);
							$("#details .products_details .details").hide();
						},
						error:function(){}
					});
				}
			});
			$("#details .products_details .add_pic .button").click(function(){
				if($(this).text()=="确定"){
					var file=this.previousSibling;
					if(/image/.test(file.files[0].type)){
						if(file.files[0].name.length>=28){
							alert("文件名过长");
							return;
						}
						var fc=$("#details .products_details select:eq(0) option:selected").text();
						var sc=$("#details .products_details select:eq(1) option:selected").text();
						var pname=$("#details .products_details select:eq(2) option:selected").text();
						var formdata=new FormData();
						formdata.append("manage","add");
						formdata.append("pic",file.files[0]);
						formdata.append("classone",fc);
						formdata.append("classtwo",sc);
						formdata.append("productname",pname);
						$("#waiting").show();
						var data={picname:"picname.jpg"};
								var div=document.createElement("div");
								var img=document.createElement("img");
								img.src=data.picname;
								var input=document.createElement("input");
								input.type="checkbox";
								div.appendChild(img);
								div.appendChild(input);
								$("#details .products_details .products_pics").append(div).append("\n");
								$("#waiting").hide();
						$.ajax({
							url:"manageProductPic",
							type:"post",
							contentType:false,
							processData:false,
							data:formdata,
							success:function(data){
								var div=document.createElement("div");
								var img=document.createElement("img");
								img.src=data.picname;
								var input=document.createElement("input");
								input.type="checkbox";
								div.appendChild(img);
								div.appendChild(input);
								$("#details .products_details .products_pics").append(div).append("\n");
								$("#waiting").hide();
							},
							error:function(){}
						});
					}
					else{
						alert("请选择图片文件");
					}
				}
			});
			$("#full .products_details .delete2 .button").click(function(){
				if($(this).text()=="确定"){
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
					var ppname=new Array();
					for(var i=0;i<$("#details .products_details .products_pics").find("input:checked").length;i++){
						ppname[i]=$("#details .products_details .products_pics").find("input:checked:eq("+i+")").prev().attr('src').replace(/.+\//,"");
					}
					var fc=$("#details .products_details select:eq(0) option:selected").text();
					var sc=$("#details .products_details select:eq(1) option:selected").text();
					var pname=$("#details .products_details select:eq(2) option:selected").text();
					//var ppname=$(this).siblings("p").find(".pic_name").text();
					//ppname=ppname.replace(/\s/g,"\",\"");
					//ppname="[\""+ppname+"\"]";
							var len=$("#details .products_details .products_pics").find("input:checked").length;
							for(var i=0;i<len;i++){
								$("#details .products_details .products_pics").find("input:checked:eq(0)").parent().remove();
							}
							$("#waiting").hide();
					$.ajax({
						url:"manageProductPic",
						type:"post",
						data:{manage:"delete",picname:ppname,classone:fc,classtwo:sc,productname:pname},
						success:function(data){
							var len=$("#details .products_details .products_pics").find("input:checked").length;
							for(var i=0;i<len;i++){
								$("#details .products_details .products_pics").find("input:checked:eq(0)").parent().remove();
							}
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
			$("#full .products_details .sort2 .button").click(function(){
				if($(this).text()=="确定"){
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
					var s=$(this).siblings("div").html();
					var list="";
					for(var i=0;i<$("#details .products_details .products_pics img").length;i++){
						if(i!=0){
							list+="#";
						}
						list+=$("#details .products_details .products_pics img:eq("+i+")").attr('src').replace(/.+\//,"");
					}
					var fc=$("#details .products_details select:eq(0) option:selected").text();
					var sc=$("#details .products_details select:eq(1) option:selected").text();
					var pname=$("#details .products_details select:eq(2) option:selected").text();
							$("#details .products_details .products_pics").html(s);
							$("#waiting").hide();
					$.ajax({
						url:"manageProductPic",
						type:"post",
						data:{manage:"sort",sequence:list,classone:fc,classtwo:sc,productname:pname},
						success:function(data){
							$("#details .products_details .products_pics").html(s);
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
			$("#details .products_details .edit_spec").delegate(".button","click",function(){
				if($(this).text()=="确定"){
					if($(this).hasClass("spec2")){
						var t=this;
						var ospec=$(this).closest("tr").find(".spec1:eq(0)").text();
						var ovalue=$(this).closest("tr").find(".spec1:eq(1)").text();
						var spec=$(this).closest("tr").find(".spec2:eq(0)").val();
						var value=$(this).closest("tr").find(".spec2:eq(1)").val();
						var otable=$("#details .products_details .save_table").html();
						var table=$("#details .products_details .save_table table");
						for(var i=0;i<table.find("tr").length;i++){
							if(table.find("tr:eq("+i+") td:eq(0)").text()==ospec){
								table.find("tr:eq("+i+") td:eq(0)").text(spec);
								table.find("tr:eq("+i+") td:eq(1)").text(value);
								break;
							}
						}
						var fc=$("#details .products_details select:eq(0) option:selected").text();
						var sc=$("#details .products_details select:eq(1) option:selected").text();
						var pname=$("#details .products_details select:eq(2) option:selected").text();
						var s=$("#details .products_details .save_table").html();
						$("#waiting").show();
									$(t).closest("tr").find(".spec1:eq(0)").text(spec);
									$(t).closest("tr").find(".spec1:eq(1)").text(value);
									$("#details .products_details .spec2").hide();
									$("#details .products_details .spec1").show();
									$("#waiting").hide();
						$.ajax({
							url:"manageProductInfo",
							type:"post",
							data:{classone:fc,classtwo:sc,productname:pname,content:s},
							success:function(data){
								if(data.status=="success"){
									$(t).closest("tr").find(".spec1:eq(0)").text(spec);
									$(t).closest("tr").find(".spec1:eq(1)").text(value);
									$("#details .products_details .spec2").hide();
									$("#details .products_details .spec1").show();
									$("#waiting").hide();
								}
								else{
									$("#details .products_details .save_table").html(otable);
								}
							},
							error:function(){
								//$("#details .products_details .save_table").html(otable);
							}
						});
					}
					else if($(this).closest("tr").hasClass("add_spec")){
						var mark=$(this).closest("tr").prev().find(".spec1:eq(0)").text();
						var spec=$(this).closest("tr").find("input:eq(0)").val();
						if(!spec){
							return;
						}
						var value=$(this).closest("tr").find("input:eq(1)").val();
						var s="<tr class='table_child'><td width='25%'>"+spec+"</td><td colspan='3'>"+value+"</td></tr>";
						var otable=$("#details .products_details .save_table").html();
						var table=$("#details .products_details .save_table table");
						var len=table.find("tr").length;
						for(var i=0;i<len;i++){
							if(table.find("tr:eq("+i+") td:eq(0)").text()==mark){
								table.find("tr:eq("+i+")").after(s);
								break;
							}
						}
						var fc=$("#details .products_details select:eq(0) option:selected").text();
						var sc=$("#details .products_details select:eq(1) option:selected").text();
						var pname=$("#details .products_details select:eq(2) option:selected").text();
						s=$("#details .products_details .save_table").html();
						$("#waiting").show();
									var title=$("#details .products_details select:eq(3) option:selected").text();
									$("#details .products_details select:eq(3)").change();
									$("#waiting").hide();
						$.ajax({
							url:"manageProductInfo",
							type:"post",
							data:{classone:fc,classtwo:sc,productname:pname,content:s},
							success:function(data){
								if(data.status=="success"){
									var title=$("#details .products_details select:eq(3) option:selected").text();
									$("#details .products_details select:eq(3)").change();
									$("#waiting").hide();
								}
								else{
									$("#details .products_details .save_table").html(otable);
								}
							},
							error:function(){
								//$("#details .products_details .save_table").html(otable);
							}
						});
					}
				}
			});
			$("#full .products_details .delete3 .button").click(function(){
				if($(this).text()=="确定"){
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
					var spec=$(this).closest("div").find(".spec_name").text();
					var otable=$("#details .products_details .save_table").html();
					var table=$("#details .products_details .save_table table");
					for(var i=0;i<table.find("tr").length;i++){
						if(table.find("tr:eq("+i+") td:eq(0)").text()==spec){
							table.find("tr:eq("+i+")").remove();
							break;
						}
					}
					var fc=$("#details .products_details select:eq(0) option:selected").text();
					var sc=$("#details .products_details select:eq(1) option:selected").text();
					var pname=$("#details .products_details select:eq(2) option:selected").text();
					var s=$("#details .products_details .save_table").html();
								var title=$("#details .products_details select:eq(3) option:selected").text();
								$("#details .products_details select:eq(3)").change();
								$("#waiting").hide();
					$.ajax({
						url:"manageProductInfo",
						type:"post",
						data:{classone:fc,classtwo:sc,productname:pname,content:s},
						success:function(data){
							if(data.status=="success"){
								var title=$("#details .products_details select:eq(3) option:selected").text();
								$("#details .products_details select:eq(3)").change();
								$("#waiting").hide();
							}
							else{
								$("#details .products_details .save_table").html(otable);
							}
						},
						error:function(){
							//$("#details .products_details .save_table").html(otable);
						}
					});
				}
			});
			$("#full .products_details .sort3 .button").click(function(){
				if($(this).text()=="确定"){
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
					var spec=new Array();
					var value=new Array();
					for(var i=0;i<$(this).siblings("div").find("p").length;i++){
						var p=$(this).siblings("div").find("p:eq("+i+")");
						spec[i]=p.find("span:eq(0)").text();
						value[i]=p.find("span:eq(1)").text();
					}
					var title=$("#details .products_details select:eq(3) option:selected").text();
					var otable=$("#details .products_details .save_table").html();
					var table=$("#details .products_details .save_table table");
					for(var i=0;i<table.find("tr").length;i++){
						if(table.find("tr:eq("+i+") td:eq(0)").text()==title){
							var len=spec.length+i+1;
							for(var j=i+1;j<len;j++){
								table.find("tr:eq("+j+") td:eq(0)").text(spec[j-i-1]);
								table.find("tr:eq("+j+") td:eq(1)").text(value[j-i-1]);
							}
							break;
						}
					}
					var fc=$("#details .products_details select:eq(0) option:selected").text();
					var sc=$("#details .products_details select:eq(1) option:selected").text();
					var pname=$("#details .products_details select:eq(2) option:selected").text();
					var s=$("#details .products_details .save_table").html();
								$("#details .products_details select:eq(3)").change();
								$("#waiting").hide();
					$.ajax({
						url:"manageProductInfo",
						type:"post",
						data:{classone:fc,classtwo:sc,productname:pname,content:s},
						success:function(data){
							if(data.status=="success"){
								$("#details .products_details select:eq(3)").change();
								$("#waiting").hide();
							}
							else{
								$("#details .products_details .save_table").html(otable);
							}
						},
						error:function(){
							//$("#details .products_details .save_table").html(otable);
						}
					});
				}
			});
		//排序上下按钮
			$("#full .products_details .up").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.prev().is("p")){
					checked.prev().before(s);
					var newChecked=checked.prev().prev();
					newChecked.find("input").click();
					checked.remove();
				}
			});
			$("#full .products_details .down").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.next().is("p")){
					checked.next().after(s);
					var newChecked=checked.next().next();
					newChecked.find("input").click();
					checked.remove();
				}
			});
			$("#full .products_details .left").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.prev().is("div")){
					checked.prev().before(s+"\n");
					var newChecked=checked.prev().prev();
					newChecked.find("input").click();
					checked.remove();
				}
			});
			$("#full .products_details .right").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.next().is("div")){
					checked.next().after("\n"+s);
					var newChecked=checked.next().next();
					newChecked.find("input").click();
					checked.remove();
				}
			});
		//文章编辑框
			$("#details .products_details .click_edit").click(function(){
				var s=$(this).prev().html();
				$("#text_box").html(s);
			});
			var range;
			$("#details").delegate("#text_box","blur",function(){
				range=window.getSelection().getRangeAt(0);
			});
			$("#details").delegate(".edit_function span:eq(0)","click",function(){
				if(range){
					$("#file").click();
				}
			});
			$("#details .products_details").delegate("#file","change",function(){
				var file=document.getElementById("file");
				var picform=document.getElementById("picform");
				if(/image/.test(file.files[0].type)){
					if(file.files[0].name.length>=28){
						picform.reset();
						alert("文件名过长");
						return;
					}
					var fc=$("#details .products_details select:eq(0) option:selected").text();
					var sc=$("#details .products_details select:eq(1) option:selected").text();
					var pname=$("#details .products_details select:eq(2) option:selected").text();
					var formdata=new FormData();
					formdata.append("pic",file.files[0]);
					formdata.append("classone",fc);
					formdata.append("classtwo",sc);
					formdata.append("productname",pname);
					$.ajax({
						url:"saveProductInfoPic",
						type:"POST",
						contentType:false,
						processData:false,
						data:formdata,
						success:function(data){
							if(data.picname){
								var img=document.createElement("img");
								img.src=data.picname;
								range.insertNode(img);
							}
							else{
								alert("图片返回失败");
							}
						},
						error:function(){
							alert("图片上传失败");
						}
					});
				}
				else{
					alert("请选择图片文件");
				}
        		picform.reset();
			});
			$("#details .products_details").delegate(".pub","click",function(){
				var fc=$("#details .products_details select:eq(0) option:selected").text();
				var sc=$("#details .products_details select:eq(1) option:selected").text();
				var pname=$("#details .products_details select:eq(2) option:selected").text();
				var text=$("#details .products_details #text_box").html();
				text=text.replace(/&amp;/g,"&");
				$("#waiting").show();
						$("#details .products_details .article div:eq(0)").html(text);
						$("#waiting").hide();
				$.ajax({
					url:"saveProductInfo",
					type:"post",
					data:{productinfo:text,classone:fc,classtwo:sc,productname:pname},
					success:function(data){
						$("#details .products_details .article div:eq(0)").html(text);
						$("#waiting").hide();
					},
					error:function(){}
				});
			});
	//-----------------------products_susume-----------------------
		//点击进入页面时发送ajax
			$("#function .products_susume").click(function(){
				var data="{classone:['家用空调','中央空调','生活电器']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.classone.length;i++){
							var option=document.createElement("option");
							option.text=data.classone[i];
							s.appendChild(option);
						}
						$("#details .products_susume select:eq(0)").html(s.innerHTML);
				$.ajax({
					url:"getClassOne",
					type:"post",
					data:null,
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.classone.length;i++){
							var option=document.createElement("option");
							option.text=data.classone[i];
							s.appendChild(option);
						}
						$("#details .products_susume select:eq(0)").html(s.innerHTML);},
					error:function(){}
				});
			});
		//点击一级选项时发送ajax请求推荐产品
			$("#details .products_susume select:eq(0)").change(function(){
				var sclass=$("option:selected",this).text();
				var data="{products:['立式#Q铂_KFR-50LW','立式#Q铂_KFR-72LW','柜式#Q铂_KFR-36GW'],classtwo:['立式','柜式']}";
				data=eval("("+data+")");
				var s="<tr><td><span>一级分类</span></td><td><span>二级分类</span></td><td><span>系列型号</span></td><td><span>操作</span></td></tr>";
				var count=0;
				for(var i=0;i<data.products.length;i++){
					var classtwo=data.products[i].replace(/\#.+/,"");
					var series=data.products[i].replace(/.+\#/,"").replace(/\_/," ");
					s+="<tr><td>"+sclass+"</td><td>"+classtwo+"</td><td>"+series+"</td><td><span class='button'>删除</span></td></tr>";
					count=i;
				}
				s+="<tr class='add1'><td></td><td></td><td></td><td><span class='button'>添加</span></td></tr>"
				s+="<tr class='add2'><td>"+sclass+"</td><td><select></select></td><td><select></select></td><td><span class='button'>确定</span><span class='button'>取消</span></td></tr>";
				$('#details .products_susume .details').html(s).show();
				if(count<3){
					$("#details .products_susume .details .add1").show();
				}
				var select=document.createElement("select");
				var option=document.createElement("option");
				option.text="请选择分类";
				select.appendChild(option);
				for(var i=0;i<data.classtwo.length;i++){
					option=document.createElement("option");
					option.text=data.classtwo[i];
					select.appendChild(option);
				}
				$("#details .products_susume select:eq(1)").html(select.innerHTML);
				if(sclass!="请选择分类"){
					$.ajax({
						url:"manageBestProducts",
						type:"post",
						data:{"manage":"get","classone":sclass},
						success:function(data){},
						error:function(){}
					});
				}
			});
		//点击二级选项时发送ajax请求对应产品
			$("#details .products_susume").delegate("select:eq(1)","change",function(){
				if($("option:selected",this).text()=="请选择分类"){
					$("#details .products_susume select:eq(2)").html("");
					return;
				}
				var fc=$("#details .products_susume select:eq(0) option:selected").text();
				var sc=$("option:selected",this).text();
				var data="{products:['Q铂_KFR-36LW','Q铂_KFR-50LW','Q铂_KFR-72LW']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择产品";
						s.appendChild(option);
						for(var i=0;i<data.products.length;i++){
							option=document.createElement("option");
							option.text=data.products[i];
							s.appendChild(option);
						}
						$("#details .products_susume select:eq(2)").html(s.innerHTML);
				$.ajax({
					url:"getProduct",
					type:"post",
					data:{classone:fc,classtwo:sc},
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择产品";
						for(var i=0;i<data.products.length;i++){
							option=document.createElement("option");
							option.text=data.products[i];
							s.appendChild(option);
						}
						$("#details .products_susume select:eq(2)").html(s.innerHTML);
					},
					error:function(){
						//alert("二级分类获取失败");
					}
				});
			});
		//点击功能按钮
			$("#details .products_susume").delegate(".button","click",function(){
				if($(this).text()=="添加"){
					$("#details .products_susume .details .add1").hide();
					$("#details .products_susume .details .add2").show();
				}
				else if($(this).text()=="删除"){
					var classone=$(this).closest("tr").find("td:eq(0)").text();
					var classtwo=$(this).closest("tr").find("td:eq(1)").text();
					var pname=$(this).closest("tr").find("td:eq(2)").text();
					var number=$("#details .products_susume .details tr").index($(this).parent().parent());
					$("#bottom").show();
					$("#full .products_susume .delete .product_name").text(classone+" "+classtwo+" "+pname);
					pname=pname.replace(/\s/,"_");
					$("#full .products_susume .delete .fc").text(classone);
					$("#full .products_susume .delete .sc").text(classtwo);
					$("#full .products_susume .delete .pname").text(pname);
					$("#full .products_susume .delete .number").text(number);
					$("#full .products_susume .delete").show();
				}
			});
		//确定取消按钮
			$("#details .products_susume").delegate(".button","click",function(){
				if($(this).text()=="确定"){
					var fc=$("#details .products_susume select:eq(0) option:selected").text();
					var sc=$("#details .products_susume select:eq(1) option:selected").text();
					var pname=$("#details .products_susume select:eq(2) option:selected").text();
					if(sc=="请选择分类"||pname=="请选择产品"){
						alert("尚未选择产品！");
						return;
					}
					$("#waiting").show();
					pname=pname.replace(/\s/,"_");
							$("#waiting").hide();
							var s="<tr><td>"+fc+"</td><td>"+sc+"</td><td>"+pname+"</td><td><span class='button'>删除</span></td></tr>"
							$("#details .products_susume .add1").before(s);
							$("#details .products_susume .add2").hide();
							if($("#details .products_susume table table tr").length>=7){
								$("#details .products_susume .add1").hide();
							}
							else{
								$("#details .products_susume .add1").show();
							}
					$.ajax({
						url:"manageBestProducts",
						type:"post",
						data:{"manage":"add","classone":fc,"classtwo":sc,"productname":pname},
						success:function(data){
							$("#waiting").hide();
							var s="<tr><td>"+fc+"</td><td>"+sc+"</td><td>"+pname+"</td><td><span class='button'>删除</span></td></tr>"
							$("#details .products_susume .add1").before(s);
							if($("#details .products_susume table table tr").length>=6){
								$("#details .products_susume add2").hide();
							}
						},
						error:function(){}
					});
				}
				else if($(this).text()=="取消"){
					$("#details .products_susume .add2").hide();
					$("#details .products_susume .add1").show();
				}
			});
			$("#full .products_susume .delete .button").click(function(){
				if($(this).text()=="确定"){
					var fc=$(this).siblings("p.fc").text();
					var sc=$(this).siblings("p.sc").text();
					var pname=$(this).siblings("p.pname").text();
					var n=$(this).siblings("p.number").text();
					$("#bottom").hide();
					$("#full .products_susume .delete").hide();
					$("#waiting").show();
							$("#details .products_susume .details tr:eq("+n+")").remove();
							$("#waiting").hide();
					$.ajax({
						url:"manageBestProducts",
						type:"post",
						data:{"manage":"delete","classone":fc,"classtwo":sc,"productname":pname},
						success:function(data){
							$("#details .products_susume .details tr:eq("+n+")").remove();
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
	//-----------------------news_edit-----------------------
		var newsData;
		var page=new Array();
		//新闻显示函数
			function NewsShow(data,sp){
				var mark=parseInt(sp)-1;
				page=new Array();
				if(data.newscount>10){
					showPage(data.newscount,"page");
				}
				if(data.news){
					var n=parseInt(data.newscount);
					var p=Math.ceil(n/10);
					if(mark+1>p){
						alert("该页不存在");
						return;
					}
					for(var i=0;i<p;i++){
						var title=new Array();
						var date=new Array();
						if(n-i*10>=10){
							for(var j=0;j<10;j++){
								title[j]=data.news[i*10+j].replace(/\#.+/,"");
								date[j]=data.news[i*10+j].replace(/.+\#/,"");
							}
						}
						else{
							var last=n-i*10;
							for(var j=0;j<last;j++){
								title[j]=data.news[i*10+j].replace(/\#.+/,"");
								date[j]=data.news[i*10+j].replace(/.+\#/,"");
							}
						}
						page[i]={ntitle:title,date:date};
					}
					$("#page div:eq("+mark+")").click();
				}
			}
		//点击进入页面时发送ajax
			$("#function .news_edit").click(function(){
				$("#details .edit_box").remove();
				$(this).find(".click_edit").show();
				data={newscount:30,news:[
					"格力参展117届春季广交会 绿色科技惊艳全球#2015 4 15",
					"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 4 08",
					"格力工业制品首次亮相中国制冷展#2015 4 08",
					"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 4 08",
					"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 4 08",
					"格力参展117届春季广交会 绿色科技惊艳全球#2015 4 07",
					"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 4 06",
					"格力工业制品首次亮相中国制冷展#2015 4 05",
					"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 4 04",
					"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 4 03",
					"格力参展117届春季广交会 绿色科技惊艳全球#2015 4 02",
					"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 4 01",
					"格力工业制品首次亮相中国制冷展#2015 3 30",
					"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 3 29",
					"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 3 28",
					"格力参展117届春季广交会 绿色科技惊艳全球#2015 3 27",
					"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 3 26",
					"格力工业制品首次亮相中国制冷展#2015 3 25",
					"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 3 24",
					"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 3 23",
					"格力参展117届春季广交会 绿色科技惊艳全球#2015 3 22",
					"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 3 21",
					"格力工业制品首次亮相中国制冷展#2015 3 20",
					"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 3 19",
					"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 3 18",
					"格力参展117届春季广交会 绿色科技惊艳全球#2015 3 17",
					"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 3 16",
					"格力工业制品首次亮相中国制冷展#2015 3 15",
					"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 3 14",
					"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 3 13",
					]}
						NewsShow(data,1);
						newsData=data;
				$.ajax({
					url:"manageNews",
					type:"post",
					data:{manage:"get"},
					success:function(data){
						NewsShow(data,1);
						newsData=data;
					},
					error:function(){}
				});
			});
		//点击页码换页
			$("#page").delegate("div","click",function(){
				var mark=c-1;
				var s="<tr><td>标题</td><td>发布时间</td><td>操作</td></tr>";
				for(var i=0;i<page[mark].ntitle.length;i++){
					s+="<tr><td>"+page[mark].ntitle[i]+"</td><td>"+page[mark].date[i]+"</td><td><span class='button'>删除</span><span class='button'>修改</span></td></tr>"
				}
				$("#details .news_edit table table").html(s);
			})
		//点击功能按钮
			$("#details .news_edit").delegate(".button","click",function(){
				if($(this).text()=="删除"){
					var number=$("#details .news_edit table table tr").index($(this).parent().parent());
					number+=(c-1)*10-1;
					var title=$(this).closest("tr").find("td:eq(0)").text();
					var time=$(this).closest("tr").find("td:eq(1)").text();
					$("#full .news_edit .delete .news_title").text(title);
					$("#full .news_edit .delete .news_date").text(time);
					$("#full .news_edit .delete .number").text(number);
					$("#bottom").show();
					$("#full .news_edit .delete").show();
				}
				else if($(this).text()=="修改"){
					var number=$("#details .news_edit table table tr").index($(this).parent().parent());
					number+=(c-1)*10-1;
					$("#full .news_edit .delete .number").text(number);
					var title=$(this).closest("tr").find("td:eq(0)").text();
					var time=$(this).closest("tr").find("td:eq(1)").text();
					var data={newstitle:"格力参展117届春季广交会 绿色科技惊艳全球",content:"这里是新闻详细内容",id:"1123"};
							id=data.id;
							$("#details .news_edit .alter").show();
							$("#details .news_edit .alter .button").click();
							$("#details .news_edit .alter #news_title").val(data.newstitle);
							$("#details .news_edit .alter #text_box").html(data.content);
							$("#details .news_edit .add .click_edit").show();
					$.ajax({
						url:"manageNews",
						type:"post",
						data:{manage:"edit",newstitle:title,time:time},
						success:function(data){
							id=data.id;
							$("#details .news_edit .alter").show();
							$("#details .news_edit .alter .button").click();
							$("#details .news_edit .alter #news_title").val(data.newstitle);
							$("#details .news_edit .alter #text_box").html(data.content);
							$("#details .news_edit .add .click_edit").show();
						},
						error:function(){}
					});
				}
			});
		//确定取消按钮
			$("#full .news_edit .delete .button").click(function(){
				if($(this).text()=="确定"){
					$("#bottom").hide();
					$("#full .news_edit .delete").hide();
					$("#waiting").show();
					var title=$("#full .news_edit .delete .news_title").text();
					var time=$("#full .news_edit .delete .news_date").text();
					var number=parseInt($("#full .news_edit .delete .number").text());
							newsData.newscount-=1;
							newsData.news.splice(number,1);
							NewsShow(newsData,c);
							$("#details .news_edit .alter").hide();
							$("#waiting").hide();
					$.ajax({
						url:"manageNews",
						type:"post",
						data:{manage:"delete",newstitle:title,time:time},
						success:function(data){
							newsData.newscount-=1;
							newsData.news.splice(number,1);
							NewsShow(newsData,c);
							$("#details .news_edit .alter").hide();
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
		//文章编辑框
			$("#details .news_edit").delegate(".click_edit","click",function(){
				$("#details .news_edit #news_title").show();
				if($(this).closest("tr").hasClass("add")){
					$("#details .news_edit .alter").hide();
				}
			});
			$("#details .news_edit").delegate("#file","change",function(){
				var file=document.getElementById("file");
				var picform=document.getElementById("picform");
				if(/image/.test(file.files[0].type)){
					if(file.files[0].name.length>=28){
						picform.reset();
						alert("文件名过长");
						return;
					}
					var formdata=new FormData();
					formdata.append("pic",file.files[0]);
					$.ajax({
						url:"saveNewsPic",
						type:"POST",
						contentType:false,
						processData:false,
						data:formdata,
						success:function(data){
							if(data.picname){
								var img=document.createElement("img");
								img.src=data.picname;
								range.insertNode(img);
							}
							else{
								alert("图片返回失败");
							}
						},
						error:function(){
							alert("图片上传失败");
						}
					});
				}
				else{
					alert("请选择图片文件");
				}
        		picform.reset();
			});
			$("#details .news_edit").delegate(".pub","click",function(){
				if($(this).closest("tr").hasClass("alter")){
					var title=$("#details .news_edit .alter #news_title").val();
					var text=$("#details .news_edit .alter #text_box").html();
					text=text.replace(/&amp;/g,"&");
					var number=parseInt($("#full .news_edit .delete .number").text());
					$("#waiting").show();
							$("#details .news_edit .alter").hide();
							$("#details .news_edit .add .click_edit").show();
							newsData.news[number]=newsData.news[number].replace(/.+\#/,title+"#");
							NewsShow(newsData,c);
							$("#waiting").hide();
					$.ajax({
						url:"manageNews",
						type:"post",
						data:{manage:"update",newstitle:title,content:text,id:id},
						success:function(data){
							$("#details .news_edit .alter").hide();
							$("#details .news_edit .add .click_edit").show();
							newsData.news[number]=newsData.news[number].replace(/.+\#/,title+"#");
							NewsShow(newsData,c);
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
				else if($(this).closest("tr").hasClass("add")){
					var title=$("#details .news_edit .add #news_title").val();
					//检测标题是否重复
					for(var i=0;i<newsData.news[i].length;i++){
						if(title==newsData.news[i].replace(/\#.+/,"")){
							alert("新闻标题重复！");
							return;
						}
					}
					var text=$("#details .news_edit .add #text_box").html();
					text=text.replace(/&amp;/g,"&");
					$("#waiting").show();
						data={newscount:31,news:[
						"格力参展117届春季广交会 绿色科技惊艳全球#2015 4 15",
						"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 4 08",
						"格力工业制品首次亮相中国制冷展#2015 4 08",
						"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 4 08",
						"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 4 08",
						"格力参展117届春季广交会 绿色科技惊艳全球#2015 4 07",
						"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 4 06",
						"格力工业制品首次亮相中国制冷展#2015 4 05",
						"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 4 04",
						"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 4 03",
						"格力参展117届春季广交会 绿色科技惊艳全球#2015 4 02",
						"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 4 01",
						"格力工业制品首次亮相中国制冷展#2015 3 30",
						"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 3 29",
						"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 3 28",
						"格力参展117届春季广交会 绿色科技惊艳全球#2015 3 27",
						"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 3 26",
						"格力工业制品首次亮相中国制冷展#2015 3 25",
						"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 3 24",
						"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 3 23",
						"格力参展117届春季广交会 绿色科技惊艳全球#2015 3 22",
						"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 3 21",
						"格力工业制品首次亮相中国制冷展#2015 3 20",
						"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 3 19",
						"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 3 18",
						"格力参展117届春季广交会 绿色科技惊艳全球#2015 3 17",
						"2015中国制冷展今起开幕 制冷风向标格力参展看点多#2015 3 16",
						"格力工业制品首次亮相中国制冷展#2015 3 15",
						"格力点亮2015中国制冷展 成国内唯一获AHRI表彰企业#2015 3 14",
						"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 3 13",
						"第二届金叶轮奖暖通空调设计大赛于上海启动#2015 3 13",
						]}
							$("#details .news_edit .edit_box").remove();
							$("#details .news_edit .add .click_edit").show();
							NewsShow(data,1);
							newsData=data;
							$("#waiting").hide();
					$.ajax({
						url:"manageNews",
						type:"post",
						data:{manage:"add",newstitle:title,content:text},
						success:function(data){
							$("#details .news_edit .edit_box").remove();
							$("#details .news_edit .add .click_edit").show();
							NewsShow(data,1);
							newsData=data;
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
	//-----------------------recruitment_type-----------------------
		//点击进入页面时发送ajax
			$("#function .recruitment_type").click(function(){
				var data="{class:['会计','空调安装','仓库管理']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.class.length;i++){
							var option=document.createElement("option");
							option.text=data.class[i];
							s.appendChild(option);
						}
						$("#details .recruitment_type td.rclass").html(s);
				$.ajax({
					url:"manageJob",
					type:"post",
					data:{manage:"class"},
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.class.length;i++){
							option=document.createElement("option");
							option.text=data.class[i];
							s.appendChild(option);
						}
						$("#details .recruitment_type td.rclass").html(s);
					},
					error:function(){
						//alert("页面获取失败");
					}
				});
			});
		//点击功能按钮
			$("#details .recruitment_type .button").click(function(){
				var sclass=$(this).closest("tr").find("option:selected").text();
				if($(this).text()=="添加"){
					$("#details .recruitment_type .edit").hide();
					$("#details .recruitment_type .add").show();
				}
				else if(sclass!="请选择分类"){
					if($(this).text()=="删除"){
						$("#details .recruitment_type .edit").hide();
						$("#bottom").show();
						$("#full .recruitment_type .delete p span").text(sclass);
						$("#full .recruitment_type .delete").show();
					}
					else if($(this).text()=="修改"){
						$("#details .recruitment_type .edit").hide();
						$("#details .recruitment_type .alter input").val(sclass).select();
						$("#details .recruitment_type .alter").show();
					}
				}
			});
		//确定取消按钮
			$("#details .recruitment_type .add .button").click(function(){
				if($(this).text()=="确定"){
					var cn=$(this).closest("tr").find("input").val();
					//检查分类是否重复！
					var select=$("#details .recruitment_type select");
					if(!cn){
						return;
					}
					for(var i=1;i<select.find("option").length;i++){
						if(select.find("option:eq("+i+")").text()==cn){
							alert("分类名重复！");
							return;
						}
					}
					$("#waiting").show();
							$("#details .recruitment_type .edit").hide();
							$("#details .recruitment_type select").append("<option>"+cn+"</option>");
							$("#waiting").hide();
					$.ajax({
						url:"manageJob",
						type:"post",
						data:{"manage":"addclass","name":cn},
						success:function(data){
							$("#details .recruitment_type .edit").hide();
							$("#details .recruitment_type select").append("<option>"+cn+"</option>");
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
			$("#details .recruitment_type .alter .button").click(function(){
				if($(this).text()=="确定"){
					var cn=$(this).closest("tr").find("input").val();
					//检查分类是否重复！
					var select=$("#details .recruitment_type select");
					var ocn=select.find("option:selected").text();
					if(!cn){
						return;
					}
					for(var i=1;i<select.find("option").length;i++){
						if(select.find("option:eq("+i+")").text()==cn){
							$("#details .recruitment_type .edit").hide();
							return;
						}
					}
					$("#waiting").show();
							$("#details .recruitment_type .edit").hide();
							select.find("option:selected").text(cn);
							$("#waiting").hide();
					$.ajax({
						url:"manageJob",
						type:"post",
						data:{"manage":"editclass","oldname":ocn,"newname":cn},
						success:function(data){
							$("#details .recruitment_type .edit").hide();
							select.find("option:selected").text(cn);
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
				else if($(this).text()=="取消"){
					$("#details .products_type .edit").hide();
				}
			});
			$("#full .recruitment_type .delete .button").click(function(){
				if($(this).text()=="确定"){
					var cn=$(this).closest("div").find("span.class").text();
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
							$("#waiting").hide();
							$("#details .recruitment_type select option:selected").remove();
					$.ajax({
						url:"manageJob",
						type:"post",
						data:{"manage":"deleteclass","name":cn},
						success:function(data){
							$("#waiting").hide();
							$("#details .recruitment_type select option:selected").remove();
						},
						error:function(){}
					});
				}
			});
	//-----------------------recruitment_require-----------------------
		//点击进入页面时发送ajax
			$("#function .recruitment_require").click(function(){
				$("#details .recruitment_require .click_edit").hide();
				$("#details .recruitment_require .edit_box").hide();
				$("#details .recruitment_require .details").hide();
				var data="{class:['会计','空调安装','仓库管理']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.class.length;i++){
							var option=document.createElement("option");
							option.text=data.class[i];
							s.appendChild(option);
						}
						$("#details .recruitment_require td.rclass").html(s);
				$.ajax({
					url:"manageJob",
					type:"post",
					data:{manage:"class"},
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择分类";
						s.appendChild(option);
						for(var i=0;i<data.class.length;i++){
							option=document.createElement("option");
							option.text=data.class[i];
							s.appendChild(option);
						}
						$("#details .recruitment_require td.rclass").html(s);
					},
					error:function(){
						//alert("页面获取失败");
					}
				});
			});
		//点击选项时发送ajax请求
			$("#details .recruitment_require").delegate("select","change",function(){
				var s=$(this).find("option:selected").text();
				if(s=="请选择分类"){
					return;
				}
				data={info:"这里是招聘具体要求"};
						var s=data.info;
						$("#details .recruitment_require .details div").html(s);
						$("#details .recruitment_require .edit_box").remove();
						$("#details .recruitment_require .details").show();
						$("#details .recruitment_require .click_edit").show();
				$.ajax({
					url:"manageJob",
					type:"post",
					data:{manage:"get",name:s},
					success:function(data){
						var s=data.info;
						$("#details .recruitment_require .details div").html(s);
						$("#details .recruitment_require .edit_box").remove();
						$("#details .recruitment_require .click_edit").show();
					},
					error:function(){}
				});
			});
		//文章编辑框
			$("#details .recruitment_require .click_edit").click(function(){
				$("#details .recruitment_require .edit_function span:eq(0)").hide();
				var s=$("#details .recruitment_require .details div").html();
				$("#details .recruitment_require #text_box").html(s);
			});
			$("#details .recruitment_require").delegate(".pub","click",function(){
				var name=$("#details .recruitment_require select option:selected").text();
				var text=$("#details .recruitment_require #text_box").html();
				text=text.replace(/&amp;/g,"&");
				$("#waiting").show();
						$("#details .recruitment_require .edit_box").hide();
						$("#details .recruitment_require .details div").html(text);
						$("#details .recruitment_require .click_edit").show();
						$("#waiting").hide();
				$.ajax({
					url:"manageJob",
					type:"post",
					data:{manage:"edit",name:name,content:text},
					success:function(data){
						$("#details .recruitment_require .edit_box").hide();
						$("#details .recruitment_require .details div").html(text);
						$("#details .recruitment_require .click_edit").show();
						$("#waiting").hide();
					},
					error:function(){}
				});
			});
	//-----------------------culture_summary-----------------------
		//点击进入页面时发送ajax
			$("#function .culture_summary").click(function(){
				$("#details .culture_summary .edit_box").hide();
				$("#details .culture_summary .click_edit").show();
				data={content:"<p>东莞市忠胜格力产品销售中心成立于1992年，是一家集中央空调批发、销售、设计、安装、保养的专业化企业，本公司现有80余人。</p><p>我司拥有实力雄厚、专业技术水平较高的售后队伍，全体服务人员都经过厂家严格的专业培训持证上岗。</p><p>我司在塘厦、凤岗、樟木头等镇均设有服务网点，售后服务实行计算机一体化专业管理，24小时制售后跟踪服务，我司主要针对服务行业设有专门售后技术人员4小时内上门服务。</p><p>我司凭借高水平、高要求、高效益的管理体制，以“用一流的技术、做一流的服务”为宗旨。经过多年的创业与发展，在同行业内已树立起良好的口碑，受到了广大客户的一致好评。</p><p>我司在全体员工的共同努力和社会各界友好人士的鼎力支持下，规模和经营范围不断扩大、业务蒸蒸日上。</p><p>公司重视人才，以人为本，给员工提供充分发挥才能的平台。本着诚信为本，服务至上，精进卓越，亲和共生的经营理念，给顾客提供优质的服务。</p>"};
						var s=data.content;
						$("#details .culture_summary #intro").html(s);
				$.ajax({
					url:"manageCompanyCulture",
					type:"post",
					data:{part:"companyinfo",manage:"get"},
					success:function(data){
						var s=data.content;
						$("#details .culture_summary #intro").html(s);
					},
					error:function(){}
				});
			});
		//文章编辑框
			$("#details .culture_summary .click_edit").click(function(){
				$("#details .culture_summary .edit_function span:eq(0)").hide();
				var s=$("#details .culture_summary #intro").html();
				if(s){
					$("#details .culture_summary #text_box").html(s);
				}
			});
			$("#details .culture_summary").delegate(".pub","click",function(){
				var text=$("#details .culture_summary #text_box").html();
				text=text.replace(/&amp;/g,"&");
				$("#waiting").show();
						$("#details .culture_summary .edit_box").hide();
						$("#details .culture_summary #intro").html(text);
						$("#details .culture_summary .click_edit").show();
						$("#waiting").hide();
				$.ajax({
					url:"manageCompanyCulture",
					type:"post",
					data:{part:"companyinfo",manage:"edit",content:text},
					success:function(data){
						$("#details .culture_summary .edit_box").hide();
						$("#details .culture_summary #intro").html(text);
						$("#details .culture_summary .click_edit").show();
						$("#waiting").hide();
					},
					error:function(){}
				});
			});
	//-----------------------culture_spirit-----------------------
		//点击进入页面时发送ajax
			$("#function .culture_spirit").click(function(){
				$("#details .culture_spirit .edit_box").hide();
				$("#details .culture_spirit .click_edit").show();
				data={content:"<p><span>企业精神</span><span>忠诚、友善、勤奋、进取</span></p><p><span>经营理念</span><span>制造最好的空调奉献给广大消费者</span></p><p><span>管理理念</span><span>创新永无止境</span></p><p><span>管理特色</span><span>合理化、科学化、变准化、网络化</span></p><p><span>服务理念</span><span>您的每一件小事都是格力的大事</span></p><p><span>人力资源理念</span><span>以人为本</span></p>"}
						var s=data.content;
						$("#details .culture_spirit #spirit").html(s);
				$.ajax({
					url:"manageCompanyCulture",
					type:"post",
					data:{part:"greemind",manage:"get"},
					success:function(data){
						var s=data.content;
						$("#details .culture_spirit #spirit").html(s);
					},
					error:function(){}
				});
			});
		//文章编辑框
			$("#details .culture_spirit .click_edit").click(function(){
				$("#details .culture_spirit .edit_function span:eq(0)").hide();
				var s=$("#details .culture_spirit #spirit").html();
				if(s){
					$("#details .culture_spirit #text_box").html(s);
				}
			});
			$("#details .culture_spirit").delegate(".pub","click",function(){
				var text=$("#details .culture_spirit #text_box").html();
				text=text.replace(/&amp;/g,"&");
				$("#waiting").show();
						$("#details .culture_spirit .edit_box").hide();
						$("#details .culture_spirit #spirit").html(text);
						$("#details .culture_spirit .click_edit").show();
						$("#waiting").hide();
				$.ajax({
					url:"manageCompanyCulture",
					type:"post",
					data:{part:"greemind",manage:"edit",content:text},
					success:function(data){
						$("#details .culture_spirit .edit_box").hide();
						$("#details .culture_spirit #spirit").html(text);
						$("#details .culture_spirit .click_edit").show();
						$("#waiting").hide();
					},
					error:function(){}
				});
			});
	//-----------------------culture_speech-----------------------
		//点击进入页面时发送ajax
			$("#function .culture_speech").click(function(){
				$("#details .culture_speech .edit_box").hide();
				$("#details .culture_speech .click_edit").show();
				data={content:"<p>我公司自建立以来，承蒙各生产厂家和客户朋友鼎立相助，公司规模逐渐壮大，取得了较好的成绩。在此，我谨代表全体同仁发自内心地相各位致以深深的谢意！常言道：十年修得同船渡。相逢是缘，相交更是缘。公司全体员工在这十余年的路途上，本着“与人方便，自己方便”的古训为人做事，时刻与各厂家和用户朋友亲密相处，精诚合作、风雨同舟、甘苦共享。我们深以与你们同行共渡为容！我们更看重和珍惜彼此间的事业和友情。无论何时何地，我们全体员工都会不遗余力地投入到工作之中，竭尽所能为各位朋友提供满意的服务,以达到我们彼此的共赢和多赢。朋友们：闲时请来公司做客忙时电话短信问候。承蒙各生产厂家和客户朋友鼎立相助，公司规模逐渐壮大，取得了较好的成绩。在此，我谨代表全体同仁发自内心地相各位致以深深的谢意！常言道：十年修得同船渡。相逢是缘，相交更是缘。公司全体员工在这十余年的路途上，本着“与人方便，自己方便”的古训为人做事，时刻与各厂家和用户朋友亲密相处，精诚合作、风雨同舟、甘苦共享。我们深以与你们同行共渡为容！我们更看重和珍惜彼此间的事业和友情。无论何时何地，我们全体员工都会不遗余力地投入到工作之中，竭尽所能为各位朋友提供满意的服务,以达到我们彼此的共赢和多赢。朋友们：闲时请来公司做客忙时电话短信问候。</p>"}
						var s=data.content;
						$("#details .culture_speech #speech").html(s);
				$.ajax({
					url:"manageCompanyCulture",
					type:"post",
					data:{part:"leaderword",manage:"get"},
					success:function(data){
						var s=data.content;
						$("#details .culture_speech #speech").html(s);
					},
					error:function(){}
				});
			});
		//文章编辑框
			$("#details .culture_speech .click_edit").click(function(){
				$("#details .culture_speech .edit_function span:eq(0)").hide();
				var s=$("#details .culture_speech #speech").html();
				if(s){
					$("#details .culture_speech #text_box").html(s);
				}
			});
			$("#details .culture_speech").delegate(".pub","click",function(){
				var text=$("#details .culture_speech #text_box").html();
				text=text.replace(/&amp;/g,"&");
				$("#waiting").show();
						$("#details .culture_speech .edit_box").hide();
						$("#details .culture_speech #speech").html(text);
						$("#details .culture_speech .click_edit").show();
						$("#waiting").hide();
				$.ajax({
					url:"manageCompanyCulture",
					type:"post",
					data:{part:"leaderword",manage:"edit",content:text},
					success:function(data){
						$("#details .culture_speech .edit_box").hide();
						$("#details .culture_speech #speech").html(text);
						$("#details .culture_speech .click_edit").show();
						$("#waiting").hide();
					},
					error:function(){}
				});
			});
	//-----------------------culture_honor-----------------------
		//点击进入页面时发送ajax
			$("#function .culture_honor").click(function(){
				data={honorpic:["picname1.jpg","picname2.jpg","picname3.jpg","picname4.jpg","picname5.jpg","picname6.jpg"]}
						var pics=data.honorpic;
						var s="";
						for(var i=0;i<pics.length;i++){
							var div=document.createElement("div");
							var img=document.createElement("img");
							img.src=pics[i];
							img.alt=i;
							var input=document.createElement("input");
							input.type="checkbox";
							div.appendChild(img);
							div.appendChild(input);
							s+=div.outerHTML+"\n";
						}
						$("#details .culture_honor #honor_pics").html(s);
				$.ajax({
					url:"manageCompanyCulture",
					type:"post",
					data:{part:"companyhonor",manage:"get"},
					success:function(data){
						var pics=data.honorpic;
						var s="";
						for(var i=0;i<pics.length;i++){
							var div=document.createElement("div");
							var img=document.createElement("img");
							img.src=pics[i];
							var input=document.createElement("input");
							input.type="checkbox";
							div.appendChild(img);
							div.appendChild(input);
							s+=div.outerHTML+"\n";
						}
						$("#details .culture_honor #honor_pics").html(s);
					},
					error:function(){}
				});
			});
		//点击功能按钮
			$("#details .culture_honor .button").click(function(){
				if($(this).text()=="删除"){
					var pic_name=new Array();
					var list="";
					var len=$("#details .culture_honor #honor_pics").find("input:checked").length;
					if(len==0){
						return;
					}
					for(var i=0;i<len;i++){
						if(i!=0){
							list+=" ";
						}
						pic_name[i]=$("#details .culture_honor #honor_pics").find("input:checked:eq("+i+")").prev().attr('src').replace(/.+\//,"").replace(/\..+/,"");
						list+=pic_name[i];
					}
					$("#full .culture_honor .delete p span").text(list);
					$("#bottom").show();
					$("#full .culture_honor .delete").show();
				}
			});
		//确定取消按钮
			$("#details .culture_honor .add .button").click(function(){
				if($(this).text()=="确定"){
					var file=this.previousSibling;
					if(/image/.test(file.files[0].type)){
						if(file.files[0].name.length>=28){
							alert("文件名过长");
							return;
						}
						var formdata=new FormData();
						formdata.append("part","companyhonor");
						formdata.append("manage","add");
						formdata.append("pic",file.files[0]);
						$("#waiting").show();
						var data={picname:"picname.jpg"};
								var div=document.createElement("div");
								var img=document.createElement("img");
								img.src=data.picname;
								var input=document.createElement("input");
								input.type="checkbox";
								div.appendChild(img);
								div.appendChild(input);
								$("#details .culture_honor #honor_pics").append(div).append("\n");
								$("#waiting").hide();
						$.ajax({
							url:"manageProductPic",
							type:"post",
							contentType:false,
							processData:false,
							data:formdata,
							success:function(data){
								var div=document.createElement("div");
								var img=document.createElement("img");
								img.src=data.picname;
								var input=document.createElement("input");
								input.type="checkbox";
								div.appendChild(img);
								div.appendChild(input);
								$("#details .culture_honor #honor_pics").append(div).append("\n");
								$("#waiting").hide();
							},
							error:function(){}
						});
					}
					else{
						alert("请选择图片文件");
					}
				}
			});
			$("#full .culture_honor .delete .button").click(function(){
				if($(this).text()=="确定"){
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
					var ppname=new Array();
					for(var i=0;i<$("#details .culture_honor #honor_pics").find("input:checked").length;i++){
						ppname[i]=$("#details .culture_honor #honor_pics").find("input:checked:eq("+i+")").prev().attr('src').replace(/.+\//,"").replace(/\..+/,"");
					}
					//var ppname=$(this).siblings("p").find(".pic_name").text();
					//ppname=ppname.replace(/\s/g,"\",\"");
					//ppname="[\""+ppname+"\"]";
							var len=$("#details .culture_honor #honor_pics").find("input:checked").length;
							for(var i=0;i<len;i++){
								$("#details .culture_honor #honor_pics").find("input:checked:eq(0)").parent().remove();
							}
							$("#waiting").hide();
					$.ajax({
						url:"manageCompanyCulture",
						type:"post",
						data:{part:"companyhonor",manage:"delete",pic:ppname},
						success:function(data){
							var len=$("#details .culture_honor #honor_pics").find("input:checked").length;
							for(var i=0;i<len;i++){
								$("#details .culture_honor #honor_pics").find("input:checked:eq(0)").parent().remove();
							}
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
	//-----------------------contact_details-----------------------
		//点击进入页面时发送ajax
			$("#function .contact_details").click(function(){
				$("#details .contact_details .edit_box").hide();
				$("#details .contact_details .click_edit").show();
				data={content:"<div><p><span>地址：东莞市樟木头镇柏地东城路68号</span></p><p><span>电话：0769-87568836</span></p><p><span>传真：0769-82778628</span></p><p><span>邮箱：dgzsdq@163.com</span></p><p><span>邮编：523635</span></p><p class='clear'></p></div>"}
						var s=data.content;
						$("#contact_way").html(s);
				$.ajax({
					url:"manageContactUs",
					type:"post",
					data:{manage:"get"},
					success:function(data){
						var s=data.content;
						$("#contact_way").html(s);
					},
					error:function(){}
				});
			});
		//文章编辑框
			$("#details .contact_details .click_edit").click(function(){
				$("#details .contact_details .edit_function span:eq(0)").hide();
				var s=$("#details .contact_details #contact_way").html();
				if(s){
					$("#details .contact_details #text_box").html(s);
				}
			});
			$("#details .contact_details").delegate(".pub","click",function(){
				var text=$("#details .contact_details #text_box").html();
				text=text.replace(/&amp;/g,"&");
				$("#waiting").show();
						$("#details .contact_details .edit_box").hide();
						$("#details .contact_details #contact_way").html(text);
						$("#details .contact_details .click_edit").show();
						$("#waiting").hide();
				$.ajax({
					url:"manageCompanyCulture",
					type:"post",
					data:{part:"leaderword",manage:"edit",content:text},
					success:function(data){
						$("#details .contact_details .edit_box").hide();
						$("#details .contact_details #contact_way").html(text);
						$("#details .contact_details .click_edit").show();
						$("#waiting").hide();
					},
					error:function(){}
				});
			});
	//-----------------------stores_show-----------------------
		//点击进入页面时发送ajax
			$("#function .stores_show").click(function(){
				$("#details .stores_show .click_edit").show();
				$("#details .edit_box").remove();
				var data="{shop:['shop1','shop2','shop3']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择店铺";
						s.appendChild(option);
						for(var i=0;i<data.shop.length;i++){
							var option=document.createElement("option");
							option.text=data.shop[i];
							s.appendChild(option);
						}
						$("#details .stores_show select").html(s.innerHTML);
						$("#details .stores_show select").change();
				$.ajax({
					url:"manageShop",
					type:"post",
					data:{manage:"get"},
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择店铺";
						s.appendChild(option);
						for(var i=0;i<data.shop.length;i++){
							option=document.createElement("option");
							option.text=data.shop[i];
							s.appendChild(option);
						}
						$("#details .stores_show select:eq(0)").html(s.innerHTML);
						$("#details .stores_show select:eq(0)").change();
					},
					error:function(){
						//alert("页面获取失败");
					}
				});
			});
		//点击选项发送ajax请求
			$("#details .stores_show select").change(function(){
				$("#details .stores_show .click_edit").show();
				$("#details .edit_box").remove();
				$("#details .stores_show .edit").hide();
				var s=$("#details .stores_show select option:selected").text();
				if(s=="请选择店铺"){
					$("#details .stores_show .details").hide();
					return;
				}
				var data={pic:"/getPic/shop1.jpg",content:"这里是店铺介绍文章"};
						$("#details .stores_show .c_pic img").attr({"src":data.pic});
						$("#details .stores_show .e_detail div").html(data.content);
						$("#details .stores_show .details").show();
				$.ajax({
					url:"manageShop",
					type:"post",
					data:{manage:"get",shopname:s},
					success:function(data){
						$("#details .stores_show .c_pic img").src=data.pic;
						$("#details .stores_show .e_detail div").html(data.content);
						$("#details .stores_show .details").show();

					},
					error:function(){}
				});
			});
		//点击功能按钮
			$("#details .stores_show .name_edit .button").click(function(){
				var sclass=$("#details .stores_show select option:selected").text();
				$("#details .stores_show .edit").hide();
				if($(this).text()=="添加"){
					$("#details .stores_show .add").show();
				}
				else if($(this).text()=="排序"){
					$("#bottom").show();
					var list="";
					for(var i=1;i<$(this).closest("tr").find("option").length;i++){
						var o=$(this).closest("tr").find("option:eq("+i+")").text();
						list+="<p><input type='radio' name='engineering'><span>"+o+"</span></p>";
					}
					$("#full .stores_show .sort div").html(list);
					$("#full .stores_show .sort").show();
				}
				else if(sclass!="请选择店铺"){
					if($(this).text()=="删除"){
						$("#bottom").show();
						var name=$(this).closest("tr").find("option:selected").text();
						$("#full .stores_show .delete p span").text(name);
						$("#full .stores_show .delete").show();
					}
					else if($(this).text()=="编辑"){
						$("#details .stores_show .edit").hide();
						$("#details .stores_show .alter input").val(sclass).select();
						$("#details .stores_show .alter").show();
					}
				}
			});
		//文章编辑框
			$("#details .stores_show .click_edit").click(function(){
				var s=$("#details .stores_show .c_detail div").html();
				if(s){
					$("#text_box").html(s);
				}
			});
			$("#details .stores_show").delegate("#file","change",function(){
				var file=document.getElementById("file");
				var picform=document.getElementById("picform");
				if(/image/.test(file.files[0].type)){
					if(file.files[0].name.length>=28){
						picform.reset();
						alert("文件名过长");
						return;
					}
					var cname=$("#details .stores_show select option:selected").text();
					var formdata=new FormData();
					formdata.append("pic",file.files[0]);
					formdata.append("shopname",cname);
					$.ajax({
						url:"saveShopPic",
						type:"POST",
						contentType:false,
						processData:false,
						data:formdata,
						success:function(data){
							if(data.picname){
								var img=document.createElement("img");
								img.src=data.picname;
								range.insertNode(img);
							}
							else{
								alert("图片返回失败");
							}
						},
						error:function(){
							alert("图片上传失败");
						}
					});
				}
				else{
					alert("请选择图片文件");
				}
        		picform.reset();
			});
			$("#details .stores_show").delegate(".pub","click",function(){
				var cname=$("#details .stores_show select option:selected").text();
				var text=$("#details .stores_show #text_box").html();
				text=text.replace(/&amp;/g,"&");
				$("#waiting").show();
						$("#details .stores_show .c_detail div").html(text);
						$("#details .stores_show .edit_box").remove();
						$("#details .stores_show .click_edit").show();
						$("#waiting").hide();
				$.ajax({
					url:"saveShopInfo",
					type:"post",
					data:{shopname:cname,content:text},
					success:function(data){
						$("#details .stores_show .c_detail div").html(text);
						$("#details .stores_show .edit_box").remove();
						$("#details .stores_show .click_edit").show();
						$("#waiting").hide();
					},
					error:function(){}
				});
			});
		//确定取消按钮
			$("#details .stores_show .edit").delegate(".button","click",function(){
				if($(this).text()=="取消"){
					$("#details .stores_show .edit").hide();
				}
				else if($(this).text()=="确定"){
					var s=$(this).prev().val();
					if(!s){
						return;
					}
					if($(this).closest("tr").hasClass("add")){
						for(var i=1;i<$("#details .stores_show select option").length;i++){
							if(s==$("#details .stores_show select option:eq("+i+")").text()){
								alert("店铺名字重复！");
								return;
							}
						}
						$("#waiting").show();
								$("#details .stores_show select").append("<option>"+s+"</option>");
								$("#details .stores_show .edit").hide();
								$("#waiting").hide();
						$.ajax({
							url:"manageShop",
							type:"post",
							data:{manage:"add",shopname:s},
							success:function(data){
								$("#details .stores_show select").append("<option>"+s+"</option>");
								$("#details .stores_show .edit").hide();
								$("#waiting").hide();
							},
							error:function(){}
						});
					}
					else if($(this).closest("tr").hasClass("alter")){
						for(var i=1;i<$("#details .stores_show select option").length;i++){
							if(s==$("#details .stores_show select option:eq("+i+")").text()){
								alert("店铺名字重复！");
								return;
							}
						}
						var os=$("#details .stores_show select option:selected").text();
						$("#waiting").show();
								$("#details .stores_show .edit").hide();
								for(var i=1;i<$("#details .stores_show select option").length;i++){
									if(os==$("#details .stores_show select option:eq("+i+")").text()){
										$("#details .stores_show select option:eq("+i+")").text(s);
									}
								}
								$("#waiting").hide();
						$.ajax({
							url:"manageShop",
							type:"post",
							data:{manage:"edit",shopname:s,oldname:os},
							success:function(data){
								$("#details .stores_show .edit").hide();
								for(var i=1;i<$("#details .stores_show select option").length;i++){
									if(os==$("#details .stores_show select option:eq("+i+")").text()){
										$("#details .stores_show select option:eq("+i+")").text(s);
									}
								}
								$("#waiting").hide();
							},
							error:function(){}
						});
					}
				}
			});
			$("#full .stores_show .delete .button").click(function(){
				if($(this).text()=="确定"){
					var s=$(this).closest("div").find("p span").text();
					$("#bottom").hide();
					$("#full .stores_show .delete").hide();
					$("#waiting").show();
							for(var i=1;i<$("#details .stores_show select option").length;i++){
								if(s==$("#details .stores_show select option:eq("+i+")").text()){
									$("#details .stores_show select option:eq("+i+")").remove();
								}
							}
							$("#details .stores_show .details").hide();
							$("#waiting").hide();
					$.ajax({
						url:"manageShop",
						type:"post",
						data:{manage:"delete",shopname:s},
						success:function(data){
							for(var i=1;i<$("#details .stores_show select option").length;i++){
								if(s==$("#details .stores_show select option:eq("+i+")").text()){
									$("#details .stores_show select option:eq("+i+")").remove();
								}
							}
							$("#details .stores_show .details").hide();
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
			$("#full .stores_show .sort .button").click(function(){
				if($(this).text()=="确定"){
					var list="";
					var s=document.createElement("select");
					var option=document.createElement("option");
					option.text="请选择分类";
					s.appendChild(option);
					for(var i=0;i<$(this).closest("div").find("div span").length;i++){
						if(i!=0){
							list+="#";
						}
						var option=document.createElement("option");
						option.text=$(this).closest("div").find("div span:eq("+i+")").text();
						list+=option.text;
						s.appendChild(option);
					}
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
							$("#waiting").hide();
							$("#details .stores_show select").html(s.innerHTML);
							$("#details .stores_show .details").hide();
					$.ajax({
						url:"manageShop",
						type:"post",
						data:{manage:"sort",sequence:list},
						success:function(data){
							$("#waiting").hide();
							$("#details .stores_show select").html(s.innerHTML);
							$("#details .stores_show .details").hide();
						},
						error:function(){}
					});
				}
			});
			$("#details .stores_show .edit_pic .button").click(function(){
				var file=this.previousSibling;
				if(/image/.test(file.files[0].type)){
					if(file.files[0].name.length>=28){
						alert("文件名过长");
						return;
					}
					var s=$("#details .stores_show select option:selected").text();
					var formdata=new FormData();
					formdata.append("pic",file.files[0]);
					formdata.append("shopname",s);
					$("#waiting").show();
					var data={picname:"picname.jpg"};
							$("#details .stores_show .c_pic img").attr({"src":data.picname});
							$("#waiting").hide();
					$.ajax({
						url:"saveShopFirstPic",
						type:"post",
						contentType:false,
						processData:false,
						data:formdata,
						success:function(data){
							$("#details .stores_show .c_pic img").attr({"src":data.picname});
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
				else{
					alert("请选择图片文件");
				}
			});
		//排序上下按钮
			$("#full .stores_show .up").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.prev().is("p")){
					checked.prev().before(s);
					var newChecked=checked.prev().prev();
					newChecked.find("input").click();
					checked.remove();
				}
			});
			$("#full .stores_show .down").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.next().is("p")){
					checked.next().after(s);
					var newChecked=checked.next().next();
					newChecked.find("input").click();
					checked.remove();
				}
			});
	//-----------------------engineering_show-----------------------
		//点击进入页面时发送ajax
			$("#function .engineering_show").click(function(){
				$("#details .engineering_show .click_edit").show();
				$("#details .edit_box").remove();
				var data="{case:['case1','case2','case3']}";
				data=eval("("+data+")");
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择工程";
						s.appendChild(option);
						for(var i=0;i<data.case.length;i++){
							var option=document.createElement("option");
							option.text=data.case[i];
							s.appendChild(option);
						}
						$("#details .engineering_show select").html(s.innerHTML);
						$("#details .engineering_show select").change();
				$.ajax({
					url:"manageCase",
					type:"post",
					data:{manage:"get"},
					success:function(data){
						var s=document.createElement("select");
						var option=document.createElement("option");
						option.text="请选择工程";
						s.appendChild(option);
						for(var i=0;i<data.case.length;i++){
							option=document.createElement("option");
							option.text=data.case[i];
							s.appendChild(option);
						}
						$("#details .engineering_show select:eq(0)").html(s.innerHTML);
						$("#details .engineering_show select:eq(0)").change();
					},
					error:function(){
						//alert("页面获取失败");
					}
				});
			});
		//点击选项发送ajax请求
			$("#details .engineering_show select").change(function(){
				$("#details .engineering_show .click_edit").show();
				$("#details .edit_box").remove();
				$("#details .engineering_show .edit").hide();
				var s=$("#details .engineering_show select option:selected").text();
				if(s=="请选择工程"){
					$("#details .engineering_show .details").hide();
					return;
				}
				var data={pic:"/getPic/case1.jpg",content:"这里是工程介绍文章"};
						$("#details .engineering_show .c_pic img").attr({"src":data.pic});
						$("#details .engineering_show .e_detail div").html(data.content);
						$("#details .engineering_show .details").show();
				$.ajax({
					url:"manageCase",
					type:"post",
					data:{manage:"get",casename:s},
					success:function(data){
						$("#details .engineering_show .c_pic img").src=data.pic;
						$("#details .engineering_show .e_detail div").html(data.content);
						$("#details .engineering_show .details").show();

					},
					error:function(){}
				});
			});
		//点击功能按钮
			$("#details .engineering_show .name_edit .button").click(function(){
				var sclass=$("#details .engineering_show select option:selected").text();
				$("#details .engineering_show .edit").hide();
				if($(this).text()=="添加"){
					$("#details .engineering_show .add").show();
				}
				else if($(this).text()=="排序"){
					$("#bottom").show();
					var list="";
					for(var i=1;i<$(this).closest("tr").find("option").length;i++){
						var o=$(this).closest("tr").find("option:eq("+i+")").text();
						list+="<p><input type='radio' name='engineering'><span>"+o+"</span></p>";
					}
					$("#full .engineering_show .sort div").html(list);
					$("#full .engineering_show .sort").show();
				}
				else if(sclass!="请选择工程"){
					if($(this).text()=="删除"){
						$("#bottom").show();
						var name=$(this).closest("tr").find("option:selected").text();
						$("#full .engineering_show .delete p span").text(name);
						$("#full .engineering_show .delete").show();
					}
					else if($(this).text()=="编辑"){
						$("#details .engineering_show .edit").hide();
						$("#details .engineering_show .alter input").val(sclass).select();
						$("#details .engineering_show .alter").show();
					}
				}
			});
		//文章编辑框
			$("#details .engineering_show .click_edit").click(function(){
				var s=$("#details .engineering_show .c_detail div").html();
				if(s){
					$("#text_box").html(s);
				}
			});
			$("#details .engineering_show").delegate("#file","change",function(){
				var file=document.getElementById("file");
				var picform=document.getElementById("picform");
				if(/image/.test(file.files[0].type)){
					if(file.files[0].name.length>=28){
						picform.reset();
						alert("文件名过长");
						return;
					}
					var cname=$("#details .engineering_show select option:selected").text();
					var formdata=new FormData();
					formdata.append("pic",file.files[0]);
					formdata.append("casename",cname);
					$.ajax({
						url:"saveCasePic",
						type:"POST",
						contentType:false,
						processData:false,
						data:formdata,
						success:function(data){
							if(data.picname){
								var img=document.createElement("img");
								img.src=data.picname;
								range.insertNode(img);
							}
							else{
								alert("图片返回失败");
							}
						},
						error:function(){
							alert("图片上传失败");
						}
					});
				}
				else{
					alert("请选择图片文件");
				}
        		picform.reset();
			});
			$("#details .engineering_show").delegate(".pub","click",function(){
				var cname=$("#details .engineering_show select option:selected").text();
				var text=$("#details .engineering_show #text_box").html();
				text=text.replace(/&amp;/g,"&");
				$("#waiting").show();
						$("#details .engineering_show .c_detail div").html(text);
						$("#details .engineering_show .edit_box").remove();
						$("#details .engineering_show .click_edit").show();
						$("#waiting").hide();
				$.ajax({
					url:"saveCaseInfo",
					type:"post",
					data:{casename:cname,content:text},
					success:function(data){
						$("#details .engineering_show .c_detail div").html(text);
						$("#details .engineering_show .edit_box").remove();
						$("#details .engineering_show .click_edit").show();
						$("#waiting").hide();
					},
					error:function(){}
				});
			});
		//确定取消按钮
			$("#details .engineering_show .edit").delegate(".button","click",function(){
				if($(this).text()=="取消"){
					$("#details .engineering_show .edit").hide();
				}
				else if($(this).text()=="确定"){
					var s=$(this).prev().val();
					if(!s){
						return;
					}
					if($(this).closest("tr").hasClass("add")){
						for(var i=1;i<$("#details .engineering_show select option").length;i++){
							if(s==$("#details .engineering_show select option:eq("+i+")").text()){
								alert("工程名字重复！");
								return;
							}
						}
						$("#waiting").show();
								$("#details .engineering_show select").append("<option>"+s+"</option>");
								$("#details .engineering_show .edit").hide();
								$("#waiting").hide();
						$.ajax({
							url:"manageCase",
							type:"post",
							data:{manage:"add",casename:s},
							success:function(data){
								$("#details .engineering_show select").append("<option>"+s+"</option>");
								$("#details .engineering_show .edit").hide();
								$("#waiting").hide();
							},
							error:function(){}
						});
					}
					else if($(this).closest("tr").hasClass("alter")){
						for(var i=1;i<$("#details .engineering_show select option").length;i++){
							if(s==$("#details .engineering_show select option:eq("+i+")").text()){
								alert("工程名字重复！");
								return;
							}
						}
						var os=$("#details .engineering_show select option:selected").text();
						$("#waiting").show();
								$("#details .engineering_show .edit").hide();
								for(var i=1;i<$("#details .engineering_show select option").length;i++){
									if(os==$("#details .engineering_show select option:eq("+i+")").text()){
										$("#details .engineering_show select option:eq("+i+")").text(s);
									}
								}
								$("#waiting").hide();
						$.ajax({
							url:"manageCase",
							type:"post",
							data:{manage:"edit",casename:s,oldname:os},
							success:function(data){
								$("#details .engineering_show .edit").hide();
								for(var i=1;i<$("#details .engineering_show select option").length;i++){
									if(os==$("#details .engineering_show select option:eq("+i+")").text()){
										$("#details .engineering_show select option:eq("+i+")").text(s);
									}
								}
								$("#waiting").hide();
							},
							error:function(){}
						});
					}
				}
			});
			$("#full .engineering_show .delete .button").click(function(){
				if($(this).text()=="确定"){
					var s=$(this).closest("div").find("p span").text();
					$("#bottom").hide();
					$("#full .engineering_show .delete").hide();
					$("#waiting").show();
							for(var i=1;i<$("#details .engineering_show select option").length;i++){
								if(s==$("#details .engineering_show select option:eq("+i+")").text()){
									$("#details .engineering_show select option:eq("+i+")").remove();
								}
							}
							$("#details .engineering_show .details").hide();
							$("#waiting").hide();
					$.ajax({
						url:"manageCase",
						type:"post",
						data:{manage:"delete",casename:s},
						success:function(data){
							for(var i=1;i<$("#details .engineering_show select option").length;i++){
								if(s==$("#details .engineering_show select option:eq("+i+")").text()){
									$("#details .engineering_show select option:eq("+i+")").remove();
								}
							}
							$("#details .engineering_show .details").hide();
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
			});
			$("#full .engineering_show .sort .button").click(function(){
				if($(this).text()=="确定"){
					var list="";
					var s=document.createElement("select");
					var option=document.createElement("option");
					option.text="请选择分类";
					s.appendChild(option);
					for(var i=0;i<$(this).closest("div").find("div span").length;i++){
						if(i!=0){
							list+="#";
						}
						var option=document.createElement("option");
						option.text=$(this).closest("div").find("div span:eq("+i+")").text();
						list+=option.text;
						s.appendChild(option);
					}
					$("#bottom").hide();
					$("#full>div>div").hide();
					$("#waiting").show();
							$("#waiting").hide();
							$("#details .engineering_show select").html(s.innerHTML);
							$("#details .engineering_show .details").hide();
					$.ajax({
						url:"manageCase",
						type:"post",
						data:{manage:"sort",sequence:list},
						success:function(data){
							$("#waiting").hide();
							$("#details .engineering_show select").html(s.innerHTML);
							$("#details .engineering_show .details").hide();
						},
						error:function(){}
					});
				}
			});
			$("#details .engineering_show .edit_pic .button").click(function(){
				var file=this.previousSibling;
				if(/image/.test(file.files[0].type)){
					if(file.files[0].name.length>=28){
						alert("文件名过长");
						return;
					}
					var s=$("#details .engineering_show select option:selected").text();
					var formdata=new FormData();
					formdata.append("pic",file.files[0]);
					formdata.append("casename",s);
					$("#waiting").show();
					var data={picname:"picname.jpg"};
							$("#details .engineering_show .c_pic img").attr({"src":data.picname});
							$("#waiting").hide();
					$.ajax({
						url:"saveCaseFirstPic",
						type:"post",
						contentType:false,
						processData:false,
						data:formdata,
						success:function(data){
							$("#details .engineering_show .c_pic img").attr({"src":data.picname});
							$("#waiting").hide();
						},
						error:function(){}
					});
				}
				else{
					alert("请选择图片文件");
				}
			});
		//排序上下按钮
			$("#full .engineering_show .up").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.prev().is("p")){
					checked.prev().before(s);
					var newChecked=checked.prev().prev();
					newChecked.find("input").click();
					checked.remove();
				}
			});
			$("#full .engineering_show .down").click(function(){
				var checked=$(this).closest("div").find("input:checked").parent();
				var s=checked.prop("outerHTML");
				if(checked.next().is("p")){
					checked.next().after(s);
					var newChecked=checked.next().next();
					newChecked.find("input").click();
					checked.remove();
				}
			});
}