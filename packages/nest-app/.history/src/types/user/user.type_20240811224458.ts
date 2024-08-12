import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("User")
export class UserType {
    @Field()
    id: string;

    @Field()
    email: string;
    
    @Field()
    secretKey: string;

    @Field()
    firstName: string;

    @Field()
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
