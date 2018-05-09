var navigationController=new NavigationMenuModule({
      "Content":[
        
        {
          html:"Export Tool",
          name:"paddlingAreasTool"
        },
        {
          html:"Geolive Map",
          name:"googleMap"
        }
      ]   
        
    },{
        targetUIView:function(button, section, viewer){
            return  viewer.getApplication().getChildView('content',0);
        },
        templateView:function(button, section){
            return button.view||(button.name+"Detail");
        },
        buttonClass:function(button, section){
            return button["class"]||("menu-"+section.toLowerCase()+"-"+button.html.toLowerCase())
        },
        sectionClass:function(section){
            return "menu-"+section.toLowerCase()
        }
    });
    
application.setNamedValue('navigationController', navigationController);
return navigationController;