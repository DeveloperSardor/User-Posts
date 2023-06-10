import swUiExp  from "swagger-ui-express"
import swJsDoc  from "swagger-jsdoc"
import { Router } from  "express"


const PORT = process.env.PORT || 5000;

const swRouter = Router();
const swagger = swJsDoc({   
  swaggerDefinition: {
    openapi: "3.0.0",
    servers: [
      {
        url: "http://localhost:" + PORT,
        description: "Users & Posts",
        variables: {
          port: {
            enum: [PORT],
            // default: 5000,
          }, 
        },
      },
    ],
    info: {
      version: "1.0.0",
      title: "Users & Posts",
      description: "For Work",
    },
    components: {
      securitySchemes: {
        Token: {
          type: "apiKey",
          name: "token",
          in: "header",
          description: "access_token",
        },
      },
    },
  },
  apis: [
   `${process.cwd()}/src/swagger/docs/usersdoc.yaml`
  ],
});

swRouter.use("/docs", swUiExp.serve, swUiExp.setup(swagger));
export default swRouter
 