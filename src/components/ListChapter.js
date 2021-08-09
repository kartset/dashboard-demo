import { HStack, VStack, StackDivider, Text, Spacer, Badge, Heading } from '@chakra-ui/react'
import React, {useState} from 'react'
import {addChapter, deleteChapter, editChapter} from '../redux'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
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



function ListChapter(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalHeading, setModalHeading] = useState('');
  const [modalInput, setModalInput] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const [oldName, setOldName] = useState('')

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
      dispatch(editChapter([props.selectedClass, props.selectedSubject, oldName, modalInput]));
    }
    else {
      dispatch(addChapter([props.selectedClass, props.selectedSubject, modalInput]));
    }
  }

  const initialRef = React.useRef()
    const dispatch = useDispatch()
    if(!props.chapters.length) {
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
            No Chapters to display !!!
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
          <Button onClick={() => {onOpen();handleAddChapter()}} >Add Chapter</Button>
          </HStack>
          {
            props.chapters.map((e, key) => {
            return  (
              <HStack key={key}>
                <Link to={`/Class${props.selectedClass}/${props.selectedSubject}/Chapter${key+1}/Topics`}><Text>{e.name}</Text></Link>
                <Spacer />
                <Button onClick={() => {onOpen(); handleEditChapter(e.name);}}>Edit</Button>
                <Button onClick={() => dispatch(deleteChapter([e.name, props.selectedSubject, props.selectedClass ]))} >Delete</Button>
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

export default ListChapter
