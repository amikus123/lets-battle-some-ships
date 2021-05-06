export default function setupTypewriter(textInDom:any,textToDisplay:string ="error", speed:number = 10) {
  textInDom.innerHTML = "";
  var cursorPosition = 0,
    tag :any = "",
    writingTag = false,
    tagOpen = false,
    typeSpeed = speed,
    tempTypeSpeed = 0;

  var type = function () {
    if (writingTag === true) {
      tag += textToDisplay[cursorPosition];
    }

    if (textToDisplay[cursorPosition] === "<") {
      tempTypeSpeed = 0;
      if (tagOpen) {
        tagOpen = false;
        writingTag = true;
      } else {
        tag = "";
        tagOpen = true;
        writingTag = true;
        tag += textToDisplay[cursorPosition];
      }
    }
    if (!writingTag && tagOpen) {
      tag.innerHTML += textToDisplay[cursorPosition];
    }
    if (!writingTag && !tagOpen) {
      if (textToDisplay[cursorPosition] === " ") {
        tempTypeSpeed = 0;
      } else {
        tempTypeSpeed = Math.random() * typeSpeed + 50;
      }
      textInDom.innerHTML += textToDisplay[cursorPosition];
    }
    if (writingTag === true && textToDisplay[cursorPosition] === ">") {
      tempTypeSpeed = Math.random() * typeSpeed + 50;
      writingTag = false;
      if (tagOpen) {
        var newSpan = document.createElement("span");
        textInDom.appendChild(newSpan);
        newSpan.innerHTML = tag;
        tag = newSpan.firstChild;
      }
    }

    cursorPosition += 1;
    if (cursorPosition < textToDisplay.length - 1) {
      setTimeout(type, tempTypeSpeed);
    }
  };
  type()
  // return {
  //   type: type,
  // };
}

// var typer = document.getElementById("typewriter");

// const typewriter = setupTypewriter(typer);

// typewriter.type();
