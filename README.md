# Plantilla de microservicio

En este repositorio se encuentran la estructura de carpetas y todos los archivos de configuración para un microservicio en Node en on-premises.

## **Importante**

Reemplazar $PROJECT_NAME por el nombre de tu proyecto

## Estructura del proyecto

```
├── scripts
│   ├── deploy.sh
├── dist
├── node_modules
├── docs
│   ├── **/*.yaml
├── src
│   ├── application
│   │   ├── infrastructure-interfaces
│   │   ├── models
│   │   ├── services
│   ├── domain
│   │   ├── models
│   │   ├── services
│   ├── infrastructure
│   │   ├── api
│   │   │   ├── routers
│   │   ├── api-client (optional)
│   │   │   ├── cm-api (optional)
│   │   │   ├── proveedor-api (optional)
│   │   ├── repositories (optional)
│   │   │   ├── firestore (optional)
│   │   │   ├── datastore (optional)
│   │   │   ├── postgres (optional)
│   │   │   ├── big-query (optional)
│   │   │   ├── redis (optional)
│   │   ├── pubsub (optional)
│   ├── setup
│   │   ├── dependencies
│   │   │   ├── DependencyContainer.ts
│   │   ├── Swagger.ts
│   ├── util (optional)
├── test
│   │   ├── module
│   │   │   ├── features
│   │   │   ├── steps-definitions
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gcloudignore
├── .gitignore
├── .prettiertc.js
├── .analyze.config.js
├── CHANGELOG.md
├── commitlint.config.js
├── jest.config.js
├── package.json
├── .env
├── Dockerfile
├── docker-compose
├── yarn.lock
├── tsconfig.build.json
└── tsconfig.json
```

# Recomendaciones

-   ## Editor

        Se recomienda utilizar [VS Code](https://code.visualstudio.com/)

-   ## Extensiones recomendadas

        -   Prettier - Code formatter
        -   npm
        -   npm Intellisense
        -   Jest-cucumber code generator
        -   Javascript (ES6) code snippets
        -   GitLens
        -   ESLint
        -   EditorConfig
        -   TypeScript Hero
        -   Path Intellinsense

-   ## Gestor de paquetes

El gestor de paquetes utilizado es [Yarn](https://yarnpkg.com/)

# Primeros pasos

Se debe tener la versión estable [**Node.js**](https://nodejs.org/) (LTS) y tener instalado **Yarn**

## Antes de empezar

Copia las variables de entorno que estan en el archivo .sample-env y crea un archivo que se llame .env en la raíz, si necesitas ponerle algo antes de /api/v1 puedes poner la variable de entorno URI

### Instalación de dependencias

```zsh
# Consola
yarn
```

### Ejecutar el proyecto

Solo tienes que ejecutar el comando `yarn dev` y dirigirse a un navegador con la url **http://localhost:8080/api/v1** o **http://localhost:8080/docs**

### Validar versionamiento de las dependencias

```zsh
# Consola
yarn outdated
```

**Si no hay ningún warning ni error entonces puede continuar con los pasos, si por lo contrario los tiene por favor comunicarse con el Arquitecto**

### Copiar la estructura del proyecto en el directorio deseado

```zsh
# Consola -> Ir a la ruta donde se encuentre la plantilla
cp -R ./ destination_folder
```

## Scripts

### build

```zsh
# Se utiliza para compilar el proyecto
yarn build
```

### infra-as-code

```zsh
# Se utiliza generar los recursos de infraestructura en GCP
yarn infra-as-code
```

### lint

```zsh
# Se corre el linter
yarn lint
```

### format

```zsh
# Se utiliza para formatear el código
yarn format
```

### format-check

```zsh
# Se utiliza para verificar el formato del código
yarn format-check
```

### dev

```zsh
# Se utiliza para correr el servidor y estar atento a los cambios en los archivos Typescript
yarn dev
```

### start

```zsh
# Se utiliza para correr el servidor
yarn start
```

### start:debug

```zsh
# Se utiliza para correr el servidor en modo debug
yarn start:debug
```

### test

```zsh
# Se utiliza para ejecutar los tests
yarn test
```

### coverage

```zsh
# Se utiliza para mostrar la cobertura de pruebas
yarn coverage
```

### gcloud-ignore

```zsh
# Se utiliza para habilitar o deshabilitar el archivo .gcloudignore. Ver enable:gcloud-ignore y disable:gcloud-ignore
yarn gcloud-ignore
```

### deploy

```zsh
# Se utiliza para desplegar en App Engine
yarn deploy
```

### release

```zsh
# Se utiliza cada vez que se va a desplegar una versión CHANGELOG.md
yarn release
```

### pre-commit

```zsh
# Se utiliza para validar antes de hacer un commit
yarn pre-commit
```

## Commit lint

Se utiliza la convención estandar para escribir el mensaje en el commit

[Commit Message Convention](https://github.com/conventional-changelog/commitlint)

**_Ver commit-message.png_**

![Commit Message Convention](commit-message.png 'Title')

---
