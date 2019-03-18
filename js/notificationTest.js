var data = 0;
var cookieNum = 0;
var desc2=0;
var descOld=0;
var xhr = new XMLHttpRequest();
xhr.open('get',"https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery",false);
xhr.onload = function(){
	data = JSON.parse(xhr.responseText);
	desc2 = data[0].FileNo_;
	descOld = desc2;
}	//取得資料
xhr.send();
console.log(data);

var Ntitle = new Array();
var Nbody = new Array();
var CookDet = new Array();

var UserTitleNotify = "empty";
var UserRegionNotify = "empty";

setTimeout("setNotifyFormCookie()",1000);
setTimeout("getLink()",3000);
setTimeout("reflash()",3000);




function setNotifyFormCookie(){

	getCookie();
	for (var z=0;z<CookDet.length;z++){
		console.log("aa"+z);
		for(var y=0;y<data.length;y++){
			console.log("bb:"+CookDet[z]);
			if( CookDet[z] == data[y].FileNo_){
				var ddd = document.createElement("div");
				ddd.setAttribute("class","history-data");
				var eee = document.createElement("h3");
				eee.appendChild(document.createTextNode(data[y].InformDesc_));
				ddd.appendChild(eee);
				var fff = document.createElement("h4");
				var kkkkkk = data[y].ZipName_ + data[y].address_;
				fff.appendChild(document.createTextNode(kkkkkk));
				ddd.appendChild(fff);
				var ggg = document.createElement("p");
				ggg.appendChild(document.createTextNode(data[y].BeforeDesc_));
				ddd.appendChild(ggg);
				document.getElementById("LocationList").appendChild(ddd);
				console.log("cc"+z);
				break;
			}
		}
	}

}

function setCookie(cname, cvalue, exdays) {		//協助建立cookie  (cookie名, 值, 存活時間)
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

function getCookieNum(){
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    return ca.length;
}
function getCookie() {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		var nn = c.indexOf("=");
		var cookD = c.slice(nn+1);
	
		CookDet[i] = cookD;
	}
	console.log(CookDet);
}


function getLink(){
	var xhr = new XMLHttpRequest();
	xhr.open('get',"https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery",true);
	xhr.onload = function(){
		data = JSON.parse(xhr.responseText);
		desc2 = data[0].FileNo_;
	  }	//取得資料
	xhr.send();
	console.log("Link finish "+desc2);
	setTimeout("getLink()",5000);
}


function notify1(i){
	Ntitle[i] = data[i].InformDesc_;
	Nbody[i] = data[i].address_;
	if(window.Notification && Notification.permission !== "denied") {
		Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
			var n = new Notification(Ntitle[i], { 
				body: Nbody[i],
				icon: 'images/icon.png', // optional
				data: {
					url: 'http://127.0.0.1:3005/'
				}
			});
			// setTimeout(function() {
			// 	n.close();
			// }, 2000);
			n.onclick = function(){
				window.open(n.data.url, '_parent');      // 打开网址
				n.close();                              // 并且关闭通知
			}  
		});
	}
}

function notify2(i){
	if(window.Notification && Notification.permission !== "denied") {
		Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
			var n2 = new Notification("title", { 
				body: "你有"+i+"筆新通知",
				icon: 'images/icon.png', // optional
				data: {
					url: 'http://127.0.0.1:3005/'
				}
			});
			setTimeout(function() {
				n2.close();
			}, 2000);
			n2.onclick = function(){
				window.open(n.data.url, '_parent');      // 打開網頁
				n.close();                              // 關閉通知
			}   
		});
	}
}

