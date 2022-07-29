const { GraphQLScalarType } = require('graphql')

const userResolvers = {
    RolesType: {
        STUDENT: "STUDENT",
        TEACHER: "TEACHER",
        PRINCIPAL: "PRINCIPAL"
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'ISO-8601 format',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
    }),
    Query: {
        users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
        user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
    },
    Mutation: {
        addUser: (root, { user }, { dataSources }) => dataSources.usersAPI.addUser(user),
        updateUser: (root, user, { dataSources }) => dataSources.usersAPI.updateUser(data),
        deleteUser: (root, { id }, { dataSources }) => dataSources.usersAPI.deleteUser(id),

    }
}

module.exports = userResolvers