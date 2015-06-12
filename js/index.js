window.onload=function(){
    	$("#intro div").mouseover(function(){
    		var s=$("img",this).attr("src").replace(/\.png/,"2.png");
    		$("img",this).attr({"src":s});
    	});
    	$("#intro div").mouseout(function(){
    		var s=$("img",this).attr("src").replace(/2\.png/,".png");
    		$("img",this).attr({"src":s});
    	});
}
{ "keys": ["f1"], "command": "side_bar_files_open_with",
             "args": {
                "paths": [],
                "application": "C:\\Users\\Bin\\AppData\\Local\\360Chrome\\Chrome\\Application\\360chrome.exe",
                "extensions":".*" //匹配任何文件类型
            }
    }