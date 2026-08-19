from datetime import date

import frappe


def after_install():
	_apply_branding()


def after_migrate():
	_apply_branding()


def _apply_branding():
	logo = "/assets/lumina_crm/images/lumina-mark.svg"
	_update_single(
		"Website Settings",
		{
			"app_name": "Flipflow",
			"splash_image": logo,
			"favicon": logo,
			"brand_html": "Flipflow",
			"footer_powered": f"© {date.today().year} Flipswitch",
			"copyright": f"© {date.today().year} Flipswitch",
			"hide_footer_signup": 1,
		},
	)
	_update_single("Navbar Settings", {"app_logo": logo})
	frappe.clear_cache()


def _update_single(doctype, values):
	if not frappe.db.exists("DocType", doctype):
		return
	doc = frappe.get_single(doctype)
	changed = False
	for key, value in values.items():
		if doc.meta.has_field(key):
			doc.set(key, value)
			changed = True
	if changed:
		doc.save(ignore_permissions=True)
