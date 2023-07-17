import PageTitle from "./components/PageTitle/index";
import styles from "./app.module.css";
import AppHeader from "./components/AppHeader/index";
import AppContent from "./components/AppContent/index";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="container">
        <PageTitle>TODO list</PageTitle>
        <div className={styles.app__wrapper}>
        <AppHeader />
        <AppContent />
        </div>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default App;
