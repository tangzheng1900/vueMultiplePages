/**
 * 返回判断webView 判断返回相应app
 */
function goBack (urlStr){
    var url = urlStr ? urlStr : null;
    const storeLocal = require('store');
    var isApp = storeLocal.get('renrenfo_webview_login')?true:false;
    if(!isApp){
        if(url){
            window.history.go(-2);
        }else if(window.history.length > 1) {
            window.history.go(-1);
        }else{
            return false;
        }
    }else{
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
            try {
                window.native.closeWebView();
            } catch (e) {
                console.log(e.message)
            }
        }else if(isiOS){
            try {
                webkit.messageHandlers.closePage.postMessage('');
            } catch (e) {
                console.log(e.message)
            }
        }
    }
}




export {
    goBack,
    
}

