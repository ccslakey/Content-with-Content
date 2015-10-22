$(function(){
	var myRequestObj = {sanity:'sanity'};
	var ajaxButton = $('.ajaxButton');
	var contentList = $('#contentList');
	var redditData = [];
	var renderThreads = $('.renderThread')

	function renderThread () {
		var thread = "<p>Hi</p>";
		return thread
	}


	// event listener to load some subreddit data
	ajaxButton.click(function(e){
		e.preventDefault();
		// reset content
		contentList.empty();
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

	           }); //end of ajax call
		}); //end .click

	function makeCard (post) {
		var constructedCard = '<div class="mdl-layout mdl-js-layout mdl-color--grey-100"><main class="mdl-layout__content"><div class="mdl-grid"><div class="mdl-card mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--2dp"><figure class="mdl-card__media">'+
		'<img src="'+ post.url + '" alt="Image Alt" />'+ '</figure><div class="mdl-card__title"><h1 class="mdl-card__title-text">' + 
			'/u/' + post.author + '</h1></div><div class="mdl-card__supporting-text"><p>' +
			post.title + 
			'</p></div><div class="mdl-card__actions mdl-card--border"><a class="renderThread mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Read More</a>'+
			'</div></div></div></main></div>'
		return constructedCard;    
	}

	function getThumbnails (val, index, post) {
		post = (val.data);
		var htmlCard = makeCard(post)
		
		// change if statement to accept nsfw?
		// just find different json link
		if (post.thumbnail !="nsfw"){
			contentList.append(htmlCard);
		}

	}


	
});

