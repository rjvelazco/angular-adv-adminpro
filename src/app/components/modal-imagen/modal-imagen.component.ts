import { Component, OnInit } from '@angular/core';
import Swart from 'sweetalert2';

// Services
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'app-model-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir: File;

  // imagenVistaPrevia
  public imgTemp: any = '';

  constructor(
    public modalImagenService: ModalImagenService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = '';
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file:File) {
    this.imagenSubir = file;
    
    if (!file) {
      return this.imgTemp = '';
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {
        Swart.fire({
          title: 'Actualizada',
          text: 'Imagen de usuario a sido actualizada',
          icon: 'success',
          confirmButtonText: 'ok'
        });
        this.modalImagenService.nuevaImagen.emit('img');
        this.cerrarModal();
      }).catch((err) => {
        console.log(err);

        Swart.fire({
          title: 'Oops!',
          text: 'No se puedo actualizar la imagen.',
          icon: 'error',
          confirmButtonText: 'ok'
        });

      });
  }

}
