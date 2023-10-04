/*chrome.tabs.onUpdated.addListener((tabId, changeInfo,tab)=>{
    if(changeInfo.status==='complete'){
        let URLtype=''
        console.log(tab.url)
        if(tab.url && tab.url.includes("https://www.youtube.com/results?search_query=")){
            URLtype='SEARCH'
        }
        else if(tab.url && tab.url==="https://www.youtube.com/"){
            URLtype='HOME'
        }
        chrome.tabs.sendMessage(tabId, {
            type:URLtype,
            siteURL:tab.url
        })
    }
});*/
