document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('select').value
  const url = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=cnt:"${choice}"+q:A`
  // console.log(choice);

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(Math.floor(Math.random() * 499))
        console.log(data.recordings[Math.floor(Math.random() * 499)])
        document.querySelector('h2').innerHTML = data.recordings[Math.floor(Math.random() * 499)].en
        document.querySelector('audio').src = data.recordings[Math.floor(Math.random() * 499)].file
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

// Seems like there are max 499 birds on a page = Math.floor(Math.random() * 499)
// If there are less than 499 birds total = Math.floor(Math.random() * data.numRecordings)
// data.recordings[data.numRecordings]
