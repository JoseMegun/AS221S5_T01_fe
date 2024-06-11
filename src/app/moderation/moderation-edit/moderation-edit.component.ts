import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModerationService } from 'src/app/services/moderation.service';
import { IModeration } from 'src/app/interfaces/moderation.interface';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moderation-edit',
  templateUrl: './moderation-edit.component.html',
  styleUrls: ['./moderation-edit.component.css']
})
export class ModerationEditComponent implements OnInit {
  moderation: IModeration = {
    id: undefined,
    originalText: '',
    normalizedText: '',
    consultText: '',
    status: ''
  };

  constructor(
    private moderationService: ModerationService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getModeration();
  }

  getModeration() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderationService.listAll()
      .subscribe(
        (value: Object) => {
          const moderation = value as IModeration[];
          // Supongamos que buscas el registro específico por su ID
          const moderationFound = moderation.find(moderation => moderation.id === id);
          if (moderationFound) {
            this.moderation = moderationFound;
          } else {
            // Manejar el caso en que no se encuentre la moderación
          }
        },
        (error) => {
          // Manejar errores aquí
        }
      );
  }
  
  

  onSubmit() {
    Swal.fire({
        title: '¿Estás seguro de actualizar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualizar'
    }).then((result) => {
        if (result.isConfirmed) {
            this.moderationService.update(this.moderation).subscribe(
                updatedModeration => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: 'Registro actualizado exitosamente'
                    });
                    console.log(`Moderation with id ${this.moderation.id} has been updated.`);
                    this.router.navigate(['/moderation']);
                },
                error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al actualizar el registro. Por favor, inténtelo de nuevo.'
                    });
                    console.error('Error:', error);
                }
            );
        }
    });
  }

  onCancel() {
    this.router.navigate(['/moderation']);
  }
}
