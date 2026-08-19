app_name = "lumina_crm"
app_title = "Flipflow"
app_publisher = "Flipswitch"
app_description = "Flipflow theme and branding"
app_email = "hello@margxlabs.com"
app_license = "mit"
app_logo_url = "/assets/lumina_crm/images/lumina-mark.svg"

app_include_css = ["/assets/lumina_crm/css/lumina.css"]
app_include_js = ["/assets/lumina_crm/js/lumina.js"]
web_include_css = ["/assets/lumina_crm/css/lumina.css"]
web_include_js = ["/assets/lumina_crm/js/lumina.js"]

website_context = {
	"favicon": "/assets/lumina_crm/images/lumina-mark.svg",
	"splash_image": "/assets/lumina_crm/images/lumina-mark.svg",
	"app_name": "Flipflow",
}

after_install = "lumina_crm.install.after_install"
after_migrate = "lumina_crm.install.after_migrate"
boot_session = "lumina_crm.boot.boot_session"
