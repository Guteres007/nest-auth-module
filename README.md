## Installation

!!!! Only for GraphQL !!!!

### Config 
 - Install [MongooseModule]('https://docs.nestjs.com/techniques/mongodb')
 - Install [GraphQLModule]('https://docs.nestjs.com/graphql/quick-start#installation')

Add this to app.module.ts and rename database "SET-YOUR-DB"

```
imports: [
    MongooseModule.forRoot('mongodb://localhost/[SET-YOUR-DB]'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: 'schema.gql',
        sortSchema: true,
        debug: true,
        playground: true,
    }),
    AuthModule.register({ secret: 'own', expiresIn: '100m' }),
],
```

### Guards
@UseGuards(JwtAuthGuard)
