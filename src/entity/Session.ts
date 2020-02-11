import { BaseEntity, Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';
import { SessionEntity } from 'typeorm-store';

@Entity()
export class Session extends BaseEntity implements SessionEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    expiresAt: number;

    @Column()
    data: string;

    @CreateDateColumn()
    createDate: Date

    @UpdateDateColumn()
    updateDate: Date
}