function reflash(){
	console.log(descOld)
	if( descOld != desc2 ){
/*
		// 全顯示
		var i =0;
		do{
			for(y=0;y<UserNotify.length;y++){
				if(data[i].InformDesc_ == UserNotify[y]){
					notify1(i);
					setCookie("a",data[i].FileNo_,1);
					console.log("通知")	
				}
				if(data[i].FileNo_ == descOld){
					descOld=desc;
					console.log("ssss:"+data[i].FileNo_ )	
				}
				i++;
			}
		}while(descOld != desc)
		//  END 
*/

		//  X 筆通知
		var i = 0;
		var x = 0;
		if(UserTitleNotify == "empty" && UserRegionNotify=="empty" ){
			do{
				cookieNum++;
				setCookie("Notify"+cookieNum,data[i].FileNo_,1);
				x++;
				console.log("通知"+x);
				var ddd = document.createElement("div");
				ddd.setAttribute("class","history-data");
				var eee = document.createElement("h3");
				eee.appendChild(document.createTextNode(data[i].InformDesc_));
				ddd.appendChild(eee);
				var fff = document.createElement("h4");
				var kkkkkk = data[i].ZipName_ + data[i].address_;
				fff.appendChild(document.createTextNode(kkkkkk));
				ddd.appendChild(fff);
				var ggg = document.createElement("p");
				ggg.appendChild(document.createTextNode(data[i].BeforeDesc_));
				ddd.appendChild(ggg);
				document.getElementById("LocationList").appendChild(ddd);
			
				i++;
				if(data[i].FileNo_ == descOld){
					descOld=desc2;
				
				}
			}while(descOld != desc2)
		}else if(UserTitleNotify == "empty"){
			do{
				if(data[i].InformDesc_ == UserTitleNotify){
					cookieNum++;
					setCookie("Notify"+cookieNum,data[i].FileNo_,1);
					x++;
					console.log("通知"+x);
					var ddd = document.createElement("div");
					ddd.setAttribute("class","history-data");
					var eee = document.createElement("h3");
					eee.appendChild(document.createTextNode(data[i].InformDesc_));
					ddd.appendChild(eee);
					var fff = document.createElement("h4");
					fff.appendChild(document.createTextNode(data[i].ZipName_));
					ddd.appendChild(fff);
					var ggg = document.createElement("p");
					ggg.appendChild(document.createTextNode(data[i].BeforeDesc_));
					ddd.appendChild(ggg);
					document.getElementById("LocationList").appendChild(ddd);
				}
				i++;
				if(data[i].FileNo_ == descOld){
					descOld=desc2;
				
				}
			}while(descOld != desc2)
		}else if(UserRegionNotify == "empty"){
			do{
				if(data[i].InformDesc_ == UserRegionNotify){
					cookieNum++;
					setCookie("Notify"+cookieNum,data[i].FileNo_,1);
					x++;
					console.log("通知"+x);
					var ddd = document.createElement("div");
					ddd.setAttribute("class","history-data");
					var eee = document.createElement("h3");
					eee.appendChild(document.createTextNode(data[i].InformDesc_));
					ddd.appendChild(eee);
					var fff = document.createElement("h4");
					fff.appendChild(document.createTextNode(data[i].ZipName_));
					ddd.appendChild(fff);
					var ggg = document.createElement("p");
					ggg.appendChild(document.createTextNode(data[i].BeforeDesc_));
					ddd.appendChild(ggg);
					document.getElementById("LocationList").appendChild(ddd);
				}
				i++;
				if(data[i].FileNo_ == descOld){
					descOld=desc2;
				
				}
			}while(descOld != desc2)
		}else{
			do{
				for(y=0;y<UserNotify.length;y++){
					if(data[i].InformDesc_ == UserNotify[y]){
						cookieNum++;
						setCookie("Notify"+cookieNum,data[i].FileNo_,1);
						x++;
						console.log("通知"+x);
						var ddd = document.createElement("div");
						ddd.setAttribute("class","history-data");
						var eee = document.createElement("h3");
						eee.appendChild(document.createTextNode(data[i].InformDesc_));
						ddd.appendChild(eee);
						var fff = document.createElement("h4");
						fff.appendChild(document.createTextNode(data[i].ZipName_));
						ddd.appendChild(fff);
						var ggg = document.createElement("p");
						ggg.appendChild(document.createTextNode(data[i].BeforeDesc_));
						ddd.appendChild(ggg);
						document.getElementById("LocationList").appendChild(ddd);
					}
					i++;
					if(data[i].FileNo_ == descOld){
						descOld=desc2;
					}
				}
			}while(descOld != desc2)
		}
		if(x!=0){
			notify2(x);
			x=0;
		}
		// END

	}
	setTimeout("reflash()",10000)
}

function setUserNotify(){
	var region = $('select[id=RegionSelector2]').val();
	var title = $('select[id=TitleSelector2]').val();
	
	UserTitleNotify = title;
	UserRegionNotify = region;
	console.log("region:"+region+"，title:"+title)
}

