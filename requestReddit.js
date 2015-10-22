$(function(){
	var myRequestObj = {sanity:'sanity'};
	var ajaxButton = $('.ajaxButton');
	var contentList = $('#contentList');
	var redditData = [];

	function makeCard (post) {
		// body...
	}

	function getThumbnails (val, index, dataChildren) {
		post = (val.data);
		var htmlCard = "<li><img alt='" + post.url + "' src='" + post.thumbnail + "'><br>" + post.title + "</li>"; 


		// change if statement to accept nsfw?
		// just find different json link
		if (post.thumbnail !="nsfw"){
			contentList.append(htmlCard);
		}

	}



	// event listener to load some data
	ajaxButton.click(function(e){
		contentList.html('');
		var subreddit = $("#subreddit")[0].value || "pics"

		e.preventDefault();
		$.getJSON("http://www.reddit.com/r/" + subreddit + ".json?limit=100&jsonp=?", function (data) {
	            redditData = data.data.children;
	            
	            // scrape the mods
	            if (redditData[0].data.distinguished = "moderator") {
	             redditData.shift()
	            }
	            console.log(redditData);
	            // gimme that sweet content
	            redditData.forEach(getThumbnails);


	           }); //end of ajax call
		}); //end .click



	
});

