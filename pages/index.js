import Head from "next/head";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getStartingPoints,
  getDestinationPoints,
  getTransferPoints,
  getVehicles,
  getTestimonials,
  getSearchRoute,
  postSearchQuery,
  getTopDestinations,
} from "../service";
import {
  View,
  Title,
  Container,
  Section,
  Grid,
  Image,
  Text,
  Button,
  Slider,
  BreadCrumb,
  LogisticsCard,
  Tag,
  CustomerCard,
  Destinations,
  PersonSelect,
  FieldArea,
} from "@/components";
import trLocale from "date-fns/locale/tr";
import enLocale from "date-fns/locale/en-US";
import ruLocale from "date-fns/locale/ru";
import deLocale from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";
import Select from "@/components/select/Select";
import Background from "@/assets/img/bg.jpeg";
import Airplane from "@/assets/icons/airplane.svg";
import MoneyRecive from "@/assets/icons/money-recive.svg";
import Calendar from "@/assets/icons/calendar.svg";
import House from "@/assets/icons/house.svg";
import Air from "@/assets/icons/air.svg";
import Auto from "@/assets/icons/auto.svg";
import User from "@/assets/icons/user.svg";
import Star from "@/assets/icons/star.svg";
import Navigation from "@/assets/icons/navigation.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import Wallet from "@/assets/icons/wallet.svg";
import UserTick from "@/assets/icons/user-tick.svg";
import Support from "@/assets/icons/24-support.svg";
import Messages from "@/assets/icons/messages-2.svg";
import UserForm from "@/assets/icons/user-form.svg";
import LocationForm from "@/assets/icons/location-form.svg";
import LoadingIcon from "@/assets/icons/loading.svg";
import PlusForm from "@/assets/icons/plus-form.svg";
import CalendarForm from "@/assets/icons/calendar-form.svg";
import HotelIcon from "@/assets/icons/hotel.svg";
import StationIcon from "@/assets/icons/station.svg";
import PortIcon from "@/assets/icons/port.svg";
import CityCenterIcon from "@/assets/icons/city-center.svg";
import OtherIcon from "@/assets/icons/other.svg";
import { useTranslations } from "next-intl";

const POINT_ICONS = {
  airport: <Airplane width="16px" height="16px" />,
  hotel: <HotelIcon width="16px" height="16px" />,
  station: <StationIcon width="16px" height="16px" />,
  port: <PortIcon width="16px" height="16px" />,
  city_center: <CityCenterIcon width="16px" height="16px" />,
  other: <OtherIcon width="16px" height="16px" />,
};

const DateInput = (props) => {
  return (
    <View
      padding="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={props.onClick}
    >
      <CalendarForm />
      <View
        display="flex"
        alignItems="flex-start"
        ml="10px"
        flexDirection="column"
      >
        <Text as="span" textAlign="left">
          {props.title}
        </Text>
        <Text as="span" fontSize="14px" color="#B6B6B6">
          {props.value || props.placeholder}
        </Text>
      </View>
    </View>
  );
};

const fnsLangs = {
  tr: trLocale,
  en: enLocale,
  ru: ruLocale,
  de: deLocale,
};

const schema = yup.object().shape({
  fromSearch: yup
    .mixed()
    .test("required", "Alış yeri belirtilmelidir", (field) => {
      return !!field.value;
    }),
  toSearch: yup
    .mixed()
    .test("required", "Gideceğiniz yer belirtilmelidir", (field) => {
      return !!field.value;
    }),
  pickupDate: yup
    .date()
    .required("Alış tarihi belirtilmelidir")
    .min(new Date(), "Alış tarihi geçmişte olamaz"),
  passengers: yup
    .mixed()
    .test("required", "Gideceğiniz yer belirtilmelidir", (field) => {
      return field.adult > 0;
    }),
});

