<?php
    header("Content-Type:application/json");
    require_once('init_php');

    @$kw = $_REQUEST['kw'];
    $sql = "select * from xz_laptop";

    if($kw){
        $kws = explode(' ', $kw);
        for($i = 0; $i < count($kws); $i+=1){
            $kws[$i] = " title like '%$kws[i]%' ";
        }
        $where = implode(' and ', $kws);
        $sql.= "where $where";
    }

    $result = mysqli_query($conn, $sql);
    echo json_encode(mysqli_fetch_all($result, 1))
?>
    