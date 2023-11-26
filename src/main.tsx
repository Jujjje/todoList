import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store from "./redux/store.ts";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);