export default function Home({ pageProps }) {
  const { vehicles, testimonials, startingPoints, topDestinations, locale } =
    pageProps;

  const dateFnsLocale = fnsLangs[locale] || enLocale;

  const t = useTranslations();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fromSearch: { value: "" },
      toSearch: { value: "" },
      pickupDate: new Date(),
      returnDate: new Date(),
      passengers: {
        adult: 0,
        child: 0,
        baby: 0,
      },
    },
  });

  const [pickupDate, fromSearch] = watch(["pickupDate", "fromSearch"]);

  const { trigger: postSearchQueryTrigger, isMutating: isMutatingSearchQuery } =
    useSWRMutation("postSearchQuery", postSearchQuery);

  const {
    data: destinationPoints,
    trigger: destinationPointTrigger,
    isMutating,
  } = useSWRMutation("destinationPoints", getDestinationPoints);

  useEffect(() => {
    destinationPointTrigger(fromSearch?.value);
  }, [fromSearch]);

  const router = useRouter();

  const filteredPassedDateFrom = (date) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    return currentDate < selectedDate;
  };

  const filteredPassedDateTo = (date) => {
    const currentDate = pickupDate;
    const selectedDate = new Date(date);

    return currentDate < selectedDate;
  };

  const onSubmit = async (data) => {
    const { fromSearch, toSearch, passengers, pickupDate, returnDate } = data;
    const passengerAdult = passengers?.adult;
    const passengerBaby = passengers?.baby;
    const passengerChild = passengers?.child;

    const routes = await getSearchRoute(fromSearch.value, toSearch.value);
    if (!routes.length) {
      return;
    }
    const route = routes[0];

    const query = await postSearchQueryTrigger({
      routeId: route._id,
      fromDate: pickupDate,
      toDate: returnDate,
      adults: passengerAdult,
      children: passengerChild,
      baby: passengerBaby,
    });

    router.push(`route/${query._id}`);
  };

  return (
    <>
      <Head>
        <title>VICTORIA TRANSFER</title>
        <meta name="description" content="VICTORIA TRANSFER " />
        <meta name="keywords" content="VICTORIA TRANSFER" />
        <meta property="og:title" content="VICTORIA TRANSFER" />
        <meta property="og:description" content="VICTORIA TRANSFER" />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:title" content="VICTORIA TRANSFER" />
        <meta name="twitter:description" content="VICTORIA TRANSFER" />
        <meta name="twitter:image" content="/logo.png" />
      </Head>

      <View
        backgroundImage={`url(${Background.src})`}
        backgroundSize="cover"
        backgroundPosition="center left"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Title
          fontFamily="Poppins"
          fontWeight="600"
          lineHeight="1em"
          color="#fff"
          fontSize={["40px", "40px", "60px"]}
          mb={["0px", "0px", "0px", "0px", "150px"]}
        >
          {t.rich("promo", {
            br: <br />,
            code: (chunks) => (
              <span className="text-container">
                {chunks}
                <svg
                  width="135"
                  height="20"
                  viewBox="0 0 135 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M134.061 2.39267C56.7892 -2.64373 23.5141 5.85991 1.17627 9.37998C0.829113 12.3173 0.960959 14.7333 0.591235 19.4C60.4865 -0.0556588 100.416 3.14161 134.017 4.381C134.03 4.01153 134.02 3.50108 134.061 2.39267Z"
                    fill="#003F7D"
                  />
                </svg>
              </span>
            ),
          })}
        </Title>
        {/* <View
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
        </View> */}

        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <View
              backgroundColor="white"
              margin="0 auto"
              borderRadius="8px"
              width="100%"
              mt="30px"
            >
              <View
                display="grid"
                gridGap="10px"
                gridTemplateColumns={[
                  "1fr",
                  "1fr",
                  "1fr 1fr",
                  "1fr 1fr",
                  "1fr 1fr 1fr 1fr 1fr 1fr",
                ]}
                justifyContent="space-between"
                alignItems="stretch"
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
                  <Controller
                    name="fromSearch"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => {
                      console.log(error, "error");
                      return (
                        <FieldArea error={error}>
                          <View display="flex" alignItems="center">
                            <View fontSize="14px" color="#B6B6B6">
                              <Select
                                id="from"
                                padding="20px"
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
                                      <LocationForm
                                        width="32px"
                                        height="32px"
                                      />
                                      <View
                                        display="flex"
                                        alignItems="flex-start"
                                        flexDirection="column"
                                        marginLeft="10px"
                                      >
                                        <View>{t("from")}</View>
                                        <View color="#747474">
                                          {selectedOptions?.label ||
                                            placeholder}
                                        </View>
                                      </View>
                                    </View>
                                  );
                                }}
                              >
                                {Object.entries(startingPoints)?.map(
                                  ([type, points]) =>
                                    points.map((point) => (
                                      <Select.Option
                                        value={point?._id}
                                        label={
                                          <View
                                            display="flex"
                                            alignItems="center"
                                            color="#747474"
                                          >
                                            {POINT_ICONS[type || "other"]}
                                            <Text as="span" size="sm" ml="10px">
                                              {point?.name}
                                            </Text>
                                          </View>
                                        }
                                      />
                                    ))
                                )}
                              </Select>
                            </View>
                          </View>
                        </FieldArea>
                      );
                    }}
                  />
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
                  <Controller
                    name="toSearch"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FieldArea error={error}>
                        <View display="flex" alignItems="center">
                          <View
                            display="flex"
                            alignItems="flex-start"
                            flexDirection="column"
                          >
                            <View fontSize="14px" color="#B6B6B6">
                              <Select
                                padding="20px"
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
                                      opacity={
                                        !Object.keys(destinationPoints || {})
                                          ?.length
                                          ? "0.3"
                                          : "1"
                                      }
                                      onClick={toggleSelect}
                                    >
                                      {isMutating ? (
                                        <LoadingIcon />
                                      ) : (
                                        <LocationForm
                                          width="32px"
                                          height="32px"
                                        />
                                      )}
                                      <View
                                        display="flex"
                                        alignItems="flex-start"
                                        flexDirection="column"
                                        marginLeft="10px"
                                      >
                                        <View>{t("to")}</View>
                                        {selectedOptions?.label || placeholder}
                                      </View>
                                    </View>
                                  );
                                }}
                              >
                                {Object.keys(destinationPoints || {})
                                  ?.length ? (
                                  Object.entries(destinationPoints)?.map(
                                    ([type, points]) =>
                                      points.map((point) => (
                                        <Select.Option
                                          value={point?._id}
                                          label={
                                            <View
                                              display="flex"
                                              alignItems="center"
                                              color="#747474"
                                            >
                                              {POINT_ICONS[type || "other"]}
                                              <Text
                                                as="span"
                                                size="sm"
                                                ml="10px"
                                              >
                                                {point?.name}
                                              </Text>
                                            </View>
                                          }
                                        />
                                      ))
                                  )
                                ) : (
                                  <Select.Option
                                    disabled
                                    label="Select a starting point"
                                  />
                                )}
                              </Select>
                            </View>
                          </View>
                        </View>
                      </FieldArea>
                    )}
                  />
                </View>

                <View
                  afterLine
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Controller
                    name="pickupDate"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FieldArea error={error}>
                        <DatePicker
                          locale={dateFnsLocale}
                          selected={value}
                          value={value}
                          onChange={(date) => onChange(date)}
                          showTimeSelect
                          filterDate={filteredPassedDateFrom}
                          filterTime={(time) => {
                            const currentDate = new Date();
                            const selectedDate = new Date(value);
                            if (
                              currentDate.toDateString() ===
                              selectedDate.toDateString()
                            ) {
                              return (
                                setHours(setMinutes(new Date(), 0), 17) < time
                              );
                            }
                            return true;
                          }}
                          dateFormat="dd:MM:yyyy hh:mm"
                          popperPlacement="bottom-start"
                          placeholderText="Add Pickup Date"
                          title={t("pickup-date")}
                          customInput={<DateInput />}
                        />
                      </FieldArea>
                    )}
                  />
                </View>

                <View
                  afterLine
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Controller
                    name="returnDate"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <FieldArea error={error}>
                        <DatePicker
                          selected={value}
                          locale={dateFnsLocale}
                          onChange={(date) => onChange(date)}
                          showTimeSelect
                          dateFormat="dd:MM:yyyy hh:mm"
                          popperPlacement="bottom-start"
                          placeholderText="Add Return Date"
                          title={t("return-date")}
                          filterDate={filteredPassedDateTo}
                          filterTime={(time) => {
                            const currentDate = new Date();
                            const selectedDate = new Date(time);
                            if (
                              currentDate.toDateString() ===
                              selectedDate.toDateString()
                            ) {
                              return (
                                setHours(setMinutes(new Date(), 0), 17) < time
                              );
                            }
                            if (
                              selectedDate.toDateString() ===
                              pickupDate.toDateString()
                            ) {
                              const oneHourLater = new Date(pickupDate);
                              oneHourLater.setHours(pickupDate.getHours() + 1);
                              return time >= oneHourLater;
                            }
                            return true;
                          }}
                          customInput={<DateInput />}
                        />
                      </FieldArea>
                    )}
                  />
                </View>

                <View
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent={["space-between", "space-between", "center"]}
                >
                  <View width="100%">
                    <Controller
                      name="passengers"
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <FieldArea error={error}>
                          <PersonSelect {...field}>
                            <View
                              display="flex"
                              alignItems="center"
                              padding="20px"
                            >
                              <UserForm />
                              <View
                                display="flex"
                                alignItems="flex-start"
                                flexDirection="column"
                                marginLeft="10px"
                              >
                                <span>{t("passengers")}</span>

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
                        </FieldArea>
                      )}
                    />
                  </View>
                </View>

                <View p="20px">
                  <Button
                    as="button"
                    disabled={
                      Object.keys(errors).length || isMutatingSearchQuery
                    }
                  >
                    {isMutatingSearchQuery ? (
                      <LoadingIcon width="25px" height="25px" />
                    ) : (
                      t("search")
                    )}
                  </Button>
                </View>
              </View>
            </View>
          </form>
        </Container>
      </View>
      <Section
        py="55px"
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
                color="#1572D3"
              >
                <Airplane width="35px" height="35 px" />
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
                color="#1572D3"
              >
                <House width="49px" height="49px" />
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
        py="55px"
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
        py="55px"
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
        py="55px"
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
            {topDestinations?.map((destination) => (
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

export async function getServerSideProps({ locale }) {
  const [
    vehicles,
    transferPoints,
    testimonials,
    topDestinations,
    startingPoints,
  ] = await Promise.all([
    getVehicles(),
    getTransferPoints(),
    getTestimonials(),
    getTopDestinations(),
    getStartingPoints(),
  ]);

  return {
    props: {
      vehicles,
      transferPoints,
      testimonials,
      startingPoints,
      topDestinations,
      locale,
    },
  };
}
