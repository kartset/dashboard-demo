import { HStack, VStack, StackDivider, Text, Spacer, Badge, Heading, IconButton } from '@chakra-ui/react'
import React, {useState, useMemo} from 'react'
import {addChapter, deleteChapter, editChapter} from '../redux'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Input,
  FormControl
} from "@chakra-ui/react"


function ListChapter() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalHeading, setModalHeading] = useState('');
  const [modalInput, setModalInput] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const [oldName, setOldName] = useState('')
  const selectedClass = useSelector(state => state.data.selectedClass);
  const selectedSubject = useSelector(state => state.data.selectedSubject);
  const dataState = useSelector(state => state.data.dataState)
  const initialRef = React.useRef()
  const dispatch = useDispatch()

  function handleAddChapter() {
    setEditStatus(false);
    setModalHeading('Name New Chapter');
    setModalInput('');
  }
  
  function handleEditChapter(name) {
    setEditStatus(true);
    setModalHeading('Edit Chapter Name');
    setModalInput('');
    setOldName(name)
  }

  function handleSave() {
    console.log(editStatus)
    if(editStatus) {
      dispatch(editChapter([oldName, modalInput]));
    }
    else {
      dispatch(addChapter(modalInput));
    }
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
        <Button onClick={() => {onOpen();handleAddChapter()}} colorScheme='green' >Add Chapter</Button>
        </HStack>
        {
          chapters.map((e, key) => {
            console.log(key)
          return  (
            <HStack key={key}>
              <Link to={`/Class${selectedClass}/${selectedSubject}/Chapter${key+1}/Topics`}><Text>{e.name}</Text></Link>
              <Spacer />
              <IconButton icon={<FaEdit />} onClick={() => {onOpen(); handleEditChapter(e.name);}} colorScheme='teal'></IconButton>
              <IconButton icon={<FaTrash />} onClick={() => dispatch(deleteChapter(e.name))} colorScheme='red'></IconButton>
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
          <FormControl>
            <Input ref={initialRef} value={modalInput} onChange={(e) => setModalInput(e.target.value)} placeholder="Add New Chapter" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => {onClose(); handleSave();}}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
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
