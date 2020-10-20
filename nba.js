//console.log('hi')
const API_KEY = 'f8b3aaa0a3e04463a8de01381f663467'
const NBA_STATS_URL = `https://api.sportsdata.io/v3/nba/projections/json/PlayerSeasonProjectionStats/2020REG?key=${API_KEY}`

const getStats = async() => {
    try{
        const response = await axios.get(NBA_STATS_URL)
        buildDropdown(response.data)
    } catch(error) {
        console.log(error)
    }
}

const buildDropdown = (data) => {
    const dropdownDiv2 = document.querySelector('.dropdown2')
    const dropdown = document.createElement('select')
    dropdown.addEventListener('change', getStatInfo)
    data.forEach(player => {
        let optionElement = document.createElement('option')
        optionElement.innerText = `${player.Name} ${player.Team} ${player.Position}`
        optionElement.setAttribute('value', player.PlayerID)
        console.log(optionElement)
        dropdown.appendChild(optionElement)
    })
    dropdownDiv2.appendChild(dropdown)
}

const getStatInfo = async(event) => {
    let player = event.target.value
    const GET_STAT_URL = `https://api.sportsdata.io/v3/nba/projections/json/PlayerSeasonProjectionStatsByPlayer/2020REG/${player}?key=${API_KEY}`
    try{
        const response = await axios.get(GET_STAT_URL)
        let statData = response.data
        let myData = {
            player: player,
            playerName: statData.Name,
            playerTeam: statData.Team,
            playerPosition: statData.Position,
            playerFG: statData.FieldGoalsPercentage,
            playerFT: statData.FreeThrowsPercentage,
            playerThree: statData.ThreePointersMade,
            playerRebound: statData.Rebounds,
            playerAssist: statData.Assists,
            playerSteal: statData.Steals,
            playerBlock: statData.BlockedShots,
            playerTurnover: statData.Turnovers,
            playerPoints: statData.Points
        }
        displayStatInfo(myData)
    } catch(error) {
        console.log(error)
    }
}

const displayStatInfo = (statData) => {
    let searchArea = document.querySelector('.search')
    let result = document.createElement('div')
    result.className = 'search-result'
    let resultHeader = document.createElement('h3')
    resultHeader.innerText = statData.playerName

    
}
window.onload = getStats