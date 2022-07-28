const arrayUsers = [
    {
        name: 'Ana',
        active: true
    },
    {
        name:'Gabriel',
        active: false
    }
]

const userResolvers = {
    Query: {
        users: () => arrayUsers,
        firstUser: () => arrayUsers[0]
    }
}

module.exports = userResolvers