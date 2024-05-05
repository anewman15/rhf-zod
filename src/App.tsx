import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./App.css";

let renderCount = 0;

function App() {
  renderCount++;

  const formInstance = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
    },
    criteriaMode: "all",
    shouldFocusError: true,
  });

  useEffect(() => {
    formInstance?.reset();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
          Create Post
        </h1>
        <form
          onSubmit={formInstance?.handleSubmit((data) => {
            setTimeout(() => {
              console.log("data", data);
              formInstance?.setError("subtitle", {
                message: new Error("Server Error: Subtitle field is protected")
                  .message,
              });
            }, 2000);
          })}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              {...formInstance?.register("title", {
                required: "Post title cannot be empty",
              })}
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Add post title"
            />
            {formInstance?.formState.errors?.title && (
              <span className="text-red-500 text-xs">
                {formInstance?.formState.errors?.title?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Add a subtitle"
              {...formInstance?.register("subtitle", {
                maxLength: {
                  value: 65,
                  message: "Keep subtitle shorter",
                },
              })}
            />
            {formInstance?.formState.errors?.subtitle && (
              <span className="text-red-500 text-xs">
                {formInstance?.formState.errors?.subtitle?.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              // type="text"
              cols={40}
              rows={5}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Add content here"
              {...formInstance?.register("content", {
                required: "Content cannot be empty",
                minLength: {
                  value: 20,
                  message: "Content should have enough information",
                },
                maxLength: {
                  value: 1000,
                  message:
                    "Content has reached maximum limit of 1000 characters",
                },
              })}
            ></textarea>
            {formInstance?.formState.errors?.content && (
              <span className="text-red-500 text-xs">
                {formInstance?.formState.errors?.content?.message}
              </span>
            )}
          </div>
          <div className="flex justify-between">
            <button
              disabled={!formInstance?.formState?.isValid}
              type="submit"
              className="w-40 disabled:bg-gray-300 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Post
            </button>
            <div className="w-40 p-2 text-center text-sm bg-red-600 text-white rounded-lg">
              Render count: {renderCount}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
