import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' }) // Automatically stores the creation timestamp
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // Automatically updates the timestamp on modification
  updatedAt: Date;
}
