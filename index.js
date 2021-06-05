// Create apollo server
// resolvers and typedef
// Connect apollo server with mongoDB

const {ApolloServer}  = require('apollo-server');
const mongoose = require('mongoose');

const {MONGODB} = require('./config.js');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');


const server = new ApolloServer({
    typeDefs,
    resolvers
});


mongoose.connect(MONGODB, {useNewUrlParser:true})
        .then(()=>{
            console.log('Connected to Mongodb');
            return server.listen({port:5000})
        }).then((res)=>{
            console.log(`Server running at ${res.url}`);
        });