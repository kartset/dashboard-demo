import { ADD_CHAPTER, DELETE_CHAPTER, EDIT_CHAPTER } from './dataTypes'

export const addChapter = (arr) => {
    return {
        type: ADD_CHAPTER,
        payload: arr
    }
}

export const deleteChapter = (arr) => {
    return {
        type: DELETE_CHAPTER,
        payload: arr

    }
}

export const editChapter = (arr) => {
    return {
        type: EDIT_CHAPTER,
        payload: arr
    }
}