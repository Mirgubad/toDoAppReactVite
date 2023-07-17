import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./app.module.css";
import { useSelector } from "react-redux";
import TodoItem from '../TodoItem/index'

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
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

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
          filteredToDoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
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
