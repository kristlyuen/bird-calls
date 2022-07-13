document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('select').value
  // const url = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=q_gt:C+len:10+cnt:"${choice}"`
  const url = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=q:A+len:10+area:${choice}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        const random = Math.ceil(Math.random() * Number(data.numRecordings))
        console.log(random)
        const unknownIdentityFilteredOut = data.recordings.filter(x => x.gen !== 'Mystery')
        // If there are no recordings, tell the user that they need to pick another country.
        if (random === 0) {
          document.querySelector('h2').innerHTML = `Sorry, we couldn't find a birdcall. Please try again.`
          document.querySelector('audio').classList.add('hidden')
          document.querySelector('p').classList.add('hidden')
        }
        else {
          document.querySelector('audio').classList.remove('hidden')
          document.querySelector('p').classList.remove('hidden')
          document.querySelector('audio').src = unknownIdentityFilteredOut[random - 1].file
          document.querySelector('h2').innerHTML = unknownIdentityFilteredOut[random - 1].en
          document.querySelector('p').innerHTML = `This birdsong was recorded on ${unknownIdentityFilteredOut[random - 1].date} at ${unknownIdentityFilteredOut[random - 1].loc}.`
        }  
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


