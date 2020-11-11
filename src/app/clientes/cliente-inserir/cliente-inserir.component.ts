import
    { Component, EventEmitter, Output }
  from
    '@angular/core';

  import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-cliente-inserir',
  templateUrl: './cliente-inserir.component.html',
  styleUrls: ['./cliente-inserir.component.css']
})

export class ClienteInserirComponent {

  @Output() clienteAdicionado = new EventEmitter<Cliente>();

  id: string;
  nome: string;
  Titulo: string;
  Numero: string;

  onAdicionarCliente() {

    const cliente: Cliente = {
      id: this.id,
      nome: this.nome,
      Titulo: this.Titulo,
      Numero: this.Numero
    }

    this.clienteAdicionado.emit(cliente);

    this.id
    this.nome = '';
    this.Titulo = '';
    this.Numero = '';

  }

}
