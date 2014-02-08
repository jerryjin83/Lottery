(function($){
	/**
	*	默认构造函数
	*/
	$.fn.lottery = function(options){
		var opts = $.extend($.fn.lottery.defaults, options);	// 初始化自定义属性
		return this.each(function() {
			$.fn.lottery.init($(this), opts);
		});
	};
	
	$.fn.lottery.loadPerson = function(person){
		$("#person_"+person.id).fadeIn(1000,"swing");
	};
	
	$.fn.lottery.getNextObj = function(opts){
		if(!opts.oldPos && opts.oldPos!=0){
			opts.oldPos = 0;
			opts.pos=0;
			return opts.persons[opts.pos];
		}
		opts.oldPos = opts.pos;
		if(opts.oldPos==0){
			opts.sign = 1;
		}
		if(opts.oldPos==opts.persons.length-1){
			opts.sign = 0;
		}
		if(opts.sign==0){
			opts.pos--;
		}else{
			opts.pos++;
		}
		return opts.persons[opts.pos];
	};
	
	$.fn.lottery.getRandomObj = function(opts){
		var r = 1000;
		var p = 0;
		while(true){
			if(r<=opts.persons.length-1){
				p = opts.persons[r];
				r = 999;
				break;
			}
			r = Math.round(Math.random()*100);
		}
		return p;
	};
	
	$.fn.lottery._init = function(persons,obj,opts){
		var html = "";
		html+=("<ul id=\"persons\">");
		opts.persons = persons;
		for(var i =0;i<persons.length;i++){
			html+= "<li class='lottery-person' id='person_"+persons[i].id+"'><image class='lottery-img' src='"+persons[i].path+"'/></li>";
			$("body").html($("body").html()+"<img class=\"lottery-animated_img\" style=\"display:none;position:absolute\" src=\""+persons[i].path+"\"  id=\"picked_"+persons[i].id+"\"/>");
		}
		html+="</ul>";
		$("#"+obj.attr("id")).html(html);
		$("body").html($("body").html()+"<img class=\"lottery-price_img\" style=\"display:none;position:absolute\" id=\"price\">");
		for(var i=0;i<persons.length;i++){
			$.fn.lottery.loadPerson(persons[i]);
		}
		$.fn.lottery.begin(obj,opts);
	};
	
	/**
	*	初始化参数
	*/
	$.fn.lottery.init = function(obj,opts){
		opts.pos = null; // 当前选中的坐标
		opts.oldPos = null; // 上一个坐标
		opts.sign = 0; // 0:minus,1:plus
		opts.timer = null; // 内置定时器
		opts.current = null; // 当前选中的对象
		if(opts.url==null){
			$.fn.lottery._init(opts.lottery,obj,opts);
		}else{
			$.ajax({
				url:opts.url,
				data:opts.data==null?{t:new Date().getTime()}:opts.data,
				dataType:'json',
				method:opts.method,
				success:function(persons){
					$.fn.lottery._init(persons,obj,opts);
				}
			});
		}
	};
	
	/**
	*	启动抽奖程序
	*/
	$.fn.lottery.begin = function(obj,opts){
		opts.timer = window.setInterval(function(){
			if(opts.isRandom){
				opts.current = $.fn.lottery.getRandomObj(opts);
			}else{
				opts.current = $.fn.lottery.getNextObj(opts);
			}
			var img = $("#person_"+opts.current.id+">img")[0];
			var y_img = img.offsetTop;
			var x_img = img.offsetLeft;
			$("#picked_"+opts.current.id).css("margin-left",x_img+"px");
			$("#picked_"+opts.current.id).css("margin-top",(y_img+2)+"px");
			if($("#picked_"+opts.current.id).css("display")=="none"){
				$("#picked_"+opts.current.id).show();
			}
			$("#person_"+opts.current.id+">img").css("opacity","0");
			$("#picked_"+opts.current.id).addClass("lottery-animated_img_transform");
		 	var p = opts.current;
			opts.current.timer = window.setTimeout(function(){
					$("#picked_"+p.id).removeClass("lottery-animated_img_transform");
					opts.current.timer1 = window.setTimeout(function(){
						$("#person_"+p.id+">img").css("opacity","1");
					},250);
				},500);
		},200);
	};
	
	$.fn.lottery.stop = function(opts){
		window.clearInterval(opts.timer);
	};
	
	/**
	*	默认初始化参数
	*/
	$.fn.lottery.defaults = {
		url:null,// ajax请求路径，如果loggery不存在则必填
		data:null,// ajax请求参数，可以为空
		method:"GET", //  ajax请求方式，默认GET，可以为空
		lottery:null, // 如果不用ajax，这个参数必填，[{id:'aaa',path:'aaa.jpg',name:'name'}]
		isRandom:true, // true则是随机转动， false则顺序转动
		animate:"route"	// 动画展示方式,默认为旋转
	};
})(jQuery);