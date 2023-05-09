/*
1.注释：行为图标被点击后激活
2.chrome.tabs.query获取所有被指定属性的tabs,默认索取所有的tabs
3.chrome.tabs.sendMessage 发送单条信息给指定tab的content script中
4.url-link: https://developer.chrome.com/docs/extensions/reference/tabs/#method-sendMessage
*/
chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, "toggle");
    })
});

function logURL(requestDetails) {
    const url = requestDetails.url;
    console.log(url);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs);
        const tabId = tabs[0].id;
        console.log(tabId);
        chrome.tabs.sendMessage(tabId, {message: url})
    })


    /*console.log(url);
    if (url.includes('stat.10jqka.com.cn')) {
        const splitUrl = url.split('?');
        const param = splitUrl[1].split('&');
        console.log('@@@trackPoint', param);
    }*/
    //http://stat.10jqka.com.cn/q?id=iwencai_datav_d3charts.load&ld=browser&size=1800x1169&datavIwencai=iwencai_datav_d3charts.load&version=0.4.25&widgetN=data-1%7Cgrid-1%7Cline-1%7Caxis-1%7Ctooltip-1%7CaxisPointer-1%7CdataZoom-1%7Clegend-1&fid=iwencai_datav&ref=https%3A%2F%2Fwww.google.com.hk%2F&url=http%3A%2F%2Fwww.iwencai.com%2Funifiedwap%2Fresult%3Fw%3D%25E5%258C%25BB%25E7%25BE%258E%25E6%25A6%2582%25E5%25BF%25B5%26querytype%3D%26issugs&cs=1800x929&ts=1683454868745
}

chrome.webRequest.onBeforeRequest.addListener(
    logURL,
    {urls: ["<all_urls>"]}
);