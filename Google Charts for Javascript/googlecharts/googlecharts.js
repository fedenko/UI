var GoogleCharts = {
	chartBaseUrl : "http://chart.apis.google.com/chart?",
	chartParams1 : "chs=",
	chartParams2 : "&cht=",
	chartParams3 : "&chco=",
	values : "&chd=",
	labels : "&chl=",
	valueArray :[],
	max : 1,
	defColor : "339933",
	clist : [],
	ele : "",
	table : "",
	init: function(){
		GoogleCharts.clist['pie'] = 'p';
		GoogleCharts.clist['pie3d'] = 'p3';
		GoogleCharts.clist['line'] = 'lc';
		GoogleCharts.clist['sparkline'] = 'ls';
		GoogleCharts.clist['bar-horizontal'] = 'bhg';
		GoogleCharts.clist['bar-vertical'] = 'bvg';
		GoogleCharts.clist['bhs'] = 'bhs';
		GoogleCharts.clist['bvs'] = 'bvs';
		GoogleCharts.clist['lc'] = 'lc';
		GoogleCharts.values = "&chd=";
		GoogleCharts.labels = "&chl=";
	},
	graphIt: function(tablen,gtype,w,h,color){
		GoogleCharts.init();
		var tbl = GoogleCharts.byId(tablen);
		tableTitle = tbl.getAttribute('summary');
		if( tableTitle == "") tableTitle = graphLabel + " per " + graphedPer;
		var rows = tbl.getElementsByTagName("tr");   
		var headings = rows[0].getElementsByTagName("td");
		var graphedPer = headings[0].innerHTML;
		var graphLabel = headings[1].innerHTML;
		for(i = 1; i < rows.length; i++){
			var cols = rows[i].getElementsByTagName("td");
			if (i == 1) {
				GoogleCharts.labels = GoogleCharts.labels + escape(cols[0].innerHTML);
			} else {
				GoogleCharts.labels = GoogleCharts.labels + "|" + escape(cols[0].innerHTML);
			}
			GoogleCharts.valueArray[i - 1] = cols[1].innerHTML;
			if (cols[1].innerHTML > GoogleCharts.max) GoogleCharts.max = cols[1].innerHTML;
		}
		GoogleCharts.values = GoogleCharts.values + "t:" + GoogleCharts.valueArray.join(",");
		chartParams = GoogleCharts.chartParams1 + w + "x" + h + GoogleCharts.chartParams2 + GoogleCharts.clist[gtype] + GoogleCharts.chartParams3 + color + "&chtt="+ escape(tableTitle);
		src = GoogleCharts.chartBaseUrl + chartParams + GoogleCharts.labels + GoogleCharts.values;
		var chart = document.createElement('img');
		chart.setAttribute('src',src);
		chart.setAttribute('alt',tableTitle);
		tbl.parentNode.insertBefore(chart,tbl);
		tbl.style.display = "none";
	},
	byId: function(a){
		return document.getElementById(a);
	}
}