import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";


export async function initBackgroundFetch(taskName,
                                   taskFn,
                                   interval = 60 * 15) {
  try {
      if (!TaskManager.isTaskDefined(taskName)) {
        console.log("서비스 실행");
        TaskManager.defineTask(taskName, taskFn);
      }
      
    const options = {
      minimumInterval: interval // in seconds
    };
  await BackgroundFetch.registerTaskAsync(taskName, options);
  } catch (err) {
    console.log("registerTaskAsync() failed:", err);
  }
}
export const RegisterBackgroundTask = async (taskName) => {
  try {
    await BackgroundFetch.registerTaskAsync(taskName, {
      minimumInterval: 5, // seconds,
    })
    console.log("Task registered")
  } catch (err) {
    console.log("Task Register failed:", err)
  }
}