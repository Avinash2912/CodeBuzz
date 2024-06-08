class CrudRepo {
    constructor(model) {
        this.model = model
    }

    create = async (data) => {
        const res = await this.model.create(data)
        return res
    }
    get = async (id) => {
        const res = await this.model.findById(id)
        return res
    }

    getAll = async () => {
        const res = await this.model.find({})
        return res
    }
    destroy = async (id) => {
        const res = await this.model.findByIdAndDelete(id)
        return res
    }
    update = async (id, data) => {
        const res = await this.model.findByIdAndUpdate(id, data, { new: true })
        return res
    }
}
module.exports = CrudRepo
