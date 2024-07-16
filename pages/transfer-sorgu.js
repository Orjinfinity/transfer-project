import Head from "next/head";
import { useState, forwardRef } from "react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
import { WizardProvider } from "wizardcontext/WizardContext";
import { useWizardContext } from "wizardcontext/WizardContext";
import * as pattern from "../utils/pattern";
import {
  Layout,
  View,
  Title,
  Container,
  Section,
  Grid,
  Image,
  Text,
  Service,
  News,
  Button,
  Input,
  Checkbox,
  Slider,
  BreadCrumb,
  LogisticsCard,
  Tag,
  CustomerCard,
  Destinations,
  Select,
  TextField,
  Box,
  FieldArea,
  Icon,
} from "@/components";
import { Tabs, Tab, Content } from "../components/tab/Tab";
import { alignItems, display, flexShrink, justifyContent } from "styled-system";

const StepLeft = () => {
  const { total } = useWizardContext();
  return (
    <View>
      <View
        mb="50px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.4);"
        width={["350px", "350px", "100%"]}
        m="0 auto"
      >
        <View>
          <View
            backgroundColor="#1572D3"
            p="20px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <View color="#fff" fontWeight="bold">
              Gidiş Transferi{" "}
            </View>{" "}
            <View color="#fff" fontWeight="bold">
              125 km - 2 Saat, 15 Dakika
            </View>
          </View>
          <View>
            <ul
              style={{
                backgroundColor: "white",
                border: "1px solid gray",
                padding: "10px",
              }}
            >
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                Gidiş
                <View as="span" fontWeight="500">
                  16.05.2024,21:58
                </View>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                Alış Yeri
                <View as="span" fontWeight="500">
                  Antalya Havalimanı (AYT)
                </View>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                Varış Yeri
                <View as="span" fontWeight="500">
                  Alanya
                </View>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                Yolcular
                <View as="span" fontWeight="500">
                  1 Yetişkin
                </View>
              </li>
            </ul>
          </View>
        </View>

        <View>
          <View
            backgroundColor="#1572D3"
            p="15px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <View color="#fff" fontWeight="bold">
              Dönüş Transferi{" "}
            </View>{" "}
            <View color="#fff" fontWeight="bold">
              125 km - 2 Saat, 15 Dakika
            </View>
          </View>
          <View>
            <ul
              style={{
                backgroundColor: "white",
                border: "1px solid gray",
                padding: "10px",
              }}
            >
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                Gidiş
                <View as="span" fontWeight="500">
                  18.05.2024,21:58
                </View>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                Alış Yeri
                <View as="span" fontWeight="500">
                  Alanya
                </View>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                Varış Yeri
                <View as="span" fontWeight="500">
                  Antalya Havaimanı
                </View>
              </li>
              <li
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                Yolcular
                <View as="span" fontWeight="500">
                  1 Yetişkin
                </View>
              </li>
            </ul>
          </View>
        </View>
      </View>

      <View
        borderBottom="1px solid #adadad"
        pb="5px"
        my="50px"
        display="flex"
        justifyContent="space-between"
        m="30px auto"
        width={["350px", "350px", "100%"]}
      >
        <View>Toplam</View>
        <View fontWeight="bold">{total} TL</View>
      </View>
      <View width={["350px", "350px", "100%"]} m="30px auto">
        <View as="h5" my="10px" fontSize="20px" fontWeight="bold">
          7/24 Destek
        </View>
        <View backgroundColor="#ffebc7" p="15px">
          <View mb="5px">
            <View display="block" pb="5px" fontWeight="bold" as="span">
              Sorularınız için
            </View>
            <View>info@info.com</View>
          </View>
          <View>
            <View
              as="span"
              pt="15px"
              display="block"
              pb="10px"
              fontWeight="bold"
            >
              Mevcut rezervasyonla ilgili soru
            </View>
            <View>7/24 hizmetinizdeyiz</View>
            <View>0542 222 11 33</View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Step1 = () => {
  const {
    product1,
    product2,
    decrementProduct2,
    incrementProduct2,
    incrementProduct1,
    decrementProduct1,
    step,
    gotoNextStep,
  } = useWizardContext();

  return (
    <View>
      <View
        mb="20px"
        display="grid"
        border="1px solid gray"
        p="20px"
        gridTemplateColumns={["1fr", "1fr", "1fr", "1fr", "1fr auto"]}
      >
        <View display="flex" flexDirection="column">
          <View
            display="flex"
            alignItems="center"
            mr={["0", "0", "5em"]}
            flexDirection={["column", "column", "row"]}
          >
            <img src="/car.png" />
            <Title as="h5" size="xl">
              VIP Ekonomik
            </Title>
          </View>
          <View>
            <View
              backgroundColor="#d8d8d8"
              display="inline-block"
              color="#000"
              p="10px 20px"
            >
              Hizmet Bilgileri
            </View>
            <View my="20px" display="flex" flexDirection="column">
              <View as="span">Özel Transfer</View>
              <View as="span">Mercedes Vito veya VW Caravelle</View>
            </View>
            <View my="20px">
              <View>Max 8 Yolcu</View>
              <View>8 adet orta boy valiz</View>
            </View>
          </View>
        </View>

        <View>
          <View boxShadow="0 4px 8px rgba(0,0,0,0.4)" p="20px">
            <View
              position="relative"
              display="flex"
              justifyContent="space-between"
            >
              <View>
                <View>Çift Yön</View>
                <View>Özel Transfer</View>
                <View color="red" fontSize="13px" fontWeight="bold">
                  Araç Toplam Ücret
                </View>
              </View>
              <View
                position="absolute"
                color="#fff"
                p="15px 25px"
                right="0"
                display="inline-block"
                backgroundColor="orange"
              >
                4100 ₺
              </View>
            </View>

            <View mt="20px">
              <ul>
                <li>Araçta şoföre ödeme opsiyonu</li>
                <li>Koşulsuz iptal hakkı</li>
              </ul>
            </View>
            <Button
              as="button"
              onClick={gotoNextStep}
              cursor="pointer"
              width="100%"
              border="none"
              mt="20px"
              textAlign="center"
              backgroundColor="#1572D3"
              p="10px 20px"
              color="#fff"
            >
              Bu Aracı Seç
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const Step2 = () => {
  const {
    product1,
    product2,
    decrementProduct2,
    incrementProduct2,
    incrementProduct1,
    decrementProduct1,
    gotoNextStep,
  } = useWizardContext();
  return (
    <View>
      <View
        border="1px solid #adadad"
        p="10px 44px"
        display="flex"
        justifyContent="flex-end"
      >
        <View display="flex">
          <View>Gidiş</View>
          <View ml="50px">Dönüş</View>
        </View>
      </View>
      <View
        border="1px solid #adadad"
        pt="30px"
        pr="20px"
        display="grid"
        gridTemplateColumns={["1fr", "1fr", "1fr 1fr 1fr"]}
      >
        <View width={["100%", "100%", "300px"]}>
          <img src="/car.png" />
        </View>
        <View>
          <View as="h5">Bebek Koltuğu (0-2 yaş)</View>
          <View as="p">
            Bebek Araç Koltuğu(0-2 yaş) x 1(ilk koltuk ücretsiz olarak
            hizmetinize sunulur)
          </View>
          <View mt="10px" color="red" fontWeight="bold">
            {product1.quantity + product2.quantity} x {product1.price} ={" "}
            {product1.quantity * product1.price +
              product2.quantity * product2.price}
          </View>
        </View>
        <View display="flex" justifyContent="flex-end">
          <View textAlign="center">
            <View
              display="flex"
              alignItems="stretch"
              border="1px solid #ccc"
              borderRadius="3px"
              padding="5px"
              overflow="hidden"
            >
              <Button
                style={{
                  background: "red",
                  border: "none",
                  color: "#fff",
                  borderRadius: "3px",
                  width: "30px",
                  height: "30px",
                  flexShrink: "0",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={decrementProduct1}
              >
                -
              </Button>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "none",
                  padding: "1px 10px",
                  width: "30px",
                }}
              >
                {product1.quantity}
              </span>
              <Button
                style={{
                  padding: "5px 10px",
                  background: "green",
                  border: "none",
                  color: "#fff",
                  borderRadius: "3px",
                  width: "30px",
                  height: "30px",
                  flexShrink: "0",
                }}
                onClick={incrementProduct1}
              >
                +
              </Button>
            </View>
          </View>
          <View textAlign="center">
            <View
              ml="20px"
              display="flex"
              border="1px solid #ccc"
              borderRadius="3px"
              padding="5px"
              overflow="hidden"
            >
              <Button
                style={{
                  padding: "5px 10px",
                  background: "red",
                  border: "none",
                  color: "#fff",
                  borderRadius: "3px",
                  width: "30px",
                  height: "30px",
                  flexShrink: "0",
                }}
                onClick={decrementProduct2}
              >
                -
              </Button>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "none",
                  padding: "1px 10px",
                  width: "30px",
                }}
              >
                {product2.quantity}
              </span>
              <Button
                style={{
                  padding: "5px 10px",
                  background: "green",
                  border: "none",
                  color: "#fff",
                  borderRadius: "3px",
                  width: "30px",
                  height: "30px",
                  flexShrink: "0",
                }}
                onClick={incrementProduct2}
              >
                +
              </Button>
            </View>
          </View>
        </View>

        <div></div>
      </View>
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        py="20px"
      >
        <Button display="inline-flex" maxWidth="200px" onClick={gotoNextStep}>
          Devam
        </Button>
      </View>
    </View>
  );
};

const Step3 = forwardRef(({ ...otherProps }, ref) => {
  // const { data: responseSectors, error: responseSectorError } = useSWR(
  //   `fetch-sectors`,
  //   () => fetchSectorWithClasses()
  // )

  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      surname: "",
      email: "",
      name: "",
      isKvkk: false,
      phone: "",
      company: "",
      address: "",
      flightno: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data, "data");
  };

  return (
    <View width="100%" {...otherProps}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <View background="#ffebc7" p="20px">
          <Title fontSize="20px" fontWeight="regular">
            Yolcu Karşılama ve İletişim Bilgileri
          </Title>
        </View>
        <View
          mt="20px"
          mb="20px"
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
          gridRowGap="20px"
          gridColumnGap="50px"
          ref={ref}
        >
          <Controller
            control={control}
            name="name"
            rules={{
              required: {
                value: true,
                message: "Lütfen marka alanını doldurunuz",
              },
              minLength: {
                value: 4,
                message: "Lütfen en az 4 karakter giriniz",
              },
              maxLength: {
                value: 50,
                message: "Lütfen en fazla 50 karakter giriniz",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FieldArea variant="bordered" error={error}>
                <Icon icon="user" />
                <TextField placeholder="Ad" {...field}></TextField>
              </FieldArea>
            )}
          />

          <Controller
            control={control}
            name="surname"
            rules={{
              required: {
                value: true,
                message: "Lütfen marka alanını doldurunuz",
              },
              minLength: {
                value: 4,
                message: "Lütfen en az 4 karakter giriniz",
              },
              maxLength: {
                value: 50,
                message: "Lütfen en fazla 50 karakter giriniz",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FieldArea variant="bordered" error={error}>
                <Icon icon="user" />
                <TextField placeholder="Soyad" {...field}></TextField>
              </FieldArea>
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: {
                value: true,
                message: "Lütfen marka alanını doldurunuz",
              },
              minLength: {
                value: 4,
                message: "Lütfen en az 4 karakter giriniz",
              },
              maxLength: {
                value: 50,
                message: "Lütfen en fazla 50 karakter giriniz",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FieldArea variant="bordered" error={error}>
                <Icon icon="email" />
                <TextField placeholder="Email" {...field}></TextField>
              </FieldArea>
            )}
          />

          <Controller
            control={control}
            name="phone"
            rules={{
              required: {
                value: true,
                message: "Lütfen telefon alanını doldurunuz",
              },
              pattern: {
                value: pattern.PHONE_NUMBER,
                message: "Lütfen geçerli bir telefon numarası giriniz",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FieldArea variant="bordered" error={error}>
                <Icon icon="mobile" />

                <TextField type="tel" placeholder="Telefon" {...field} />
              </FieldArea>
            )}
          />

          <Controller
            control={control}
            name="isKvkk"
            rules={{
              required: {
                value: true,
                message: "Bilgileniz ile arama yapabilmek için kabul ediniz",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FieldArea mt="10px" variant="transparent" error={error}>
                <Checkbox id="check-kvkk" {...field} isChecked={field.value}>
                  <Text fontSize="12px" width="400px">
                    WhatsApp üzerinden bilgilendirme yapılmasını kabul ediyorum
                  </Text>
                </Checkbox>
              </FieldArea>
            )}
          />
        </View>
        <View background="#ffebc7" p="20px">
          <Title fontSize="20px" fontWeight="regular">
            1. Gidiş Transferi{" "}
            <View display="block" as="span">
              Antalya-Havalimanı(AYT) - Alanya
            </View>
            <View display="block" as="span">
              16.5.2024, 21:58
            </View>
          </Title>
        </View>
        <View
          mt="20px"
          mb="20px"
          display="grid"
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr"]}
          gridRowGap="20px"
          gridColumnGap="50px"
          ref={ref}
        >
          <Controller
            control={control}
            name="company"
            rules={{
              required: {
                value: true,
                message: "Lütfen marka alanını doldurunuz",
              },
              minLength: {
                value: 4,
                message: "Lütfen en az 4 karakter giriniz",
              },
              maxLength: {
                value: 50,
                message: "Lütfen en fazla 50 karakter giriniz",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FieldArea
                variant="bordered"
                error={error}
                flexDirection="column"
                alignItems="flex-start"
              >
                <View>Havayolu şirketi</View>
                <View mb="20px" as="p" fontSize="13px" color="gray">
                  Bilet bilgilerinize göre uçuşu takip edeceğiz ve sizi tam
                  zamanında karşılayacağız{" "}
                </View>

                <TextField placeholder="Pegasus" {...field}></TextField>
              </FieldArea>
            )}
          />

          <Controller
            control={control}
            name="address"
            rules={{
              required: {
                value: true,
                message: "Lütfen marka alanını doldurunuz",
              },
              minLength: {
                value: 4,
                message: "Lütfen en az 4 karakter giriniz",
              },
              maxLength: {
                value: 50,
                message: "Lütfen en fazla 50 karakter giriniz",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FieldArea
                variant="bordered"
                error={error}
                flexDirection="column"
                alignItems="flex-start"
              >
                <View>Bırakma yeri: Otel Adı veya Adres </View>
                <View mb="20px" as="p" fontSize="13px" color="gray">
                  Sizi bırakacağımız adresi ya da otel ismini yazın veya
                  listeden seçin
                </View>
                <TextField placeholder="Alanya" {...field}></TextField>
              </FieldArea>
            )}
          />

          <Controller
            control={control}
            name="flightno"
            rules={{
              required: {
                value: true,
                message: "Lütfen marka alanını doldurunuz",
              },
              minLength: {
                value: 4,
                message: "Lütfen en az 4 karakter giriniz",
              },
              maxLength: {
                value: 50,
                message: "Lütfen en fazla 50 karakter giriniz",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FieldArea
                variant="bordered"
                error={error}
                flexDirection="column"
                alignItems="flex-start"
              >
                <View mb="20px">Uçuş No </View>

                <TextField placeholder="TK1440" {...field}></TextField>
              </FieldArea>
            )}
          />

          <Controller
            control={control}
            name="message"
            rules={{
              required: {
                value: true,
                message: "Lütfen marka alanını doldurunuz",
              },
              minLength: {
                value: 4,
                message: "Lütfen en az 4 karakter giriniz",
              },
              maxLength: {
                value: 50,
                message: "Lütfen en fazla 50 karakter giriniz",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FieldArea
                variant="bordered"
                error={error}
                flexDirection="column"
                alignItems="flex-start"
              >
                <View mb="20px">Şoföre Mesajınız </View>

                <TextField
                  placeholder="Transferiniz ile ilgili eklemek istediğiniz bilgi"
                  {...field}
                ></TextField>
              </FieldArea>
            )}
          />
        </View>

        <Button as="button">Rezervasyon Oluştur</Button>
      </form>
    </View>
  );
});

const Wizard = () => {
  const {
    product1,
    product2,
    decrementProduct2,
    incrementProduct2,
    incrementProduct1,
    decrementProduct1,
    step,
    setStep,
  } = useWizardContext();
  return (
    <Grid gridTemplateColumns={["1fr", "1fr", "400px 1fr"]} gridGap="30px">
      <View>
        <StepLeft />
      </View>
      <View>
        {step === 1 ? <Step1 /> : null}
        {step === 2 ? <Step2 /> : null}
        {step === 3 ? <Step3 /> : null}
      </View>
    </Grid>
  );
};

export default function Home() {
  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER - Ana sayfa</title>
        <meta name="description" content="VICTORIA TRANSFER " />
        <meta name="keywords" content="VICTORIA TRANSFER" />
        <meta property="og:title" content="VICTORIA TRANSFER" />
        <meta property="og:description" content="VICTORIA TRANSFER" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:title" content="VICTORIA TRANSFER" />
        <meta name="twitter:description" content="VICTORIA TRANSFER" />
        <meta name="twitter:image" content="/logo.png" />
      </Head>
      <WizardProvider>
        <Section
          my={["100px", "100px", "200px"]}
          style={{
            backgroundSize: "cover",
          }}
        >
          <Container>
            <Wizard />
          </Container>
        </Section>
      </WizardProvider>
    </>
  );
}
