import React , {useState} from 'react';
import {Form , Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';

const SearchBox = () => {
    const [keyword , setKeyword] = useState('');
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
          type='text'
          name='q'
          style ={{width : '400px' ,margin : '0'}}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder=  'Search Items...'
        ></Form.Control>
         &nbsp;
        <Button type='submit' variant='outline-success' style={{margin : '0'}}>
           <AiOutlineSearch size={25} style={{color : 'grey'}}/> Search
        </Button>
      </Form>
    )

}

export default SearchBox;