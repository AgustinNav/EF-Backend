import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;

const requester = supertest("http://localhost:8080");

describe("Testing App Api Endpoints.", () => {
    describe("Testing Students Api", () => {
        it("Should create a students", async () => {
            const res = await requester.post("/api/students").send({
                name: "Prueba",
                lastName: "Apellido",
                email: "Email@email.com",
                age: "99",
                password: "Password123",
                role: "user",
                courses: []
            });
            console.log(res.body);
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
        });

        it("Should return all students", async () => {
            const res = await requester.get("/api/students");
            console.log(res.body);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
        });
    });

    describe("Testing Courses Api", () => {
        it("Should create a new course", async () => {
            const res = await requester.post("/api/courses").send({
                title: "Test course",
                description: "Test description",
                teacherName: "Test teacher",
                students: []
            })
            expect(res.status).to.equal(201);
            expect(res.body).to.be.an("object");
        });
        it("Should return all courses", async () => {
            const res = await requester.get("/api/courses");
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an("array");
        });
    });
});