import { useState } from "react";
import Head from "next/head";

import React from "react"
import Masonry from "react-responsive-masonry"

 

import {
  Layout,
  Section,
  BreadCrumb,
  Title,
  Container,
  View,
  Image,
  Text,
  Tag,
  Link
} from "components";


const images = [
  "/img1.png",
 
  "/img2.png",
  "/img3.png",
  "/img4.png",
  "/img5.png",
  "/img6.png",
  "/img7.png",
  "/img8.png",
  "/img9.png",
  "/img10.png",
  "/img11.png",
]

const GalleryPage = () => {

   
 


  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER  - </title>
        <meta
          name="description"
          content="VICTORIA TRANSFER , "
        />
      </Head>
      <Layout>
        <BreadCrumb>
          <Title mt="100px" fontSize="60px">Who we are?</Title>
          <View as="p" maxWidth="642px" m="0 auto" mt="68px" fontSize="24px" color="#fff">At Victoria Transfer, we pride ourselves on exceeding expectations with every journey</View>
        </BreadCrumb>
        <Section
          my="55px"
          style={{
            backgroundSize: "cover",
          }}
        >
          
            <View
              display="grid"
              px="50px"
             
              alignItems="center"
            >
                   <Masonry columnsCount={3} gutter="10px">
                {images.map((image, i) => (
                    <img
                        key={i}
                        src={image}
                        style={{width: "100%", display: "block"}}
                    />
                ))}
            </Masonry>
            </View>
          
        </Section>

 
      </Layout>
    </>
  );
};

export default GalleryPage;
