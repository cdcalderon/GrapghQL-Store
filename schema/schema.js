const graphql = require("graphql")
const axios = require("axios")
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = graphql

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: CompanyType,
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/companies/${parentValue.companyId}`)
                    .then((res) => res.data)
            },
        },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/users/${args.id}`)
                    .then((resp) => resp.data)
            },
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios
                    .get(`http://localhost:3000/companies/${args.id}`)
                    .then((resp) => resp.data)
            },
        },
    },
})
