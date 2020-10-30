const { PAGE_SIZE } = require("../constants/pagination.const");

const paginateService = (model, query = {}, page = 1) => {
    const skip = (page - 1) * PAGE_SIZE;
    return model.find(query).skip(skip).limit(PAGE_SIZE);
};

module.exports = paginateService