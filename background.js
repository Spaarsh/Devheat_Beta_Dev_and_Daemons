const matches=document.getElementById("video-title")
chrome.runtime.sendMessage({
    targetURL: matches,
    count: matches.length
})