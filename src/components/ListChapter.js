import { HStack, VStack, StackDivider, Text, Spacer, Badge, Heading, IconButton, Box } from '@chakra-ui/react'
import React, {useState, useMemo} from 'react'
import {addChapter, deleteChapter, editChapter} from '../redux'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useToast } from "@chakra-ui/react"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormControl
} from "@chakra-ui/react"

import { AddIcon } from '@chakra-ui/icons'


function ListChapter() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalHeading, setModalHeading] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const [oldName, setOldName] = useState('')
  const selectedClass = useSelector(state => state.data.selectedClass);
  const selectedSubject = useSelector(state => state.data.selectedSubject);
  const dataState = useSelector(state => state.data.dataState)
  const initialRef = React.useRef()
  const dispatch = useDispatch()
  const toast = useToast()
  const statuses = ["success", "error", "warning", "info"]
  

  function handleAddChapter() {
    setEditStatus(false);
    setModalHeading('Name New Chapter');
  }
  function successToast(message) {
    toast({
      title: message,
      status: statuses[0],
      isClosable: true,
    })
  }
  function infoToast(message) {
    toast({
      title: message,
      status: statuses[3],
      isClosable: true,
    })
  }
  
  function handleEditChapter(name) {
    setEditStatus(true);
    setModalHeading('Edit Chapter Name');
    setOldName(name)
  }

  function handleSave(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    let title = formData.get('title')

    if(editStatus) {
      dispatch(editChapter([oldName, title]));
      successToast("Edit Succesful");
      
    }
    else {
      dispatch(addChapter(title));
      successToast("New Chapter Added");
    }
    onClose()
  }

  const chapters = useMemo(() => getChapters(selectedClass, selectedSubject, dataState), [selectedClass, selectedSubject, dataState])

  if(!chapters.length) {
    return (
        <VStack
        divider={<StackDivider />} 
        borderColor="gray.100" 
        borderWidth="2px" p={4} 
        borderRadius='lg'
        maxW = {{base: '90vw', sm: '80wv', lg:'50vw', xl: '40vw'}}
        w='100%'
        alignItems='stretch'
        >
        <Badge colorScheme="green" p="4" m="4" borderRadius='lg'>
        Select the corresponding class and subject to display chapters
      </Badge>
        </VStack>
    );
  }

  return (
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px" p={4}
        borderRadius='lg'
        maxW = {{base: '90vw', sm: '80wv', lg:'50vw', xl: '40vw'}}
        w='100%'
        alignItems='stretch'
      >
        <HStack>
        <Heading>Chapters</Heading>
        <Spacer />
        <Button variant='outline' leftIcon={<AddIcon/>} onClick={() => {onOpen();handleAddChapter()}} colorScheme='green' >Add Chapter</Button>
        </HStack>
        {
          chapters.map((e, key) => {
            console.log(key)
          return  (
            <HStack key={key}>
              <Link to={`/Class${selectedClass}/${selectedSubject}/Chapter${key+1}/Topics`}><Text>{e.name}</Text></Link>
              <Spacer />
              <IconButton variant='outline' icon={<FaEdit />} onClick={() => {onOpen(); handleEditChapter(e.name);}} colorScheme='teal'></IconButton>
              <IconButton  variant='outline' icon={<FaTrash />} onClick={() => {dispatch(deleteChapter(e.name)); infoToast("Chapter Deleted")}} colorScheme='red'></IconButton>
            </HStack>
          )})
        }
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSave}>
            <FormControl>
              <Input ref={initialRef} defaultValue={oldName} name='title' placeholder="Add New Chapter" /> 
            </FormControl>
            <Box paddingTop={4}>
                <Button type='submit' colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Box>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
      </VStack>
  )
}

const getChapters = (std, sub, dataState) => {
    
  let selectedStd = dataState.find(cls => cls.class === std)
  if(selectedStd && selectedStd.subjects) {
    let selectedSub = selectedStd.subjects.find(s => s.name === sub)

    if(selectedSub && selectedSub.chapters) {
      return selectedSub.chapters
    }
  }

  return []

  // dataState.find(cls => cls.class === selectedClass).subjects.find(sub => sub.name === selectedSubject).chapters
}


export default ListChapter
