import { Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import './App.css';
import ListChapter from './components/ListChapter';
import Selects from './components/Selects';


function App() {
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
        <Selects />
        <ListChapter />
  </VStack>
      </div>
  );
}

export default App;
