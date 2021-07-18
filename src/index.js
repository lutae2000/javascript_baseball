import "./styles.css";

const $input = document.querySelector("#input");
const $form = document.querySelector("#form");
const $logs = document.querySelector("#logs");

const numbers = []; //1,2,3,4,5,6,7,8,9
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1);
}

const answer = [];
for (let n = 0; n < 4; n++) {
  const index = Math.floor(Math.random() * (numbers.length - n));
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}

console.log("answer: " + answer);

const tries = [];
function checkInput(input) {
  if (input.length !== 4) {
    return alert("4자리 입력");
  }
  if (new Set(input).size !== 4) {
    return alert("중복되지 않게 입력");
  }
  if (tries.includes(input)) {
    return alert("이미 시도한 값");
  }
  return true;
}
$form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = $input.value;
  $input.value = "";

  if (!checkInput(value)) {
    //입력값 문제 없음
    return;
  }
  if (answer.join("") === value) {
    $logs.textContent = "홈런!";
    return;
  } else {
    //에러 있음
  }

  if (tries.length > 4) {
    const message = document.createTextNode(`정답은 ${answer.join("")}`);
    $logs.appendChild(message);
    return;
  }

  let strike = 0;
  let ball = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  }
  $logs.append(
    `${value} : ${strike} 스트라이크 ${ball} 볼`,
    document.createElement("br")
  );
  tries.push(value);
});
