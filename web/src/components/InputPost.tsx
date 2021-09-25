import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { addPost } from "../network/post";
import { getAllUsers } from "../network/user";

const InputPost = () => {
  let [isOpen, setIsOpen] = React.useState(false);
  let [name, setName] = React.useState("");
  let [userId, setUserId] = React.useState("");
  const users = useQuery("getAllUsers", getAllUsers, { retry: 10 });
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ name, userId }: { name: string; userId: number }) =>
      addPost(name, userId),
    {
      onSuccess: () => {
        setIsOpen(false);
        setName("");
        setUserId("");
        queryClient.invalidateQueries("getAllPosts");
      },
    }
  );

  function closeModal() {
    setIsOpen(false);
  }
  function submit() {
    mutation.mutate({ name, userId: parseInt(userId) });
  }

  function openModal() {
    setIsOpen(true);
  }

  if (users.isLoading) return <p>Loading......</p>;

  if (users.isError) return <pre>{JSON.stringify(users.error, null, 2)}</pre>;

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white rounded-md bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Input New Post
                </Dialog.Title>
                <div className="mt-2">
                  <div className="mt-2 w-full">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="off"
                      className="mt-4 py-2 px-4 rounded-md border border-gray-600 w-full"
                      placeholder="Post name"
                    />
                  </div>
                  <div className="mt-2 w-full">
                    <select
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      autoComplete="off"
                      className="mt-4 bg-transparent py-2 px-4 rounded-md border border-gray-600 w-full"
                      placeholder="Post name"
                    >
                      <option value="">Pilih User</option>
                      {users.data?.map((user, key) => (
                        <option value={user.id}>{user.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={submit}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium ml-4 text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default InputPost;
