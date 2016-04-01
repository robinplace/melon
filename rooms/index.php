<?php

/*
 * ?make&user=lao28740
 *
 * ?lookup&code=13902
 *
 * ?join&code=13902&secret=difj9283uro&user=o20u2rijlj
 */

$db = new SQLite3 ('rooms.db');

if (isset ($_GET ['make'])) {
    $user = $db->escapeString ($_GET ['user']);

    do {
        $code = rand (111111, 999999);
        $res = $db->query ('SELECT 1 FROM `rooms` WHERE `code`="'.$code.'"');
        $row = $res->fetchArray (SQLITE3_ASSOC);
    } while ($row);

    // $code is now a unique room code
    
    $secret = hash ('sha512', 'junky-something-secretive981374l;aafla'.rand (0, 999999999));

    // make them the room
    $res = $db->query ('INSERT INTO `rooms` (`code`, `secret`) VALUES ("'.$code.'", "'.$secret.'")');

    $id = $db->lastInsertRowID ();

    // add them to their own room immediately
    $res = $db->query ('INSERT INTO `room_users` (`room`, `user`) VALUES ("'.$id.'", "'.$user.'")');

    echo $code.','.$secret;
    exit;
} else if (isset ($_GET ['lookup'])) {
    $code = intval ($db->escapeString ($_GET ['code']));

    $res = $db->query ('SELECT `user` FROM `room_users`,`rooms` WHERE `room_users`.`room`=`rooms`.`id` AND `rooms`.`code`="'.$code.'"');
    
    $ids = array ();
    while (($row = $res->fetchArray (SQLITE3_ASSOC)) !== false) {
        $ids [] = $row ['user'];
    }

    echo implode (',', $ids);
    exit;
} else if (isset ($_GET ['join'])) {
    $code = intval ($db->escapeString ($_GET ['code']));
    $secret = $db->escapeString ($_GET ['secret']);
    $user = $db->escapeString ($_GET ['user']);

    $res = $db->query ('SELECT `id` FROM `rooms` WHERE `code`="'.$code.'" AND `secret`="'.$secret.'"');
    $row = $res->fetchArray (SQLITE3_ASSOC);
    if ($row === false) {
        echo 'fail';
        exit;
    }
    $id = $row ['id'];

    $res = @$db->query ('INSERT INTO `room_users` (`room`, `user`) VALUES ("'.$id.'", "'.$user.'")');

    echo 'success';
    exit;
}

?>
