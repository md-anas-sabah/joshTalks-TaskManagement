import React, { useState } from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const priorityColor = {
    high: "bg-red-300 text-red-800",
    medium: "bg-yellow-300 text-yellow-800",
    low: "bg-green-300 text-green-800",
  };

  const priorityBgColor = {
    high: "bg-red-200 ",
    medium: "bg-yellow-200 ",
    low: "bg-green-200 ",
  };

  return (
    <div
      className={`p-4 rounded-lg shadow ${priorityBgColor[task.priority]} ${
        task.completed ? "opacity-50" : ""
      }`}
    >
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <select
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({
                ...editedTask,
                priority: e.target.value as "high" | "medium" | "low",
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-2 ${
              priorityColor[task.priority]
            }`}
          >
            {task.priority.toUpperCase()}
          </span>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => onToggleComplete(task.id)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button
              onClick={handleEdit}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
