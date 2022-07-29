const { RESTDataSource } = require('apollo-datasource-rest')

class UsersAPI extends RESTDataSource {
    constructor(){
        super()
        this.baseURL = 'http://localhost:3000'
        this.customResponse = {
            code: 201,
            message: "Success"
        }
    }

    async getUsers() {
        const users = await this.get('/users')
        return users.map(async user => ({
            id: user.id,
            name: user.name, 
            email: user.email,
            active: user.active,
            role: await this.get(`/roles/${user.role}`)
        }))
    }
    async getUserById(id) {
        const user = this.get(`/users/${id}`)
        user.role = await this.get(`/roles/${user.role}`)
        return user
    }
    async addUser(user) {
        const users = await this.get('/users')
        user.id = users.length + 1
        const role = await this.get(`roles?type=${user.role}`)
        await this.post('users', {...user, role: role[0].id})
        return({
            ...user,
            role: role[0]
        })
    }
    async updateUser(data) {
        const role = await this.get(`roles?type=${data.user.role}`)
        await this.put(`/users/${data.id}`, {...data.user, role: role[0].id})
        return({
            ...this.customResponse,
            updatedUser: {
                ...data.user,
                role: role[0]
            }
        })
    }
    async deleteUser(id) {
        await this.delete(`/users/${id}`)
        return this.customResponse
    }
}

module.exports = UsersAPI