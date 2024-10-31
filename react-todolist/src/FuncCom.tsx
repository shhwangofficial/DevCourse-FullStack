// FuncCom.tsx
import React, { useState } from "react";

type Todo = {
  id: number;
  content: string;
  isChecked: boolean;
};

const FuncCom: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, content: "밥 먹기", isChecked: true },
    { id: 2, content: "잠자기", isChecked: false },
  ]);

  const ChangeTodo = (id: number) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        return todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo;
      });
    });
  };
  return (
    <div>
      <p>반갑습니다.</p>
      <ul></ul>
    </div>
  );
};

export default FuncCom;
