define(["indicator_base","highstock"],function(a){function b(b,c){for(var d=[],e=[],f=0;f<b.length;f++)if(d.push(a.isOHLCorCandlestick(this.options.type)?0==f?(b[f].high||b[f][2])-(b[f].low||[f][3]):Math.max(Math.max((b[f].high||b[f][2])-(b[f].low||b[f][3]),Math.abs((b[f].high||b[f][2])-(b[f-1].close||b[f-1][4]))),(b[f].low||b[f][3])-(b[f-1].close||b[f-1][4])):0==f?b[f].y||b[f][1]:Math.abs((b[f].y||b[f][1])-(b[f-1].y||b[f-1][1]))),f>=c){var g=(e[f-1][1]*(c-1)+d[f])/c;isFinite(g)&&!isNaN(g)&&e.push([b[f].x||b[f][0],a.toFixed(g,4)])}else e.push([b[f].x||b[f][0],0]);return e}var c={},d={},e={};return{init:function(){!function(a,f,g){function h(a,b){{var h=this;h.chart}for(var i in d)if(d[i]&&d[i].options&&d[i].options.data&&d[i].options.data.length>0&&c[i].parentSeriesID==h.options.id){var j=h.options.data,k=(d[i].options.data,c[i].period),l=g.findIndexInDataForTime(j,a);if(l>=1){var m=0;if(g.isOHLCorCandlestick(h.options.type)){var n=j[l].high||j[l][2],o=j[l].low||j[l][3],p=j[l-1].close||j[l-1][4];m=Math.max(Math.max(n-o,Math.abs(n-p)),o-p)}else{var q=j[l].y||j[l][1],r=j[l-1].y||j[l-1][1];m=Math.abs(q-r)}var s=g.extractPrice(j,l),t=g.toFixed((e[i][l-1][1]*(k-1)+m)/k,4),u=g.toFixed(t/s*100,4);if(!f.isNumeric(u))continue;var a=j[l].x||j[l][0];b?(e[i][l]=[a,t],d[i].data[l].update({y:u})):(e[i].push([a,t]),d[i].addPoint([a,u],!0,!0,!1))}}}a&&!a.Series.prototype.addNATR&&(a.Series.prototype.addNATR=function(a){var h=this.options.id;a=f.extend({period:14,stroke:"red",strokeWidth:2,dashStyle:"line",levels:[],parentSeriesID:h},a);var i="_"+(new Date).getTime(),j=this.options.data||[];if(j&&j.length>0){for(var k=[],l=b.call(this,j,a.period),m=0;m<l.length;m++){var n=l[m][0],o=g.extractPrice(j,m);k[m]=l[m][1]?[n,g.toFixed(l[m][1]/o*100,4)]:[n,null]}e[i]=l;var p=this.chart;c[i]=a,p.addAxis({id:"natr"+i,title:{text:"NATR ("+a.period+")",align:"high",offset:0,rotation:0,y:10,x:50},lineWidth:2,plotLines:a.levels},!1,!1,!1),g.recalculate(p);var q=this;d[i]=p.addSeries({id:i,name:"NATR ("+a.period+")",data:k,type:"line",dataGrouping:q.options.dataGrouping,yAxis:"natr"+i,opposite:q.options.opposite,color:a.stroke,lineWidth:a.strokeWidth,dashStyle:a.dashStyle},!1,!1),f(d[i]).data({isIndicator:!0,indicatorID:"natr",parentSeriesID:a.parentSeriesID,period:a.period}),p.redraw()}return i},a.Series.prototype.removeNATR=function(a){var b=this.chart;c[a]=null,b.get(a).remove(!1),b.get("natr"+a).remove(!1),d[a]=null,e[a]=[],g.recalculate(b),b.redraw()},a.Series.prototype.preRemovalCheckNATR=function(a){return{isMainIndicator:!0,period:c[a]?c[a].period:void 0,isValidUniqueID:null!=c[a]}},a.wrap(a.Series.prototype,"addPoint",function(a,b,d,e,f){a.call(this,b,d,e,f),g.checkCurrentSeriesHasIndicator(c,this.options.id)&&h.call(this,b[0])}),a.wrap(a.Point.prototype,"update",function(a,b,d,e){a.call(this,b,d,e),g.checkCurrentSeriesHasIndicator(c,this.series.options.id)&&h.call(this.series,this.x,!0)}))}(Highcharts,jQuery,a)}}});