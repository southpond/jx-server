/* import shopping from "./shopping"; */
import v1 from "./v1";
import v2 from "./v2";
import shopping from './shopping'
export default app => {
  app.use("/api/v1", v1);
  app.use("/api/v2", v2);
  app.use("/api/shopping",shopping)
};
