if(!key_exists('attributes', $feature)){
    $feature->attributes=(object)array();
}
if(!key_exists('siteData', $feature->attributes)){
    $feature->attributes->siteData=(object)array();
}

$feature->attributes->siteData->lastEditor=GetClient()->getRealName();
$feature->attributes->siteData->editCount=0;

if($feature->markerId>0){
    $siteData=(new attributes\Record('siteData')->getValues($feature->markerId, 'marker'));
    $feature->attributes->siteData->editCount=intval($siteData['editCount'])+1;
}