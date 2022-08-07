document.querySelector('.birdsong-button').addEventListener('click', getFetch)
document.querySelector('.surprise-duck').addEventListener('click', getDuck)


function getFetch() {
  const getRandomBird = async () => {
    const request = await fetch(birdURL);
    const data = await request.json();
    return data;
  }

  const getWikiInfo = async wikiURL => {
    const request = await fetch(wikiURL);
    const data = await request.json();
    return data;
  }

  // Set variable with the value selected from the dropdown by the user.
  const choice = document.querySelector('select').value

  // Declare variable for URL to be used based on the value selection.
  let birdURL 

  // If the user selects Antarctica, use this URL with the country query parameter for Antarctica. This is because Antarctica is not included in the area query.
  if (choice === 'antarctica') {
    birdURL = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=q_gt:C+len:10+cnt:Antarctica`
  }
  // Otherwise, use this URL with the area query parameter.
  else {
    birdURL = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=q:A+len:12+area:${choice}`
  }  

  getRandomBird().then(bird => {

    const random = Math.ceil(Math.random() * Number(bird.numRecordings))
    console.log(random)

    // Filter out any birdcalls without known identities.
    const unknownIdentityFilteredOut = bird.recordings.filter(x => x.gen!== 'Mystery')
    const resultingBirdInfo = unknownIdentityFilteredOut[random - 1]

    console.log(resultingBirdInfo)

    // Only show the audio player and text when the 'Get birdsong' button is clicked.
    document.querySelector('.hide-for-duck').classList.remove('hidden')
    // document.querySelector('.wiki-link').classList.remove('hidden')

    // Return the audio file and the common name of the bird.
    document.querySelector('audio').src = resultingBirdInfo.file
    document.querySelector('h1').innerText = resultingBirdInfo.en

    // Return the date, location, and country where the birdcall wasrecorded.
    document.querySelector('.recording-info').innerText = `This birdsong was recorded on ${resultingBirdInfo.date} at ${resultingBirdInfo.loc}in ${resultingBirdInfo.cnt}.`

    console.log(resultingBirdInfo)

    // Declare a variable for the bird name, transforming all but the first word in the name to lowercase to match parameters for Wikipedia API.
    const birdName = resultingBirdInfo.en.split(' ').map((el, i) => i == 0 ? el : el.toLowerCase()).join('%20')
    console.log(birdName)

  	const wikiInfo = getWikiInfo(`https://en.wikipedia.org/w/api.php?action=query&titles=${birdName}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&exintro=1&origin=*`)

  		// Change image source 
  		wikiInfo.then(results => {
  			// For each key in the object returned from the API
  			Object.keys(results).forEach(key => {
        
          // Get the object with the pageId object on it
  				const pageIDObj = results[key].pages
        
          // If the pages key exists in the object
  				if (pageIDObj !== undefined) {
          
            // Get the thumbnail
  					const pageID = Object.keys(pageIDObj)[0]
  					const thumbnailObj = pageIDObj[pageID].thumbnail
  					const thumbnailSource = thumbnailObj.source

            // Get the extract
            const extract = pageIDObj[pageID].extract

            // Get the link
            const wikiLink = pageIDObj[pageID].fullurl
          
            // Change the image source to the thumbnail's source
  					document.querySelector('.bird-img').src = thumbnailSource

            // Add the first paragraph from the Wikipedia entry
            document.querySelector('.wiki-info').innerHTML = extract

            // Add a link to the full Wikipedia entry
            document.querySelector('.wiki-full-url').href = wikiLink

  				}
          console.log(pageIDObj)
        })
  		})
  })
}

// Get random duck from duck API
function getDuck() {

  fetch('https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://random-d.uk/api/v2/random')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.url);
        // Get random duck.
        document.querySelector('.bird-img').src = data.url
        // Add 'duck surprise!' text to h1.
        document.querySelector('h1').innerText = `Duck surprise!`
        // Hide the audio player and text.
        document.querySelector('.hide-for-duck').classList.add('hidden')
    })
      .catch(err => {
          console.log(`error ${err}`)
      });
  }