jest.setTimeout(20000);

import { RestfulController } from "../helper/api-controller";
import { apiUrl } from "../config/constants";
import { Response } from "superagent";
import superagent from "superagent";

describe("Test restful api", () => {
  describe("List of all objects", () => {
    const obj = new RestfulController(apiUrl);
    let objectResponse: Response;

    beforeAll(async () => {
      objectResponse = await obj.getObjects();
    });

    it("get all objects", async () => {
      expect(objectResponse.status).toEqual(200);
    });

    it("all objects has body", async () => {
      expect(objectResponse.body.length).toBeGreaterThan(0);
    });

    it("all objects body params", async () => {
      expect(objectResponse.body[0]).toEqual(
        expect.objectContaining({
          id: expect.anything(),
          name: expect.anything(),
        })
      );
    });
  });

  describe("List of objects by ids", () => {
    const obj = new RestfulController(apiUrl);
    let objectResponse: Response;

    beforeAll(async () => {
      objectResponse = await obj.getListObjects(1);
    });

    it("get one object", async () => {
      expect(objectResponse.status).toEqual(200);
    });

    it("one object has body", async () => {
      expect(objectResponse.body.length).toBeGreaterThan(0);
    });

    it("check 1 object body", async () => {
      interface Object {
        id: string;
        name: string;
        data: object;
      }
      const expectedObj: Object[] = [
        {
          id: "1",
          name: "Google Pixel 6 Pro",
          data: {
            color: "Cloudy White",
            capacity: "128 GB",
          },
        },
      ];
      expect(objectResponse.body).toEqual(expectedObj);
    });

    it("get several objects", async () => {
      const objectResponse2 = await obj.getListObjects(1, 3);
      expect(objectResponse2.status).toEqual(200);
    });
  });

  describe("Single object", () => {
    const obj = new RestfulController(apiUrl);
    let objectResponse: Response;

    beforeAll(async () => {
      objectResponse = await obj.getSingleObject(7);
    });

    it("get single object", async () => {
      expect(objectResponse.status).toEqual(200);
    });

    it("single object has body", async () => {
      expect(objectResponse.body).not.toBeNull();
    });

    it("check single object body", async () => {
      interface Object {
        id: string;
        name: string;
        data: object;
      }
      const expectedObj: Object = {
        id: "7",
        name: "Apple MacBook Pro 16",
        data: {
          year: 2019,
          price: 1849.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
        },
      };
      expect(objectResponse.body).toEqual(expectedObj);
    });
  });

  describe("Add object", () => {
    const obj = new RestfulController(apiUrl);
    it("create min object", async () => {
      const res = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: "Apple MacBook Pro 16",
        })
      );
    });

    it("create full object", async () => {
      const res = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: "Apple MacBook Pro 16",
          data: expect.objectContaining({
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          }),
        })
      );
    });

    it("create invalid object: null name", async () => {
      const res = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({ name: null });

      expect(res.status).toEqual(400);
    });

    it("create invalid object: empty name", async () => {
      const res = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({ name: "" });

      expect(res.status).toEqual(400);
    });

    it("create invalid object: no name key", async () => {
      const res = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(res.status).toEqual(400);
    });
  });

  describe("Update object", () => {
    const obj = new RestfulController(apiUrl);
    it("update min object", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Temporary object",
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .putObject(id)
        .set("Content-Type", "application/json")
        .send({
          name: "Temporary object (updated)",
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: "Temporary object (updated)",
        })
      );
    });

    it("update full object", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .putObject(id)
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16 upd",
          data: {
            year: 2020,
            price: 3087.99,
            "CPU model": "Intel Core i9 upd",
            "Hard disk size": "2 TB",
          },
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: "Apple MacBook Pro 16 upd",
          data: {
            year: 2020,
            price: 3087.99,
            "CPU model": "Intel Core i9 upd",
            "Hard disk size": "2 TB",
          },
        })
      );
    });

    it("update only data", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .putObject(id)
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2020,
            price: 3087.99,
            "CPU model": "Intel Core i9 upd",
            "Hard disk size": "2 TB",
          },
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: "Apple MacBook Pro 16",
          data: {
            year: 2020,
            price: 3087.99,
            "CPU model": "Intel Core i9 upd",
            "Hard disk size": "2 TB",
          },
        })
      );
    });

    it("update only name", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .putObject(id)
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16 upd",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: "Apple MacBook Pro 16 upd",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        })
      );
    });

    it("update not existed object", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .putObject(id+1)
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16 upd",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(res.status).toEqual(404);
         });    

    it("update with empty name", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .putObject(id)
        .set("Content-Type", "application/json")
        .send({
          name: "",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(res.status).toEqual(400);
         }); 
         
    it("update with null name", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .putObject(id)
        .set("Content-Type", "application/json")
        .send({
          name: null,
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(res.status).toEqual(400);
         });    
         
    it("update with no body", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .putObject(id)
        .set("Content-Type", "application/json")
        .send();

      expect(res.status).toEqual(400);
         });  
      });

  describe("Partially update object", () => {
    const obj = new RestfulController(apiUrl);
    it("partially update min object", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Temporary object",
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .patchObject(id)
        .set("Content-Type", "application/json")
        .send({
          name: "Temporary object (updated)",
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: "Temporary object (updated)",
        })
      );
    });

    it("partially update full object", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .patchObject(id)
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16 upd",
          data: {
            year: 2020,
            price: 3087.99,
            "CPU model": "Intel Core i9 upd",
            "Hard disk size": "2 TB",
          },
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: "Apple MacBook Pro 16 upd",
          data: {
            year: 2020,
            price: 3087.99,
            "CPU model": "Intel Core i9 upd",
            "Hard disk size": "2 TB",
          },
        })
      );
    });

    it("partially update only name", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .patchObject(id)
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16 upd",
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: "Apple MacBook Pro 16 upd",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        })
      );
    });
    it("partially update only data", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Apple MacBook Pro 16",
          data: {
            year: 2019,
            price: 1849.99,
            "CPU model": "Intel Core i9",
            "Hard disk size": "1 TB",
          },
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj
        .patchObject(id)
        .set("Content-Type", "application/json")
        .send({
          data: {
            year: 2020,
            price: 3087.99,
            "CPU model": "Intel Core i9 upd",
            "Hard disk size": "2 TB",
          },
        });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual(
        expect.objectContaining({
          id: id,
          name: "Apple MacBook Pro 16",
          data: {
            year: 2020,
            price: 3087.99,
            "CPU model": "Intel Core i9 upd",
            "Hard disk size": "2 TB",
          },
        })
      );
    });

    });

  describe("Delete object", () => {
    const obj = new RestfulController(apiUrl);

    it("delete object", async () => {
      const tempObject = await obj
        .postObject()
        .set("Content-Type", "application/json")
        .send({
          name: "Temporary object",
        });

      expect(tempObject.status).toEqual(200);
      const id = tempObject.body.id;

      const res = await obj.deleteObject(id);

      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        message: `Object with id = ${id} has been deleted.`,
      });
    });
  });
});
