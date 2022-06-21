import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './category';
import { Specification } from './specification';

@Entity('cars')
class Car {

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;
  
  @Column()
  description: string;

  @Column()
  license_plate: string;

  @Column()
  daily_rate: number;

  @Column({ default: true})
  available: boolean;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'car_specifications',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }]
  })
  specifications: Specification[]

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Car };