import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swart from 'sweetalert2';

// Services
import { UsuarioService } from '../../services/usuario.service';

// Modelo Usuario
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  
  public usuario: Usuario;
  public imagenSubir: File;

  // imagenVistaPrevia
  public imgTemp: any = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });
  }

  
  actualizarPerfil() {
    // console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe(resp => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swart.fire({
          title: 'Guardados',
          text: 'Actualizado de manera exitosa!',
          icon: 'success',
          confirmButtonText: 'ok'
        });
      }, (err: any) => {
        
        if (err.error.msg) {
          Swart.fire({
            title: 'Oops!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'ok'
          });
        }
    });
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
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid)
      .then(img => {
        this.usuario.img = img;
        Swart.fire({
          title: 'Actualizada',
          text: 'Imagen de usuario a sido actualizada',
          icon: 'success',
          confirmButtonText: 'ok'
        });
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
  