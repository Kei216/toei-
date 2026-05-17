let words = [];

const allwords = [...words];

function shuffleArray(array) {

    for (let i = array.length - 1; i> 0; i--) {

        let j = Math.floor(Math.random() * (i+1));

        [array[i], array[j]] =
            [array[j], array[i]];

    }

}

let current = 0;

let unknownwords = 
    JSON.parse(
　　　localStorage.getItem("unknownwords")
    ) || [];

function showWord(){

document.getElementById("word").textContent =
    words[current].word;
    
document.getElementById("progress").textContent =
    `進捗: ${current + 1} / ${words.length}` ; 

}

function showAnswer(){

     document.getElementById("meaning").textContent =
        words[current].meaning;

     document.getElementById("example").textContent =
        words[current].example;
}

function playAudio() {

    const audioPath =
        "audio/" + words[current].audio;

    const audio = new Audio(audioPath);

    audio.play();
}




function nextWord() {

  current++;

  if (current >= words.length) {

    alert("終了！\n\n復習単語:\n" +
          unknownwords.map(word => word.word).join("\n")

    );
    return;
  }

  showWord();  
}

function unknownWord() {

    unknownwords.push(words[current]);

    localStorage.setItem(
        "unknownwords",
        JSON.stringify(unknownwords)
    );

    nextWord();
}

function normalMode() {

  words = [...allwords];

  current = 0;

  shuffleArray(words);

  showWord();
}

function reviewMode() {

  if (unknownwords.length === 0) {

    alert("復習単語がありません！");

    return;
  }

  words = [...unknownwords];

  current = 0;

  shuffleArray(words);

  showWord();
}

function resetReview() {

    unknownwords = [];

    localStorage.removeItem("unknownwords");

    alert("復習データを削除しました！");
}

shuffleArray(words);

// CSV事前読み込み

fetch("words.csv")
    .then(response => response.text())
    .then(text => {

        const lines = text.split("\n");

        words = [];

        for (let line of lines) {

            const parts = line.split(",");

            if (parts.length >= 4) {

                words.push({
                    word: parts[0].trim(),
                    meaning: parts[2].trim(),
                    example: parts[1].trim(),
                    audio: parts[4].trim()
                });
            }
        }

        shuffleArray(words);

        showWord();
    });

