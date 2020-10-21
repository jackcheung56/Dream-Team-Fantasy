//console.log('hi')
const API_KEY = '904c35a6b39d4ca89d685b8e6c5d2716'
const STATS_URL = `https://api.sportsdata.io/v3/nfl/projections/json/PlayerGameProjectionStatsByWeek/2020REG/7?key=${API_KEY}`

const getStats = async() => {
    try{
        const response = await axios.get(STATS_URL)
        buildDropdown(response.data)
    } catch(error) {
        console.log(error)
    }
}

const buildDropdown = (data) => {
    const dropdownDiv = document.querySelector('.dropdown')
    const dropdown = document.createElement('select')
    dropdown.addEventListener('change', getStatInfo)

    data.forEach(player => {
        let optionElement = document.createElement('option')
        optionElement.innerText = `${player.Name} ${player.Team} ${player.FantasyPosition}`
        optionElement.setAttribute('value', player.PlayerID)
        //console.log(optionElement)
        dropdown.appendChild(optionElement)
    })
    dropdownDiv.appendChild(dropdown)
}

const getStatInfo = async(event) => {
    let player = event.target.value
    const GET_STAT_URL = `https://api.sportsdata.io/v3/nfl/projections/json/PlayerGameProjectionStatsByPlayerID/2020REG/7/${player}?key=${API_KEY}`
    try{
        const response = await axios.get(GET_STAT_URL)
        let statData = response.data
        let myData = {
            playerName: statData.Name,
            playerTeam: statData.Team,
            playerPosition: statData.Position,
            playerPoints: statData.FantasyPointsPPR
        }
        displayStatInfo(myData)
        //console.log(response)
    } catch(error) {
        console.log(error)
    }
}

const displayStatInfo = (statData) => {
    let searchArea = document.querySelector('.search')
    let resultWrapper = document.createElement('div')
    resultWrapper.className = 'search-result'
    let name = document.createElement('h3')
    name.innerText = statData.playerName
    let team = document.createElement('h4')
    team.innerText = `Team: ${statData.playerTeam}`
    let position = document.createElement('h4')
    position.innerText = `Position: ${statData.playerPosition}`
    let points = document.createElement('h4')
    points.innerText = `Projected Fantasy Points: ${statData.playerPoints}`
    
    resultWrapper.appendChild(name)
    resultWrapper.appendChild(team)
    resultWrapper.appendChild(position)
    resultWrapper.appendChild(points)
    searchArea.appendChild(resultWrapper)
}

const clearStatInfo = () => {
    
}
window.onload = getStats