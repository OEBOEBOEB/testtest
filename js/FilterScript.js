

    
      
    // $("#list li").click(function() {

      
    //   // var TmpPos = new google.maps.LatLng(22.734160, 120.283644);
    //   // ShowPos(this.id);
    //   var TmpPos = this.id;
    //   ShowPos(TmpPos);


    //   // alert(this.id); // get id of clicked li
    //   // alert(this.id); // id of clicked li by directly accessing DOMElement property
    //   // alert($(this).attr('id')); // jQuery's .attr() method, same but more verbose
    //   // alert($(this).html()); // gets innerHTML of clicked li
    //   // alert($(this).text()); // gets text contents of clicked li
    // })

  window.onload = function() {
    InitPageSel();
  }
   
  var locations = [
  ["douhsfa", 22.734160, 120.283644,"Description"]
  ];
  var map;
  var data;

  var markers = [];
  var markerId;

  function initMap() {
    var centerPos = {lat: locations[0][1], lng: locations[0][2]};
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: centerPos
    });



    var xhr = new XMLHttpRequest();
    xhr.open('get',"https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery",true);
    xhr.onload = function(){
    data = JSON.parse(xhr.responseText);
    }
    xhr.send();


  } // initMap End;

  function AddAllMarkers(){
    //var str = '';

    for(var i = 0; i < data.length; i++){

      if(data[i].StatusName_ == "待確認" || data[i].StatusName_ == "待處理"){
        if(data[i].Lng_ != "" && data[i].Lat_ != ""){
          //TmpPos = new google.maps.LatLng(data[i].Lat_, data[i].Lng_);

          AddMarker(data[i].Lat_, data[i].Lng_, data[i].InformDesc_, data[i].ZipName_, data[i].BeforeDesc_,data[i].address_);
          //str += '<li>'+data[i].Lng_+'<p>'+data[i].Lat_+'</p></li>';
          // locations.push([data[i].InformDesc_,data[i].Lng_,data[i].Lat_,data[i].BeforeDesc_]);
        }
      }
    }

    // for (var i = 0; i< locations.length; i++)
    // {
    //   TmpPos = new google.maps.LatLng(locations[i][2], locations[i][1]);
    //   AddMarker(TmpPos,locations[i][0]+"<br>"+locations[i][3]);

    // }
    
    // TmpLocations = locations;
    // TmpMarkers = markers;

  }
  
  function ShowRegionInOption(){
    // var str = ''
    desc={};
  
    for(var i=0;i<data.length;i++){
      if(!desc[data[i].ZipName_]){
        desc[data[i].ZipName_] = 0;
      }else{
        desc[data[i].ZipName_]+=0;
      }
    }

    var select, i, option;
    select = document.getElementById( 'RegionSelector' );
    select2 = document.getElementById( 'RegionSelector2' );
    for(var key in desc){
      option = document.createElement( 'option' );
      option.value = option.text = key;
      select.add( option );
      option2 = document.createElement( 'option' );
      option2.value = option2.text = key;
      select2.add( option2 );
    // str+="<li>"+key+" ： </li>";
    }
    // document.querySelector('.show-data').innerHTML = str;

  }
  
  function ShowTitleInOption(){
    // var str = ''
    desc={};
  
    for(var i=0;i<data.length;i++){
      if(!desc[data[i].InformDesc_]){
        desc[data[i].InformDesc_] = 0;
      }else{
        desc[data[i].InformDesc_]+=0;
      }
    }

    var select, i, option;
    select = document.getElementById( 'TitleSelector' );
    select2 = document.getElementById( 'TitleSelector2' );
    for(var key in desc){
      option = document.createElement( 'option' );
      option.value = option.text = key;
      select.add( option );
      option2 = document.createElement( 'option' );
      option2.value = option2.text = key;
      select2.add( option2 );
    // str+="<li>"+key+" ： </li>";
    }
    // document.querySelector('.show-data').innerHTML = str;

  }

  function TitleFilter(title){
   
    //alert(title);
      var InformDesc_ = title;
      for (var i =0; i<markers.length; i++){
        if(markers[i].title != InformDesc_){
          delMarker(i);
        }
      }
      
      FilterIdx = "Title";

    
      //setMapOnAll(map);
      for (var i =0; i<markers.length; i++){
        if(markers[i].title != InformDesc_){
          delMarker(i);
        }
      }
    

  }

  function Filter(){
    //setMapOnAll(map);
    var region = $('select[id=RegionSelector]').val()
    var title = $('select[id=TitleSelector]').val()
    
   
    

    // var str = '';
    // alert(region);
    //  alert("GDGDFG");

    
    ShowData();
    // ClearData();
    //clearMarkers();
    
    if ( region == "empty" && title == "empty" ){
        // alert("both not");
        setMapOnAll(map);
    }
    if(region == "empty" && title != "empty" ){
       
      // alert("title yes");

        setMapOnAll(map);
        for (var i =0; i<markers.length; i++){
          
          if(TitleList[i] != title){
            
            delMarker(i);
          }

          // str += '<li><h3>'+markers[i].region+'</h3><p>'+markers[i].title+'</p></li>';
        }  
    }
    if (region != "empty" && title == "empty"){
      // alert("region yes");
      
        setMapOnAll(map);
        for (var i =0; i<markers.length; i++){
          // alert(RegionList[i]);    
          if(RegionList[i] != region){
            
            delMarker(i);
          }

          // str += '<li><h3>'+markers[i].region+'</h3><p>'+markers[i].title+'</p></li>';
        }  
    }

    if(title != "empty" && region != "empty"){
        setMapOnAll(map);
        alert("both yes");
        for (var i =0; i<markers.length; i++){

          // alert(markers[i].region);

          if(RegionList[i] != region || TitleList[i] != title){
            delMarker(i);
          }

          // str += '<li><h3>'+markers[i].region+'</h3><p>'+markers[i].title+'</p></li>';
        }

    }
    
    
    // var RegionList = [];
    // var TitleList = [];
    
    
    // document.querySelector('.show-data').innerHTML = str;


    // var Zipname = region;
    //   for (var i =0; i<markers.length; i++){
    //     if(markers[i].region != Zipname){
    //       delMarker(i);
    //     }
    //   }


  }
  
  function ShowPos(Pos){

    map.setZoom(17);
    aimPos = markers[Pos].position;
    map.setCenter(aimPos);
  }

  function ClearData(){
    document.getElementById("LocationList").innerHTML = "";
  }
  function ShowData(){
    
    ClearData();

    var region = $('select[id=RegionSelector]').val()
    var title = $('select[id=TitleSelector]').val()
    
    if ( region == "empty" && title == "empty" ){
      
      
      for (var i =0; i<RegionList.length; i++){
        
        var ul = document.getElementById("LocationList");
        var li = document.createElement("li");
        var br = document.createElement("br");

        // li.classList = "history-data";
        // 
        // li.appendChild(i);
        // 
        

        var h3 = document.createElement("h3");
        h3.id = "TitleText";
        var TitleText = document.createTextNode(TitleList[i]);
        h3.appendChild(TitleText);
        li.appendChild(h3);


        var h4 = document.createElement("h4");
        h4.id = "RegionText";
        var RegionText = document.createTextNode(RegionList[i]);
        h4.appendChild(RegionText);
        li.appendChild(h4);

        var p = document.createElement("p");
        p.id = "DescText";
        var DescText = document.createTextNode(DescriptionList[i]);
        p.appendChild(DescText);
        li.appendChild(p);


        li.setAttribute("value", i); // added line
        li.setAttribute("onclick", "ShowPos($(this).attr('value'));"); // added line
        li.setAttribute("class", "history-data"); // added line
        ul.appendChild(li);

      }  

      
    }
      if (region == "empty" ){
        for (var i =0; i<TitleList.length; i++){
          if(TitleList[i] == title){
            // str += '<li><h3>'+markers[i].region+'</h3><h3>'+markers[i].title+'</h3><p>'+markers[i].description+'</p></li>';
            var ul = document.getElementById("LocationList");
            var li = document.createElement("li");
            var br = document.createElement("br");

            // li.className = "history-data";

            // li = "history-data";
            

            

            var h3 = document.createElement("h3");
            h3.id = "TitleText";
            var TitleText = document.createTextNode(TitleList[i]);
            h3.appendChild(TitleText);
            li.appendChild(h3);

            var h4 = document.createElement("h4");
            h4.id = "RegionText";
            var RegionText = document.createTextNode(RegionList[i]);
            h4.appendChild(RegionText);
            li.appendChild(h4);

            var p = document.createElement("p");
            p.id = "DescText";
            var DescText = document.createTextNode(DescriptionList[i]);
            p.appendChild(DescText);
            li.appendChild(p);

            li.setAttribute("value", i); // added line
            li.setAttribute("onclick", "ShowPos($(this).attr('value'));"); // added line
            li.setAttribute("class", "history-data"); // added line
            ul.appendChild(li);
          }
        }  
      } 
      if (title == "empty" ){
        for (var i =0; i<RegionList.length; i++){
          if(RegionList[i] == region){
            // str += '<li><h3>'+markers[i].region+'</h3><h3>'+markers[i].title+'</h3><p>'+markers[i].description+'</p></li>';
            var ul = document.getElementById("LocationList");
            var li = document.createElement("li");
            var br = document.createElement("br");

            
            

            var h3 = document.createElement("h3");
            h3.id = "TitleText";
            var TitleText = document.createTextNode(TitleList[i]);
            h3.appendChild(TitleText);
            li.appendChild(h3);

            var h4 = document.createElement("h4");
            h4.id = "RegionText";
            var RegionText = document.createTextNode(RegionList[i]);
            h4.appendChild(RegionText);
            li.appendChild(h4);

            var p = document.createElement("p");
            p.id = "DescText";
            var DescText = document.createTextNode(DescriptionList[i]);
            p.appendChild(DescText);
            li.appendChild(p);

            li.setAttribute("value", i); // added line
            li.setAttribute("onclick", "ShowPos($(this).attr('value'));"); // added line
            li.setAttribute("class", "history-data"); // added line
            ul.appendChild(li);
          }
        }    
      }
      if (title !== "empty" && region !== "empty"){
        for (var i =0; i<RegionList.length; i++){
          if(RegionList[i] == region && TitleList[i] == title){
            // str += '<li><h3>'+markers[i].region+'</h3><h3>'+markers[i].title+'</h3><p>'+markers[i].description+'</p></li>';
            var ul = document.getElementById("LocationList");
            var li = document.createElement("li");
            var br = document.createElement("br");


            
            

            var h3 = document.createElement("h3");
            h3.id = "TitleText";
            var TitleText = document.createTextNode(TitleList[i]);
            h3.appendChild(TitleText);
            li.appendChild(h3);

            var h4 = document.createElement("h4");
            h4.id = "RegionText";
            var RegionText = document.createTextNode(RegionList[i]);
            h4.appendChild(RegionText);
            li.appendChild(h4);

            var p = document.createElement("p");
            p.id = "DescText";
            var DescText = document.createTextNode(DescriptionList[i]);
            p.appendChild(DescText);
            li.appendChild(p);

            li.setAttribute("value", i); // added line
            li.setAttribute("onclick", "ShowPos($(this).attr('value'));"); // added line
            li.setAttribute("class", "history-data"); // added line
            ul.appendChild(li);
          }
          
        }
      }
    
    
    // document.querySelector('.show-data').innerHTML = str;
    // str = '';
  }


  // function RegionFilter(region){
  //   //setMapOnAll(map);
  //   var region2 = $('select[id=RegionSelector]').val()
  //   alert(region2);
    


  //   var Zipname = region;
  //     for (var i =0; i<markers.length; i++){
  //       if(markers[i].region != Zipname){
  //         delMarker(i);
  //       }
  //     }
  // }


  function AddMarker(lat, lng, title, region, desc,zipname) {
    var infowindow = new google.maps.InfoWindow;
    var marker, i;  
    var location = new google.maps.LatLng(lat, lng);

    marker = new google.maps.Marker({
    position: location ,
    map: map,
    title: title,
    region: region,
    description : desc
    });

    markers.push(marker);

    markerId = marker.__gm_id;
    markers[markerId] = marker;
    

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(region + zipname + "<br>" + title);
        infowindow.open(map, marker);
      }
    })(marker, i));

    


  }

  var delMarker = function (id) {
  marker = markers[id]; 
  marker.setMap(null);
  } 

  // Adds a marker to the map and push to the array.
  // function addMarker(location) {
  //   var marker = new google.maps.Marker({
  //     position: location,
  //     map: map
  //   });
  //   markers.push(marker);
  // }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    //deleteMarkers();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  //setMapOnAll(map);


  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);


    
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
    //locations = [];
  }

  function debug(){
    alert(markers.length);
  }

 
  var RegionList = [];
  var TitleList = [];
  var DescriptionList = [];
    

  
  function InitPageSel(){
    AddAllMarkers();
    ShowRegionInOption();
    ShowTitleInOption();
    
    Filter();

    for (i=0 ;i<markers.length; i++){
      RegionList[i] = markers[i].region;
      TitleList[i] = markers[i].title;
      DescriptionList[i] = markers[i].description;
    }
    
    // alert(TitleList.length);
    // alert(RegionList.length);
    // alert(markers.length);
    
  }




