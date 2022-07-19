const { ApolloServer, gql } = require("apollo-server");
const {v4: uuidv4} = require('uuid')

const typeDefs = gql`
  type User {
    id: String
    name: String!
    age: Int!
    position: String!
    numbers: Int
  }

  type Order {
    id: String!
    product: String!
    price: Int!
  }

  type Mutation {
    addUser(id: String, name: String!, age: Int!, position: String!, numbers: Int): [User!]!
    addOrder(id: String, product: String!, price: Int): [Order!]!
    updateUser(id: String, name: String!, age: Int!): User!
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
    id: "1",
    name: "Notty",
    age: "21",
    position: "Programmer",
    numbers: 55852139
  },
  {
    id: "2",
    name: "EIEI",
    age: "22",
    position: "Student",
    numbers: 55852139
  },
  {
    id: "3",
    name: "NotSeveN",
    age: "21",
    position: "ProPlayer",
    numbers: 55852139
  },
];

let orders = [
    {
        id: uuidv4(),
        product: "Shirt",
        price: 100000
    }
]
const resolvers = {
  Query: {
    user: () => users,
    order: () => orders,
  },
  Mutation: {
    addUser(parent, args, ctx, info) {
      const {name, age, position, numbers} = args;

      users.push ({
        id: uuidv4(),
        name,
        age,
        position,
        numbers
      })
      return users;
    },
    addOrder(parent, args, ctx, info) {
      const {id, product, price} = args

      orders.push ({
        id: uuidv4(),
        product,
        price
      })
      return orders
    },
    updateUser(parent, args, ctx, info) {
      const {id, name, age} = args
      const user = users.find((user) => user.id === id)

      if(!user) {
        throw new Error(`user with id ${id} does not exist`);
      }

      if(name) {
        user.name = name;
      }

      if(age) {
        user.age = age;
      }

      return user;
    }
  },


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
