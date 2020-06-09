import { join } from "path";
import express, { Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import monk from "monk";
import { typeDefs, resolvers } from "./graphql";
import { port, dbCon } from "./env.json";

const db = monk(dbCon);

const graphql = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
});

const app = express();

graphql.applyMiddleware({ app, cors: true });

app.use("/", express.static(join(__dirname, "public")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile("/", { root: join(__dirname, "public") });
});

const server = app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${graphql.graphqlPath}`
  )
);

server.once("close", () => db.close());
