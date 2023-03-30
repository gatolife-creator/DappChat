import { expect } from 'chai';
import { ethers } from 'hardhat';

describe("TippingSystem", function () {
    const runBefore = async () => {
        const [addr1, addr2] = await ethers.getSigners();

        const TippingSystem = await ethers.getContractFactory("TippingSystem");
        const tippingSystem = await TippingSystem.deploy();
        await tippingSystem.deployed();

        return { addr1, addr2, tippingSystem };
    }

    it("should initialize balances and locked correctly", async function () {
        const { addr1, addr2, tippingSystem } = await runBefore();
        expect(await tippingSystem.balances(addr1.address)).to.equal(0);
        expect(await tippingSystem.balances(addr2.address)).to.equal(0);
        expect(await tippingSystem.locked(addr1.address)).to.equal(false);
        expect(await tippingSystem.locked(addr2.address)).to.equal(false);
    });

    it("should allow sending tips", async function () {
        const { addr1, addr2, tippingSystem } = await runBefore();
        await tippingSystem.connect(addr2).tip(addr1.address, { value: 100 });
        expect(await tippingSystem.balances(addr1.address)).to.equal(100);

        // await expect(tippingSystem.tip("0", { value: 100 })).to.be.revertedWith("invalid address or ENS name");
    });

    it("should allow withdrawals", async function () {
        const { addr1, addr2, tippingSystem } = await runBefore();
        await tippingSystem.connect(addr2).tip(addr1.address, { value: 100 });
        await tippingSystem.connect(addr1).withdraw();

        expect(await tippingSystem.balances(addr1.address)).to.equal(0);

        await expect(tippingSystem.connect(addr1).withdraw()).to.be.revertedWith("Insufficient balance");
    });
});
