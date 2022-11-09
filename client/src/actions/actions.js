import axios from "axios";


export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: json.data
    })
  }
}
export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data
    })
  }
}

export function orderDogs(payload) {
  return {
    type: "ORDERER",
    payload
  }
}

export function filterDogs(payload) {
  return {
    type: "FILTER_DOGS",
    payload
  }
}
export function filterApiDb(payload) {
  return {
    type: "FILTER_API_DB",
    payload
  }
}

export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: "GET_NAME_DOGS",
        payload: json.data
    })
    } catch (error) {
      console.log(error);
    }
    
  }
}

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3001/dogs", payload)
    return response;
  }
}

export function getDetail(id) {
  return async function (dispatch) {
    try{
      var json = await axios.get("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
}
export const clearDetail = () => ({type: 'CLEAR_DETAIL'})