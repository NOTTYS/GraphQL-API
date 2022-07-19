const { ApolloServer, gql } = require("apollo-server");
const {v4: uuidv4} = require('uuid')

const typeDefs = gql`
  type User {
    name: String!
    age: Int!
    position: String!
    numbers: Int
  }

  type Order {
    id: Int!
    product: String!
    price: Int!
  }

  type Mutation {
    addUser(name: String!, age: Int!, position: String!, numbers: Int): [User!]!
  }

  type Query {
    user: [User]
    order: [Order]
  }
#   type Mutation {
#     createUser(name: String, age: Int, position: String): User!
#   }
`;

let users = [
  {
    name: "Notty",
    age: "21",
    position: "Programmer",
    numbers: 55852139
  },
  {
    name: "EIEI",
    age: "22",
    position: "Student",
    numbers: 55852139
  },
  {
    name: "NotSeveN",
    age: "21",
    position: "ProPlayer",
    numbers: 55852139
  },
];

let orders = [
    {
        id:1,
        product: "Shirt",
        price: 100000
    }
]
const resolvers = {
  Query: {
    user: () => users,
    order: () => orders
  },
  Mutation: {
    addUser(parent, args, ctx, info) {
      const {name, age, position, numbers} = args;

      users.push ({
        name,
        age,
        position,
        numbers
      })
      return users;
    }
  }
  // Mutaion: {
  //   createUser(parent, args, ctx, info) {
  //     const newUser = args;
  //     User.push(newUser);
  //     return newUser;
  //   },
  // },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at port ${url}`);
});
