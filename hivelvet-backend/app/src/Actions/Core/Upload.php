<?php

namespace Actions\Core;
use Actions\Base as BaseAction;

use Enum\UserRole;
use Enum\UserStatus;
use Models\Setting;
use Models\User;

/**
 * Class Upload
 * @package Actions\Account
 */
class Upload extends BaseAction
{
/**@property string       $logo="z";
 * */
    public function __construct()
    {
        parent::__construct();
    }

    public function execute($f3): void{
       //\Web::instance()->receive();
        $settings=new Setting();
          var_dump($f3->get("BODY"));
        $files = \Web::instance()->receive(function($file,$formFieldName){
            $this->logger->info('App configuration', ["file"=>$file]);

        });
        $this->logger->info('App configuration', ["file"=>$files]);

        $setting=new Setting();
            $setting->logo="logo.png";
            echo $this->logo;
            //echo substr($file["name"],11);
            //$setting->logo=substr($file["name"],11);
            $setting->company_name ="riadvice";
            $setting->company_website = "www.riadvice.net";
            $setting->platform_name ="hivelvet";
            $setting->terms_use= "riadvice";
            $setting->privacy_policy= "riadvice";

            //$setting->logo = $form['logo'];
            $setting->primary_color ="#fff";
            $setting->secondary_color ="#000";
            $setting->accent_color = "#000";
            $setting->additional_color = "#000";
            $setting->created_on = date('Y-m-d H:i:s');
            $setting->save();



            /*    $body   = $this->getDecodedBody();
                echo  $body ;
                $answer = array( 'answer' => 'Files transfer completed' );
                $json = json_encode( $answer );
                echo $json;*/


    }

}

