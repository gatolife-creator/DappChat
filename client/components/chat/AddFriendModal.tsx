import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";

const AddFriendModal = () => {
  return (
    <>
      <label htmlFor="add-friend-modal" className="btn btn-primary gap-1 mx-2">
        <AiOutlineUserAdd fontSize={24} /> add friend
      </label>

      <input type="checkbox" id="add-friend-modal" className="modal-toggle" />
      <label htmlFor="add-friend-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Add Friends</h3>
          <input
            type="text"
            className="input input-primary w-full my-4"
            placeholder="address"
          />
        </label>
      </label>
    </>
  );
};

export default AddFriendModal;
