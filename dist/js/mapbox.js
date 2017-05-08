"use strict";$(function(){function t(t){var e=t.point.x,o=t.point.y;if(z.width<1e3)return{top:(z.height-x.height)/2,left:(z.width+d-x.width)/2};var n={x:e+x.width-z.width,y:o+x.height-z.height};return n.x=n.x<0?0:n.x+10,n.y=n.y<0?0:n.y+10,e-=n.x,o-=n.y,n.x+n.y>0&&k.panBy([n.x,n.y],{duration:100},{type:null,point:null,target:null,reason:"fit",lngLat:null,originalEvent:null}),{top:o+15,left:e}}function e(t,e,o){t?(j.keyNav=function(t){switch(t.keyCode){case 27:j.mapInteraction();break;case 37:o();break;case 39:e()}},document.addEventListener("keydown",j.keyNav)):document.removeEventListener("keydown",j.keyNav)}function o(t,e){var o=k.getZoom(),i=3*o/Math.pow(2,o),a=[t.lng-i,t.lat-i],l=[t.lng+i,t.lat+i],r=P.features.filter(function(t){var e=t.geometry.coordinates;return e[0]>=a[0]&&e[1]>=a[1]&&e[0]<=l[0]&&e[1]<=l[1]}).map(function(e){return e.properties.distance=n(t,e.geometry.coordinates),e});return r.sort(function(t,e){return t.properties.distance-e.properties.distance}),r.slice(0,e)}function n(t,e){var o=t.lng,n=t.lat,i=e[0],a=e[1];return Math.sqrt(Math.pow(i-o,2)+Math.pow(a-n,2))}function i(){if(M){var t=k.getCenter(),e=m+"/map?lat="+t.lat+"&lon="+t.lng+"&zoom="+k.getZoom();window.history.replaceState(null,null,e)}}function a(){k.getZoom()>u.zoom&&!S?(S=!0,f.click(function(){k.easeTo(u),util.log.event(p,"Zoom Out")}).removeClass("disabled")):k.getZoom()<=u.zoom&&S&&(S=!1,f.off("click").addClass("disabled"))}function l(t){var e=t.split("/"),o=e[e.length-1].split("_");window.location.href="/"+o[0]}function r(t){t.features.length>0&&(k.addSource("track",{type:"geojson",data:t}).addLayer({id:"track",type:"line",source:"track",layout:{"line-join":"round","line-cap":"butt"},paint:{"line-color":"#f22","line-width":5,"line-opacity":.7,"line-dasharray":[1,.8]}},"photo"),$("nav button.link").click(j.buttonClick),$("#legend .track").removeClass("hidden")),k.once("zoomend",function(){window.setTimeout(function(){M=!0},500)}),k.fitBounds([post.bounds.sw,post.bounds.ne])}function c(){k.addSource("photos",{type:"geojson",data:P,cluster:!0,clusterMaxZoom:18,clusterRadius:30}),k.addLayer({id:"cluster",type:"circle",source:"photos",filter:["has","point_count"],paint:{"circle-color":"#422","circle-radius":{property:"point_count",type:"interval",stops:[[0,10],[10,12],[100,15]]},"circle-opacity":b,"circle-stroke-width":3,"circle-stroke-color":"#ccc"}}),k.addLayer({id:"cluster-count",type:"symbol",source:"photos",filter:["has","point_count"],layout:{"text-field":"{point_count_abbreviated}","text-font":["Open Sans Bold","Arial Unicode MS Bold"],"text-size":14},paint:{"text-color":"#fff"}}),k.addLayer({id:"photo",type:"circle",source:"photos",filter:["!has","point_count"],paint:{"circle-color":"#f00","circle-radius":7,"circle-stroke-width":4,"circle-stroke-color":"#fdd","circle-opacity":b}})}function s(){k.on("mouseenter","cluster",Z("pointer")).on("mouseleave","cluster",Z()).on("mouseenter","photo",Z("pointer")).on("mouseleave","photo",Z()).on("zoomend",j.zoomEnd).on("moveend",i).on("click","cluster",j.clusterClick).on("click","photo",j.photoClick)}var d=45,u={zoom:6.5,center:[-116.0987,44.7]},p="Map",h=$("#photo-count"),g=$("#photo-preview"),f=$("nav .zoom-out"),v=$("#legend .toggle"),m=post?"/"+post.key:"",w=function(){for(var t=window.location.search.split(/[&\?]/g),e={},o=0;o<t.length;o++){var n=t[o].split("=");2==n.length&&(e[n[0]]=parseFloat(n[1]))}return e.hasOwnProperty("lat")&&e.hasOwnProperty("lon")&&(e.center=[e.lon,e.lat]),e}(),y=new mapboxgl.NavigationControl,k=new mapboxgl.Map({container:"map-canvas",style:"mapbox://styles/"+mapStyle,center:w.center||u.center,zoom:w.zoom||u.zoom,maxZoom:18,dragRotate:!1,keyboard:!1}),C=k.getCanvasContainer(),b=.6,z={width:0,height:0},x={width:322,height:350},S=!1,L=!0,M=!1,P=null,_={coordinate:function(t){var e=Math.pow(10,5),o=function(t){return Math.round(t*e)/e};return o(t[1])+", "+o(t[0])},photo:function(t){var e=t.properties,o="Click or tap to enlarge";return $("<figure>").append($("<img>").attr("src",e.url).attr("title",o).attr("alt",o).click(function(){l(e.url)})).append($("<figcaption>").html(this.coordinate(t.geometry.coordinates)))},photoPreview:function(e,o,n,i){g.empty().removeClass().css(t(e)),void 0!==i&&g.append(i),g.addClass(o).append(n).append(util.html.icon("close",j.closePreview)).show({complete:j.previewShown})}},j={zoomEnd:function(){i(),a()},keyNav:null,mapInteraction:function(t){void 0!==t&&"fit"!=t.reason&&j.closePreview()},windowResize:function(){var t=$("canvas");z.width=t.width(),z.height=t.height()},buttonClick:function(t){window.location.href=$(this).data("link")},mapLink:function(t){var e=k.getCenter(),o=k.getZoom(),n=1/Math.pow(2.3,o)*375e6;window.location.href=$(this).data("link").replace("{lat}",e.lat).replace("{lon}",e.lng).replace("{zoom}",o).replace("{altitude}",n)},photoClick:function(t){_.photoPreview(t,"single",_.photo(t.features[0])),util.log.event(p,"Click Photo Pin")},previewShown:function(){k.on("move",j.mapInteraction)},closePreview:function(){g.hide(),e(!1),k.off("move",j.mapInteraction)},legendToggle:function(){v.parents("ul").toggleClass("collapsed"),L=!L,util.setting.showMapLegend=L,util.log.event(p,"Toggle Legend")},clusterClick:function(t){var n=t.features[0].properties,i=k.getZoom(),a=function(){k.easeTo({center:t.lngLat,zoom:18-i<2?18:i+2})};if(n.point_count>20&&i<16)a();else{var l=o(t.lngLat,n.point_count);if(0==l.length)a();else{var r=1,c=$("<div>").addClass("photo-list"),s=$("<div>").addClass("markers"),d=function(t){r+=t,r>l.length?r=1:r<1&&(r=l.length),$("figure",c).hide(),$("i",s).removeClass("selected"),$("figure:nth-child("+r+")",c).show(),$("i:nth-child("+r+")",s).addClass("selected"),util.log.event(p,"Navigate Photo Cluster")},u=function(){d(-1)},h=function(){d(1)};e(!0,h,u);for(var g=0;g<l.length;g++)c.append(_.photo(l[g]));if(l.length>20){s.addClass("too-many");for(var g=0;g<l.length;g++)s.append($("<i>").html((g+1).toString()));s.append("of "+l.length)}else for(var g=0;g<l.length;g++)s.append(util.html.icon("place"));$("i:first-child",s).addClass("selected"),_.photoPreview(t,"list",c,$("<nav>").append(util.html.icon("arrow_back",u)).append(s).append($("<div>").addClass("mobile-tip").html("tap photo to view post")).append(util.html.icon("arrow_forward",h)))}}util.log.event(p,"Click Cluster")}};w.center&&a(),v.click(j.legendToggle),$("nav button.toggle-legend").click(j.legendToggle),$("nav button.map-link").click(j.mapLink),window.addEventListener("resize",j.windowResize),util.setting.showMapLegend||v.click(),k.addControl(y,"top-right").on("load",function(){$.getJSON("/geo.json",function(t){P=t,h.find("div").html(P.features.length.toString()),c(),s(),j.windowResize()}),post?(post.bounds.sw[0]-=.01,post.bounds.sw[1]-=.01,post.bounds.ne[0]+=.01,post.bounds.ne[1]+=.01,$.getJSON("/"+post.key+"/geo.json",r)):M=!0});var Z=function(t){return void 0===t&&(t=""),function(){C.style.cursor=t}}});var util={setting:{save:function(t,e){window.localStorage&&localStorage.setItem(t,e)},load:function(t){return window.localStorage?localStorage.getItem(t):null},set showMapLegend(t){util.setting.save("map-legend",t?"true":"false")},get showMapLegend(){var t=util.setting.load("map-legend");return!t||"true"==t}},html:{icon:function(t,e){var o=$("<i>").addClass("material-icons "+t).text(t);return void 0!==e&&o.click(e),o}},log:{event:function(t,e,o){ga("send","event",t,e,o)}}};
//# sourceMappingURL=/js/maps/mapbox.js.map
