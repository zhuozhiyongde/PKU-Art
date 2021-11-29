document.body.addEventListener("click", function(event){
	try{
		var targetname = event.target.classList;
		var targetid = event.target.id;
		var style = event.target.getAttribute("style-id") || "";
		if(targetid && "write-new-style-link" === targetid){
			analyticsEvent("General_menu", "create_new", website);
		}else if(targetname && targetname.contains("manage_styles")){
			analyticsEvent("General_menu", "manage_styles");
		}else if(targetname && targetname.contains("thumbnail_install")){
			analyticsEvent("Library_menu", "install_click", style);
		}
	}catch(e){
	  console.log(e);
	}
  
});