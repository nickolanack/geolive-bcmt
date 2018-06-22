if(AppClient.getUserType()!=="admin"){
    return null;
}

return new ElementModule('a', {
    "html":"stat",
    "href":"https://www.bcmarinetrails.org/index.php?option=com_geolive&controller=plugins&view=plugin&format=raw"+
        "&plugin=UserInterface&pluginView=widget&widget=30&filterMapItem="+JSON.stringify([item.getName()]),
    "target":"_blank"
})