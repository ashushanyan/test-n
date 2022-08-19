(function($){
		
        $.fn.extend({  
            getMSVal:function (){
				if (!$(this).data("ismultiselect")){
					return false;
				}
				if ($(this).data("p").multiselect){
					var values = [];
					var sels = $.makeArray($("#"+$(this).attr('id')+" .mutiselect_body ul li[class*='ui-state-highlight']:visible"));
					$.each(sels,function(i,n){
						values.push($(n).attr("livalue"));
					});
					return values;
				} else {
					return $("#"+$(this).attr('id')+" .mutiselect_body ul li[class*='ui-state-highlight']:visible").attr("livalue");
				}
			},
			getMSObj:function(index){
				var ops = $(this).data("p").listdata;
				if (!isNaN(index)){
					return ops[index];
				} else {
					var sels = $.makeArray($("#"+$(this).attr('id')+" .mutiselect_body ul li[class*='ui-state-highlight']:visible"));
					if (sels.length == 0)return false;
					var objs = [];
					$.each(sels,function(i,n){
						objs.push(n);
					});
					return objs;
				}
			},
			delMSVal:function(index){
				var ops = $(this).data("p").listdata;
				if (!isNaN(index)){
					$("#"+$(this).attr('id')+" .mutiselect_body ul li[index='"+index+"']").remove();
					ops.splice(index,1);
				} else {				
					var sels = $.makeArray($("#"+$(this).attr('id')+" .mutiselect_body ul li[class*='ui-state-highlight']:visible"));
					if (sels.length == 0)return false;
					$.each(sels,function(i,n){
						var opindex = $(n).attr("index");
						ops.splice(opindex,1,"N/A");
						$(n).remove();
					});
					ops = $.grep(ops,function(x,m){
							return x != "N/A";
					});
				}
				$(this).data("p").listdata = ops;
				$.multiSelect._createOptions($(this).data("p"));
			},
			
            multiselectbox: function(options){  
                var caller = this;
                var defaults = {   
                    width: '50%',  
                    maxheight: '150px' ,
					blank: '&nbsp;&nbsp;',
					sortable:true,
					moveable:{'ismoveable':false},
					selectboxid: $(this).attr('id')+'bwselect',
					sortoption : [{sortkey:'name1',sortdislang:'city',sorttype:'string'},{sortkey:'name2',sortdislang:'province',sorttype:'string'}],//test data;
					listdata : [{name1:'guilin',name2:'guangxi',name3:'china'},{name1:'beijing',name2:'bj',name3:'china'},
						{name1:'xian',name2:'sanxi',name3:'china'},{name1:'haerbing',name2:'heilongjiang',name3:'china'},{name1:'shijiazhuang',name2:'hebei',name3:'china'},{name1:'daliang',name2:'shandong',name3:'china'},
						{name1:'guangzhou',name2:'guandong',name3:'china'},{name1:'taiyuan',name2:'sanxi',name3:'china'}
						],//test data;
					listmol: {'valkey':'name1','nameid':'name1','displaykey':['name1','name2']},//test data;
					multilang:{'search':"Search",'refresh_title':"Refresh",'sort_title':"Sort","selectall_title":"Select all","deselect_title":"Deselect","nolistoption":"No records..."},
					multiselect:true
					//clickfn:function(){alert("click function");},
					//sortlistclickfn:function(){alert("click sort list function");}
                };
				var p = $.extend(defaults,options);
				$(this).data("p",p).data("ismultiselect",true);

				_creatbox();
				function _creatbox(){
					var box = "<div class='mutiselect_container' id='"+p.selectboxid+"' >"
					+"<div class='mutiselect_funs ui-widget-header ui-helper-clearfix' >"
						+"<div class='muti_funs_selecter' style='float:left;'>"
						+"<input class='muti_input_search' type='text' style='float:left;'/>"
						+"<span class='ui-icon ui-icon-triangle-1-s muti_input_funbtn' style='float:left;margin-left:2px;'></span>"
						+"</div>"	
						+"<span class='ui-icon ui-icon-search muti_funbtn_search_sort' style='float:left;height:18px;line-height:18px;' title='"+p.multilang.search+"'></span>"
						+"<span class='ui-icon ui-icon-refresh muti_funbtn_search_fresh' style='float:left;' title='"+p.multilang.refresh_title+"'></span>"
						+"<span class='ui-icon ui-icon-check muti_funbtn_select_all' style='float:left;' title='"+p.multilang.selectall_title+"'></span>"
						+"<span class='ui-icon ui-icon-shuffle muti_funbtn_deselect' style='float:left;' title='"+p.multilang.deselect_title+"'></span>"
						+"<div class='muti_funs_sort_selecter'>"
							+"<ul>"
							+"<li class='ui-state-default ui-element' livalue='N/A'>&nbsp;"+p.multilang.search+"...</li>"
							+"</ul>"
						+"</div>"
						
					+"</div>"
					+"<div class='mutiselect_body'>"
						+"<ul></ul>"
					+"</div>"
					+"</div>";
					
					$(caller).append(box).css("width",p.width);
					if (!p.sortable){
						var sortsel = $("#"+p.selectboxid+" .muti_input_funbtn");
						var funsinpurt = $("#"+p.selectboxid+" div.muti_funs_selecter");
						$(funsinpurt).css("width",$(funsinpurt).width()-$(sortsel).width());
						$(sortsel).hide();
					}
					$.multiSelect._createOptions(p);
					var lilist = "";
					if (p.sortoption){
						$.each(p.sortoption,function(i,n){
							lilist += "<li class='ui-state-default ui-element' livalue='"+n['sortkey']+"' type='"+n['sorttype']+"'>&nbsp;" +n['sortdislang']+ "</li>";
						});
					}
					$("#"+p.selectboxid+" .muti_funs_sort_selecter ul").append(lilist);
					var muti_funs_sort_selecter = $("#"+p.selectboxid+" .muti_funs_sort_selecter");
					$("#"+p.selectboxid+" input.muti_input_search").data("livalue","N/A");
					$("#"+p.selectboxid+" span.muti_input_funbtn'").click(function(){
						$(muti_funs_sort_selecter).show();
					});
					$("#"+p.selectboxid+" span.muti_funbtn_search_sort'").click(function(){
						if ($(caller).data("haslists") == "N/A"){
							return false;
						}
						_search();
						_sortlist();
					}).mouseover(function(){$(this).addClass("bw_ui_span_hover")})
					.mouseout(function(){$(this).removeClass("bw_ui_span_hover")});
					$("#"+p.selectboxid+" span.muti_funbtn_search_fresh'").click(function(){
						_refresh();
					}).mouseover(function(){$(this).addClass("bw_ui_span_hover")})
					.mouseout(function(){$(this).removeClass("bw_ui_span_hover")});
					if (p.multiselect){
						
						$("#"+p.selectboxid+" span.muti_funbtn_select_all'").click(function(){
							if ($(caller).data("haslists") == "N/A")return false;
							if ($("#"+p.selectboxid+" ul li[class*='ui-no-records']").css("display") == "block")return false;
							$("#"+p.selectboxid+" ul li[class!='ui-state-highlight']:visible").addClass("ui-state-highlight");
						}).mouseover(function(){$(this).addClass("bw_ui_span_hover")})
						.mouseout(function(){$(this).removeClass("bw_ui_span_hover")});
						$("#"+p.selectboxid+" span.muti_funbtn_deselect'").click(function(){
							if ($(caller).data("haslists") == "N/A")return false;
							if ($("#"+p.selectboxid+" ul li[class*='ui-no-records']").css("display") == "block")return false;
							$("#"+p.selectboxid+" ul li:visible").toggleClass("ui-state-highlight");
						}).mouseover(function(){$(this).addClass("bw_ui_span_hover")})
						.mouseout(function(){$(this).removeClass("bw_ui_span_hover")});
					} else {
						$("#"+p.selectboxid+" span.muti_funbtn_select_all'").hide();
						$("#"+p.selectboxid+" span.muti_funbtn_deselect'").hide();
					}
					
					$("#"+p.selectboxid+" .muti_funs_sort_selecter ul li").mouseover(function(){$(this).addClass("ui-state-hover")})
					.mouseout(
						function(){$(this).removeClass("ui-state-hover")}
					).click(function(event){
						if ($.isFunction(p.sortlistclickfn)){p.sortlistclickfn();}
						var livalue = $(this).attr("livalue");
						if (livalue == "N/A"){
							$("#"+p.selectboxid+" input.muti_input_search").val("").data("livalue","N/A");
							$("#"+p.selectboxid+" span.muti_funbtn_search_fresh'").show();
							$("#"+p.selectboxid+" span.muti_funbtn_search_sort").removeClass("ui-icon-triangle-2-n-s ").addClass("ui-icon-search").attr("title",p.multilang.search);
						} else {
							_refresh();
							$("#"+p.selectboxid+" input.muti_input_search").val($.trim($(this).text())).data("livalue",livalue).data("type",$(this).attr("type"));
							$("#"+p.selectboxid+" span.muti_funbtn_search_fresh'").hide();
							$("#"+p.selectboxid+" span.muti_funbtn_search_sort").removeClass("ui-icon-search").addClass("ui-icon-triangle-2-n-s").data("sort","none").attr("title",p.multilang.sort_title);
						}
						$(muti_funs_sort_selecter).hide();
					});
					
					
				}
				
				function _sortlist(){
					var inputdom = $("#"+p.selectboxid+" input.muti_input_search");
					var livalue = $(inputdom).data("livalue");
					var type = $(inputdom).data("type");
					if (livalue != "N/A"){
						var span_sort = $("#"+p.selectboxid+" span.muti_funbtn_search_sort"); 
						if ($(span_sort).data("sort") == "desc" || $(span_sort).data("sort") == "none"){
							if (type == "float"){
								p.listdata.sort(_floatasc);
							} else {
								p.listdata.sort(_strasc);
							}
							$("#"+p.selectboxid+" span.muti_funbtn_search_sort").data("sort","asc");
						} else {
							p.listdata.reverse();
							$("#"+p.selectboxid+" span.muti_funbtn_search_sort").data("sort","desc");
						}
						$.multiSelect._createOptions(p);
					}
					function _floatasc(op1,op2){
						return parseFloat(op1.livalue) - parseFloat(op2.livalue);
					}
					function _strasc(op1,op2){
						return op1[livalue].localeCompare(op2[livalue]);
					}
				}
				function _search(){
					var input = $("#"+p.selectboxid+" input.muti_input_search");
					var livalue = $(input).data("livalue");
					if (livalue == "N/A"){
						var str = $.trim($(input).val());
						if (str != ""){
								$("#"+p.selectboxid+" .mutiselect_body ul li[class*='ui-no-records']").hide();
								var ops = $.makeArray($("#"+p.selectboxid+" .mutiselect_body ul li"));
								$.each(ops,function(i,n){
										var reg = eval("/"+str+"/i");
										if ($(n).text().search(reg) == "-1" && $(n).attr("livalue") != "N/A"){
											$(n).hide();
										} else {											
											if ($(n).attr("livalue") != "N/A"){$(n).show()};
										}
								});
								if ($("#"+p.selectboxid+" .mutiselect_body ul li:visible").length == 0){
									$("#"+p.selectboxid+" .mutiselect_body ul li[class*='ui-no-records']").show();
								}
						}						
					}
				}
				function _refresh(){
					var input = $("#"+p.selectboxid+" input.muti_input_search");
					$(input).val("");
					var ul = $("#"+p.selectboxid+" .mutiselect_body ul");
					$(ul).find("li:hidden").show();
					if ($(ul).find("li").length != 1){
						$(ul).find("li[class*='ui-no-records']").hide();
					}
				}
				function _active(e) {
					jQuery(this).toggleClass("ui-state-highlight", (e.type == "mousedown"));
					return false;
				}
				
			}  
        });
		$.multiSelect = {
			_shiftselect:function(e,obj,p) {
				var liclass = $(obj).attr("class");
				if (liclass.match("ui-state-firstclick") == "ui-state-firstclick"){
					return false;
				}
				var firstselect = $("#"+p.selectboxid+" .mutiselect_body ul li[class*='ui-state-firstclick']");
				var ul_p = $("#"+p.selectboxid+" .mutiselect_body ul li");
				if (e.shiftKey == 1){
					var first = $(ul_p).index(firstselect);
					var last = $(ul_p).index($(obj));
					if (liclass.match("ui-state-highlight") == "ui-state-highlight"){
						if (first < last){
							$(ul_p).slice(first,last).addClass("ui-state-highlight");
						} else {
							$(ul_p).slice(last,first).addClass("ui-state-highlight");
						}
					} else {
						if (first < last){
							$(ul_p).slice(first,last).removeClass("ui-state-highlight");
						} else {
							$(ul_p).slice(last,first).removeClass("ui-state-highlight");
						}
					}
				}
				$(firstselect).removeClass("ui-state-firstclick");
			},
			_createOptions:function(p){
				var caller = $("#"+p.selectboxid);
				var lilist = "";
				if (p.listdata && p.listdata.length != 0){
					lilist += "<li class='ui-state-default ui-element ui-no-records' livalue='N/A' style='display:none;'>&nbsp;"+p.multilang.nolistoption+"</li>";
					$.each(p.listdata,function(i,n){
						var val = n[p.listmol.valkey];
						var name = n[p.listmol.nameid];
						var dis = p.listmol.displaykey;
						lilist += "<li livalue='"+val+"' name='"+name+"' index='"+i+"' class='ui-state-default ui-element'>&nbsp;";
						$.each(dis, function(k,m){
							lilist +=n[m] + p.blank;
						}); 
						lilist += "</li>";
					});
				}	
				if (lilist == ""){
					lilist += "<li class='ui-state-default ui-element ui-no-records' livalue='N/A' >&nbsp;"+p.multilang.nolistoption+"</li>";
					$(caller).data("haslists","N/A");
				}
				
				$("#"+p.selectboxid+" .mutiselect_body ul").html(lilist).css("max-height",p.maxheight).find("li")
				.mouseover(function(){$(this).addClass("ui-state-hover")})
				.mouseout(function(){$(this).removeClass("ui-state-hover")})
				.click(function(e){
					if ($(caller).data("haslists") == "N/A" || $(this).attr("livalue") == "N/A")return false;
					if (p.multiselect){
						var liss = $("#"+p.selectboxid+" .mutiselect_body ul li[class*='ui-state-firstclick']");
						if ($(liss).length == 0){
							$(this).addClass("ui-state-firstclick");
						}
						$(this).toggleClass("ui-state-highlight");
						$.multiSelect._shiftselect(e,this,p);
					} else {
						var liclass = $(this).attr("class");							
						if (liclass.match("ui-state-highlight") == "ui-state-highlight"){
							$(this).removeClass("ui-state-highlight");
						} else {
							$("#"+p.selectboxid+" .mutiselect_body ul li[class*='ui-state-highlight']").removeClass("ui-state-highlight");
							$(this).addClass("ui-state-highlight");
						}
					}
					if ($.isFunction(p.clickfn)){p.clickfn();}
					}
					
				);
				if (p.moveable.ismoveable){
					$("#"+p.selectboxid+" .mutiselect_body ul").sortable(p.moveable);
				}
			}
		};
		
})(jQuery);