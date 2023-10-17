import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
    async getHouses() {
        const houses = await dbContext.Houses.find()
        return houses
    }
    async getHousesById(houseId) {
        const house = await dbContext.Houses.findById(houseId)

        if (!house) {
            throw new BadRequest(`${houseId} is not a valid Id`)
        }

        return house
    }

    async createHouse(houseData) {
        const house = await dbContext.Houses.create(houseData)
        return house
    }
    async destroyHouse(houseId, userId) {
        const houseToBeDestroyed = await this.getHousesById(houseId)
        if (houseToBeDestroyed.creatorId.toString() != userId) {
            throw new Forbidden("this house is not yours to destroy")
        }
        await houseToBeDestroyed.remove()
        return houseToBeDestroyed
    }
    async updateHouse(houseId, userId, houseData) {
        const houseToBeUpdated = await this.getHousesById(houseId)
        if (houseToBeUpdated.creatorId.toString() != userId) {
            throw new Forbidden("this house is not your to update")
        }

        houseToBeUpdated.price = houseData.price || houseToBeUpdated.price
        houseToBeUpdated.address = houseData.address || houseToBeUpdated.address
        houseToBeUpdated.imgUrl = houseData.imgUrl || houseToBeUpdated.imgUrl
        houseToBeUpdated.description = houseData.description || houseToBeUpdated.description

        await houseToBeUpdated.save()
        return houseToBeUpdated
    }
}


export const housesService = new HousesService()