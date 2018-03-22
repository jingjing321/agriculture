$(document).on("pageInit", function(e, pageId, $page) {
	// setTimeout($.closePanel(),10);
  	if(pageId == "item_list") {
  		getProgramList();
  	}
});