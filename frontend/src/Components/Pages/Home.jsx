import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup,Box } from '@chakra-ui/react'
import axios from 'axios';
const pixabayApi = "https://pixabay.com/api/?key=40280487-9b0305d878e51fd281dc64120&q=motivation&image_type=photo&pretty=true&per_page=3";

const Home = () => {
  const [content,setContent] = useState('Hello this is the content');
  const [backgroudImage, setBackgroundImage] = useState("https://pixabay.com/get/gae3271e4995169a8ffbfcf0128b8b31ebfb8c2d148437f80f6cc1a796f3346b97dc06e86f62790b7c8843f824d5c08030c4a63621b8f9177f56ac3a1bc1c2565_1280.jpg");
  // large image url
  const fetchContent = () => {
    axios.get('http://localhost:3005/api/v1/openai')
      .then(response => {
        setContent(response.data);
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };

  const fetchBackgroundImage = () => {
    axios.get(pixabayApi)
      .then(response => {
        console.log(response.data);
        setBackgroundImage(response.data.hits[1]["largeImageURL"]);
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };

  return (
    <>
    <Button colorScheme='messenger'
        onClick={() => { fetchContent(); fetchBackgroundImage(); }}
      >
        Give Me A Motivational Quote
      </Button>
    <Box style={{ backgroundImage: `url(${backgroudImage})`}}>
      <Box className='content'>
        {content}
      </Box>
    </Box>
    </>
  )
}

export default Home