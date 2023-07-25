import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConectionMongoDbDataSource} from '../datasources';
import {TipoDocumento, TipoDocumentoRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class TipoDocumentoRepository extends DefaultCrudRepository<
  TipoDocumento,
  typeof TipoDocumento.prototype.tipoDocumentoId,
  TipoDocumentoRelations
> {

  public readonly personas: HasManyRepositoryFactory<Persona, typeof TipoDocumento.prototype.tipoDocumentoId>;

  constructor(
    @inject('datasources.conectionMongoDB') dataSource: ConectionMongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(TipoDocumento, dataSource);
    this.personas = this.createHasManyRepositoryFactoryFor('personas', personaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
