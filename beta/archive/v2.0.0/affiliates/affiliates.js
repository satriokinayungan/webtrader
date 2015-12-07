define(["jquery","websockets/binary_websockets","common/util"],function(a,b){return{init:function(){a.get("charts/chartWindow.html",function(c){var d="chart-dialog-1",e=getParameterByName("timePeriod")||"1d",f="1t"==e?"line":"candlestick",g=a(c);g.attr("id",d).find("div.chartSubContainerHeader").attr("id",d+"_header").end().find("div.chartSubContainer").attr("id",d+"_chart").end(),require(["charts/chartOptions"],function(a){a.init(d,e,f)}),b.cached.send({trading_times:(new Date).toISOString().slice(0,10)}).then(function(b){if(!a.isEmptyObject(b)){var c=getParameterByName("instrument"),h=getObjects(b,"symbol",c);if(h&&h.length>0&&h[0].symbol&&h[0].name)if(validateParameters(h[0])){var c=h[0].symbol,i=h[0].name;require(["charts/charts"],function(a){a.drawChart("#"+d+"_chart",c,i,e,f)})}else require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Invalid parameter(s)!"})}),g.find("div.chartSubContainerHeader").hide();else require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Instrument Code Unknown/Unavailable!"})}),g.find("div.chartSubContainerHeader").hide()}})["catch"](function(){require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Error getting market information!"})}),g.find("div.chartSubContainerHeader").hide()}),a(".mainContainer").append(g),resizeElement("#"+d),resizeElement("#"+d+" .chartSubContainer"),a(window).resize(function(){resizeElement("#"+d),resizeElement("#"+d+" .chartSubContainer")})})}}});