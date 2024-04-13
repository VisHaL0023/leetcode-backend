import { UserProblemData } from "../models/index.js";
import CrudRepository from "./crud-repository.js";

class ProblemsDataRepository extends CrudRepository {
    constructor() {
        super(UserProblemData);
    }
}

export default ProblemsDataRepository;
