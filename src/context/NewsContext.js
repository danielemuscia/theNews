import createDataContext from "../context/createDataContext";
import instance from "../api/news";
import firebase from "firebase";

const newsReducer = (state, action) => {
  switch (action.type) {
    case "GET_NEWS":
      return {
        ...state,
        news: action.payload.apiResponse,
        apiErr: action.payload.apiErr,
      };
    case "GET_READLATER":
      return {
        ...state,
        readLater: action.payload.dbResponse,
        dbErr: action.payload.dbErr,
      };
    case "DELETE_READLATER":
      return {
        ...state,
        readLater: state.readLater.filter(
          (readLater) => action.payload.title !== readLater.title
        ),
      };
    default:
      return state;
  }
};

const getNews = (dispatch) => async () => {
  try {
    const response = await instance.get(
      "?country=it&apiKey=634ea8777f184fca8589d9f26bdd8882"
    );
    dispatch({
      type: "GET_NEWS",
      payload: { apiResponse: response.data.articles, apiErr: null },
    });
  } catch (error) {
    dispatch({ type: "GET_NEWS", payload: { apiErr: "apiNotResponding" } });
  }
};

const getReadLater = (dispatch) => async () => {
  firebase
    .database()
    .ref("users/" + firebase.auth().currentUser.uid + "/readLater")
    .on(
      "value",
      (snapshot) => {
        let arr = [];
        snapshot.forEach(function (childSnapshot) {
          arr.push(childSnapshot.val());
        });
        dispatch({
          type: "GET_READLATER",
          payload: { dbResponse: arr.reverse(), dbErr: null },
        });
      },
      function (error) {
        dispatch({ type: "GET_READLATER", payload: { dbErr: error } });
      }
    );
};

const addToReadLater = (dispatch) => async (singleNews) => {
  //need to call twice the db once to store item and then to place key as a property in order to be able to reference to item from app
  const newReference = await firebase
    .database()
    .ref(`users/${firebase.auth().currentUser.uid}`)
    .child("readLater")
    .push(singleNews);
  const id = newReference.key;
  firebase
    .database()
    .ref(`users/${firebase.auth().currentUser.uid}`)
    .child("readLater")
    .child(id)
    .set({ ...singleNews, id });
};

const deleteReadLaterNews = (dispatch) => async (singleNews, readLater) => {
  firebase
    .database()
    .ref(`users/${firebase.auth().currentUser.uid}/readLater/${singleNews.id}`)
    .remove();
};

export const { Context, Provider } = createDataContext(
  newsReducer,
  { getNews, getReadLater, addToReadLater, deleteReadLaterNews },
  []
);
