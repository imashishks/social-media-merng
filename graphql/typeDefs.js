const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type User {
    id: ID!
    username: String!
    createdAt: String!
    email: String!
    token: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User
  }
`;
