!function(t,e,i,n){var o=t(e);t.fn.lazyload=function(r){function a(){var e=0;f.each(function(){var i=t(this);if(!d.skip_invisible||i.is(":visible"))if(t.abovethetop(this,d)||t.leftofbegin(this,d));else if(t.belowthefold(this,d)||t.rightoffold(this,d)){if(++e>d.failure_limit)return!1}else i.trigger("appear"),e=0})}var l,f=this,d={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:e,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return r&&(n!==r.failurelimit&&(r.failure_limit=r.failurelimit,delete r.failurelimit),n!==r.effectspeed&&(r.effect_speed=r.effectspeed,delete r.effectspeed),t.extend(d,r)),l=d.container===n||d.container===e?o:t(d.container),0===d.event.indexOf("scroll")&&l.bind(d.event,function(){return a()}),this.each(function(){var e=this,i=t(e);e.loaded=!1,(i.attr("src")===n||i.attr("src")===!1)&&i.is("img")&&i.attr("src",d.placeholder),i.one("appear",function(){if(!this.loaded){if(d.appear){var n=f.length;d.appear.call(e,n,d)}t("<img />").bind("load",function(){var n=i.attr("data-"+d.data_attribute);i.hide(),i.is("img")?i.attr("src",n):i.css("background-image","url('"+n+"')"),i[d.effect](d.effect_speed),e.loaded=!0;var o=t.grep(f,function(t){return!t.loaded});if(f=t(o),d.load){var r=f.length;d.load.call(e,r,d)}}).attr("src",i.attr("data-"+d.data_attribute))}}),0!==d.event.indexOf("scroll")&&i.bind(d.event,function(){e.loaded||i.trigger("appear")})}),o.bind("resize",function(){a()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&o.bind("pageshow",function(e){e.originalEvent&&e.originalEvent.persisted&&f.each(function(){t(this).trigger("appear")})}),t(i).ready(function(){a()}),this},t.belowthefold=function(i,r){var a;return a=r.container===n||r.container===e?(e.innerHeight?e.innerHeight:o.height())+o.scrollTop():t(r.container).offset().top+t(r.container).height(),a<=t(i).offset().top-r.threshold},t.rightoffold=function(i,r){var a;return a=r.container===n||r.container===e?o.width()+o.scrollLeft():t(r.container).offset().left+t(r.container).width(),a<=t(i).offset().left-r.threshold},t.abovethetop=function(i,r){var a;return a=r.container===n||r.container===e?o.scrollTop():t(r.container).offset().top,a>=t(i).offset().top+r.threshold+t(i).height()},t.leftofbegin=function(i,r){var a;return a=r.container===n||r.container===e?o.scrollLeft():t(r.container).offset().left,a>=t(i).offset().left+r.threshold+t(i).width()},t.inviewport=function(e,i){return!(t.rightoffold(e,i)||t.leftofbegin(e,i)||t.belowthefold(e,i)||t.abovethetop(e,i))},t.extend(t.expr[":"],{"below-the-fold":function(e){return t.belowthefold(e,{threshold:0})},"above-the-top":function(e){return!t.belowthefold(e,{threshold:0})},"right-of-screen":function(e){return t.rightoffold(e,{threshold:0})},"left-of-screen":function(e){return!t.rightoffold(e,{threshold:0})},"in-viewport":function(e){return t.inviewport(e,{threshold:0})},"above-the-fold":function(e){return!t.belowthefold(e,{threshold:0})},"right-of-fold":function(e){return t.rightoffold(e,{threshold:0})},"left-of-fold":function(e){return!t.rightoffold(e,{threshold:0})}})}(jQuery,window,document),$(function(){function t(t){var e=$(this),i=e.parent();i.data("exif");$exif.parent().append($("<div>").addClass("exif").html('<span class="glyphicon glyphicon-download"></span><p>Loading …</p>').load($exif.data("url")))}var e=$("figure"),i=$("#light-box");i.on("click",function(){i.hide()}),e.find("img").lazyload(),e.find("img").on("click",function(){var t=$(this);i.find("img").attr("src",t.data("enlarge")),i.show()}),e.find(".mobile-button").on("click",function(){t.call(this)}),e.find(".exif-button").on("mouseover",function(){t.call(this,!0);var e=$(this);e.parent().append($("<div>").addClass("exif").html('<span class="glyphicon glyphicon-download"></span><p>Loading …</p>').load(e.data("url")))})});