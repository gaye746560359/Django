function info(status,message) {
	if(status>=0) {
		toastr.success(message==null ? "操作成功 !" : message);
	} else {
		toastr.error(message==null ? "操作失败 !" : message);
	}
};

function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};

function addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
};

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, '');
    }
};

function getArgs() {
    var args = {};
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        value = decodeURIComponent(value);
        args[argname] = value;
    }
    return args;
};



function HTMLDecode(text) {
    var temp = document.createElement("textarea");
    temp.innerHTML = text;
    return temp.value;
};
function HTMLEncode(text) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
};
function insertAfter(existEl, newEl) {
    var nextEl = existEl.nextSibling;
    if (nextEl)
        existEl.parentElement.insertBefore(newEl, nextEl);
    else
        existEl.parentElement.appendChild(newEl);
};

function addEvent(oTarget, eventType, listener) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(eventType, listener, false);
    } else if (oTarget.attachEvent) {
        oTarget['e' + eventType + listener] = listener;
        oTarget[eventType + listener] = function() {
            oTarget['e' + eventType + listener](window.event);
        };
        oTarget.attachEvent('on' + eventType, oTarget[eventType + listener]);
    }
};

function removeEvent(oTarget, eventType, listener) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(eventType, listener, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent('on' + eventType, oTarget[eventType + listener]);
        delete oTarget[eventType + listener];
        delete oTarget['e' + eventType + listener];
    }
};


function offsetTopInBody(el) {
    var parent=el.offsetParent,
        sumOfTop=0;
    while(parent) {
        sumOfTop+=parent.offsetTop;
        parent=parent.offsetParent;
    }
    return sumOfTop+el.offsetTop;
};

if (!('trim' in String.prototype)) {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
};



/*function updateDic(oldDic,newDic) {
    for(var pro in newDic)
        if (Object.prototype.hasOwnProperty.call(newDic,pro))
            oldDic[pro] = newDic[pro];
}*/


/*function retry_run(fn_util_cond, fn_run_body, times, interval) {
    var _times = times || 5;
    var _interval = interval || 500;
    (function () {
        if (fn_util_cond()) {
            fn_run_body();
        } else if (_times > 0) {
            _times--;
            setTimeout(arguments.callee, _interval);
        }
    })();
}*/

Array.prototype.in_array = function(e)  {  
    for(i=0;i<this.length;i++)  {  
        if(this[i] == e)  
        return true;  
    }  
    return false;  
}; 
var cdnMap = null;
function loadAndSelectCdn(file,cdn) {
    var cdns = cdn.split(",");
    cdnMap = getMap();
    $.getJSON(file, function(result) {

        var divStr = "";
        $.each(result, function(i, n) {
            
            
            divStr += "<div class='cate"+ (n.toggle==1 ? ' toggle' : '')+"' id='cate_" + n.id + "'><h3 onclick=\"showCate('"+n.id+"')\"><span>" + n.name + "</span></h3><div class='cont'"+(n.toggle==1?" style='display:block'":'')+">";

            if (n.type == "select") {
                divStr += "<select name='js_file' id='" + n.id + "'>";
                $.each(n.files, function(j, f) {
                	cdnMap.put(f.id, f.url);
                    var checked = cdns.in_array(f.id);
                    divStr += "<option value='" + f.id + "'" +(checked ? "selected" : "")+">" + f.name + "</option>";
                });
                divStr += "</select>"
            } else if (n.type == "checkbox") {
              
                $.each(n.files, function(j, f) {
                	cdnMap.put(f.id, f.url);
                    var checked = cdns.in_array(f.id);
                    divStr += "<p><input type='checkbox' name='js_file' value='"+f.id+"' id='"+f.name+"'"+(checked ? "checked" : "")+"> <label for='"+f.name+"''>"+f.name+"</label></p>"; 
                });
            } else if (n.type == "radio") {

              $.each(n.files, function(j,f){
            	  cdnMap.put(f.id, f.url);
                    var checked = cdns.in_array(f.id);
                  if(j%2==0) {
                    divStr += "<p><input type=\"radio\" name=\"js_file\" value=\""+f.id+"\" id=\""+f.name+"\""+(checked ? "checked" : "")+">&nbsp;<label for='"+f.name+"''>"+f.name+"</label>"; 
                  } else {
                   divStr += "&nbsp;&nbsp;&nbsp;&nbsp;<input class='checkbox_right' type=\"radio\" name=\"js_file\" value=\""+f.id+"\" id=\""+f.name+"\""+(checked ? "checked" : "")+">&nbsp;<label for='"+f.name+"''>"+f.name+"</label></p>";
                  }
              });
            } else if(n.type == "text") {
            	divStr += n.desction;
            } 
            divStr += "</div></div>";

        });
       
        $("#js_file").append(divStr);


    });
};

