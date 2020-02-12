import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import {CanvasSeed} from '../seeds/canvas-seed'
import {UserSeed} from '../seeds/user-seed'

export class seedData implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
      const user = await getRepository('User').save(UserSeed)

      const canvasSeed: any = CanvasSeed
      canvasSeed.owner = user

      await getRepository("Canvas").save(canvasSeed)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
