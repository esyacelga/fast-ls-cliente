import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {DatoPersonaPage} from './dato-persona.page';
import {ComponentModule} from '../../../modules/components/component.module';

import {ImageGeneratorComponent} from '../../../modules/components/image-generator/image-generator.component';
import {PipesModule} from '../../../modules/pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: DatoPersonaPage
    }
];

@NgModule({
    imports: [
        PipesModule,
        ComponentModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [DatoPersonaPage, ImageGeneratorComponent]
})

export class DatoPersonaPageModule {
}
