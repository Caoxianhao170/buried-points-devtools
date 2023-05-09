// 用于控制iframe的显示和关闭
let iframe;
let iframeLoaded = false;
if (window.self === window.top) {
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            iframe = document.createElement('iframe');
            iframe.className = 'tracker';
            iframe.style.setProperty('height', '100%', 'important');
            iframe.style.setProperty('width', '450px', 'important');
            iframe.style.setProperty('min-width', '1px', 'important');
            iframe.style.setProperty('position', 'fixed', 'important');
            iframe.style.setProperty('top', '0', 'important');
            iframe.style.setProperty('right', '0', 'important');
            iframe.style.setProperty('left', 'auto', 'important');
            iframe.style.setProperty('bottom', 'auto', 'important');
            iframe.style.setProperty('transform', 'translateX(470px)', 'important');
            iframe.style.setProperty('transition', 'all .4s', 'important');
            iframe.style.setProperty('box-shadow', '0 0 15px 2px rgba(0,0,0,0.12)', 'important');
            iframe.style.setProperty('z-index', '9999999999999', 'important');
            iframe.src = chrome.runtime.getURL("iframe/dist/index.html")
            document.body.appendChild(iframe);
            let show = false;
            chrome.runtime.onMessage.addListener((msg, sender) => {
                console.log('加载iframe', msg);
                if (msg == 'toggle') {
                    show = !show;
                    iframe.style.setProperty('transform', show ? 'translateX(0)' : 'translateX(470px)', 'important');
                }
                return true;
            });
        }
    }
}




// 接受从service_work.js中的url
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.message); // 输出消息的内容
    const url = request.message;
    if (url.includes('stat.10jqka.com.cn')) {
        const splitUrl = decodeURIComponent(url).split('?');
        const param = splitUrl[1].split('&');
        const obj = {};
        param.forEach(item => {
            const arr = item.split('=');
            obj[arr[0]] = arr[1]
        });
        console.log('@@@trackPoint', param, obj);
        chrome.runtime.sendMessage({type: 'tracker', to: 'iframe', obj});
    }
});
