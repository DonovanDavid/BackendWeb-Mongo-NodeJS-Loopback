import {Entity, model, property, hasMany} from '@loopback/repository';
import {Persona} from './persona.model';

@model()
export class TipoDocumento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  tipoDocumentoId?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Persona)
  personas: Persona[];

  constructor(data?: Partial<TipoDocumento>) {
    super(data);
  }
}

export interface TipoDocumentoRelations {
  // describe navigational properties here
}

export type TipoDocumentoWithRelations = TipoDocumento & TipoDocumentoRelations;
