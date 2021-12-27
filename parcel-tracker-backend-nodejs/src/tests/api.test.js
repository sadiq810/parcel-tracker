import regeneratorRuntime from "regenerator-runtime";
import app from "../index";
import supertest from 'supertest'

it('The server should be running',  async () => {
     let response = await supertest(app).get("/");
    expect(response.status).toEqual(200);
});

it('User should be able to login',  async () => {
    let response = await supertest(app).post("/login")
        .send('email=sender@gmail.com&password=admin123&type=sender')
        .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.user.id).toBe(1);
    expect(response.body.user.name).toBe('John smith')
});

it('User should not be allowed to login with incorrect credentials.',  async () => {
    let response = await supertest(app).post("/login")
        .send('email=&password=&type=sender')
        .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("Invalid Credentials.");
});

it('Sender should be able to list his parcels.',  async () => {
    let userResponse = await supertest(app).post("/login")
        .send('email=sender@gmail.com&password=admin123&type=sender')
        .set('Accept', 'application/json');

    let response = await supertest(app).get("/parcels")
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+userResponse.body.token);

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.length).toBe(1);
});

it('Sender should be able to create new parcel.',  async () => {
    let userResponse = await supertest(app).post("/login")
        .send('email=sender@gmail.com&password=admin123&type=sender')
        .set('Accept', 'application/json');

     await supertest(app).post("/create-parcel")
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+userResponse.body.token)
         .send('title=test&detail=test&dropoff_address=sometestaddress&pickup_address=testadd')

    let response = await supertest(app).get("/parcels")
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+userResponse.body.token);

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.length).toBe(2);
});

it('Biker should not be able to create new parcel.',  async () => {
    let userResponse = await supertest(app).post("/login")
        .send('email=biker@gmail.com&password=admin123&type=biker')
        .set('Accept', 'application/json');

    let response = await supertest(app).post("/create-parcel")
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+userResponse.body.token)
         .send('title=test&detail=test&dropoff_address=sometestaddress&pickup_address=testadd')

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe(false);
    expect(response.body.error).toContain('You are not authorized.');
});

it('Biker should be able to list available parcels.',  async () => {
    let userResponse = await supertest(app).post("/login")
        .send('email=biker@gmail.com&password=admin123&type=biker')
        .set('Accept', 'application/json');

    let response = await supertest(app).get("/parcels")
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+userResponse.body.token);

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
});

it('Biker should be able to pick a parcel.',  async () => {
    let userResponse = await supertest(app).post("/login")
        .send('email=biker@gmail.com&password=admin123&type=biker')
        .set('Accept', 'application/json');

    let response = await supertest(app).post("/pickup-parcel")
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+userResponse.body.token)
        .send('parcel_id=1')

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Parcel picked up successfully.');
});

it('Sender should not be able to pick a parcel.',  async () => {
    let userResponse = await supertest(app).post("/login")
        .send('email=sender@gmail.com&password=admin123&type=sender')
        .set('Accept', 'application/json');

    let response = await supertest(app).post("/pickup-parcel")
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+userResponse.body.token)
        .send('parcel_id=1')

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe(false);
    expect(response.body.error).toContain("You are not authorized to pickup a parcel");
});

it('Biker should be able to list picked up parcels.',  async () => {
    let userResponse = await supertest(app).post("/login")
        .send('email=biker@gmail.com&password=admin123&type=biker')
        .set('Accept', 'application/json');

    let response = await supertest(app).get("/biker-parcels")
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+userResponse.body.token)
        .send('parcel_id=1')

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe(true);
    expect(response.body.data.length).toBe(1);
});

it('Another Biker should not be able to pick a parcel which is already picked by someone else.',  async () => {
    let userResponse = await supertest(app).post("/login")
        .send('email=janan@gmail.com&password=admin123&type=biker')
        .set('Accept', 'application/json');

    let response = await supertest(app).post("/pickup-parcel")
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer '+userResponse.body.token)
        .send('parcel_id=1')

    expect(response.status).toEqual(200);
    expect(response.body.status).toBe(false);
    expect(response.body.error).toBe('Parcel is not available.');
});