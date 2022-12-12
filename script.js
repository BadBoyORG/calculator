const view = document.getElementById("view")
const numbers = document.getElementsByClassName("number")
const operators = document.getElementsByClassName("operator")
const memory = []

function handleClear() {
  memory.length = 0
  return (view.innerHTML = 0)
}

function handleBackspace() {
  if (memory.length == 2 && memory[0] === "0") {
    memory.pop()
    memory.pop()
  } else if (memory.length > 0) {
    memory.pop()
  }

  let myStr = view.innerText
  let myArr = [...myStr]

  if (view.innerText.length == 1) {
    return (view.innerHTML = 0)
  }
  if (myArr[myArr.length - 2] == " ") {
    myArr.pop()
    myArr.pop()
    return (view.innerHTML = myArr.join(""))
  }
  myArr.pop()
  return (view.innerHTML = myArr.join(""))
}

function handleNumbers(value) {
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i].classList[1] == value) {
      if (numbers[i].innerText == ".") {
        for (let j = 0; j < memory.length; j++) {
          if (memory[j] == ".") {
            return ""
          }
        }
      }
      if (view.innerText === "0" && view.innerText.length == 1) {
        if (numbers[i].innerText === "0") {
          return ""
        }
        if (numbers[i].innerText === ".") {
          memory.push("0")
          memory.push(numbers[i].innerText)
          return (view.innerHTML = numbers[i].innerText)
        }
        memory.push(numbers[i].innerText)
        return (view.innerHTML = numbers[i].innerText)
      }
      if (memory[memory.length - 1] == "/100") {
        memory.push("*")
        memory.push(numbers[i].innerText)
        return (view.innerHTML += " x " + numbers[i].innerText)
      }
      if (memory[memory.length - 1] == "-") {
        for (let j = 0; j < numbers.length; j++) {
          if (
            memory[memory.length - 2] == numbers[j].innerText ||
            memory[memory.length - 2] == "/100"
          ) {
            memory.push(numbers[i].innerText)
            return (view.innerHTML += " " + numbers[i].innerText)
          }
        }
        memory.push(numbers[i].innerText)
        return (view.innerHTML += numbers[i].innerText)
      }
      if (
        memory[memory.length - 1] == "*" ||
        memory[memory.length - 1] == "/" ||
        memory[memory.length - 1] == "+"
      ) {
        memory.push(numbers[i].innerText)
        return (view.innerHTML += " " + numbers[i].innerText)
      }
      memory.push(numbers[i].innerText)
      return (view.innerHTML += numbers[i].innerText)
    }
  }
}

