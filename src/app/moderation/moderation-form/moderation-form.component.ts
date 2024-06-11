import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IModeration } from 'src/app/interfaces/moderation.interface';
import { ModerationService } from 'src/app/services/moderation.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moderation-form',
  templateUrl: './moderation-form.component.html',
  styleUrls: ['./moderation-form.component.css']
})
export class ModerationFormComponent implements OnInit {
  newModeration: IModeration = {
    id: undefined,
    originalText: '',
    normalizedText: '',
    consultText: '',
    status: 'A'
  };

  @ViewChild('moderationForm', { static: false }) moderationForm!: NgForm;

  constructor(
    private moderationService: ModerationService, 
    private router: Router
  ) { }

  ngOnInit(): void {}

  onSubmit() {
    if (this.moderationForm.valid) {
      this.moderationService.crear(this.newModeration).subscribe({
        next: (response) => {
          console.log('Moderación creada:', response);
          Swal.fire({
            title: '¡Éxito!',
            text: 'La moderación ha sido creada exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/moderation']); // Navega a la lista de moderaciones o a la página deseada
          });
        },
        error: (error) => {
          console.error('Error al crear nueva Moderación:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al crear la moderación.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  clearForm() {
    this.moderationForm.resetForm();
    this.newModeration = {
      id: undefined,
      originalText: '',
      normalizedText: '',
      consultText: '',
      status: 'A'
    };
  }

  onCancel() {
    this.router.navigate(['/moderation']); // Navegar a la lista de moderaciones o a la página deseada
  }
}