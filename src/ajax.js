let xhr = new XMLHttpRequest();

xhr.open('GET', url, true);

xhr.onreadystatechange = function () {
  if (this.readyState !== 4) treturn;
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.log(this.statusText);
  }
};

xhr.onerror = function () {
  console.log(this.statusText);
};

xhr.responseType = 'json';

xhr.setRequestHeader('Accept', 'application/josn');

xhr.send(null);

// 用promise封装

function getJSON() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) treturn;
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };

    xhr.onerror = function () {
      reject(new Error(this.statusText));
    };

    xhr.responseType = 'json';

    xhr.setRequestHeader('Accept', 'application/josn');

    xhr.send(null);
  });
}
