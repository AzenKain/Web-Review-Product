import { Field, Float, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class FavoriteElementWeekType {
    @Field()
    type: string;

    @Field()
    value: number;
}

@ObjectType('Favorite')
export class FavoriteType {
  
    @Field(() => [FavoriteElementWeekType])
    dataBrand: FavoriteElementWeekType[];   

    @Field(() => [FavoriteElementWeekType])
    dataSex: FavoriteElementWeekType[];   
}
