
import { Component, inject, OnInit, signal } from '@angular/core';
import { MedicoService } from '../../services/medico.service';
import { HeaderService } from '../../services/header.service';
import { MedicoCardComponent } from './medico-card/medico-card.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-medicos',
  imports: [MedicoCardComponent],
  templateUrl: './medicos.component.html',
  styleUrl: './medicos.component.sass'
})
export class MedicosComponent implements OnInit {

  // Servicios
  medicoService = inject(MedicoService)
  headerService = inject(HeaderService)

  // Constructor
  constructor(private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.headerService.setShowHeaderContent(true)
    console.log('Valor de showHeaderContent:', this.headerService.showHeaderContent());

    try {

      await this.medicoService.getMedicos();

    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  }

  handleMedicoCreation() {
    this.router.navigateByUrl('/medicos/create')
  }

  async handleMedicoFiltering(pattern: string): Promise<void> {

    await this.medicoService.filterFetchedMedicsByPattern(pattern)

  }

}
