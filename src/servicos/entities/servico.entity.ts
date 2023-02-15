import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column()
  valorMinimo: number;

  @Column()
  quantidadeHoras: number;

  @Column()
  porcentagem: number;

  @Column()
  habilidade: string;

  /** Valores Quarto */
  @Column()
  valorQuarto: number;

  @Column()
  horasQuarto: number;

  /** Valores Sala */
  @Column()
  valorSala: number;

  @Column()
  horasSala: number;

  /** Valores Banheiro */
  @Column()
  valorBanheiro: number;

  @Column()
  horasSBanheiro: number;

  /** Valores Cozinha */
  @Column()
  valorCozinha: number;

  @Column()
  horasCozinha: number;

  /** Valores Quintal */
  @Column()
  valorQuintal: number;

  @Column()
  horasQuintal: number;

  /** Valores Outros */
  @Column()
  valorOutros: number;

  @Column()
  horasOutros: number;

  @Column()
  icone: string;

  @Column()
  posicao: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
