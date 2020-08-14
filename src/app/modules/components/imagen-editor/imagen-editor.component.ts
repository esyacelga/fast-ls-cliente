import {Component, Input, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ImageGeneratorService} from '../image-generator/image-generator.service';

@Component({
    selector: 'app-imagen-editor',
    templateUrl: './imagen-editor.component.html',
    styleUrls: ['./imagen-editor.component.scss'],
})
export class ImagenEditorComponent implements OnInit {
    @Input() public directorio = '';
    @Input() public idImagen = '';


    constructor(private camera: Camera, public  svrImagen: ImageGeneratorService) {
    }

    ngOnInit() {
    }

    public seleccionarPorLibreria() {
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        };
        this.svrImagen.procesarImagen(options, this.directorio);
    }

    public seleccionarPoCamara() {
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA,
        };
        this.svrImagen.procesarImagen(options, this.directorio);
    }

}
