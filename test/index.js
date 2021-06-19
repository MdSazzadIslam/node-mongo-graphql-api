const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../backend/server");

//Assertion style

chai.should();
chai.use(chaiHttp);

/**
 *  GET USERS
 */

describe("GraphQL", () => {
  let isDone = false;
  it("It should get all the users", async () => {
    const query = {
      query: `{
          users {
            id,
            name,
            email,
            password
          }
        }`,
    };

    await chai
      .request(server)
      .get("/graphql")
      .query(query)
      .send()
      .then((res) => {
        res.should.have.status(200);
        isDone = true;
      });
  });
});

/**
 *  GET A SINGLE USER
 */
describe("GraphQL", () => {
  it("It should get a single user", async () => {
    const id = "60c402ca703e5622dcbea84a";
    const query = {
      query: `{
          user(id:"${id}") {
            id,
            name,
           email,
           password
          }
        }`,
    };

    await chai
      .request(server)
      .get("/graphql")
      .query(query)
      .send()
      .then((res) => {
        res.should.have.status(200);
        isDone = true;
      });
  });
});

/**
 * REGISTRATION
 */

/* describe("GraphQL", () => {
  it("It should create a new user", (done) => {
    const name = "akm";
    const email = "ask@gmail.com";
    const password = "12345678";

    const data = {
      query: `
          mutation {
            registration(name: "${name}", email: "${email}", password: "${password}") {
              name,
              email,
              password
            }
          }
        `,
    };

    chai
      .request(server)
      .post("/graphql")
      .send(data)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        done();
      });
  });
}); */

/**
 * LOGIN
 */
describe("GraphQL", () => {
  it("It should valid user", async () => {
    const email = "ask@gmail.com";
    const password = "12345678";

    const data = {
      query: `
          mutation {
            login( email: "${email}", password: "${password}") {
              name,
              email,
              password
            }
          }
        `,
    };

    await chai
      .request(server)
      .post("/graphql")
      .send(data)
      .then((res) => {
        res.should.have.status(200);
        isDone = true;
      });
  });
});

/**
 *  GET APARTMENTS
 */

describe("GraphQL", () => {
  it("It should get all the appartments", async () => {
    const query = {
      query: `{
          appartments {
            id,
            name,
            address,
            favorite,
            location{
              city,
              country
            }
          }
        }`,
    };

    await chai
      .request(server)
      .get("/graphql")
      .query(query)
      .send()
      .then((res) => {
        res.should.have.status(200);
        isDone = true;
      });
  });
});

/**
 *  GET FAVORITE APPARTMENT
 */
describe("GraphQL", () => {
  it("It should get all the favorite appartments", async () => {
    const query = {
      query: `{
          favAppartment{
            id,
            name,
            address,
            favorite
          }
        }`,
    };

    await chai
      .request(server)
      .get("/graphql")
      .query(query)

      .then((res) => {
        res.should.have.status(200);
        isDone = true;
      });
  });
});

/**
 *  GET A SINGLE APPARTMENT
 */
describe("GraphQL", () => {
  it("It should get a single appartment", (done) => {
    const id = "60c5e1459116aa3a44db37c6";
    const query = {
      query: `{
          appartment(id:"${id}") {
            id,
            name,
            address,
            favorite
          }
        }`,
    };

    chai
      .request(server)
      .get("/graphql")
      .query(query)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

/**
 *  GET APPARTMENT BY VARIOUS FILTER
 */
describe("GraphQL", () => {
  it("It should get a single appartment by various filter", async () => {
    const countryCode = "US";
    const city = "Yorkshire";
    const room = "5";

    const query = {
      query: `{
          apartmentByFilter(countryCode:"${countryCode}", city:"${city}",   room:"${room}") {
            id,
            name,
            address,
            favorite
          }
        }`,
    };

    await chai
      .request(server)
      .get("/graphql")
      .query(query)
      .then((res) => {
        res.should.have.status(200);
        isDone = true;
      });
  });
});

/**
 * CREAT A NEW APPARTMENT
 */
describe("GraphQL", () => {
  it("It should create a new appartment", async () => {
    const name = "Luxry Appartment in Dhaka";
    const address = "Block-BDhaka 1216";
    const description =
      "This South facing home is on the 2nd floor & is over 400 sqft";
    const room = 5;

    const data = {
      query: `
          mutation {
            createAppartment( name: "${name}", address: "${address}", description: "${description}", room: ${room}) {
              id,
            name,
            address,
            favorite
            }
          }
        `,
    };

    await chai
      .request(server)
      .post("/graphql")
      .send(data)
      .then((res) => {
        res.should.have.status(200);
        isDone = true;
      });
  });
});

/**
 * UPDAE A  APPARTMENT
 */
describe("GraphQL", () => {
  it("It should update a appartment", async () => {
    const id = "60c5f86f4bd523143c506577";
    const name = "Luxry Appartment in Dhaka, Bangladesh.";
    const address = "Block-BDhaka 1216";
    const description =
      "This South facing home is on the 2nd floor & is over 500 sqft";
    const room = 8;

    const data = {
      query: `
          mutation {
            updateAppartment(id: "${id}", name: "${name}", address: "${address}", description: "${description}", room: ${room}) {
              id,
            name,
            address,
            favorite
            }
          }
        `,
    };

    await chai
      .request(server)
      .post("/graphql")
      .send(data)
      .then((res) => {
        res.should.have.status(200);
        isDone = true;
      });
  });
});
