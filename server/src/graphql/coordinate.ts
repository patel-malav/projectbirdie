import { gql, IResolvers } from "apollo-server-express";

const schema = gql`
  type Coordinate {
    lat: Float!
    lng: Float!
  }
`;

// const resolver: IResolvers = {
//   Coordinate: {
//     lat: ({coord}) => 
//   },
// };

export { schema };
