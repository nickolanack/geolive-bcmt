if (Core::Client()->isAdmin()) {
    return true;
}

$db = Core::GetDatasource();
$prfx = $db->getPrefix();
$results = $db->query(
    'SELECT group_id FROM ' . $prfx . 'user_usergroup_map WHERE user_id=' . Core::Client()->getUserId() .
         ' AND group_id=13');
return ! empty($results);