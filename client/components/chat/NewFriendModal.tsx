import React, { useRef } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useRouter } from "next/router";

const NewFriendModal = () => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { to } = e.target as any;

    ref.current!.checked = false;
    router.push(`/chat?to=${to.value}`);
    to.value = "";
  };

  return (
    <>
      <label htmlFor="add-friend-modal" className="btn btn-primary gap-1 mx-2">
        <AiOutlineUserAdd fontSize={24} /> new friend
      </label>

      <input
        type="checkbox"
        id="add-friend-modal"
        className="modal-toggle"
        ref={ref}
      />
      <label htmlFor="add-friend-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">New Friend</h3>
          <form className="my-10" onSubmit={onSubmit}>
            <input
              type="text"
              name="to"
              placeholder="input address here"
              className="inline-block w-[calc(100%-120px)] input input-primary bg-[#F5F7FB]"
            />
            <button type="submit" className="btn float-right">
              confirm
            </button>
            <div className="clear-right" />
          </form>
        </label>
      </label>
    </>
  );
};

export default NewFriendModal;
