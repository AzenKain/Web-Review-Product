import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
export class UserType {
    @Field()
    id: string;

    @Field()
    email: string;
    @Column()
    firstName: string;

    @Column()
    lastName: string;
    @Field()
    hash: string;

    @Field()
    refreshToken: string;
    
    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
