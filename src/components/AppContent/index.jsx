import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./app.module.css";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "../TodoItem/index";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { reorderTodo } from "../../slices/todoSlice";
const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AppContent = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedList = [...todoList];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedList] = reorderedList.splice(sourceIndex, 1);
      reorderedList.splice(destinationIndex, 0, removedList);

      dispatch(reorderTodo(reorderedList));
    }
  };

  const sortedToDoList = [...todoList];
  sortedToDoList.sort((a, b) => new Date(a.time));

  const filteredToDoList = sortedToDoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }

    return item.status === filterStatus;
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredToDoList && filteredToDoList.length > 0 ? (
          <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredToDoList.map((todo, index) => (
                    <Draggable
                      draggableId={todo.id}
                      key={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className={styles.draggable__item}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <TodoItem key={todo.id} todo={todo} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AppContent;
