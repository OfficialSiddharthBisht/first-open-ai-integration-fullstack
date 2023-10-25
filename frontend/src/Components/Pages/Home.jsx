import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup,Box } from '@chakra-ui/react'
import axios from 'axios';

const Home = () => {
  const [content,setContent] = useState('Hello this is the content');
  return (
    <div>
      <Button colorScheme='messenger'>
        Give Me A Motivational Quote
      </Button>
      <Box className='content'>
        {content}
      </Box>
    </div>
  )
}

export default Home