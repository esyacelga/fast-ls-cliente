import {Component, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Articulo, ObjetoArticulo} from '../../../classes/mensajeria/Articulo';
import {ArticuloSegmento} from '../../../classes/mensajeria/articulo-segmento';
import {TipoArticulo} from '../../../classes/mensajeria/tipo-articulo';
import {COLOR_TOAST_WARNING} from '../../../modules/system/generic/classes/constant';
import {Util} from '../../../modules/system/generic/classes/util';
import {ArticuloService} from '../../../services/mensajeria/articulo.service';
import {SegmentoService} from '../../../services/mensajeria/segmento.service';
import {TipoArticuloClientService} from '../../../services/mensajeria/tipo-articulo-client.service';

@Component({
    selector: 'app-articulo',
    templateUrl: './articulo.page.html',
    styleUrls: ['./articulo.page.scss'],
})
export class ArticuloPage implements OnInit {

    public articulo: ObjetoArticulo;
    public lstSegmento: Array<ArticuloSegmento>;
    public lstTipoArticulo: Array<TipoArticulo>;
    public lstArticulo: Array<ObjetoArticulo>;
    public result: Array<ArticuloSegmento> = [];

    constructor(private srvTipoArticulo: TipoArticuloClientService,
                private svcSegmento: SegmentoService,
                private svcArticulo: ArticuloService,
                private util: Util,
                private camera: Camera,
    ) {
    }

    public async ngOnInit() {
        await this.obtenerArticuloTodos();
        await this.obtenerTipoArticulo();
        await this.obtenerSegementos();
    }

    public async obtenerSegementos() {
        // @ts-ignore
        this.lstSegmento = await this.svcSegmento.obtenerSegmentos();
    }

    public async obtenerTipoArticulo() {
        // @ts-ignore
        this.lstTipoArticulo = await this.srvTipoArticulo.obtenerTipoArticulos();
    }

    public camara() {
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.CAMERA,
        };
        console.log('Entro a camara procesar camara');
        this.procesarImagen(options);
    }

    public libreria() {
        console.log('Por Librerria');
        const options: CameraOptions = {
            quality: 60,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        };
        this.procesarImagen(options);
    }

    public procesarImagen(options: CameraOptions) {
        if (this.articulo && this.articulo.articuloSegmento && this.articulo.articuloSegmento._id) {
            this.camera.getPicture(options).then((imageData) => {
                // @ts-ignore
                const img = window.Ionic.WebView.convertFileSrc(imageData);
                this.articulo.imagenEditada = img;
                this.svcArticulo.subirImagen(imageData, this.articulo.articuloSegmento._id);
            }, (err) => {
                // Handle error
            });
        } else {
            this.util.presentToast('Debe seleccionar el segmento antes de cargar la imagen', COLOR_TOAST_WARNING);
        }

    }

    public crearNuevo() {
        this.articulo = new ObjetoArticulo();
    }

    public async registrarNuevo(objGuardar) {
        // @ts-ignore}
        objGuardar.estado = 1;
        if (objGuardar.articuloSegmento === undefined || objGuardar.articuloSegmento._id === undefined) {
            this.util.presentToast('Debe seleccionar un segmento y tipo articulo ', COLOR_TOAST_WARNING);
            return;
        }
        objGuardar.articuloSegmento = objGuardar.articuloSegmento._id;
        await this.svcArticulo.registarArticulo(objGuardar);
        await this.obtenerArticuloTodos();
        this.articulo = null;
    }

    public async obtenerArticuloTodos() {
        // @ts-ignore
        this.lstArticulo = await this.svcArticulo.obtenerArticulos();
        this.result = [];
        const map = new Map();
        for (const item of this.lstArticulo) {
            if (!map.has(item.articuloSegmento._id)) {
                map.set(item.articuloSegmento._id, true);    // set any value to Map
                const articuloSegmento = new ArticuloSegmento();
                articuloSegmento._id = item.articuloSegmento._id;
                articuloSegmento.descripcion = item.articuloSegmento.descripcion;
                this.result.push(articuloSegmento);
            }
        }
    }

    public async eliminar(articulo: Articulo) {
        articulo.estado = 0;
        await this.svcArticulo.registarArticulo(articulo);
        this.obtenerArticuloTodos();
        this.articulo = null;
    }
}
