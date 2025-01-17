/**
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

import { notification } from 'antd';
import { t } from 'i18next';
import LocaleService from './locale.service';

class NotificationsService {
    placement = LocaleService.direction == 'rtl' ? 'topLeft' : 'topRight';
    openNotificationWithIcon = (type: string, message) => {
        notification[type]({
            message: t(type + '-title'),
            description: message,
            placement: this.placement,
        });
    };
}

export default new NotificationsService();
