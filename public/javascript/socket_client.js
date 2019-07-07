var socket = io.connect('http://localhost:3000', { 'forceNew': true });

socket.on('updateCountUsers', function(data) {
	document.getElementById("elementUsers").textContent = data.countUsers;
});

socket.on('updateCountTweets', function(data) {
    document.getElementById("elementTweets").textContent = data.countTweets;
});