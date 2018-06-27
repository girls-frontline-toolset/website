<?php
include_once('lineEvent.php');
$line = new lineEvent();
foreach ($line->getEvent() as $event) {

    switch ($event['type']) {
        case 'message':
            $message = $event['message'];
            switch ($message['type']) {
                case 'text':
                    $message = explode(" ", $message['text']);
                    if ($message[0] == "#gl" || $message[0] == "#少前") {
                        switch ($message[1]) {
                            case 'g':
                                $url = htmlspecialchars_decode("https://www.ntw-20.com/api/inquiry/girl/$message[2]/$message[3]");
                                $dataJson = json_decode(file_get_contents($url));

                                if ($message[2] == null || $message[3] == null) {
                                    $line->printHelp($event);
                                    exit();
                                }

                                break;
                            case 'f':
                                $url = htmlspecialchars_decode("https://www.ntw-20.com/api/inquiry/fairy/$message[2]/$message[3]");
                                $dataJson = json_decode(file_get_contents($url));

                                if ($message[2] == null || $message[3] == null) {
                                    $line->printHelp($event);
                                    exit();
                                }

                                break;
                            case 'd':
                                $url = htmlspecialchars_decode("https://www.ntw-20.com/api/inquiry/device/$message[2]");
                                $dataJson = json_decode(file_get_contents($url));

                                if ($message[2] == null) {
                                    $line->printHelp($event);
                                    exit();
                                }

                                break;
                            case 'info':
                                $line->printInfo($event);
                                exit();
                                break;

                            default:
                                $line->printHelp($event);
                                exit();
                                break;
                        }

                        if(!isset($dataJson->status)){
                            $line->printHelp($event);
                            exit();
                        }

                        if($dataJson->status == "empty"){
                            $line->sendText($event,"找不到有關數據!!");
                            exit();
                        }

                        if ($message[1] == "g") {
                            $link = 'https://ntw-20.com/common/girl/girl_';
                            $imageList = array(array(),array());

                            foreach($dataJson->data as $dataList){

                                if($dataList == "" ){
                                    continue;
                                }

                                foreach($dataList as $data){
                                    array_push($imageList[$data->heavy],$data->no);
                                }

                            }

                            $listArray = array();

                            if(count($imageList[0]) != 0){
                                //array_push($listArray,array(
                                 //   'type' => 'text',
                                  //  'text' => "===普造==="
                                //));

                                foreach ($imageList[0] as $no){
                                    array_push($listArray,
                                        array("type" => "image", "originalContentUrl" => $link . $no . ".jpg",
                                            "previewImageUrl" => $link . $no . ".jpg")
                                    );
                                }
                            }

                            if(count($imageList[1]) != 0){
                                array_push($listArray,array(
                                    'type' => 'text',
                                    'text' => "===大建==="
                                ));

                                foreach ($imageList[1] as $no){
                                    array_push($listArray,
                                        array("type" => "image", "originalContentUrl" => $link . $no . ".jpg",
                                            "previewImageUrl" => $link . $no . ".jpg")
                                    );
                                }
                            }


                            $line->replyMessage($event,$listArray);
                            exit();

                        } else if ($message[1] == "f") {
                            $link = 'https://ntw-20.com/common/fairy/fairy_';
                            $imageList = array();


                            foreach($dataJson->data as $dataList){
                                if($dataList == "" ){
                                    continue;
                                }

                                array_push($imageList,
                                    array("type" => "image", "originalContentUrl" => $link . $dataList[0]->no . ".jpg",
                                        "previewImageUrl" => $link . $dataList[0]->no . ".jpg")
                                );

                            }

                            $line->replyMessage($event,$imageList);
                            exit();
                        }else if ($message[1] == "d"){
                            $link = 'https://www.ntw-20.com/api/inquiry/deviceImg/';
                            $imageList = array();

                            foreach ($dataJson->data as $data){
                                array_push($imageList,
                                    array("type" => "image", "originalContentUrl" => $link . "?at=".rawurlencode($data->attribute)."&img=$data->img&dName=".rawurlencode($data->name)."&star=$data->star&type=".rawurlencode($data->type),
                                        "previewImageUrl" => $link . "?at=".rawurlencode($data->attribute)."&img=$data->img&dName=".rawurlencode($data->name)."&star=$data->star&type=".rawurlencode($data->type))
                                );
                               // error_log($link . "?at=".rawurlencode($data->attribute)."&img=$data->img&dName=".rawurlencode($data->name)."&star=$data->star&type=$data->type");


                                error_log(json_encode($imageList));
                            }


                            $line->replyMessage($event,$imageList);
                            exit();
                        }

                    } else {
                        $list = file_get_contents("text.json");
                        $roleList = json_decode(file_get_contents("text.json"));
                        foreach ($roleList->role as $role) {
                            if (!(stripos($event['message']['text'], $role->role) === FALSE)) {
                                $line->sendText($event, $role->text);
                            }

                        }

                    }
                    break;
                default:
                    break;
            }
            break;

        case "join":
            $line->printJoin($event);
            break;

        default:
            error_log("Unsupporeted event type: " . $event['type']);
            break;

    }
};