function getMap() {    
    var map_ = new Object();    
    map_.put = function(key, value) {    
        map_[key+'_'] = value;    
    };    
    map_.get = function(key) {    
        return map_[key+'_'];    
    };    
    map_.remove = function(key) {    
        delete map_[key+'_'];    
    };    
    map_.keyset = function() {    
        var ret = "";    
        for(var p in map_) {    
            if(typeof p == 'string' && p.substring(p.length-1) == "_") {    
                ret += ",";    
                ret += p.substring(0,p.length-1);    
            }    
        }    
        if(ret == "") {    
            return ret.split(",");    
        } else {    
            return ret.substring(1).split(",");    
        }    
    };    
    return map_;    
};

function showTip(target) {
    $("." + target + "_tip").toggle();
};

function hideTip(target) {
	$("."+target+"_tip").hide();
}


function showCate(id) {
  var cate = $("#cate_"+id);
  if(cate.hasClass("toggle")) {
    return;
  } else {
    $(".toggle").find(".cont").slideUp();
      $(".toggle").removeClass("toggle");
      cate.addClass("toggle");
     cate.find(".cont").slideDown();
  }
};

var script = ("&lt;/script>").replace("&lt;", "<");

function run() {
    var html_head = "<!DOCTYPE>\n<html>\n\t<head>";
    var css = editor_html.getValue() == "" ? "" : "<style>" + editor_html.getValue() + "</style>";
    var html_head_end = "\n\t</head>\n\t<body>";
    var html_end = "\n\t</body>\n</html>";
    var html_body = "\n\t\t" + editor_css.getValue();
    var javascript = "\n\t\t<script>\n\t\t" + editor_js.getValue() + script;

    var cdn = "\n\t\t<script type=\"text/javascript\" src=\"http://img.hcharts.cn/";
    var js_lib = "";
    
    
    $("[name='js_file']").each(function(i, n) {
    	if(n.type=="checkbox" || n.type=="radio") {
    		if(n.checked && cdnMap.get(n.value)!="") {
    			 js_lib += cdn + cdnMap.get(n.value) + "\">" + script;
    		}
    	} else {
    		 js_lib += cdn + cdnMap.get(n.value) + "\">" + script;
    	}
    });
    var html = html_head + js_lib + css + html_head_end + html_body + javascript + html_end;
    
    var result = document.getElementById("result");

    result.innerHTML = "<iframe id=\"ifr\" sandbox=\"allow-forms allow-popups allow-modals allow-scripts allow-same-origin\"></iframe>";

    var previewFrame = document.getElementById('ifr');
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write(html);
    preview.close();
};

function autoSize() {
    var height = document.documentElement.clientHeight;
    $(".result_content").height(height-2);
};

function table(index) {
    
    var t = $(".result_tables").find("[data-index='"+index+"']");
    if(t.hasClass("cur")) {
        return false;
    } 
    $(".result_tables").find(".cur").removeClass("cur");
    t.addClass("cur");
    $(".result_content").find(".con").hide();
    $(".result_content").find("."+index).show();
    
    if(index == "result") {
        chart = loadResult(chart);
    } else if(index == "js") {
        js = loadJs(js);
    } else if(index == "html") {
        html = loadHtml(html);
    } else if(index == "css") {
    	css = loadCss(css);
    }
};




function loadJs(js) {
    if(js==null) {
        js = initCode("javascript","javascript");
    }
    return js;
};

function loadHtml(html) {
    
    if(html==null) {
        html = initCode("html","text/xml");
    }
    return html;
};

function loadCss(css) {
	if(css==null) {
		css = initCode("css","text/css");
	}
	return css;
}

function initCode(id,type) {
   return CodeMirror.fromTextArea(document.getElementById(id), {
        mode: type,
        readOnly:true,
        lineWrapping: true
    });
};

