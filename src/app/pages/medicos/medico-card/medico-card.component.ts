import { Component, input, signal } from '@angular/core';
import { Medico } from '../../../models/medico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medico-card',
  imports: [],
  templateUrl: './medico-card.component.html',
  styleUrl: './medico-card.component.sass'
})
export class MedicoCardComponent {

  medico = input.required<Medico>();
  constructor(private router: Router) {

  }

  redirectToEditMedico(numColegiado: string) {
    this.router.navigate(['editUser/' + numColegiado]);
  }

}
