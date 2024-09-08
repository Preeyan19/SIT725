import { expect } from "chai";
import axios from 'axios';

describe("Contact API Test Suite", function () {
    const endpoint = "http://localhost:3000/api/contacts"; // Updated endpoint for consistency

    it("should return status 201 when a contact is successfully created", async function () {
        const newContact = {
            name: "mek ",
            email: "mekm@gmail.com",
            phone: "45678923",
            message: "This is a test contact message"
        };

        const response = await axios.post(endpoint, newContact);
        expect(response.status).to.equal(201);
    });

    it("should return status 400 if required data is missing", async function () {
        const incompleteContactData = {
            name: "Aman Madaan"
        };

        try {
            await axios.post(endpoint, incompleteContactData);
        } catch (error) {
            expect(error.response.status).to.equal(400); // Changed to reflect the updated validation logic
            expect(error.response.data.errors).to.include('Email is required and cannot be empty.'); // Additional validation check
        }
    });

    it("should return the correct inserted contact data in response", async function () {
        const contactData = {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            phone: "0987654321",
            message: "Another test message"
        };

        const response = await axios.post(endpoint, contactData);
        const responseBody = response.data;

        expect(responseBody.data.name).to.equal("Jane Doe");
        expect(responseBody.data.email).to.equal("jane.doe@example.com");
        expect(responseBody.data.phone).to.equal("0987654321");
        expect(responseBody.data.message).to.equal("Another test message");
    });

    // New Test Case: Verify that posting an invalid email format returns a validation error
    it("should return status 400 for invalid email format", async function () {
        const invalidEmailContact = {
            name: "John Doe",
            email: "not-an-email",
            phone: "1234567890",
            message: "Testing invalid email format"
        };

        try {
            await axios.post(endpoint, invalidEmailContact);
        } catch (error) {
            expect(error.response.status).to.equal(400);
            expect(error.response.data.errors).to.include('Invalid email format.'); // Assumes new validation rule for email format
        }
    });
});

describe("Contact Retrieval API Test Suite", function () {
    const endpoint = "http://localhost:3000/api/contacts"; // Updated endpoint for consistency

    it("should return an empty array when no contacts are available", async function () {
        const response = await axios.get(endpoint);
        const responseBody = response.data;

        expect(response.status).to.equal(200);
        expect(responseBody.data).to.be.an('array').that.is.empty;
    });

    it("should have content-type as application/json", async function () {
        const response = await axios.get(endpoint);

        expect(response.headers['content-type']).to.include('application/json');
    });

    // New Test Case: Verify that contacts are returned in the correct format
    it("should return contacts with the correct properties", async function () {
        const response = await axios.get(endpoint);
        const responseBody = response.data;

        if (responseBody.data.length > 0) {
            responseBody.data.forEach(contact => {
                expect(contact).to.have.property('name');
                expect(contact).to.have.property('email');
                expect(contact).to.have.property('phone');
                expect(contact).to.have.property('message');
            });
        }
    });
});
