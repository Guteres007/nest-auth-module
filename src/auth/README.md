## Installation

! For this module you need User module !

### Config 
Add this to app.module.ts 

```
imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
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


Add this to tsconfig.json (inside compilerOptions section)

```
    "paths": {
      "@app/auth": [
        "libs/auth/src"
      ],
      "@app/auth/*": [
        "libs/auth/src/*"
      ],
      "@app/user": [
        "libs/user/src"
      ],
      "@app/user/*": [
        "libs/user/src/*"
      ],
    }
```

(Optional) Add this to nest-cli.json přidat 

```
 "projects": {
    "auth": {
      "type": "library",
      "root": "libs/auth",
      "entryFile": "index",
      "sourceRoot": "libs/auth/src",
      "compilerOptions": {
        "tsConfigPath": "libs/auth/tsconfig.lib.json"
      }
    },
    "user": {
      "type": "library",
      "root": "libs/user",
      "entryFile": "index",
      "sourceRoot": "libs/user/src",
      "compilerOptions": {
        "tsConfigPath": "libs/user/tsconfig.lib.json"
      }
    }
  },
```

### Install packages

yarn add
@nestjs/mongoose
mongoose
argon2
@nestjs/passport 
passport
@types/passport-local
passport-local
@nestjs/jwt
passport-jwt
@types/passport-jwt
@nestjs/graphql
@nestjs/apollo 
graphql 
apollo-server-express


### Guards
@UseGuards(JwtAuthGuard)
