import { ADD_CHAPTER, DELETE_CHAPTER, EDIT_CHAPTER, SELECT_CLASS, SELECT_SUBJECT } from "./dataTypes";

const initialState = {
  dataState : [ //dummyData
    {
      class: "1",
      subjects: [
        {
          name: "Maths",
          chapters: [
            {
              name: "Shapes and Spaces",
              topics: ["Intro to Shapes", "Types of Shapes", "Spaces"]
            },
            {
              name: "Numbers from one to nine",
              topics: ["Intro to Numbers", "Use of Numbers", "Numbers from One to Nine"]
            },
            {
              name: "Addition",
              topics: ["Carry On From Numbers", "Concept of addition", "Single digit addition"]
            },
          ]
        },
        {
          name: "English",
          chapters: [
            {
              name: "Clap, Clap, Clap",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            },
            {
              name: "One, Two",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            },
            {
              name: "The Little Bird",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            },
          ]
        },
        {
          name: "Hindi",
          chapters: [
            {
              name: "Jhoola",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            },
            {
              name: "Aam Ki Kahani",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            },
            {
              name: "Aam Ki Tokari",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            }
          ]
        }
      ]
    },
    {
      class: "2",
      subjects:[
        {
          name: "Maths",
          chapters: [
            {
              name: "What is Long, What is Round ?",
              topics:["Intro to 2-D Shapes", "Intro to 3-D Shapes", "Spatial Setting"]
            },
            {
              name: "Counting in Groups",
              topics: ["Guess The Numbers", "Ring the Correct Answer", "Hop Till You Drop"]
            },
            {
              name: "How much can you carry",
              topics: ["Recap from addition", "Find Out", "Topic 3"]
            },
            
          ]
        },
        {
          name: "English",
          chapters: [
            {
              name: "Action Song(Poem)",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            },
            {
              name: "Our Day",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            },
            {
              name: "My Family",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            }
          ]
        },
        {
          name: "Hindi",
          chapters: [
            {
              name: "Chapter 1",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            },
            {
              name: "Chapter 2",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            },
            {
              name: "Chapter 3",
              topics: ["Topic 1", "Topic 2", "Topic 3"]
            }
          ]
        }
      ]
    }
  ], //dummy data done
  selectedClass: '0',
  selectedSubject: '0',
  chapters: []
}

const dataReducer = (state = initialState, action) => {
  let data1 = state.dataState;
  switch(action.type) {
    case ADD_CHAPTER:
      //let data2 = state.dataState;
      //console.log(action.payload);
      data1.find(cls => cls.class === state.selectedClass).subjects.find(sub => sub.name === state.selectedSubject).chapters = [...data1.find(cls => cls.class === state.selectedClass).subjects.find(sub => sub.name === state.selectedSubject).chapters, {
        name: action.payload,
        topics: []
      }]
      return {...state,
        dataState: data1
      }
    case EDIT_CHAPTER:
      console.log(action.payload);
      data1.find(cls => cls.class === state.selectedClass).subjects.find(sub => sub.name === state.selectedSubject).chapters.find(chapter => chapter.name === action.payload[0]).name = action.payload[1];
      return {...state,
        dataState: data1
      }
    
    case DELETE_CHAPTER:
      data1.find(cls => cls.class === state.selectedClass).subjects.find(sub => sub.name === state.selectedSubject).chapters = data1.find(cls => cls.class === state.selectedClass).subjects.find(sub => sub.name === state.selectedSubject).chapters.filter((chapter) => chapter.name !== action.payload)
      return {...state,
        dataState: data1
      }

    case SELECT_CLASS :
      return {
        ...state,
        selectedClass: action.payload
      }
    
    case SELECT_SUBJECT: 
      return {
        ...state,
        selectedSubject: action.payload,

      }

    default: return state;
  }
}


export default dataReducer;