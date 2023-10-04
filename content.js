var apiKey = "AIzaSyByxQtF-kUsnySAHfaE8z942VYJfP8uevs";
var like, dislike;
async function dislikeFetch(videoID){
    const apiUrl = `https://returnyoutubedislikeapi.com/votes?videoId=${videoID}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.dislikes;
}

async function likeFetch(videoID){
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=statistics&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.items[0].statistics.likeCount;
}


var videoIds = [];
var videoUrls = [];
var videoId;
var videoTitle=[]
var state = []
var Like, Dislike;
async function observeVideos() {
    var videoUrls = removeDuplicates(getVideoUrls());
    for (var i = 0; i < videoUrls.length; i++) {
        videoId = getVideoId(videoUrls[i]);
        if (videoId) {
            videoIds.push(videoId);
            state.push(false)
            console.log(i, state[i])
        }
        else{continue}
        //console.log(videoId)
        videoTitle=document.querySelectorAll('#channel-info')
        if(videoTitle[i] && !state[i]){
        Dislike=await dislikeFetch(videoId)
        Like=await likeFetch(videoId)
        videoTitle[i].insertAdjacentText("afterend",Like)
        videoTitle[i].insertAdjacentText("afterend", Dislike+" ")
        state[i]=true
        console.log(i,state[i])
        console.log(state)}
    }

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var newVideoUrl = entry.target.href;
            var newVideoId = getVideoId(newVideoUrl);
            if (newVideoId) {
                videoIds.push(newVideoId);
            }

                //console.log(videoIds)
        }
    });
}, {threshold: 1.0});

    var newVideoThumbnails = document.querySelectorAll("a#video-title-link:not(.observed)");
    for (var i = 0; i < newVideoThumbnails.length; i++) {
        observer.observe(newVideoThumbnails[i]);
        newVideoThumbnails[i].classList.add("observed");
    }
videoIds=removeDuplicates(videoIds)
    //console.log(videoIds);
}
var videoParent;
var likeIcon;
var dislikeIcon;
function insertIcon(path){
    const graphics=document.createElement("img")
      graphics.src=chrome.runtime.getURL(path)
      graphics.style.width = "6%"
      graphics.style.height = "5%"
      return graphics
  }

  function removeDuplicates(arr) {
    let unique = arr.reduce(function (acc, curr) {
        if (!acc.includes(curr))
            acc.push(curr);
        return acc;
    }, []);
    return unique;
}

function getVideoUrls() {
    var videoThumbnails = document.querySelectorAll("a#video-title");
    //var videoTitle = document.querySelectorAll('a#video-title-link')
    for (var i = 0; i < videoThumbnails.length; i++) {
        var videoUrl = videoThumbnails[i].href;
        if(videoUrl===''){
            continue
        }
        videoUrls.push(videoUrl);
    }
    console.log(videoUrls)
    videoUrls=removeDuplicates(videoUrls)
    return (videoUrls);
}

function getVideoId(url) {
    //console.log("hm")
    var VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    var match = url.match(VID_REGEX);
    console.log(match)
    if (match && match[1]) {
        return match[1];
    } else {
        return false;
    }
    //return (match && match[1].length == 11) ? match[1] : false;
}

observeVideos();
window.addEventListener('scroll', function() {
    observeVideos();
});