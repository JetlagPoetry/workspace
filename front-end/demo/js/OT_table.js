// 设置分页栏的点击事件以及何时会发生高亮
function ot_page(	){
	$("#pagination").on("click", "li", function() {
		var aText = $(this).find('a').html(); //假如左侧分页栏是 "上一页 1 2 下一页"，则这里就是4个<li>，
		checkA();  //首先要确定能否上一页或者下一页
		if (aText == "上一页") {
			$(".pagination > li").removeClass("active"); //移除所有的li标签的active
			$("#page" + (currentPage - 1)).addClass("active");
			$(".userListTable tbody").empty();  //清空.userListTable tbody的所有子元素
			ot_getList(currentPage - 1, size);
			checkA();
			
		} else if (aText == "下一页") {
			$(".pagination > li").removeClass("active");
			$("#page" + (currentPage + 1)).addClass("active");
			$(".userListTable tbody").empty();
			ot_getList(currentPage + 1, size);
			//alert(currentPage);
			alert(currentPage);
			checkA();
		} else {
			$(".pagination > li").removeClass("active");
			$(this).addClass("active");
			$(".userListTable tbody").empty();
			ot_getList($(this).text(), size);
			checkA();
		}
	})
	//分页栏右侧下拉列表的实现
	/*每次执行initPagination方法时，都要将#dataNum(分页栏右侧下拉框)添加change事件，再执行函数。
	但是！change事件只会发生一次。如果第二次改变分页栏右侧下拉框选中项时，change事件将不会发生。所以
	要在每次要先off #dataNum(分页栏右侧下拉框)的change事件，再添加新的change事件*/
	$(document).off('change', '#dataNum').on(
			'change',
			'#dataNum',
			function() {
				size = $(this).children('option:selected')
						.val();   //改变当前能显示的数量时，就是改变size
				currentPage = 1;  //改变后，应该重新加载列表，currentPage又回到了1
				$(".userListTable tbody").empty();   //清空.userListTable tbody的所有子元素
				ot_getList(currentPage, size);
				initPagination(size, total);
			})
}
//与后台获取数据，加载到页面上
function ot_getList(pageNum, size) {
	currentPage = pageNum;
	//alert(termination);
				//alert(currentPage);
	$(".panel-body table tbody").html(" ");
	$.ajax({
				url : ip+'/demo/table/search/tmp',
				method : "get",
				data : {    
					"termination": termination, 
					"type": "OT",
					"page":currentPage,
	        "rows":size,
				},
				async : false,
				//async属性默认为true,即异步请求。当为同步请求时JS代码加载到当前AJAX的时候会把页面里所有的代码停止加载，页面出现假死状态，当这个AJAX
				//执行完毕后才会继续运行其他代码页面假死状态解除。而异步则这个AJAX代码运行中的时候其他代码一样可以运行。
				success : function(data) {
					
					if (data.code == "200") {
						
						var length = data.data.currentCount; //list的长度
						currentPage = data.data.page;
						total = data.data.totalCount;
						//
						if(total<size){
							totalPage = 1;
						}else if(total%size==0){
							totalPage = total/size;
						}else{
							totalPage = parseInt(total/size)+1;
						}
						initPagination(currentPage, total);
									//alert(currentPage);
						
						var id='mytr'
						for (var i = 0; i < length; i++) {
							var otId = data.data.dataList[i].otId;
							var useId = data.data.dataList[i].useId;
							var termination = data.data.dataList[i].termination;
							var importTime = data.data.dataList[i].importTime;
							var perNumber =data.data.dataList[i].perNumber;
							var period = data.data.dataList[i].period;
							var organizationUnit = data.data.dataList[i].organizationUnit;
							var ot10 = data.data.dataList[i].ot10;
							var ot15 = data.data.dataList[i].ot15;
							var ot20 = data.data.dataList[i].ot20;
							var ot30 = data.data.dataList[i].ot30;
							var otTotal = data.data.dataList[i].otTotal;
							
							id='mytr'+otId
							//向tbody中添加元素，一共循环length次
							//alert(grade);id="mytr"
							$(".userListTable tbody")
								.append('<tr id="mytr">'
												+ '<td>'
												+ perNumber
												+ '</td>'
												+ '<td>'
												+ period
												+ '</td>'
												+ '<td>'
												+ organizationUnit
												+ '</td>'
												+ '<td>'
												+ ot10
												+ '</td>'
												+ '<td>'
												+ ot15
												+ '</td>'
												+ '<td>'
												+ ot20
												+ '</td>'
												+ '<td>'
												+ ot30
												+ '</td>'
												+ '<td>'
												+ otTotal
												+ '</td>'
+ '<td><button type="button" class="btn btn-success btn-xs" onclick="ot_updatePrepare();ot_findOne('+otId+')" data-toggle="modal" data-target="#editModal">修改</button><button type="button" class="btn btn-danger btn-xs" onclick="deleteOne('+otId+')">删除</button></td>'
										+ '</tr>')
									document.getElementById("mytr").setAttribute("id",id);
						}
					}
				}
			});
}
//修改开始
//修改操作每次需要先根据id查询当前project
function ot_findOne(id){
	 trid="mytr"+id;
	//alert(trid);
	//var result=$("#table_project tr[id=trid]");//#listtab表格ID 002为行ID  
  //alert(result.children("td").get(1).innerHTML);  
	var tableObj = document.getElementById(trid).value;
	console.log(tableObj);//(tableObj);
	var row = document.getElementById(trid);
	var cells = row.getElementsByTagName("td");
	$("#perNumber").val(cells[0].innerHTML);
	//console.log(cells[0].innerHTML);
	$("#period").val(cells[1].innerHTML);
	$("#organizationUnit").val(cells[2].innerHTML);
	$("#ot10").val(cells[3].innerHTML);
	$("#ot15").val(cells[4].innerHTML);
	$("#ot20").val(cells[5].innerHTML);
	$("#ot30").val(cells[6].innerHTML);
	$("#otTotal").val(cells[7].innerHTML);
	var inp=document.getElementById("editModal"); 
	inp.setAttribute("otId",id);//
	// for(var i=0;i<cells.length;i++){
 //  alert("第"+(i+1)+"格的数字是"+cells[i].innerHTML);
 //  }
 
/* $.ajax({
 		url : 'http://192.168.1.101:8080/demo/table/get/tmp',
 		method : "get",
 		data : {
 			"id" : id,
			"type":"BASEPAY_GRADE"
 		},
 		async : true,
 		success : function(data) {
 			//row=data.row;
 			if(data.code==200){
				$("#perNumber").val(data.data.perNumber);
 				$("#projectName").val(data.row.projectName);
 				$("#projectKey").val(data.row.projectKey);
 				$("#desc").val(data.row.desc);
 				$("#projectLeader").val(data.row.projectLeader);
 			}
 			},
 	}
 ) */

} //

