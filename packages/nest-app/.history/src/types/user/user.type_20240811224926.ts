import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
export class UserType {
    @Field()
    id: string;

    @Field()
    email: string;

    @Field({nullable: true})
    secretKey: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field({nullable: true})
    hash: string;

    @Field({nullable: true})
    refreshToken: string;
    
    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
