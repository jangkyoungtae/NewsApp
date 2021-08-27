import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";


export async function initBackgroundFetch(taskName,
                                   taskFn,
                                   interval = 60 * 15) {
  try {
    if (!TaskManager.isTaskDefined(taskName)) {
      TaskManager.defineTask(taskName, taskFn);
      }
      console.log("서비스 실행");
    const options = {
      minimumInterval: interval // in seconds
    };
  await BackgroundFetch.registerTaskAsync(taskName, options);
  } catch (err) {
    console.log("registerTaskAsync() failed:", err);
  }
}
