var videoIds = [];
var videoUrls = [];
var videoId;
var videoTitle=[];
var state = [];
var I=0;
var likeList=[];
var dislikeList=[];

async function likedislikeFetch(videoID, VideoTitle){
    const apiUrl = `https://returnyoutubedislikeapi.com/votes?videoId=${videoID}`
    try {
        const response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error(`Fetch failed with status ${response.status}`)
        }
        const data = await response.json();
        console.log(data,videoID)
        const like = Number(data.likes)
        const dislike=Number(data.dislikes)
        console.log(dislike)
        if(dislike===undefined){
            likeIcon=await insertIcon('assets/like.jpg')
            dislikeIcon=await insertIcon('assets/dislike.jfif')
            const likeContainer = document.createElement('div')
            const dislikeContainer = document.createElement('div')

            likeContainer.appendChild(likeIcon)
            likeContainer.insertAdjacentText('beforeend', `${like}`)

            dislikeContainer.appendChild(dislikeIcon)
            dislikeContainer.insertAdjacentText('beforeend', `${dislike}`)

            VideoTitle.insertAdjacentElement('beforeend', likeContainer)
            VideoTitle.insertAdjacentElement('beforeend', dislikeContainer)

            VideoTitle.style.display = 'flex'
            VideoTitle.style.justifyContent = 'space-between'

            const totalVotes = like + dislike;
            const likePercentage = totalVotes === 0 ? 0 : (like / totalVotes) * 100

            if(totalVotes===0){
                VideoTitle.style.background = '#B5B5B5'
            }else if (likePercentage > 98) {
                VideoTitle.style.background = '#B2FFBC'
                const recommendedText = document.createElement('span')
                recommendedText.style.fontSize = '120%'
                recommendedText.textContent = ' Recommended'
                recommendedText.style.border="1px solid green"
                recommendedText.style.borderRadius="4px"
                dislikeContainer.insertAdjacentElement('afterend', recommendedText)
            } else if (likePercentage < 40) {
                VideoTitle.style.background = '#FFB9B9'
        }
        }
        else{
            if(VideoTitle){
                likeIcon=await insertIcon('assets/like.jpg')
                dislikeIcon=await insertIcon('assets/dislike.jfif')
                const likeContainer = document.createElement('div')
                const dislikeContainer = document.createElement('div')

                likeContainer.appendChild(likeIcon)
                likeIcon.style.height="18%"
                likeIcon.style.width="18%"
                likeContainer.insertAdjacentText('beforeend', `${like}`)

                dislikeContainer.appendChild(dislikeIcon);
                dislikeContainer.insertAdjacentText('beforeend', `${dislike}`)

                VideoTitle.insertAdjacentElement('beforeend', likeContainer)
                VideoTitle.insertAdjacentElement('beforeend', dislikeContainer)

                VideoTitle.style.display = 'flex'
                VideoTitle.style.justifyContent = 'space-between'
                const totalVotes = like + dislike
                const likePercentage = totalVotes === 0 ? 0 : (like / totalVotes) * 100

                if(totalVotes===0){
                    VideoTitle.style.background = '#B5B5B5'
                }else if (likePercentage > 98) {
                    VideoTitle.style.background = '#B2FFBC'
                    const recommendedText = document.createElement('span')
                    recommendedText.style.fontSize = '120%'
                    recommendedText.textContent = ' Recommended'
                    recommendedText.style.border="1px solid green"
                    recommendedText.style.borderRadius="4px"
                    dislikeContainer.insertAdjacentElement('afterend', recommendedText)
                } else if (likePercentage < 40) {
                    VideoTitle.style.background = '#FFB9B9'
            }
            }
        }
    } catch (error) {
        console.error(`Failed to fetch like/dislike counts for video ${videoID}: ${error.message}`)
    }
}

async function observeVideos() {
    var videoUrls = removeDuplicates(getVideoUrls());
    var i=0
    while(i<videoUrls.length) {
        console.log(i, state[i])
        videoId = getVideoId(videoUrls[i])
        if (videoId && !state[i]) {
            videoIds.push(videoId)
            state[i]=true
            likedislikeFetch(videoId,videoTitle[i])
        }
        else{dislikeList=removeDuplicates(dislikeList);i++;I=i;continue}
        //console.log(videoId)
        videoTitle=document.querySelectorAll('#channel-info')
        if(videoTitle[i] && !state[i]){
        state[i]=true}
    }

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            var newVideoUrl = entry.target.href
            var newVideoId = getVideoId(newVideoUrl)
            if (newVideoId) {
                videoIds.push(newVideoId)
            }
            //console.log(videoIds)
        }
    });
}, {threshold: 1.0});

    var newVideoThumbnails = document.querySelectorAll("a#video-title-link:not(.observed)");
    for (var i = 0; i < newVideoThumbnails.length; i++) {
        observer.observe(newVideoThumbnails[i])
        newVideoThumbnails[i].classList.add("observed")
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
      graphics.style.width = "11%"
      graphics.style.height = "11%"
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
        var videoUrl = videoThumbnails[i].href
        if(videoUrl===''){
            continue
        }
        videoUrls.push(videoUrl)
    }
    //console.log(videoUrls)
    videoUrls=removeDuplicates(videoUrls)
    return (videoUrls)
}

function getVideoId(url) {
    var VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    var match = url.match(VID_REGEX);
    console.log(match)
    if (match && match[1]) {
        return match[1];
    } else {
        return false;
    }
}

observeVideos()
window.addEventListener('scroll', function() {
    observeVideos();}
);