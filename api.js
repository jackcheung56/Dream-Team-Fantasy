//console.log('hi')
const API_KEY = '904c35a6b39d4ca89d685b8e6c5d2716'
const STATS_URL = `https://api.sportsdata.io/v3/nfl/projections/json/PlayerGameProjectionStatsByWeek/2020REG/7?key=${API_KEY}`

const getStats = async() => {   //This function is to get the info for the dropdown were about to build.
    try{
        const response = await axios.get(STATS_URL)
        buildDropdown(response.data)
    } catch(error) {
        console.log(error)
    }
}

const buildDropdown = (data) => {  // Function builds the drop down
    const dropdownDiv = document.querySelector('.dropdown')
    const dropdown = document.createElement('select')
    dropdown.addEventListener('change', getStatInfo)

    data.forEach(player => {    // Runs a loop through the data in our API and gets the information for the dropdown
        let optionElement = document.createElement('option')
        optionElement.innerText = `${player.Name} ${player.Team} ${player.FantasyPosition}`
        optionElement.setAttribute('value', player.PlayerID)
        //console.log(optionElement)
        dropdown.appendChild(optionElement)
    })
    dropdownDiv.appendChild(dropdown)
}

const getStatInfo = async(event) => {  //using another API link to get the stat info
    let player = event.target.value
    const GET_STAT_URL = `https://api.sportsdata.io/v3/nfl/projections/json/PlayerGameProjectionStatsByPlayerID/2020REG/7/${player}?key=${API_KEY}`
    try{
        const response = await axios.get(GET_STAT_URL)
        let statData = response.data
        let myData = {
            playerName: statData.Name,
            playerTeam: statData.Team,
            playerPosition: statData.Position,     //Renaming the data that is given to us from the object
            playerPoints: statData.FantasyPointsPPR
        }
        displayStatInfo(myData)
        //console.log(response)
        let name = document.querySelector('.name')
        name.innerHTML = `Name: ${myData.playerName}`
        let team = document.querySelector('.team')   //puts the data we got into the divs we made in our HTML file
        team.innerHTML = `Team: ${myData.playerTeam}` //This method helps stop the stacking appends
        let position = document.querySelector('.position')
        position.innerHTML = `Position: ${myData.playerPosition}`
        let points = document.querySelector('.points')
        points.innerHTML =`Fantasy Points: ${myData.playerPoints}`
    } catch(error) {
        console.log(error)
    }
}

const displayStatInfo = (statData) => { 
    
    let searchArea = document.querySelector('.search')
    let resultWrapper = document.createElement('div')
    resultWrapper.className = 'search-result'
    
    let name = document.createElement('h3')
    name.innerText = statData.playerName  //This was initally to get the data and print it on the page using appendChild but it kept stacking so I was showed to use the other method on top.
                                        // Not 100% sure what this does now but when I comment it out, it doesn't work anymore.
    let team = document.createElement('h4')
    team.innerText = `Team: ${statData.playerTeam}`
    
    let position = document.createElement('h4')
    position.innerText = `Position: ${statData.playerPosition}`
    
    let points = document.createElement('h4')
    points.innerText = `Projected Fantasy Points: ${statData.playerPoints}`

}



window.onload = getStats