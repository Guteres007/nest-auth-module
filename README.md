## Installation

!!!! Only for GraphQL !!!!

### Config 
Add this to app.module.ts and rename database "set-your-db-here"

```
imports: [
    MongooseModule.forRoot('mongodb://localhost/set-your-db-here'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: 'schema.gql',
        sortSchema: true,
        debug: true,
        playground: true,
    }),
    AuthModule,
],
```

### Guards
@UseGuards(JwtAuthGuard)
