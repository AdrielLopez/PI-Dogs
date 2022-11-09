const initialState = {
  dogs: [],
  detail: [],
  temperaments: [],
  allDogs: [],
};


function rootReducer(state = initialState, action) {
  
  switch (action.type) {
    case "GET_DOGS": return {
      ...state,
      dogs: action.payload,
      allDogs: action.payload
    }
    case "GET_TEMPERAMENTS": return {
      ...state,
      temperaments: action.payload
    }
    case "FILTER_API_DB":
      let arrayfilter = [];
      if (action.payload === "All") {
        arrayfilter = state.allDogs;
      }
      if (action.payload === "createdinDb"){
        arrayfilter = state.allDogs.filter(el => el.createdinDb === true);
      }
      if(action.payload === "API"){
        arrayfilter = state.allDogs.filter(el => !el.createdinDb);
      }
      return {
        ...state,
        dogs: arrayfilter
      }

    case "FILTER_DOGS":
      let allDogs = state.allDogs;
      let statusFiltered = [];
      if (action.payload === "All") {
        statusFiltered = allDogs;
      }
      else {
        for (let i = 0; i < state.dogs.length; i++){
          if (typeof state.dogs[i].temperament === "string" && state.dogs[i].temperament.includes(action.payload)) {
            statusFiltered = statusFiltered.concat(state.dogs[i]);
          }
        }
      }
      return {
        ...state,
        dogs: statusFiltered
      }
    case "GET_NAME_DOGS":
      return {
        ...state,
        dogs: action.payload
      }
    case "POST_DOGS":
      return {
        ...state,
      }
    
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload
      }
    case "CLEAR_DETAIL":
        return {
            ...state,
            detail: []
        };

    case "ORDERER":
      let sortedDogs = [];
      if (action.payload === "razaAsc") {
        sortedDogs = state.dogs.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        })
      }
      if (action.payload === "razaDesc") {
        sortedDogs = state.dogs.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        })
      }
      if (action.payload === "pesoAsc") {
        sortedDogs = state.dogs.sort(function (a, b) {
          let weightA = a.weight.substring(0, 2);
          let weightB = b.weight.substring(0, 2);
          weightA = parseInt(weightA);
          weightB = parseInt(weightB);
          if (weightA > weightB) {
            return 1;
          }
          if (weightA < weightB) {
            return -1;
          }
          return 0;
        })

      }
      if (action.payload === "pesoDesc") {
        sortedDogs = state.dogs.sort(function (a, b) {
          let weightA = a.weight.substring(0, 2);
          let weightB = b.weight.substring(0, 2);
          weightA = parseInt(weightA);
          weightB = parseInt(weightB);
          if (weightA > weightB) {
            return -1;
          }
          if (weightA < weightB) {
            return 1;
          }
          return 0;
        })

      }
      return {
        ...state,
        dogs: sortedDogs
      }
      
      
    default: return state;
  }
}
export default rootReducer;