var row={};//定义row变量
function ot_updateOne(){
	//var inp1=document.getElementById("table_project")
	var inp2=document.getElementById("editModal"); 
	//inp.setAttribute("basepayId",id);//将filename传递到upload()
	row.otId=inp2.attributes["otId"].nodeValue;
	row.termination=termination;//inp1.attributes["termination"].nodeValue;
	row.perNumber=$("#perNumber").val();
	row.period=$("#period").val();
	row.organizationUnit=$("#organizationUnit").val();
	row.ot10=$("#ot10").val();
	row.ot15=parseFloat($("#ot15").val());
	row.ot20=parseFloat($("#ot20").val());
	row.ot30=parseFloat($("#ot30").val());
	row.otTotal=parseFloat($("#otTotal").val());
	$.ajax({
		url : ip+'/demo/table/modify/ot',
		contentType: 'application/json; charset=UTF-8',
		dataType: "json",
		method : "post",
		data : JSON.stringify(row),         //JQuery以JSON方式POST数据到服务端 需设置contentType dataType data
		async : false,
		success : function(data) {
			
			if(data.code==200){
				$("#saveBtn").attr("data-dismiss","modal"); ////关闭当前窗口
				$(".userListTable tbody").empty(); 
				ot_getList(currentPage, size);
				
			}else{
				alert(data.message);
			}
			
			},
	}
)
}
//修改结束
var hasId=true;
function ot_updatePrepare(){
	if(hasId){
		$("#specialDiv").attr("style","display: none;");
		hasId=false;
	}
	$("#saveBtn").attr("onclick","");
	$("#saveBtn").attr("onclick","ot_updateOne()");
}
