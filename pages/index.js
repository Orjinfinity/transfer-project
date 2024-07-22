import Head from "next/head";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { useSWR } from "swr";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  fetchVehicles,
  getImageUrl,
  fetchTransferPoints,
  getTransferPoints,
  getVehicles,
  getTestimonials,
  getDestinations,
} from "../service";

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
  PersonSelect,
} from "@/components";
import { Tabs, Tab, Content } from "../components/tab/Tab";
import Background from "../assets/img/bg.jpeg";
import Airplane from "../assets/icons/airplane.svg";
import MoneyRecive from "../assets/icons/money-recive.svg";
import Calendar from "../assets/icons/calendar.svg";
import House from "../assets/icons/house.svg";
import Door from "../assets/icons/door.svg";
import Air from "../assets/icons/air.svg";
import Auto from "../assets/icons/auto.svg";
import User from "../assets/icons/user.svg";
import Star from "../assets/icons/star.svg";
import Navigation from "../assets/icons/navigation.svg";
import ArrowRight from "../assets/icons/arrow-right.svg";
import Wallet from "../assets/icons/wallet.svg";
import UserTick from "../assets/icons/user-tick.svg";
import Support from "../assets/icons/24-support.svg";
import Messages from "../assets/icons/messages-2.svg";
import UserForm from "../assets/icons/user-form.svg";
import LocationForm from "../assets/icons/location-form.svg";
import PlusForm from "../assets/icons/plus-form.svg";
import CalendarForm from "../assets/icons/calendar-form.svg";
import AirPlaneForm from "../assets/icons/airplane-form.svg";
import Select from "components/select/Select";
import { flexDirection, fontSize, marginLeft } from "styled-system";
import SelectToggle from "components/select/SelectToggle";
import PlusVector from "../assets/icons/plusVector.svg";
import MinusVector from "../assets/icons/minusVector.svg";

const DateInput = (props) => {
  return (
    <View
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={props.onClick}
    >
      <CalendarForm />
      <View display="flex" alignItems="start" ml="20px" flexDirection="column">
        <View>{props.title}</View>
        <View fontSize="14px" color="#B6B6B6">
          {props.value || props.placeholder}
        </View>
      </View>
    </View>
  );
};

