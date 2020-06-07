import { gql } from "apollo-server-express";

const schema = gql`
  type Model {
    path: String
  }
`;

export { schema };
