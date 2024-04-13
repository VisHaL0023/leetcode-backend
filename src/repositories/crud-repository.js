class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    // For creating new data
    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            console.log(error);
            throw error;
        }
    }

    // To get value by ID
    async get(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }

    // To get all data
    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }

    // For updating data
    async update(id, data) {
        try {
            const response = await this.model.findByIdAndUpdate(id, data);
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }

    // For find one obj by any field and param
    async findByValue(id, params = {}) {
        try {
            const response = await this.model.findOne({ _id: id, ...params });
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }

    // For find one obj by any field
    async findOne(data) {
        try {
            const response = await this.model.findOne(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }

    // For deleting data
    async destroy(id) {
        try {
            const response = await this.model.findByIdAndRemove(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in CRUD Repo");
            throw error;
        }
    }
}

export default CrudRepository;
