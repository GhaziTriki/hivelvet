<?php
namespace Actions\Core;

use Actions\Base as BaseAction;
use Actions\WebSocket\Server;
use Base;
use Enum\UserRole;
use Tracy\Debugger;
use Models\User;
use Enum\UserStatus;
use Enum\ResponseCode;

class Register extends BaseAction
{

    public function start($f3, $params): void
    {
         $form    = $this->getDecodedBody();  

        $user    = new User();

        $user->email      = $form['email'];
        $user->username   = $form['username'];
        $user->password   = $form['password'];
        $user->role       = UserRole::VISITOR;
        $user->status     = UserStatus::ACTIVE;
        $user->created_on = date('Y-m-d H:i:s');
        try {
            $user->save();
        } catch (\Exception $e) {
            $this->renderJson(['errors' => $e->getMessage()], ResponseCode::HTTP_INTERNAL_SERVER_ERROR);

            return;
        }

        $this->renderJson(['data' => $user->toArray()]);
      
    }


}