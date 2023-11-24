import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const DATA = {
  tasks: [
    { id: "task-1", content: "Task 1" },
    { id: "task-2", content: "Task 2" },
    { id: "task-3", content: "Task 3" },
    { id: "task-4", content: "Task 4" },
    { id: "task-5", content: "Task 5" },
  ],
  columns: {
    "To Do": {
      title: "To Do",
      colorCode: "bg-[#dee0e3] text-[#3E5271]",
      taskIds: ["task-1", "task-2"],
    },
    Draft: {
      title: "Draft",
      colorCode: "bg-[#DBEBFF] text-[#0046AC]",
      taskIds: [],
    },
    Doing: {
      title: "Doing",
      colorCode: "bg-[#DBEBFF] text-[#0046AC]",
      taskIds: ["task-3", "task-4"],
    },
    Blocked: {
      title: "Blocked",
      colorCode: "bg-[#fae0d9] text-[#F21400]",
      taskIds: [],
    },
    Done: {
      title: "Done",
      colorCode: "bg-[#b1fcd9] text-[#006841]",
      taskIds: ["task-5"],
    },
  },
};

function Board() {
  const [data, setData] = useState(DATA);
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskState, setNewTaskState] = useState("To Do");

  const generateDroppable = (col) =>
    data.columns[col].taskIds.map((taskId, index) => {
      const task = data.tasks.find((task) => task.id === taskId);
      return (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <h2 className=" text-md border-2 rounded-lg shadow-xl px-5 py-4 m-5">
                {task.content}
              </h2>
            </div>
          )}
        </Draggable>
      );
    });
    const handleDragEnd = () =>{

    }
  return (
    <div>fgh
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="  ">
          <header className="bg-purple-200 w-[100vw] fixed left-0 top-0 md:px-10 p-5">
            <div className="  flex justify-between items-center">
              <div>
                <h2 className=" md:text-2xl px-5 font-[Poppins] font-semibold">
                  Kanban Board - My Todos
                </h2>
              </div>
              <div className=" flex gap-4">
                <button
                  onClick={() => document.getElementById("AddNew").showModal()}
                  className=" md:text-lg bg-purple-400 text-white rounded-2xl px-8 py-3"
                >
                  Add Task
                </button>
                <dialog id="AddNew" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Add New Task</h3>
                    <div className=" my-4">
                      <div className="py-2">
                        <textarea
                          value={newTaskContent}
                          onChange={(e) => setNewTaskContent(e.target.value)}
                          type="text"
                          className=" border-2 w-full rounded-xl p-4"
                          placeholder="Enter Your Task..."
                        />
                      </div>
                      <div className=" py-2 flex gap-4 [&_p]:border-2 [&_p]:p-3 [&_p]:rounded-xl   ">
                        {["To Do", "Draft","Doing", "Blocked", "Done"].map((status) => {
                          return status === newTaskState ? (
                            <p
                              key={status}
                              className=" border-green-400"
                              onClick={() => setNewTaskState(status)}
                            >
                              {status}
                            </p>
                          ) : (
                            <p
                              key={status}
                              className=" border-gray-300 "
                              onClick={() => setNewTaskState(status)}
                            >
                              {status}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <form method="dialog" className=" py-2 flex gap-3">
                        <button className=" btn">
                          Add
                        </button>
                        <button className=" btn">Cancel</button>
                      </form>
                    </div>
                  </div>
                </dialog>
                <Droppable droppableId="deleteZone">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className=" md:text-lg px-5 sm:px-12 rounded-2xl border-2 py-5 md:py-3 border-orange-400 bg-red-400 text-white text-center"
                    >
                      <h2>Delete</h2>
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </header>
          <main className="  pt-24 ">
            <div className=" flex lg:p-10 p-4">
              {Object.keys(data.columns).map((column) => {
                let column_data = data.columns[column];
                return (
                  <Droppable key={column} droppableId={column}>
                    {(provided) => (
                      <div
                        className=" min-w-[16pc] w-[20pc] min-h-[75vh] rounded-lg bg-gray-100 py-10 mx-1 lg:mx-5"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className=" flex items-center pb-3">
                          <p
                            className={
                              " uppercase font-semibold mx-6 py-2 rounded-md text-base px-5 w-fit " +
                              column_data.colorCode
                            }
                          >
                            {column_data["title"]}
                          </p>
                          <p className={" text-xl rounded-full py-2 "}>
                            {column_data.taskIds.length}
                          </p>
                        </div>
                        {generateDroppable(column)}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
            </div>
          </main>
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
