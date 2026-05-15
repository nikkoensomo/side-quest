import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
    if (tasks == null) return;
    // test
    return (
        <div className="grid grid-cols-2 gap-4">
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                />
            ))}
        </div>
    );
}

export default TaskList;