function handleOperators(value) {
  for (let i = 0; i < operators.length; i++) {
    if (operators[i].classList[1] == value) {
      switch (operators[i].innerText) {
        case "%":
          if (view.innerText == 0 && view.innerText.length == 1) {
            memory.push("0")
            memory.push("/100")
            return (view.innerHTML += operators[i].innerText)
          }
          if (memory[memory.length - 1] === "-") {
            for (let k = 0; k < numbers.length; k++) {
              if (
                memory[memory.length - 2] === numbers[k].innerText ||
                memory[memory.length - 2] === "/100"
              ) {
                handleBackspace()
                memory.push("/100")
                return (view.innerHTML += operators[i].innerText)
              }
            }
            return ""
          }
          switch (memory[memory.length - 1]) {
            case "*":
              handleBackspace()
              memory.push("/100")
              return (view.innerHTML += operators[i].innerText)
            case "/":
              handleBackspace()
              memory.push("/100")
              return (view.innerHTML += operators[i].innerText)
            case "+":
              handleBackspace()
              memory.push("/100")
              return (view.innerHTML += operators[i].innerText)
            case "-":
              handleBackspace()
              memory.push("/100")
              return (view.innerHTML += operators[i].innerText)
          }
          memory.push("/100")
          view.innerHTML += operators[i].innerText
          break
        case "÷":
          if (view.innerText == 0 && view.innerText.length == 1) {
            memory.push("0")
            memory.push("/")
            return (view.innerHTML += " " + operators[i].innerText)
          }
          if (memory[memory.length - 1] == "/") {
            return ""
          }
          for (let j = 0; j < operators.length; j++) {
            if (memory[memory.length - 1] !== "%") {
              if (memory[memory.length - 1] === "-") {
                for (let k = 0; k < numbers.length; k++) {
                  if (memory[memory.length - 2] == numbers[k].innerText) {
                    handleBackspace()
                    memory.push("/")
                    return (view.innerHTML += " " + operators[i].innerText)
                  }
                }
                return ""
              }
              if (
                memory[memory.length - 1] === "*" ||
                memory[memory.length - 1] === "+"
              ) {
                handleBackspace()
                memory.push("/")
                return (view.innerHTML += " " + operators[i].innerText)
              }
            }
          }
          memory.push("/")
          view.innerHTML += " " + operators[i].innerText
          break
        case "x":
          if (view.innerText == 0 && view.innerText.length == 1) {
            memory.push("0")
            memory.push("*")
            return (view.innerHTML += " " + operators[i].innerText)
          }
          if (memory[memory.length - 1] == "*") {
            return ""
          }
          for (let j = 0; j < operators.length; j++) {
            if (memory[memory.length - 1] !== "%") {
              if (memory[memory.length - 1] === "-") {
                for (let k = 0; k < numbers.length; k++) {
                  if (memory[memory.length - 2] == numbers[k].innerText) {
                    handleBackspace()
                    memory.push("*")
                    return (view.innerHTML += " " + operators[i].innerText)
                  }
                }
                return ""
              }
              if (
                memory[memory.length - 1] === "/" ||
                memory[memory.length - 1] === "+"
              ) {
                handleBackspace()
                memory.push("*")
                return (view.innerHTML += " " + operators[i].innerText)
              }
            }
          }
          memory.push("*")
          view.innerHTML += " " + operators[i].innerText
          break
        case "-":
          if (view.innerText == 0 && view.innerText.length == 1) {
            memory.push(operators[i].innerText)
            return (view.innerHTML = operators[i].innerText)
          }
          if (memory[memory.length - 1] == operators[i].innerText) {
            return ""
          }
          if (memory[memory.length - 1] == "+") {
            handleBackspace()
            memory.push(operators[i].innerText)
            return (view.innerHTML += " " + operators[i].innerText)
          }
          memory.push(operators[i].innerText)
          view.innerHTML += " " + operators[i].innerText
          break
        case "+":
          if (view.innerText == 0 && view.innerText.length == 1) {
            memory.push("0")
            memory.push(operators[i].innerText)
            return (view.innerHTML += " " + operators[i].innerText)
          }
          if (memory[memory.length - 1] == operators[i].innerText) {
            return ""
          }
          for (let j = 0; j < operators.length; j++) {
            if (memory[memory.length - 1] !== "%") {
              if (memory[memory.length - 1] === "-") {
                for (let k = 0; k < numbers.length; k++) {
                  if (memory[memory.length - 2] == numbers[k].innerText) {
                    handleBackspace()
                    memory.push(operators[i].innerText)
                    return (view.innerHTML += " " + operators[i].innerText)
                  }
                }
                return ""
              }
              if (
                memory[memory.length - 1] === "/" ||
                memory[memory.length - 1] === "*"
              ) {
                handleBackspace()
                memory.push(operators[i].innerText)
                return (view.innerHTML += " " + operators[i].innerText)
              }
            }
          }
          memory.push(operators[i].innerText)
          view.innerHTML += " " + operators[i].innerText
          break
        case "=":
          if (
            memory.length < 1 ||
            memory[memory.length - 1] == "+" ||
            memory[memory.length - 1] == "-" ||
            memory[memory.length - 1] == "/" ||
            memory[memory.length - 1] == "*"
          ) {
            return ""
          } else {
            view.innerHTML = eval(memory.join(""))
          }
          break
        default:
          console.log("Error, not find")
          view.innerHTML = "Error, not find"
          break
      }
    }
  }
}
console.log(memory.join(" "))
