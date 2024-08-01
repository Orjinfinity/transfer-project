import { useState } from "react";
import Head from "next/head";

import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { Section, BreadCrumb, Title, View } from "components";
import { getGallery } from "service";

const GalleryPage = ({ pageProps }) => {
  const { gallery } = pageProps;

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
      <Section my="55px">
        {gallery?.map?.((g) => (
          <ResponsiveMasonry
            columnsCountBreakPoints={{
              350: 1,
              750: 2,
              900: 3,
            }}
          >
            <Masonry gutter="10px">
              {g?.images?.map((image, i) => (
                <img
                  key={image?._key}
                  src={image?.url}
                  style={{ width: "100%", display: "block" }}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
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
