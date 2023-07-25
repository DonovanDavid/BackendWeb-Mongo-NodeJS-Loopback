import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConectionMongoDbDataSource} from '../datasources';
import {Persona, PersonaRelations, Ciudad, TipoDocumento} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {TipoDocumentoRepository} from './tipo-documento.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.personaId,
  PersonaRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Persona.prototype.personaId>;

  public readonly tipoDocumento: BelongsToAccessor<TipoDocumento, typeof Persona.prototype.personaId>;

  constructor(
    @inject('datasources.conectionMongoDB') dataSource: ConectionMongoDbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('TipoDocumentoRepository') protected tipoDocumentoRepositoryGetter: Getter<TipoDocumentoRepository>,
  ) {
    super(Persona, dataSource);
    this.tipoDocumento = this.createBelongsToAccessorFor('tipoDocumento', tipoDocumentoRepositoryGetter,);
    this.registerInclusionResolver('tipoDocumento', this.tipoDocumento.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
