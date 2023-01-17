// https://leetcode.com/problems/course-schedule-iii/
let queue = [];

const pQPush = (duration) => {
  let flag = false;

  for (let i in queue) {
    if (queue[i] < duration) {
      queue.splice(i, 0, duration);
      flag = true;
      break;
    }
  }

  if (!flag) {
    queue.push(duration);
  }

  return duration;
};
const pQPop = () => {
  return queue.shift();
};

const merge = (arr, start, half, end) => {
  const auxArray = new Array(end - start + 1);

  let i = start,
    j = half + 1,
    cont = 0;

  while (i <= half && j <= end) {
    if (arr[i][1] <= arr[j][1]) {
      auxArray[cont++] = arr[i++];
    } else {
      auxArray[cont++] = arr[j++];
    }
  }

  while (i <= half) auxArray[cont++] = arr[i++];

  while (j <= end) auxArray[cont++] = arr[j++];

  for (let i = start; i <= end; ++i) arr[i] = auxArray[i - start];
};

const mergeSort = (arr, start, end) => {
  if (start < end) {
    let half = Math.floor((end + start) / 2);
    mergeSort(arr, start, half);
    mergeSort(arr, half + 1, end);
    merge(arr, start, half, end);
  }
};

var scheduleCourse = function (courses) {
  mergeSort(courses, 0, courses.length - 1); // sort array
  queue = []; // clear queue
  let count = 0; // sum of durations

  for (let [duration, lastDay]  of courses) {
    if (count + duration <= lastDay && duration <= lastDay) { // if duration + current duration sum is less than lastDay
      count += pQPush(duration);
    } else if (queue?.[0] > duration) { // if duration is less than the first element of the queue 
      count += pQPush(duration) - pQPop(); // add founded duration to the queue and subtract currently duration
    }
  }

  return queue.length;
};