function login() {
	var username = $("#username").val();
	if(username!=null && username!="") {
		var password = $("#password").val();
		if(password!=null && password!="") {
			var stay = $("#stay").val();
			$.ajax({
				url:"/login",
				data:{
					username:username,
					password:password,
					stay:stay
				},
				type:"post",
				success:function(data) {
					data = eval("(" + data + ")");
					$(".loginMsg").html(data.msg);
					if(data.code==1) {
						setTimeout(function(){checkLogin()}, 300);
					}
				}
			})
		} else {
			$(".loginMsg").html("Please type Password !");
		}
 	} else {
 		$(".loginMsg").html("Please type Username !");
 	}
};
function logout() {
	$.ajax({
		url:'/logout',
		type:"post",
		success:function(data) {
			data = eval("("+data+")");
			$(".loginMsg").html(data.msg);
			if(data.code == 0) {
				setTimeout(function(){checkLogin()}, 300);
			}
		}
	});
};

function checkLogin() {
	if(is_set("auth")) {
		var username = getCookie("loginUser");
		var uid = getCookie("uid");
		$(".login").html("<li class=\"nav\"><a href=\"javascript:showTip('loged');\" class=\"nav_a\"><img class=\"avatar\" src=\"http://bbs.hcharts.cn/uc_server/avatar.php?uid="+uid+"&type=virtual&size=small\"> &nbsp;&nbsp;"+username+" &nbsp;<b class=\"caret\"></b></a> "+
            	"<div class=\"tip loged_tip\"><div class=\"tip_close\" onclick=\"javascript:hideTip('loged');\">x</div><ul><li><a href=\"http://bbs.hcharts.cn/home.php?mod=spacecp&ac=profile\" target=\"_blank\">修改个人资料</a></li><li><a href=\"javascript:logout();\">Log out</a></li><li class=\"loginMsg\"></li></ul></div></li>");
	} else {
		$(".login").html(" <li class=\"nav\"><a href=\"javascript:showTip('login');\" class=\"nav_a share\"><i class=\"glyphicon glyphicon-user\"></i>  Login / Register &nbsp;<b class=\"caret\"></b></a>"+
							"<div class=\"tip login_tip\"><div class=\"tip_close\" onclick=\"javascript:hideTip('login');\">x</div><p><label class=\"title\">请用论坛账户登录 </label><input type=\"text\" name=\"username\" placeholder=\"Username\" id=\"username\"/>"+
							"</p><p><input type=\"password\" name=\"password\" placeholder=\"Password\" id=\"password\"/></p><p><button class=\"btn btn-primary\" onclick=\"login();\">Login</button></p><p><label><input type=\"checkbox\" name=\"stay\" checked id=\"stay\"> Stay loged in</label></p>"+
							"<p><a href=\"http://bbs.hcharts.cn/member.php?mod=register\" target='_blank'>New user ? Sign up</a></p><p class=\"loginMsg\"></p></div></li>");
	}
};

function setLayout() {
    $(".handler").each(function(){
        var index = $(this).data("index");
        var total = contentEl.offsetHeight;
        var part = parseInt($(this).css("top")) + 4;
        if(index == 2)   {
            total = (contentEl.offsetWidth );
            part = parseInt($(this).css("left")) + 8;
        }   
        layout[index]=(part / total).toFixed(2);
    });
}

function update() {
	editor_html.save();
	editor_js.save();
	editor_css.save();
    setLayout();
    $("input[name='layout']").val(layout.join());
	$.ajax({
		url:"/update",
		type:"POST",
		data:$("#form").serialize(),
		success:function(data){
			data = eval("("+data+")");
			if(data.code==0) {
				showTip("login");
				$(".loginMsg").html(data.msg);
			} else if(data.code==1) {
				$("#setUrl").modal({
			    	 show:true,
			    	 backdrop:"static"
			     });
			} else {
				info(data.code, data.msg);
				if(data.url!=null) {
					setTimeout(function(){window.location.href="http://code.hcharts.cn/"+data.url;},800);
				} else {
					run();
				}
			}
		}
	})
};

function checkUrl() {
	var url = $("#url").val();
	if(url.length<4 || url.length>20) {
		$(".setUrl-info").html("请输入 4 - 20  位英文字符！");
		return false;
	}
	var regStr = /^[A-Za-z0-9]+[{.,-}]+[A-Za-z0-9]$/;
	if (regStr.test(url)) {
		$(".setUrl-info").html("");
		 return true;
    }
	$(".setUrl-info").html("请输入英文字母及数字组合的字符！ ");
	return false;
};
