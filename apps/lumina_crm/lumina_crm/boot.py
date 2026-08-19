def boot_session(bootinfo):
	bootinfo["app_name"] = "Flipflow"
	if bootinfo.get("sysdefaults") is not None:
		bootinfo["sysdefaults"]["app_name"] = "Flipflow"
