import { HStack, VStack, Select } from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { selectClass, selectSubject } from '../redux'

function Selects(props) {
    const dataState = useSelector((state) => state.data.dataState)
    const selectedClass = useSelector((state) => state.data.selectedClass)
    const [subjects, setSubjects] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        if(parseInt(selectedClass))
            setSubjects(dataState.find(cls => cls.class === selectedClass).subjects);
        if(selectedClass === '-----------Choose Class-----------')
            setSubjects([])
    }, [selectedClass, dataState])

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
                    <Select variant="outline"  onChange={(e) => {dispatch(selectClass(e.target.value)); setSubjects([]); dispatch(selectSubject('----------Choose Subject----------'))}} >
                    <option>-----------Choose Class-----------</option>
                    {
                        dataState.map((e, key) => {
                            return <option value={e.class} className="option" key={key}>{e.class}</option>;
                        })
                    }
                    </Select>
                    <Select onChange={(e) => dispatch(selectSubject(e.target.value))}>
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
