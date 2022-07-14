document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('select').value
  let url 
  
  // If the user selects Antarctica, use this URL with the country query parameter for Antarctica. This r
  if (choice === 'antarctica') {
    url = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=q_gt:C+len:10+cnt:"${choice}"`
  }
  // Otherwise, use this URL with the area query parameter.
  else {
    url = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=q:A+len:12+area:${choice}`
  }  

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // Declare a random number based on the total number of recordings returned.
        const random = Math.ceil(Math.random() * Number(data.numRecordings))
        console.log(random)
        // Filter out any birdcalls without known identities.
        const unknownIdentityFilteredOut = data.recordings.filter(x => x.gen !== 'Mystery')

          // Only show the audio player and text when the "Get birdsong" button is clicked.
          document.querySelector('audio').classList.remove('hidden')
          document.querySelector('p').classList.remove('hidden')

          // Return the audio file and the common name of the bird.
          document.querySelector('audio').src = unknownIdentityFilteredOut[random - 1].file
          document.querySelector('h2').innerHTML = unknownIdentityFilteredOut[random - 1].en

          // Return the date, location, and country where the birdcall was recorded.
          document.querySelector('p').innerHTML = `This birdsong was recorded on ${unknownIdentityFilteredOut[random - 1].date} at ${unknownIdentityFilteredOut[random - 1].loc} in ${unknownIdentityFilteredOut[random - 1].cnt}.`
     
        console.log(data)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}


