document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('select').value
  const url = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=q_gt:C+len:10+cnt:"${choice}"`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        const random = Math.floor(Math.random() * Number(data.numRecordings))
        console.log(random)
        // If there are no recordings, tell the user that they need to pick another country.
        // How can we remove recordings with 'Identity unknown' from the options altogether? Loop through and pop them off?
        if (random === 0 || data.recordings[random].en === 'Identity unknown') {
          document.querySelector('h2').innerHTML = 'Sorry, there are no birdsongs for that country. Please pick another country.'
          document.querySelector('audio').classList.add('hidden')
          document.querySelector('p').classList.add('hidden')
        }
        else {
          document.querySelector('audio').classList.remove('hidden')
          document.querySelector('p').classList.remove('hidden')
          document.querySelector('audio').src = data.recordings[random].file
          document.querySelector('h2').innerHTML = data.recordings[random].en
          document.querySelector('p').innerHTML = `This birdsong was recorded on ${data.recordings[random].date} at ${data.recordings[random].loc}.`
        }  
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


