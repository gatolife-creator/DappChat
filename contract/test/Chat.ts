import hre from "hardhat";
import { assert, expect } from "chai";
import { Chat__factory, Chat } from "../typechain-types";

describe("Chat", () => {
    let Chat: Chat__factory;
    let chat: Chat;

    beforeEach(async() => {
        Chat = await hre.ethers.getContractFactory("Chat");
        chat = await Chat.deploy();
    })

    it("Should get the message", async () => {
        const [person1, person2] = await hre.ethers.getSigners();

        chat.connect(person1).post(person2.address, "こんにちは");
        const conversations = await chat.connect(person1).getConversations(person2.address);

        expect(conversations[0].text).to.equal("こんにちは");
    })

    it("Should get empty messages", async () => {
        const [person1, person2] = await hre.ethers.getSigners();

        const conversations = await chat.connect(person1).getConversations(person2.address);

        expect(conversations).to.be.empty;
    })

    it("Should get correspondents", async () => {
        const [person1, person2, person3] = await hre.ethers.getSigners();

        await chat.connect(person1).post(person2.address, "こんにちは");
        await chat.connect(person1).post(person3.address, "こんにちは");
        const correspondents = await chat.getCorrespondents();

        expect(assert.sameMembers(correspondents, [person2.address, person3.address]));
    })

    it("Should get empty correspondents array", async () => {
        const [person1] = await hre.ethers.getSigners();

        const correspondents = await chat.connect(person1).getCorrespondents();

        expect(correspondents).to.be.empty;
    })

    it("Should get user name", async () => {
        const [person1] = await hre.ethers.getSigners();

        await chat.connect(person1).changeName("がとらいふ");
        const name = await chat.getName(person1.address);

        expect(name).to.equal("がとらいふ");
    })

    it("Should get correspondent thumbs", async () => {
        const [person1, person2, person3, person4] = await hre.ethers.getSigners();

        const firstMessage = "こんにちは、2さん";
        const secondMessage = "こんにちは、3さん";
        const thirdMessage = "こんにちは、1さん";
        const firstManName = "1さん";
        const secondManName = "2さん";
        const thirdManName = "3さん";
        const fourthManName = "4さん";
        const addressArray = [person2.address, person3.address, person4.address];

        const estimatedThumbs = [
            {
                addr: person2.address,
                name: secondManName,
                text: firstMessage,
            },
            {
                addr: person3.address,
                name: thirdManName,
                text: secondMessage,
            },
            {
                addr: person4.address,
                name: fourthManName,
                text: thirdMessage,
            }
        ];

        await chat.connect(person1).post(person2.address, firstMessage);
        await chat.connect(person1).post(person3.address, secondMessage);
        await chat.connect(person4).post(person1.address, thirdMessage);

        await chat.connect(person1).changeName(firstManName);
        await chat.connect(person2).changeName(secondManName);
        await chat.connect(person3).changeName(thirdManName);
        await chat.connect(person4).changeName(fourthManName);

        const correspondentThumbs = await chat.getCorrespondentThumbs(addressArray);
        const result = correspondentThumbs.map((thumb, index) => {
            const { addr, name, text } = estimatedThumbs[index];
            console.log(thumb);
            if (thumb.addr === addr && thumb.name === name && thumb.text === text && thumb.timestamp) {
                return true;
            } else {
                console.log(false);
                return false;
            }
        })


        expect(!result.includes(false)).to.equal(true);
    })
})