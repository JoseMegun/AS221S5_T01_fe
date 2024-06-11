import { Component, OnInit } from '@angular/core';
import { IModeration } from 'src/app/interfaces/moderation.interface';
import { ModerationService } from 'src/app/services/moderation.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-moderation-list',
  templateUrl: './moderation-list.component.html',
  styleUrls: ['./moderation-list.component.css']
})
export class ModerationListComponent implements OnInit {
  activeModerations: IModeration[] = [];
  inactiveModerations: IModeration[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 20;
  showActiveModerations: boolean = true;

  searchOriginalText: string = '';
  searchNormalizedText: string = '';

  constructor(
    private moderationService: ModerationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
     this.listAll();
  }

  listAll(): void {
    this.moderationService.listAll().subscribe(
      (rest: any) => {
        // Filtrar y ordenar moderaciones activas por ID
        this.activeModerations = rest.filter((moderation: IModeration) => {
          return moderation.status === 'A' &&
            moderation.originalText && moderation.originalText.includes(this.searchOriginalText) &&
            moderation.normalizedText && moderation.normalizedText.includes(this.searchNormalizedText);
        });
        this.activeModerations.sort((a, b) => {
          if (a.id && b.id) {
            return a.id - b.id;
          }
          return 0;
        });
        
        // Filtrar y ordenar moderaciones inactivas por ID
        this.inactiveModerations = rest.filter((moderation: IModeration) => {
          return moderation.status === 'I' &&
            moderation.originalText && moderation.originalText.includes(this.searchOriginalText) &&
            moderation.normalizedText && moderation.normalizedText.includes(this.searchNormalizedText);
        });
        this.inactiveModerations.sort((a, b) => {
          if (a.id && b.id) {
            return a.id - b.id;
          }
          return 0;
        });
        
        console.log("Mostrando a todas las consultas: ", rest);
      }
    );
  }
  

  deleteModeration(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta moderación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.moderationService.delete(id)
          .subscribe(() => {
            Swal.fire('Eliminado!', 'La moderación ha sido eliminada.', 'success');
            this.listAll();
          }, error => {
            Swal.fire('Error', 'Error al eliminar la moderación. Por favor, inténtelo de nuevo.', 'error');
            console.error('Error:', error);
          });
      }
    });
  }

  reactivateModeration(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de reactivar esta moderación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, reactivar'
    }).then(result => {
      if (result.isConfirmed) {
        this.moderationService.reactivate(id)
          .subscribe(() => {
            Swal.fire('Reactivado!', 'La moderación ha sido reactivada.', 'success');
            this.listAll();
          }, error => {
            Swal.fire('Error', 'Error al reactivar la moderación. Por favor, inténtelo de nuevo.', 'error');
            console.error('Error:', error);
          });
      }
    });
  }


  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    const maxPageActive = Math.ceil(this.activeModerations.length / this.itemsPerPage);
    const maxPageInactive = Math.ceil(this.inactiveModerations.length / this.itemsPerPage);
    const maxPage = Math.max(maxPageActive, maxPageInactive);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    }
  }

  exportToExcelActive(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.activeModerations);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'RegistrosModeracion');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }

  toggleShowInactive(): void {
    this.showActiveModerations = !this.showActiveModerations;
    this.currentPage = 1; // Reinicia la página a la primera cuando se cambia de lista
    this.listAll(); // Obtén las moderaciones activas o inactivas según el estado actual
  }  


  exportToCSV(): void {
    const header = Object.keys(this.activeModerations[0]) as (keyof IModeration)[]; // Obtener las claves como tipo keyof ITeacher
    const csvData = this.activeModerations.map((moderation) => {
      return header.map((field) => {
        return moderation[field]; // Acceder a las propiedades del objeto utilizando las claves extraídas
      });
    });

    csvData.unshift(header.map(String)); // Convertir las claves a cadena antes de insertarlas en el CSV
    const csv = csvData.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    saveAs(blob, 'RegistrosModeracion.csv');
  }
  
}