export default function Home({ pageProps }) {
  const { transferPoints, vehicles, testimonials, destinations } = pageProps;

  const schema = yup.object().shape({
    fromSearch: yup
      .object()
      .shape({
        label: yup.string().required("Bu alan boş bırakılamaz"),
        value: yup.string().required("Bu alan boş bırakılamaz"),
      })
      .required("Bu alan boş bırakılamaz")
      .nullable(),
    toSearch: yup.object().required("Gideceğiniz yer belirtilmelidir"),
    pickupDate: yup
      .date()
      .required("Alış tarihi belirtilmelidir")
      .min(new Date(), "Alış tarihi geçmişte olamaz"),
    returnDate: yup
      .date()
      .required("Dönüş tarihi belirtilmelidir")
      .min(yup.ref("pickupDate"), "Dönüş tarihi, alış tarihinden önce olamaz"),
    passengers: yup
      .object()
      .required("Bu alan boş bırakılmaz")
      .shape({
        adult: yup
          .number()
          .min(1, "En az bir yetişkin yolcu belirtilmelidir")
          .required("Yetişkin yolcu sayısı belirtilmelidir"),
        child: yup
          .number()
          .min(0, "Çocuk yolcu sayısı negatif olamaz")
          .required("Çocuk yolcu sayısı belirtilmelidir"),
        baby: yup
          .number()
          .min(0, "Bebek yolcu sayısı negatif olamaz")
          .required("Bebek yolcu sayısı belirtilmelidir"),
      }),
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fromSearch: "",
      toSearch: "",
      pickupDate: new Date(),
      returnDate: new Date(),
      passengers: {
        adult: 2,
        child: 1,
        baby: 1,
      },
    },
  });
  console.log(errors, "errors");

  const pickupDate = watch("pickupDate");

  const router = useRouter();

  const filteredPassedDate = (date) => {
    const currentDate = pickupDate;
    const selectedDate = new Date(date);

    return currentDate < selectedDate;
  };

  const handleSearch = () => {
    router.push("/transfer-sorgu");
  };

  const onSubmit = (data) => {
    // const queryParams = new URLSearchParams(data);
    const { fromSearch, toSearch, passengers, pickupDate, returnDate } = data;
    // const pess = Object.entries(passengers);
    const passengerAdult = passengers?.adult;
    const passengerBaby = passengers?.baby;
    const passengerChild = passengers?.child;
    router.push(
      `/transfer-sorgu?fromSearch=${fromSearch?.label}&toSearch=${toSearch?.label}&passengerAdult=${passengerAdult}&passengerBaby=${passengerBaby}&passengerChild=${passengerChild}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
    console.log("Form Data:", data);
  };

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

      <BreadCrumb
        backgroundImage={`url(${Background.src})`}
        height="calc(100vh - 80px)"
      >
        <Title mt="100px" fontSize={["40px", "40px", "60px"]}>
          Find and book your transfer in Antalya easily
        </Title>
        <View
          as="p"
          m="0 auto"
          mt="68px"
          fontSize=".7em"
          color="#000"
          fontWeight="bold"
          backgroundColor="#fff"
          borderRadius="10px"
          p="6px"
        >
          If you buy the return transfer now, your return will be rewarded 10%
          discount
        </View>

        <form onSubmit={handleSubmit(onSubmit)}>
          <View
            backgroundColor="white"
            margin="0 auto"
            padding="20px"
            borderRadius="10px"
            width="1100px"
            mt="30px"
          >
            <View
              display="grid"
              gridGap="10px"
              gridTemplateColumns={[
                "1fr 1fr",
                "1fr 1fr",
                "1fr 1fr 1fr 1fr 1fr 1fr",
              ]}
              justifyContent="space-between"
            >
              <View
                afterLine
                style={{ cursor: "pointer" }}
                display="flex"
                position="relative"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
              >
                <View>
                  <Controller
                    name="fromSearch"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View display="flex" alignItems="center">
                        <View fontSize="14px" color="#B6B6B6">
                          <Select
                            id="from"
                            buttonProps={{
                              p: "0",
                              color: "red",
                              fontSize: "14px",
                            }}
                            value={value}
                            onChange={onChange}
                            placeholder="Search"
                            renderSelectToggle={({
                              toggleSelect,
                              selectedOptions,
                              placeholder,
                            }) => {
                              return (
                                <View
                                  display="flex"
                                  alignItems="center"
                                  onClick={toggleSelect}
                                >
                                  <AirPlaneForm />
                                  <View
                                    display="flex"
                                    alignItems="flex-start"
                                    flexDirection="column"
                                    marginLeft="10px"
                                  >
                                    <View>From</View>
                                    {selectedOptions?.label || placeholder}
                                  </View>
                                </View>
                              );
                            }}
                          >
                            {transferPoints?.map((point) => {
                              return (
                                <Select.Option
                                  value={point?._id}
                                  label={point?.name}
                                />
                              );
                            })}
                          </Select>
                        </View>
                      </View>
                    )}
                  />
                  <View color="red" fontSize="11px" as="span">
                    {" "}
                    {errors.fromSearch && <p>{errors.fromSearch.message}</p>}
                  </View>
                </View>
              </View>

              <View
                afterLine
                style={{ cursor: "pointer" }}
                display="flex"
                position="relative"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
              >
                <View>
                  <Controller
                    name="toSearch"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View display="flex" alignItems="center">
                        <View
                          display="flex"
                          alignItems="flex-start"
                          flexDirection="column"
                        >
                          <View fontSize="14px" color="#B6B6B6">
                            <Select
                              buttonProps={{
                                p: "0",
                                color: "red",
                                fontSize: "14px",
                              }}
                              value={value}
                              onChange={onChange}
                              placeholder="Search"
                              renderSelectToggle={({
                                toggleSelect,
                                selectedOptions,
                                placeholder,
                              }) => {
                                return (
                                  <View
                                    display="flex"
                                    alignItems="center"
                                    onClick={toggleSelect}
                                  >
                                    <LocationForm />
                                    <View
                                      display="flex"
                                      alignItems="flex-start"
                                      flexDirection="column"
                                      marginLeft="10px"
                                    >
                                      <View>To</View>
                                      {selectedOptions?.label || placeholder}
                                    </View>
                                  </View>
                                );
                              }}
                            >
                              {transferPoints?.map((point) => {
                                console.log(transferPoints);
                                return (
                                  <Select.Option
                                    value={point?._id}
                                    label={point?.name}
                                  />
                                );
                              })}
                            </Select>
                          </View>
                        </View>
                      </View>
                    )}
                  />
                </View>
              </View>

              <View>
                <View
                  afterLine
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Controller
                    name="pickupDate"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        selected={value}
                        onChange={(date) => onChange(date)}
                        showTimeSelect
                        excludeTimes={[
                          setHours(setMinutes(new Date(), 0), 17),
                          setHours(setMinutes(new Date(), 30), 18),
                          setHours(setMinutes(new Date(), 30), 19),
                          setHours(setMinutes(new Date(), 30), 17),
                        ]}
                        dateFormat="dd:MM:yyyy h:mm"
                        popperPlacement="bottom-start"
                        placeholderText="Add Pickup Date"
                        title="Pickup Date"
                        customInput={<DateInput />}
                      />
                    )}
                  />
                </View>
                <View
                  color="red"
                  fontSize="11px"
                  maxWidth="300px"
                  display="inline-block"
                  as="span"
                >
                  {" "}
                  {errors.pickupDate && <p>{errors.pickupDate.message}</p>}
                </View>
              </View>

              <View>
                <View
                  afterLine
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Controller
                    name="returnDate"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        selected={value}
                        onChange={(date) => onChange(date)}
                        showTimeSelect
                        dateFormat="dd:MM:yyyy h:mm"
                        popperPlacement="bottom-start"
                        placeholderText="Add Return Date"
                        title="Return Date"
                        filterDate={filteredPassedDate}
                        customInput={<DateInput />}
                      />
                    )}
                  />
                </View>
                <View
                  color="red"
                  fontSize="11px"
                  maxWidth="300px"
                  display="inline-block"
                  as="span"
                >
                  {" "}
                  {errors.returnDate && <p>{errors.returnDate.message}</p>}
                </View>
              </View>

              {/* 
                <View
                  afterLine
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Controller
                    name="passenger"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <View display="flex">
                        <Select
                          id="from"
                          buttonProps={{
                            p: "0",
                            color: "red",
                            fontSize: "14px",
                          }}
                          multiple
                          value={value}
                          onChange={(newValue) => {
                            console.log("Selected option:", newValue);
                            onChange(newValue);
                          }}
                          placeholder="Transport"
                          renderSelectToggle={({
                            toggleSelect,
                            selectedOptions,
                            placeholder,
                          }) => {
                            console.log("Selected options:", selectedOptions);
                            console.log("Placeholder:", placeholder);
                            return (
                              <View
                                display="flex"
                                alignItems="center"
                                onClick={toggleSelect}
                              >
                                <UserForm />
                                <View
                                  display="flex"
                                  alignItems="flex-start"
                                  flexDirection="column"
                                  marginLeft="10px"
                                >
                                  <View>Passengers</View>

                                  <View
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <View fontSize="10px" mr="8px">
                                      {" "}
                                      {selectedOptions?.label || placeholder}
                                    </View>
                                    <PlusForm />
                                  </View>
                                </View>
                              </View>
                            );
                          }}
                        >
                          <Select.Option value="option1" label="Option 1" />
                          <Select.Option value="option2" label="Option 2" />
                          <Select.Option value="option3" label="Option 3" />
                        </Select>
                      </View>
                    )}
                  />
                </View> */}

              <View
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent={["space-between", "space-between", "center"]}
              >
                <View mb="20px">
                  <Controller
                    name="passengers"
                    control={control}
                    render={({ field }) => (
                      <PersonSelect {...field}>
                        <View display="flex" alignItems="center">
                          <UserForm />
                          <View
                            display="flex"
                            alignItems="flex-start"
                            flexDirection="column"
                            marginLeft="10px"
                          >
                            <span>Passengers</span>

                            <View
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Text
                                as="span"
                                mr="5px"
                                fontSize="1em"
                                display="block"
                              >
                                {Object.values(field.value).reduce(
                                  (acc, p) => acc + p,
                                  0
                                )}
                              </Text>
                              <PlusForm />
                            </View>
                          </View>
                        </View>
                      </PersonSelect>
                    )}
                  />
                  <View
                    color="red"
                    fontSize="11px"
                    maxWidth="300px"
                    display="inline-block"
                    as="span"
                  >
                    {" "}
                    {errors.passengers && <p>{errors.passengers.message}</p>}
                  </View>
                </View>
              </View>

              <Button as="button">Ara</Button>
            </View>
          </View>
        </form>
        {/* <View
            backgroundColor="white"
            margin="0 auto"
            padding="20px"
            borderRadius="10px"
            width="1100px"
            mt="30px"
          >
            <View
              display="grid"
              gridGap="10px"
              gridTemplateColumns="auto auto auto auto auto auto"
            >
              <View display="flex" alignItems="center" justifyContent="center">
                <AirPlaneForm />
                <View
                  display="flex"
                  alignItems="start"
                  ml="20px"
                  flexDirection="column"
                >
                  <View>From</View>
                  <View fontSize="14px" color="#B6B6B6">
                    Search
                  </View>
                </View>
              </View>

              <View
                style={{ cursor: "pointer" }}
                display="flex"
                position="relative"
                ml="20px"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
              >
                <LocationForm />
                <View>
                  <View>To</View>
                  <View fontSize="14px" color="#B6B6B6">
                    Search
                  </View>
                  <Select>
                    <Select.Option
                      value="option1"
                      label="Option 1"
                    ></Select.Option>
                    <Select.Option
                      value="option2"
                      label="Option 2"
                    ></Select.Option>
                  </Select>
                </View>
              </View>

              <View display="flex" alignItems="center" justifyContent="center">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  excludeTimes={[
                    setHours(setMinutes(new Date(), 0), 17),
                    setHours(setMinutes(new Date(), 30), 18),
                    setHours(setMinutes(new Date(), 30), 19),
                    setHours(setMinutes(new Date(), 30), 17),
                  ]}
                  dateFormat="dd:MM:yyyy h:mm"
                  popperPlacement="bottom-start"
                  placeholderText="Add Pickup Date"
                  title="Pickup Date"
                  customInput={<DateInput />}
                />
              </View>

              <View display="flex" alignItems="center" justifyContent="center">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  excludeTimes={[
                    setHours(setMinutes(new Date(), 0), 17),
                    setHours(setMinutes(new Date(), 30), 18),
                    setHours(setMinutes(new Date(), 30), 19),
                    setHours(setMinutes(new Date(), 30), 17),
                  ]}
                  dateFormat="dd:MM:yyyy h:mm"
                  popperPlacement="bottom-start"
                  placeholderText="Add Return Date"
                  title="Return Date"
                  filterDate={filteredPassedDate}
                  customInput={<DateInput />}
                />
              </View>

              <View display="flex" alignItems="center" justifyContent="center">
                <UserForm />
                <View
                  display="flex"
                  alignItems="start"
                  ml="20px"
                  flexDirection="column"
                >
                  <View>Passengers</View>
                  <View
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="14px"
                    color="#B6B6B6"
                  >
                    0 <PlusForm />
                  </View>
                </View>
              </View>

              <Button onClick={handleSearch}>Search</Button>
            </View>
          </View> */}
      </BreadCrumb>
      <Section
        my="55px"
        style={{
          backgroundSize: "cover",
        }}
      >
        <Container>
          <View textAlign="center" mb={["40px", "40px", "80px"]}>
            <Tag>OUR SERVİCES</Tag>
            <View
              mt={["20px", "20px", "50px"]}
              as="h2"
              fontSize={["24px", "24px", "38px"]}
            >
              Why book a transfer from Victoria?
            </View>
          </View>

          <Grid
            gridTemplateColumns={["1fr", "1fr", "1fr 1fr 1fr 1fr"]}
            gridGap={["40px", "40px", "0px"]}
          >
            <View
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <View
                width="112px"
                height="112px"
                borderRadius="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#ECF5FF"
              >
                <Airplane />{" "}
              </View>
              <View>
                <View pt="40px" pb="20px" as="h5" fontSize="20px" color="#000">
                  Welcoming
                </View>
                <View
                  m="0 auto"
                  maxWidth="180px"
                  as="p"
                  color="#6D6D6D"
                  fontSize="14px"
                >
                  From the minute one you will enjoy Turkish Hopitality
                  completely free
                </View>
              </View>
            </View>

            <View
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <View
                width="112px"
                height="112px"
                borderRadius="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#ECF5FF"
              >
                <MoneyRecive />{" "}
              </View>
              <View>
                <View pt="40px" pb="20px" as="h5" fontSize="20px" color="#000">
                  Reasonable Prices
                </View>
                <View
                  maxWidth="180px"
                  m="0 auto"
                  as="p"
                  color="#6D6D6D"
                  fontSize="14px"
                >
                  Our prices are quite competable for the market
                </View>
              </View>
            </View>

            <View
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <View
                width="112px"
                height="112px"
                borderRadius="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#ECF5FF"
              >
                <Calendar />{" "}
              </View>
              <View>
                <View pt="40px" pb="20px" as="h5" fontSize="20px" color="#000">
                  Timely Transit
                </View>
                <View
                  maxWidth="180px"
                  m="0 auto"
                  as="p"
                  color="#6D6D6D"
                  fontSize="14px"
                >
                  We are punctual when it times to time
                </View>
              </View>
            </View>

            <View
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            >
              <View
                width="112px"
                height="112px"
                borderRadius="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#ECF5FF"
              >
                <House />{" "}
              </View>
              <View>
                <View pt="40px" pb="20px" as="h5" fontSize="20px" color="#000">
                  Door-to-Door Delivery
                </View>
                <View
                  maxWidth="180px"
                  m="0 auto"
                  as="p"
                  color="#6D6D6D"
                  fontSize="14px"
                >
                  We will take you directly to door of your hotel
                </View>
              </View>
            </View>
          </Grid>
        </Container>
      </Section>

      <Section
        my="55px"
        py="100px"
        style={{
          backgroundSize: "cover",
          backgroundColor: "#ECF5FF",
        }}
      >
        <Container>
          <View textAlign="center" mb={["30px", "30px", "80px"]}>
            <Tag>OUR FLEET</Tag>
            <View
              mt={["30px", "30px", "50px"]}
              as="h2"
              fontSize={["27px", "27px", "38px"]}
            >
              Take a look at our brand new fleet
            </View>
          </View>

          <Grid
            gridTemplateColumns={["1fr", "1fr", "250px 250px 250px"]}
            alignItems="center"
            justifyContent="center"
            gridGap="32px"
          >
            {vehicles?.map((vehicle) => (
              <LogisticsCard key={vehicle._id}>
                {vehicle?.imageUrl ? <Image src={vehicle.imageUrl} /> : null}
                <LogisticsCard.Title>{vehicle?.type}</LogisticsCard.Title>
                <View
                  display="flex"
                  flexWrap="wrap"
                  justifyContent="space-between"
                >
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <User />
                    </View>
                    {vehicle?.passengerCapacity} Passagers
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Auto />
                    </View>
                    {vehicle?.transmission}
                  </LogisticsCard.Desc>
                  <LogisticsCard.Desc>
                    <View mr="5px">
                      <Air />
                    </View>
                    {vehicle?.features.includes("airConditioning")
                      ? "Air Conditioning"
                      : "No Air Conditioning"}
                  </LogisticsCard.Desc>
                  {/* <LogisticsCard.Desc>
                    <View mr="5px">
                      <Door />
                    </View>
                    {vehicle?.attributes?.has_ac} Doors
                  </LogisticsCard.Desc> */}
                </View>
              </LogisticsCard>
            ))}
          </Grid>
          <View textAlign="center" mt={["30px", "30px", "64px"]}>
            <View
              as="a"
              href="#"
              p="19px 34px"
              display="inline-block"
              borderRadius="8px"
              backgroundColor="#fff"
              color="#4E4E4E"
              fontSize="14px"
            >
              Show all vehicles{" "}
            </View>
          </View>
        </Container>
      </Section>

      <Section
        my="55px"
        style={{
          backgroundSize: "cover",
          backgroundColor: "#F7FBFF",
        }}
      >
        <Container>
          <View textAlign="center" mb={["30px", "30px", "80px"]}>
            <Tag>OUR CUSTOMERS</Tag>
            <View
              mt={["20px", "20px", "50px"]}
              as="h2"
              fontSize={["27px", "27px", "38px"]}
            >
              What peole say about us?
            </View>
          </View>
        </Container>

        <Slider>
          {testimonials?.map((testimonial) => (
            <Slider.Item key={testimonial?._id}>
              <CustomerCard py="13.5px">
                {testimonial?.photoUrl ? (
                  <Image
                    src={testimonial?.photoUrl}
                    maxWidth="50%"
                    width="auto"
                  />
                ) : null}
                <View px="40px" py="26px">
                  <View lineHeight="1" pb="24px" fontSize="64px" as="h5">
                    {testimonial?.rating ? (
                      <>
                        {testimonial?.rating}
                        <View fontSize="24px" as="span">
                          stars
                        </View>
                      </>
                    ) : null}
                  </View>
                  <Star />
                  <View mt="48px" mb="80px">
                    <View as="p" fontSize="18px">
                      {testimonial?.feedback}
                    </View>
                  </View>
                  <View>
                    <View as="h6" fontSize="24px">
                      {testimonial?.name}
                    </View>
                    <View as="span" color="#838383">
                      {testimonial?.location}
                    </View>
                  </View>
                </View>
              </CustomerCard>
            </Slider.Item>
          ))}
        </Slider>
      </Section>

      <Section
        my="55px"
        style={{
          backgroundSize: "cover",
          backgroundColor: "#fff",
        }}
      >
        <Container>
          <View textAlign="center" mb="64px">
            <Tag>TOP BOOKED</Tag>
            <View mt="50px" as="h2" fontSize={["27px", "27px", "38px"]}>
              Top Destinations
            </View>
          </View>

          <Grid
            gridTemplateColumns={["1fr", "1fr", "275px 275px 275px"]}
            gridGap="64px"
            justifyContent="center"
          >
            {destinations?.map((destination) => (
              <Destinations
                key={destination?._id}
                borderRadius="32px !important"
              >
                {destination?.imageUrl ? (
                  <View>
                    <Image src={destination?.imageUrl} />
                  </View>
                ) : null}
                <View px="15px">
                  <View
                    fontSize="18px"
                    pb="16px"
                    color="#5E6282"
                    as="h5"
                    pt="25px"
                  >
                    {destination?.title}
                  </View>
                  <View
                    as="span"
                    display="flex"
                    alignItems="center"
                    fontSize="16px"
                    pb="37px"
                    color="#5E6282"
                  >
                    <View pr="10px">
                      <Navigation />
                    </View>
                    {destination?.location}
                  </View>
                </View>
              </Destinations>
            ))}
          </Grid>

          <View display="flex" justifyContent="center" mt="64px">
            <View display="flex" as="a" href="#" fontSize="14px">
              Show all destinations{" "}
              <View pl="8px">
                <ArrowRight />
              </View>
            </View>
          </View>
        </Container>
      </Section>

      <Section
        display="flex"
        my="55px"
        alignItems={["center", "center", "left"]}
        flexDirection={["column", "column", "row"]}
        style={{
          backgroundSize: "cover",
          backgroundColor: "#fff",
        }}
      >
        <View>
          <Image width={["100%", "100%", "758px"]} src="/chouseus.png" />
        </View>

        <Container>
          <View>
            <View>
              <Tag>WHY CHOOSE US</Tag>
              <View
                mt="30px"
                as="h2"
                fontSize={["27px", "27px", "38px"]}
                maxWidth="576px"
              >
                We offer the best experience with our booking deals
              </View>
            </View>

            <View display="flex" mt="35px">
              <View
                mr="24px"
                width="64px"
                height="64px"
                p="20px"
                borderRadius="16px"
                backgroundColor="#ECF5FF"
              >
                <Wallet />
              </View>
              <View maxWidth="322px">
                <View
                  as="h5"
                  lineHeight="1"
                  mb="20px"
                  fontSize="20px"
                  color="#000"
                >
                  Best price guaranteed
                </View>
                <View as="p" fontSize="16px" color="#6D6D6D">
                  Find a lower price? We’ll refund you 100% of the difference.
                </View>
              </View>
            </View>

            <View display="flex" mt="35px">
              <View
                mr="24px"
                width="64px"
                height="64px"
                p="20px"
                borderRadius="16px"
                backgroundColor="#ECF5FF"
              >
                <UserTick />
              </View>
              <View maxWidth="322px">
                <View
                  as="h5"
                  lineHeight="1"
                  mb="20px"
                  fontSize="20px"
                  color="#000"
                >
                  Experience driver
                </View>
                <View as="p" fontSize="16px" color="#6D6D6D">
                  Don’t have driver? Don’t worry, we have many experienced
                  driver for you.
                </View>
              </View>
            </View>

            <View display="flex" mt="35px">
              <View
                mr="24px"
                width="64px"
                height="64px"
                p="20px"
                borderRadius="16px"
                backgroundColor="#ECF5FF"
              >
                <Support />
              </View>
              <View maxWidth="322px">
                <View
                  as="h5"
                  lineHeight="1"
                  mb="20px"
                  fontSize="20px"
                  color="#000"
                >
                  24 hour car delivery
                </View>
                <View as="p" fontSize="16px" color="#6D6D6D">
                  Book your car anytime and we will deliver it directly to you.
                </View>
              </View>
            </View>

            <View display="flex" mt="35px">
              <View
                mr="24px"
                width="64px"
                height="64px"
                p="20px"
                borderRadius="16px"
                backgroundColor="#ECF5FF"
              >
                <Messages />
              </View>
              <View maxWidth="322px">
                <View
                  as="h5"
                  lineHeight="1"
                  mb="20px"
                  fontSize="20px"
                  color="#000"
                >
                  24/7 technical support
                </View>
                <View as="p" fontSize="16px" color="#6D6D6D">
                  Have a question? Contact Rentcars support any time when you
                  have problem.
                </View>
              </View>
            </View>
          </View>
        </Container>
      </Section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const vehicles = await getVehicles();
  // const transferPoints = await fetchTransferPoints()
  const transferPoints = await getTransferPoints();
  const testimonials = await getTestimonials();
  const destinations = await getDestinations();

  return {
    props: {
      vehicles,
      transferPoints,
      testimonials,
      destinations,
      locale,
    },
  };
}
