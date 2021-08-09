import { HStack, VStack, Select } from '@chakra-ui/react'
import React, {useState} from 'react'
import {useSelector} from 'react-redux'

function Selects(props) {
    const dataState = useSelector((state) => state.data.dataState)
    const [selectedClass, setSelectedClass] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [subjects, setSubjects] = useState([])
    //console.log(dataState)
    function changeClass(e) { 
        //setSelectedSubject('----------Choose Subject----------')
		setSelectedClass(e.target.value);
		setSubjects(dataState.find(cls => cls.class === e.target.value).subjects);
        //console.log(subjects)
	}
    function changeSubject(event) {
        //console.log(event.target.value)
        
		setSelectedSubject(event.target.value);
		//const subs = dataState.find(cls => cls.class === selectedClass).subjects;
        //console.log(subjects)
        props.update(subjects.find(sub => sub.name === event.target.value).chapters,event.target.value,selectedClass)
	}

    //useEffect(() => {
      //  dispatch()
    //}, [selectedSubject])

    return (
        <div>
            <VStack 
            borderColor="gray.100" 
            borderWidth="2px" p={4} 
            borderRadius='lg'
            maxW = {{base: '90vw', sm: '80wv', lg:'50vw', xl: '40vw'}}
            w='100%'
            alignItems='stretch'>
                <HStack>
                    <Select variant="outline" value={selectedClass} onChange={(e) => changeClass(e)} >
                    <option>-----------Choose Class-----------</option>
                    {
                        dataState.map((e, key) => {
                            return <option value={e.class} className="option" key={key}>{e.class}</option>;
                        })
                    }
                    </Select>
                    <Select value={selectedSubject} onChange={(e) => changeSubject(e)}>
                        <option>----------Choose Subject----------</option>
                        {
                            subjects.map((e, key) => {
                                return <option key={key}>{e.name}</option>;
                            })
                        }
                </Select>
                    
                </HStack>
            </VStack>
        </div>
    )
}

export default Selects
