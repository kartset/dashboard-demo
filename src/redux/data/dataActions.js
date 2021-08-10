import { ADD_CHAPTER, DELETE_CHAPTER, EDIT_CHAPTER, SELECT_SUBJECT, SELECT_CLASS } from './dataTypes'

export const addChapter = (newName) => {
    return {
        type: ADD_CHAPTER,
        payload: newName
    }
}

export const deleteChapter = (chapterName) => {
    return {
        type: DELETE_CHAPTER,
        payload: chapterName

    }
}

export const editChapter = (arr) => {
    return {
        type: EDIT_CHAPTER,
        payload: arr
    }
}

export const selectClass = (selectedClass) => {
    return {
        type: SELECT_CLASS,
        payload: selectedClass
    }
}

export const selectSubject = (selectedSubject) => {
    return {
        type: SELECT_SUBJECT,
        payload: selectedSubject
    }
}