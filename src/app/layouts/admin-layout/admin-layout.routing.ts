import {Routes} from '@angular/router';

import {HomeComponent} from '../../home/home.component';
import {UserComponent} from '../../user/user.component';
import {TablesComponent} from '../../tables/tables.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {MapsComponent} from '../../maps/maps.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {IndexComponent} from '../../siswa/index/index.component';
import {AddComponent} from '../../siswa/add/add.component';
import {EditComponent} from '../../siswa/edit/edit.component';


export const AdminLayoutRoutes: Routes = [
    {path: 'dashboard', component: HomeComponent},
    {path: 'user', component: UserComponent},
    {path: 'siswa', component: IndexComponent},
    {path: 'siswa-add', component: AddComponent},
    {path: 'siswa-edit/:id', component: EditComponent},
    {path: 'table', component: TablesComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'maps', component: MapsComponent},
    {path: 'notifications', component: NotificationsComponent},
];
