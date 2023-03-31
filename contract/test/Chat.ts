import hre from "hardhat";
import { assert, expect } from "chai";

describe("Chat", () => {
    it("Should get the message", async () => {
        const [person1, person2] = await hre.ethers.getSigners();

        const Chat = await hre.ethers.getContractFactory("Chat");
        const chat = await Chat.deploy();

        chat.connect(person1).post(person2.address, "こんにちは");
        const conversations = await chat.getConversations(person1.address, person2.address);

        expect(conversations[0].text).to.equal("こんにちは");
    })

    it("Should get correspondents", async () => {
        const [person1, person2, person3] = await hre.ethers.getSigners();

        const Chat = await hre.ethers.getContractFactory("Chat");
        const chat = await Chat.deploy();

        chat.connect(person1).post(person2.address, "こんにちは");
        chat.connect(person1).post(person3.address, "こんにちは");
        const correspondents = await chat.getCorrespondents();

        expect(assert.sameMembers(correspondents, [person2.address, person3.address]));
    })
})