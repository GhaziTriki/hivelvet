<?php

namespace Actions\Core;

use Enum\ResponseCode;
use Enum\UserRole;
use Enum\UserStatus;
use Helpers\Time;
use Models\User as UserModel;
use Validation\Validator;
use Actions\Base as BaseAction;

class Login extends BaseAction
{
    public function authorise($f3): void
    {
        $v    = new Validator();
        $form    = $this->getDecodedBody();





            $email    = $form["email"];
            $password = $form["password"];

            /**
             * @var UserModel $user
             */
            $user = new UserModel();
            $user = $user->getByEmail($email);

            if ($user->status === UserStatus::ACTIVE  && $user->verifyPassword($password)) {

                $this->session->authorizeUser($user);

                $user->last_login = Time::db();
                $user->save();
                $this->renderJson(['data' => $user->toArray()]);

            } else {
                $this->f3->set('data', $form);
                $this->renderJson(['data' =>"invalid credentials"], ResponseCode::HTTP_INTERNAL_SERVER_ERROR);


            }

    }
}