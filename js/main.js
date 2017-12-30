$(function(){

	var infoTemplate = $('#info-template').html();
	var $results = $('#results');
	var repoTemplate = $('#repo-template').html();
	var $repos = $('#repos');

	function displayUserProfile(user){

			$results.html("");
			$results.append(Mustache.render(infoTemplate,user));

	}

	function displayUserRepos(repos){
			$repos.html("");
			$.each(repos,function(i,repo){
				$repos.append(Mustache.render(repoTemplate,repo));
			});

			

	}

	$('#searchUser').on('keyup',function(e){
		var userName = e.target.value ;

		$.ajax({
			url:"https://api.github.com/users/"+userName,
			data:{
				client_id:"eeb6fbd4669947d2f264",
				client_secret:"fcd2764a85e21b5acdb1635a352b6b5079cecf1b",
				
			}

		}).done(function(user){
			$.ajax({
				url:"https://api.github.com/users/"+userName+"/repos",
				data:{
					client_id:"eeb6fbd4669947d2f264",
					client_secret:"fcd2764a85e21b5acdb1635a352b6b5079cecf1b",
					sort:'created:asc',
					per_page:4
				}
			}).done(function(repos){
				// console.log(repos);
				displayUserRepos(repos);
			});
			displayUserProfile(user);
		});
	});
	

});



			// 		var html = "";
			// var results = $("#results");
			
			// var profile = "View Profile";

			// results.html("");

			// html += "<h2>"+user.name +"</h2>";
			// html += "<img src="+ user.avatar_url +">";
			// html += '<a href="' + user.html_url + '">' + profile + '</a>';
			// htmlRight += '<span class="'+badgePrimary+'">Public repo:'+ user.public_repos+'</span>';

			// results.append(html);

			// var htmlRight = "";
			// var resultsRight = $("#results-right");
			// var badgePrimary = "badge badge-primary";
			// var badgeInfo = "badge badge-info";
			// var badgeSuccess = "badge badge-success";
			// var badgeWarning = "badge badge-warning";

			// resultsRight.html("");

			// htmlRight += '<span class="'+badgePrimary+'">Public repo:'+ user.public_repos+'</span>';
			// htmlRight += '<span class="'+badgeSuccess+'">Public Gists:'+ user.public_gists+'</span>';
			// htmlRight += '<span class="'+badgeInfo+'">Followers:'+ user.followers+'</span>';
			// htmlRight += '<span class="'+badgeWarning+'">Following:'+ user.following+'</span>';

			// resultsRight.append(htmlRight);






