if(!key_exists('attributes', $feature)){
    $feature->attributes=(object)array();
}
if(!key_exists('siteData', $feature->attributes)){
    $feature->attributes->siteData=(object)array();
}

$feature->attributes->siteData->lastEditor=GetClient()->getRealName();