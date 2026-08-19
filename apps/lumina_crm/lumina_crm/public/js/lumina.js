frappe.provide("lumina");

lumina.PRODUCT_NAME = "Flipflow";
lumina.COPYRIGHT_HOLDER = "Flipswitch";

lumina.copyrightText = function () {
	return "© " + new Date().getFullYear() + " " + lumina.COPYRIGHT_HOLDER;
};

lumina.replaceBrandText = function (value) {
	if (!value) {
		return value;
	}
	return String(value)
		.replaceAll("Lumina CRM", lumina.PRODUCT_NAME)
		.replaceAll("ERPNext", lumina.PRODUCT_NAME);
};

lumina.applyBranding = function () {
	if (lumina._applying) {
		return;
	}
	lumina._applying = true;
	if (lumina._observer) {
		lumina._observer.disconnect();
	}

	try {
		if (frappe.boot) {
			frappe.boot.app_name = lumina.PRODUCT_NAME;
			if (frappe.boot.sysdefaults) {
				frappe.boot.sysdefaults.app_name = lumina.PRODUCT_NAME;
			}
		}

		if (document.title) {
			document.title = lumina.replaceBrandText(document.title);
		}

		if (document.body) {
			const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
			let node;
			while ((node = walker.nextNode())) {
				if (node.nodeValue && /ERPNext|Lumina CRM/.test(node.nodeValue)) {
					node.nodeValue = lumina.replaceBrandText(node.nodeValue);
				}
			}
		}

		lumina.ensureCopyright();
	} finally {
		lumina._applying = false;
		if (lumina._observer && document.documentElement) {
			lumina._observer.observe(document.documentElement, {
				childList: true,
				subtree: true,
			});
		}
	}
};

lumina.scheduleBranding = function () {
	if (lumina._timer) {
		clearTimeout(lumina._timer);
	}
	lumina._timer = setTimeout(lumina.applyBranding, 30);
};

lumina.ensureCopyright = function () {
	if (!document.body) {
		return;
	}
	const text = lumina.copyrightText();
	let el = document.querySelector(".flipswitch-copyright");
	if (!el) {
		el = document.createElement("div");
		el.className = "flipswitch-copyright";
		document.body.appendChild(el);
	}
	el.textContent = text;
};

lumina.startWatching = function () {
	if (lumina._watching) {
		return;
	}
	lumina._watching = true;

	lumina._observer = new MutationObserver(lumina.scheduleBranding);
	if (document.documentElement) {
		lumina._observer.observe(document.documentElement, {
			childList: true,
			subtree: true,
		});
	}

	$(document).on("page-change form-unload form-load", lumina.scheduleBranding);
	$(window).on("hashchange popstate", lumina.scheduleBranding);

	if (frappe.router && typeof frappe.router.on === "function") {
		frappe.router.on("change", lumina.scheduleBranding);
	}
};

$(document).on("app_ready", function () {
	lumina.applyBranding();
	lumina.startWatching();
});
$(document).ready(function () {
	lumina.applyBranding();
	lumina.startWatching();
});
