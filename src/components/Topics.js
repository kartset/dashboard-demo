import { Button, HStack, Spacer, Heading, VStack, StackDivider, Text, Badge} from '@chakra-ui/react'
import React from 'react'
import {useSelector} from 'react-redux'

function Topics({match}) {
    const subName = match.params.subjectID;
    const cls = match.params.classID.slice(5,6);
    const chap = match.params.chapterName.slice(7,8);
    console.log(subName, cls, chap);
    const dataState = useSelector((state) => state.data.dataState)
    console.log(dataState.find(e => e.class === cls).subjects.find(e => e.name === subName).chapters[chap-1].topics);
    const topics = dataState.find(e => e.class === cls).subjects.find(e => e.name === subName).chapters[chap-1].topics;

    if(!topics.length) {
      return (
        <div>    
        <VStack
          divider={<StackDivider />} 
          borderColor="gray.100" 
          borderWidth="2px" p={4} 
          borderRadius='lg'
          alignItems='stretch'
        >
          <HStack>
          <Heading>Topics</Heading>
          <Spacer />
          <Button>Add Topic</Button>
          </HStack>
          <Badge colorScheme="green" p="4" m="4" borderRadius='lg'>
          No Topics added. Click add topics to add topics.
          </Badge>
          </VStack> 
           
        </div>
      );
    }

    return (
        <div>    
        <VStack
          divider={<StackDivider />} 
          borderColor="gray.100" 
          borderWidth="2px" p={4} 
          borderRadius='lg'
          alignItems='stretch'
        >
          <HStack>
          <Heading>Topics</Heading>
          <Spacer />
          <Button>Add Topic</Button>
          </HStack>
          {
            topics.map((e, key) => {
            return  (
              <HStack key={key}>
                <Text>{e}</Text>
                <Spacer />
                <Button>Edit</Button>
                <Button >Delete</Button>
              </HStack>
            )})
          }
          </VStack> 
           
        </div>      
    )
}

export default Topics
