import { useState } from "react";
import Head from "next/head";

import React from "react";
import Masonry from "react-responsive-masonry";

import { Section, BreadCrumb, Title, View } from "components";
import { getGallery } from "service";

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
];

const GalleryPage = ({ pageProps }) => {
  const { gallery } = pageProps;

  console.log(gallery);

  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER - </title>
        <meta name="description" content="VICTORIA TRANSFER , " />
      </Head>
      <BreadCrumb>
        <Title
          mt={["40px", "40px", "100px"]}
          fontSize={["45px", "45px", "60px"]}
        >
          Who we are?
        </Title>
        <View
          as="p"
          maxWidth="642px"
          m="0 auto"
          mt="68px"
          fontSize={["17px", "17px", "24px"]}
          color="#fff"
        >
          At Victoria Transfer, we pride ourselves on exceeding expectations
          with every journey
        </View>
      </BreadCrumb>
      <Section
        my="55px"
        style={{
          backgroundSize: "cover",
        }}
      >
        {gallery?.map?.((g) => (
          <View display="grid" key={g._id} px="50px" alignItems="center">
            <Masonry columnsCount={3} gutter="10px">
              {g?.images?.map((image, i) => (
                <img
                  key={image?._key}
                  src={image?.url}
                  style={{ width: "100%", display: "block" }}
                />
              ))}
            </Masonry>
          </View>
        ))}
      </Section>
    </>
  );
};

export default GalleryPage;

export async function getServerSideProps() {
  const gallery = await getGallery();

  return {
    props: {
      gallery,
    },
  };
}
