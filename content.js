const l = (document.getElementById('thumbnail') && document.getElementsByClassName('yt-simple-endpoint style-scope ytd-playlist-thumbnail'))
for(let i=0;i<l.length;i++){
    l[i]=l[i].href;
    console.log(l[i].href);
}
//const likeDislike=[];
/*reqHTML="<div><p>Likes<br>Dislikes</p></div>"
if(chrome.tabs.url)
likeDislike = document.getElementsByClassName('inline-metadata-item style-scope ytd-video-meta-block')
for(let i=0;i<likeDislike.length;i++){
    likeDislike[i]=likeDislike[i].insertAdjacentHTML("afterend",reqHTML);
}*/
const videoTitle=(document.getElementById('video-title-link') && document.getElementsByClassName('yt-simple-endpoint focus-on-expand style-scope ytd-rich-grid-media'))
if(videoTitle){
for(let j=0;j<videoTitle.length;j++){
    const likeGraphics=document.createElement("img")
    likeGraphics.src=chrome.runtime.getURL("assets/like.jfif")
    likeGraphics.style.width = "10%"
    likeGraphics.style.height = "100%"
    videoTitle[j].insertAdjacentElement('afterend',likeGraphics)
    const dislikeGraphics=document.createElement("img")
    dislikeGraphics.src=chrome.runtime.getURL("assets/dislike.jfif")
    dislikeGraphics.style.width = "6%"
    dislikeGraphics.style.height = "5%"
    likeGraphics.insertAdjacentElement('afterend',dislikeGraphics)
}}