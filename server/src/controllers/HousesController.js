import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
    constructor() {
        super('api/houses')
        this.router
            .get('', this.getHouses)
            .get('/:houseId', this.getHousesById)

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createHouse)
            .delete('/:houseId', this.destroyHouse)
            .put('/:houseId', this.updateHouse)
    }

    async getHouses(request, response, next) {
        try {
            const houses = await housesService.getHouses()
            return response.send(houses)
        } catch (error) {
            next(error)
        }
    }
    async getHousesById(request, response, next) {
        try {
            const houseId = request.params.houseId
            const house = await housesService.getHousesById(houseId)
            return response.send(house)
        } catch (error) {
            next(error)
        }
    }

    async createHouse(request, response, next) {
        try {
            const houseData = request.body
            const userInfo = request.userInfo
            houseData.creatorId = userInfo.id
            const house = await housesService.createHouse(houseData)
            return response.send(house)
        } catch (error) {
            next(error)
        }
    }

    async destroyHouse(request, response, next) {
        try {
            const houseId = request.params.houseId
            const userId = request.userInfo.id
            const house = await housesService.destroyHouse(houseId, userId)
            return response.send(`The house ${house.imgUrl} at  ${house.address} was destroyed `)
        } catch (error) {
            next(error)
        }
    }

    async updateHouse(request, response, next) {
        try {
            const houseId = request.params.houseId
            const userId = request.userInfo.id
            const houseData = request.body
            const updatedHouse = await housesService.updateHouse(houseId, userId, houseData)
            return response.send(updatedHouse)
        } catch (error) {
            next(error)
        }

    }
}


