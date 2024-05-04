/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";

const App = () => {
  interface TodoType {
    id: string;
    todo: string;
  }
  const form = useBetaForm({
    currentTodo: "",
    todos: [],
  });
  const handleSetTodos = () => {
    console.log(form.value);
    console.log({ id: form.value.todos.length, todo: form.value.currentTodo });
    form.setField("todos", [
      ...form.value.todos,
      { id: form.value.todos.length, todo: form.value.currentTodo },
    ]);
    form.setField("currentTodo", "");
  };
  useEffect(() => {
    const handleButtonClick = (event: any) => {
      if (event.key === "Enter") {
        handleSetTodos();
        console.log("enter pressed");
      }
    };
    document.addEventListener("keydown", handleButtonClick);
    return () => {
      document.removeEventListener("keydown", handleButtonClick);
    };
  }, [handleSetTodos]);

  return (
    <div className="relative h-[97vh]" onClick={() => form.value}>
      <input
        value={form.value.currentTodo}
        onChange={(e) => {
          console.log(e.target.value);
          form.setField("currentTodo", e.target.value);
        }}
        type="text"
      />
      {form.value.todos.map((value: TodoType) => {
        return <div className="py-2">{value.todo}</div>;
      })}
      <button
        className="absolute bottom-4 "
        onClick={() => form.setField("todos", [])}
      >
        clear
      </button>
    </div>
  );
};

export default App;
