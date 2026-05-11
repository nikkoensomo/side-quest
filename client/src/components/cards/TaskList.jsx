const TaskList = ({ tasks }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
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