import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PhotoProfilePage} from '../../pages/photo-profile/photo-profile.page';
import {PipesModule} from '../pipes/pipes.module';
import {ArticuloSlideComponent} from './articulo-slide/articulo-slide.component';
import {AvatarSelectorComponent} from './avatar-selector/avatar-selector.component';
import {CardImageComponent} from './card-image/card-image.component';
import {ItemSeleccionadoComponent} from './item-seleccionado/item-seleccionado.component';
import {MapaComponent} from './mapa/mapa.component';
import {PedidosComponent} from './pedidos/pedidos.component';
import {ProfileComponent} from './profile/profile.component';
import {SolicitudRutaComponent} from './solicitud-ruta/solicitud-ruta.component';

@NgModule({
    declarations: [AvatarSelectorComponent, MapaComponent, SolicitudRutaComponent, ProfileComponent,
        CardImageComponent, ItemSeleccionadoComponent, ArticuloSlideComponent, PedidosComponent],
    exports: [
        AvatarSelectorComponent, MapaComponent, SolicitudRutaComponent, ProfileComponent,
        CardImageComponent, ItemSeleccionadoComponent, ArticuloSlideComponent, PedidosComponent
    ],
    imports: [
        CommonModule,
        PipesModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
    ], entryComponents: [PhotoProfilePage],
})
export class ComponentModule {
}
