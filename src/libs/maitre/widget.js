(function() {

var script = document.querySelector('[data-maitre]');

var div = document.createElement('div');
div.className = "maitre-widget-container";
script.parentNode.insertBefore(div, script.nextSibling);

if(window.Maitre === undefined || !Maitre.hasOwnProperty("uuid")) {
  div.innerHTML = 'Maitre Widget isn\'t configured properly.<br/>Please check the <a href="https://maitreapp.co/docs">Documentation</a>.';
} else {

	if (Maitre.hasOwnProperty("callbacks") && Maitre.callbacks.hasOwnProperty("onLoad")) { Maitre.callbacks.onLoad(); }

	Maitre.host = Maitre.host || (window.location.origin + window.location.pathname);

	var widget_assets = "https://maitreapp.co/widget_assets.js?v="+ new Date().getTime() +"&widget_id="+Maitre.uuid+"&hosting_url="+encodeURIComponent(Maitre.host);
	var url = window.location.href;
	var referral = /maitre-widget-referral=([^&]+)/.exec(url) || /mwr=([^&]+)/.exec(url);
	var source = /maitre-widget-source=([^&]+)/.exec(url) || /mws=([^&]+)/.exec(url);

	if (Maitre.hasOwnProperty("source") && Maitre.source.trim() != "") {
		widget_assets += "&source="+encodeURIComponent(Maitre.source.toLowerCase().replace(/ /gi, "_"));
	} else if (source) {
		widget_assets += "&source="+source[1];
	}

	if (Maitre.hasOwnProperty("test_mode") && Maitre.test_mode) {
		widget_assets += "&test_mode=true";
	}

	if (referral) { widget_assets += "&referral="+referral[1]; }

	var script_tag = document.createElement('script');
	script_tag.setAttribute("type","text/javascript");
	script_tag.setAttribute("src", widget_assets);
	(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
}

})();
