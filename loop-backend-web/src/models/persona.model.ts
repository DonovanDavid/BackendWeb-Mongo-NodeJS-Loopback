import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {TipoDocumento} from './tipo-documento.model';

@model()
export class Persona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  personaId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
  })
  apellidos?: string;

  @property({
    type: 'number',
    required: true,
  })
  documento: number;

  @property({
    type: 'date',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'number',
  })
  telefono?: number;

  @property({
    type: 'string',
  })
  usuario?: string;

  @property({
    type: 'string',
  })
  password?: string;

  @belongsTo(() => Ciudad)
  ciudadId: string;

  @belongsTo(() => TipoDocumento)
  tipoDocumentoId: string;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
