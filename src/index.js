import './main.css';

const h1 = document.querySelector('h1');
h1.classList.add('styles-h1');

function greet(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Hello ${name}!`);
    }, 1000);
  });
}

async function print() {
  // Here we are using dynamic import
  const response = await greet('John Doe');
  console.log(response);
}

print();
