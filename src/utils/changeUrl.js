/**
 * 跳转浏览器地址
 * @method changeUrl
 * @param {string} link 浏览器地址
 */
function changeUrl(link) {
	window.location.href = link;
};

function goTo(link){
	window.history.go(link)
}

function replace(link){
	window.location.replace(link)
}

function go_app_down(id){
	let domain=document.domain;
	if(domain=='localhost' || domain.indexOf('dev')>-1){
		window.location.href='https://dev.renrenfo.cn/fxt/appDown.html?temple_id='+id
	}else{
		// return window.location.protocol+'//'+domain+'/';
		window.location.href='https://www.renrenfo.com/fxt/appDown.html?temple_id='+id
	}
}

export {
	changeUrl,
	goTo,
	replace,
	go_app_down
};