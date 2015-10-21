$(function(){
	var myRequestObj = {sanity:'sanity'};
	var ajaxButton = $('.ajaxButton');
	var contentList = $('#contentList');
	var redditData = [];
	var thumbnails = [];

	function getThumbnails (val, index, dataChildren) {
		thumbnails[index] = (val.data);
		if (thumbnails[index].thumbnail !="nsfw"){
			contentList.append( "<li><img alt='" + thumbnails[index].url + "' src='" + thumbnails[index].thumbnail + "'</li>" );
		}
	}



	// event listener to load some data
	ajaxButton.click(function(e){
		e.preventDefault();
		$.getJSON("http://www.reddit.com/r/pics.json?jsonp=?", function (data) {
	            redditData = data.data.children;
	            
	            // scrape the mods
	            if (redditData[0].data.distinguished = "moderator") {
	             redditData.shift()
	            }
	            console.log(redditData);
	            // gimme that sweet content
	            thumbnails = redditData.forEach(getThumbnails);
	            console.log(thumbnails);


	           }); //end of ajax call
		}); //end .click



	
});

