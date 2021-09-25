import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUsers } from "@/networks/user";
import { addPost } from "@/networks/post";

const InputPost = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [authorId, setAuthorId] = React.useState("");
  const { data } = useQuery("users", getUsers);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    ({ title, authorId }: { title: string; authorId: number }) =>
      addPost(title, authorId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        setTitle("");
        setAuthorId("");
        setIsOpen(false);
      },
    }
  );

  const onSubmit = () => {
    mutation.mutate({ title, authorId: parseInt(authorId) });
  };
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          New Post
        </button>
      </div>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
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
              as={React.Fragment}
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
                  <div className="mt-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Input name"
                      autoComplete="off"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="py-2 px-4 rounded-md border border-gray-400 w-full"
                    />
                  </div>
                  <div className="mt-4">
                    <select
                      name="authorId"
                      className="py-2 px-4 rounded-md border bg-transparent border-gray-400 w-full"
                      value={authorId}
                      onChange={(e) => setAuthorId(e.target.value)}
                    >
                      <option value="">Pilih User</option>
                      {data?.map((user, key) => (
                        <option key={key} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={onSubmit}
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    className="inline-flex ml-4 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-red-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsOpen(false)}
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