document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){

  // Set variable with the value selected from the dropdown by the user.
  const choice = document.querySelector('select').value

  // Declare variable for URL to be used based on the value selection.
  let birdURL 
  
  // If the user selects Antarctica, use this URL with the country query parameter for Antarctica. This is because Antarctica is not included in the area query.
  if (choice === 'antarctica') {
    birdURL = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=q_gt:C+len:10+cnt:"${choice}"`
  }
  // Otherwise, use this URL with the area query parameter.
  else {
    birdURL = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=q:A+len:12+area:${choice}`
  }  

  fetch(birdURL)
      // First call the birdcall API.
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        // Declare a random number based on the total number of recordings returned.
        const random = Math.ceil(Math.random() * Number(data.numRecordings))
        console.log(random)

        // Filter out any birdcalls without known identities.
        const unknownIdentityFilteredOut = data.recordings.filter(x => x.gen !== 'Mystery')

        const resultingBirdInfo = unknownIdentityFilteredOut[random - 1]

          // Only show the audio player and text when the "Get birdsong" button is clicked.
          document.querySelector('audio').classList.remove('hidden')
          document.querySelector('.recording-info').classList.remove('hidden')

          // Return the audio file and the common name of the bird.
          document.querySelector('audio').src = resultingBirdInfo.file
          document.querySelector('h2').innerHTML = resultingBirdInfo.en

          // Return the date, location, and country where the birdcall was recorded.
          document.querySelector('.recording-info').innerHTML = `This birdsong was recorded on ${resultingBirdInfo.date} at ${resultingBirdInfo.loc} in ${resultingBirdInfo.cnt}.`
     
        console.log(resultingBirdInfo)
        
      })

      // Then call the Wikipedia API.
      .then(res => res.json())
      .then(data => {
        
        // Declare a variable for the bird name, transforming all but the first word in the name to lowercase to match parameters for Wikipedia API.
        const birdName = resultingBirdInfo.en.split(' ').map((el, i) => i == 0 ? el : el.toLowerCase())

        console.log(birdName)

        return fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${birdName}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`)

      })

      .catch(err => {
          console.log(`error ${err}`)
      });
}



