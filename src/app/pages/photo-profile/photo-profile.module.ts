import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {PhotoProfilePage} from './photo-profile.page';
import {PipesModule} from '../../modules/pipes/pipes.module';
import {ImageGeneratorComponent} from '../../modules/components/image-generator/image-generator.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
    ],
    declarations: [PhotoProfilePage, ImageGeneratorComponent]
})
export class PhotoProfilePageModule {
}
