<?php

class lineEvent
{
    private $channelAccessToken;
    private $channelSecret;
    private $client;

    public function __construct(){

        require_once('LINEBotTiny.php');
        require_once('info.php');
        $info = new info();

        $this->channelAccessToken = $info->channelAccessToken;
        $this->channelSecret = $info->channelSecret;
        $this->client = new LINEBotTiny($this->channelAccessToken, $this->channelSecret);
    }

    public function getEvent(){
        return $this->client->parseEvents();

    }

    public function printHelp($event)
    {
        $returnText = json_decode(file_get_contents("text.json"));
        $returnText = $returnText->help;
        $this->sendText($event,  $returnText);
        exit();
    }

    public function printInfo($event){
        $returnText = json_decode(file_get_contents("text.json"));
        $returnText = $returnText->info;
        $this->sendText($event, $returnText);
        exit();
    }

    public function printJoin($event){
        $returnText = json_decode(file_get_contents("text.json"));
        $returnText = $returnText->join;


        $this->sendText($event,  $returnText);
        exit();
    }

    public function sendText($event,  $returnText ){
        $this->client->replyMessage(array(
            'replyToken' => $event['replyToken'],
            'messages' => array(
                array(
                    'type' => 'text',
                    'text' => $returnText
                )
            )
        ));
    }

    public function sendImage($event, $imageUrl){
        $this->client->replyMessage(array(
            'replyToken' => $event['replyToken'],
            'messages' => array(
                array(
                    'type' => 'image',
                    "originalContentUrl" => $imageUrl,
                    "previewImageUrl" => $imageUrl
                )
            )
        ));
    }

    public function replyMessage($event,array $array){
        $this->client->replyMessage(array(
            'replyToken' => $event['replyToken'],
            'messages' => $array
        ));
    }

}