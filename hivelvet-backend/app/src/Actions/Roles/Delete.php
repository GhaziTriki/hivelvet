<?php

declare(strict_types=1);

/*
 * Hivelvet open source platform - https://riadvice.tn/
 *
 * Copyright (c) 2022 RIADVICE SUARL and by respective authors (see below).
 *
 * This program is free software; you can redistribute it and/or modify it under the
 * terms of the GNU Lesser General Public License as published by the Free Software
 * Foundation; either version 3.0 of the License, or (at your option) any later
 * version.
 *
 * Hivelvet is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
 * PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License along
 * with Hivelvet; if not, see <http://www.gnu.org/licenses/>.
 */

namespace Actions\Roles;

use Actions\Delete as DeleteAction;
use Actions\RequirePrivilegeTrait;
use Models\Role;

/**
 * Class Delete.
 */
class Delete extends DeleteAction
{
    use RequirePrivilegeTrait;

    public function execute($f3, $params): void
    {
        $role    = new Role();
        $role_id = $params['id'];
        $role->load(['id = ?', $role_id]);
        $nbUsers = $role->getRoleUsers();

        // delete users and permissions
        $result = $role->deleteUsersAndPermissions();

        if ($result) {
            // delete role after deleting assigned users and permissions
            parent::execute($f3, $params);
            // if role have users assigned return lecturer role to get switched users
            if ($nbUsers > 0) {
                $result = $role->getLecturerRole();
                $this->renderJson(['lecturer' => $result]);
            } else {
                $this->renderJson(['result' => 'success']);
            }
        }
    }
}
