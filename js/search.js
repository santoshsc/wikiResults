
var respData,
	source = $("#result_template").html(),
	template = Handlebars.compile(source);
function renderTble(json){
	
	respData = json.query.search;
	sortFunc(respData);
	$("#resultContainer").html(template(json.query.search));
}

function searchWiki(txtVal){
	$.ajax({
		url: '//en.wikipedia.org/w/api.php?callback=json',
		data: {action: 'query', list: 'search', srsearch: txtVal, format: 'json', prop: 'link'},
		dataType: 'jsonp',
		jsonpCallback: 'renderTble',
		jsonp: 'callback'
	});	
}
$(document).on("click", "#btnWikiSearch", function(e){
	e.preventDefault();
	searchWiki($("#wikiSearch").val());
	$("#searchResultHead").removeClass("hide");
})

var asd = false;
$(document).on("click", "#btnSort", function(e){
	e.preventDefault();
	asd = asd ? asd = false : asd = true;
	sortFunc(respData);
	$("#resultContainer").html(template(respData));
})
function compare(a,b){
	if(asd){
		if(a.title < b.title)
			return 1
		if(a.title > b.title)
			return -1
		return 0;
	}
	else{
		if(a.title < b.title)
			return -1
		if(a.title > b.title)
			return 1
		return 0;
	}
}
function sortFunc(objSort){
	var objSort = objSort.sort(compare);
}