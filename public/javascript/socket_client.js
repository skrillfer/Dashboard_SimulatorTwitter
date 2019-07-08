var socket = io.connect('http://35.238.116.182:3000', { 'forceNew': true });

socket.on('updateCountUsers', function(data) {
	document.getElementById("elementUsers").textContent = data.countUsers;
});

socket.on('updateCountTweets', function(data) {
    document.getElementById("elementTweets").textContent = data.countTweets;
});

socket.on('updateCountTags', function(data) {
    document.getElementById("elementTags").textContent = data.countTags;
});


socket.on('updateOccuranceUsers', function(data) {
    document.getElementById("elementOccuranceUsers").textContent = 'user:'+data.occuranceUser+"   Count:"+data.occuranceCount;
});

socket.on('updateAllOccuranceUsers', function(data) {
    createPieChart(data.listUser,data.listCount,data.listColor);    
});

socket.on('updateAllOccuranceTags', function(data) {
    createHistrogramChart(data.listTag,data.listCount,data.listColor);    
});

socket.on('updateOccuranceTags', function(data) {
    document.getElementById("elementOccuranceTags").textContent = 'tag:'+data.occuranceTag+"   Count:"+data.occuranceCount;
});

