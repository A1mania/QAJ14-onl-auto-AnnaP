import { JokesController } from "../helper/jokes-controller";
import { baseUrl } from "../config/constants";
import { Response } from "superagent";
import superagent from "superagent";

describe('Test jokes', () => {
    describe('Categories', () => {
        const jokes = new JokesController(baseUrl)
        let categoriesResponse: Response;

        beforeAll(async () => {
            categoriesResponse = await jokes.getCategories()
        })

        // it("get all categories", async () => {
        //     const response = await superagent.get("https://api.chucknorris.io/jokes/categories")
        //     expect(response.status).toEqual(200)
        // })

        it("get all categories", async () => {
            expect(categoriesResponse.status).toEqual(200)
        })

        it("get all categories", async () => {
            const expectedCategories = ["animal", "career", 
                "celebrity", "dev", "explicit", "fashion", "food", "history", "money", "movie", "music", "political", "religion", "science", "sport", "travel"]
            expect(categoriesResponse.body).toEqual(expectedCategories)
        })
    });
});