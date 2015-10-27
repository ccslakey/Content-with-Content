$(function(){
	var myRequestObj = {sanity:'sanity'};
	var ajaxButton = $('.ajaxButton');
	var cardHolder = $('#myCards');
	var redditData = [];


	// event listener to load some subreddit data
	ajaxButton.click(function(e){
		e.preventDefault();
		// reset content
		cardHolder.empty();
		// get subreddit and make ajax call
		var subreddit = $("#subreddit")[0].value || "pics";
		// ajax
		$.getJSON("http://www.reddit.com/r/" + subreddit + ".json?limit=10&jsonp=?", function (data) {
	            redditData = data.data.children;
	            
	            // scrape the mods
	            if (redditData[0].data.distinguished = "moderator") {
	             redditData.shift()
	            }
	            console.log(redditData);
	            // gimme that sweet content
	            redditData.forEach(getThumbnails);
	            $("#subreddit")[0].value = '';
	           }); //end of ajax call
		}); //end .click

	function makeCard (post) {
		var constructedCard = '<div class="card"><img class="thumbnail" src="' + post.thumbnail + '" alt="Image Alt" />'+ 
				'<div class="info"><div class="title">' + post.title + '<div class="sub">/r/' + post.subreddit +
				'<div class="user">/u/' + post.author +'</div></div></div>'
		console.log(constructedCard);
		return constructedCard;    
	}

	function getThumbnails (val, index, post) {
		post = (val.data);
		var htmlCard = makeCard(post)
		
		// change if statement to accept nsfw?
		// just find different json link
		if (post.thumbnail !="nsfw"){
			cardHolder.append(htmlCard);
			// console.log(htmlCard);
		}

	}
});