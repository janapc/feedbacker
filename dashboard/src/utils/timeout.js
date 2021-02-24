function wait(timeMs) {
  return new Promise((resolve, reject) => {
    if (typeof timeMs !== 'number') reject(new Error('A number is requered'));
    setTimeout(resolve, timeMs);
  });
}

export default wait;
