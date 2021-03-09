import { Entity, ObjectID, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, PrimaryColumn, Unique } from 'typeorm';

@Entity('user')
class User {
    @ObjectIdColumn()
    id: ObjectID;

    @PrimaryColumn()    
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;
    
    @Column({ type: "date"})
    birthDate: Date;
    
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;