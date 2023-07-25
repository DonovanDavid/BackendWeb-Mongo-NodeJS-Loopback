import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ConectionMongoDbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.ciuadadId,
  CiudadRelations
> {

  public readonly personas: HasManyRepositoryFactory<Persona, typeof Ciudad.prototype.ciuadadId>;

  constructor(
    @inject('datasources.conectionMongoDB') dataSource: ConectionMongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Ciudad, dataSource);
    this.personas = this.createHasManyRepositoryFactoryFor('personas', personaRepositoryGetter,);
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
