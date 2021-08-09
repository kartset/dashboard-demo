import { Heading, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import './App.css';
import ListChapter from './components/ListChapter';
import Selects from './components/Selects';
function App() {
  const [chapters, setChapters] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  function update(arr, sub, cls) {
    setChapters(arr);
    setSelectedSubject(sub);
    setSelectedClass(cls);
  }
  
  return (
      <div>
        <VStack p={4}>
        <Heading
          mb="8" 
          fontWeight="extrabold" 
          size="2xl" 
          bgGradient="linear(to-r, pink.500, pink.300, blue.500)"
          bgClip="text"
        >
          Admin Dashboard
        </Heading>
        <Selects update={update} />
        <ListChapter chapters={chapters} selectedClass={selectedClass} selectedSubject={selectedSubject} />
  </VStack>
      </div>
  );
}

export default App;
