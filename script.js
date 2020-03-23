// Let's add a similar method for Promise.all()
Promise.prototype.myPromiseAll = arrayPromises => {
  let arrayResults = [];
  let countPromises = 0;

  return new Promise((resolve, reject) => {
    arrayPromises.forEach((promise, index) => {
      promise.then(value => {
        arrayResults[index] = value;
        countPromises++;
        if (countPromises === arrayPromises.length) {
          resolve(arrayResults);
        }
      }).catch(error => reject(error));
    });
  });
};

// And let's test it
let urls = [
  'https://api.github.com/users/chriscoyier',
  'https://api.github.com/users/petele',
  'https://api.github.com/users/vitalyfriedman'
];

// Convert each URL to the promise returned by fetch()
let requests = urls.map(url => fetch(url));

// Create a new Promise
let myPromise = new Promise((resolve,reject) => {});

// Promise.myPromiseAll will wait for all promises to be completed
myPromise.myPromiseAll(requests)
  .then(responses => responses.forEach(
    response => console.info(`${response.url}: ${response.status}`)
  ));
