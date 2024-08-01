import Head from "next/head";
import { useRouter } from "next/navigation";
import { forwardRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useFormatter, useTranslations } from "next-intl";
import {
  View,
  Title,
  Container,
  Section,
  Grid,
  Image,
  Text,
  Button,
  Checkbox,
  TextField,
  FieldArea,
  Icon,
  Price,
} from "@/components";
import { WizardProvider } from "wizardcontext/WizardContext";
import { useWizardContext } from "wizardcontext/WizardContext";
import {
  createTransfer,
  getAdditionalServices,
  getQueryById,
  getVehicles,
} from "@/service";
import * as pattern from "@/utils/pattern";
import WifiIcon from "@/assets/icons/wifi.svg";
import DriverIcon from "@/assets/icons/driver.svg";
import AirIcon from "@/assets/icons/air.svg";
import LoadingIcon from "@/assets/icons/loading.svg";

const FEATURES_ICON = {
  airConditioning: <AirIcon width="15px" height="15px" />,
  wifi: <WifiIcon width="15px" height="15px" />,
  driverInformation: <DriverIcon width="15px" height="15px" />,
};

const ServiceItem = ({ service }) => {
  const t = useTranslations();
  const { selectService, selectedService, locale = "tr" } = useWizardContext();
  const currentService = selectedService[service._id] || {
    outbound: 0,
    return: 0,
  };

  const handleSelectService = (type, tripType) => {
    selectService(service, type, tripType);
  };

  return (
    <View
      border="1px solid #adadad"
      pt="0px"
      pr="0px"
     display="flex"
     flexDirection={["column", "column", "column"]}
    >
           <View display="flex" order="3" >
            
           <View
        borderTop="1px solid #adadad"
        p="10px 44px"
        display="flex"
        width="100%"
        alignItems="center"
        justifyContent="center"
        
      >
        <View textAlign="center">
          Gidiş
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
              onClick={() => handleSelectService("decrement", "outbound")}
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
              {currentService.outbound}
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
              onClick={() => handleSelectService("increment", "outbound")}
            >
              +
            </Button>
          </View>
        </View>
        <View textAlign="center" ml="20px">
          Dönüş
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
              onClick={() => handleSelectService("decrement", "return")}
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
              {currentService.return}
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
              onClick={() => handleSelectService("increment", "return")}
            >
              +
            </Button>
          </View>
        </View>
      </View>
       
      </View>
      <View display="flex" flexDirection={["column","column","row"]} alignItems="center"  >
        <Image  width={["100%", "100%", "250px"]} src={service.image} />
        <View p="10px">
        <View as="h5">{service.name[locale]}</View>
        <View as="p">{service.description[locale]}</View>
        <Text mt="10px" color="red" fontWeight="bold">
          Fiyat: <Price value={service.price} />
        </Text>
        <Text color="red" fontWeight="bold">
          {t("total")}:
          <Price
            value={
              service.price *
              (currentService.outbound + currentService.return || 1)
            }
          />
        </Text>
      </View>
      </View>
    
 
    </View>
  );
};

const VehicleItem = ({ vehicle, onSelect }) => {
  const t = useTranslations();
  const { initialData } = useWizardContext();

  const vehiclePrice = initialData?.route?.vehiclePrices?.find(
    (item) => item.id === vehicle._id
  );

  if (!vehiclePrice) {
    return null;
  }

  return (
    <View mb="20px" border="1px solid #ccc" p="20px">
      <View
        display="flex"
        justifyContent="space-between"
        alignItems="stretch"
        mr={["0", "0", "5em"]}
        width="100%"
        flexDirection={["column", "column", "row"]}
      >
        {vehicle?.imageUrl ? (
          <View flex="1">
            <Image
              src={vehicle.imageUrl}
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </View>
        ) : null}

        <View flex="1" pl="15px" justifyContent="space-between">
          <Title as="h5" size="xl">
            {vehicle?.name}
          </Title>
          <View boxShadow="0 4px 8px rgba(0,0,0,0.4)" p="20px" mt="10px">
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
                <Price value={vehiclePrice?.price} />
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
              onClick={() =>
                onSelect({ ...vehicle, price: vehiclePrice.price })
              }
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

      <View>
        <div className="vehicle-info">
          <h3>{t('service_information')}</h3>
          <div className="label">{t("brand")}</div>
          <div className="label">{t("model")}</div>
          <div className="label">{t("type")}</div>
          <div className="label">{t("passengers-count")}</div>
          <div className="label">{t("type")}</div>
          <div className="value">{vehicle.brand}</div>
          <div className="value">{vehicle.model}</div>
          <div className="value">{t(vehicle.type)}</div>
          <div className="value">{vehicle.passengerCapacity}</div>
          <div className="value">{t(vehicle.transmission)}</div>
        </div>
        <div className="vehicle-description">
          {vehicle.features && (
            <div>
              <h5>{t("features")}:</h5>
              <ul>
                {vehicle.features.map((feature, index) => (
                  <li key={index}>
                    {FEATURES_ICON[feature]} {t(feature)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </View>
    </View>
  );
};

const TimeText = ({ duration, distance }) => (
  <View
    display="flex"
    alignItems="start"
    justifyContent="start"
    flexDirection="column"
  >
    {distance && (
      <Text as="span" size="sm" color="white">
        {distance} KM
      </Text>
    )}
    {duration && (
      <Text as="span" size="xs" color="white">
        {duration.hours} saat {duration.minutes} dakika
      </Text>
    )}
  </View>
);

const StepLeft = () => {
  const t = useTranslations();
  const formatDateTime = useFormatter();
  const {
    total,
    initialData,
    selectedVehicle,
    selectedService,
    locale = "tr",
    changeStep,
  } = useWizardContext();

  const {
    adults: passengerAdult,
    baby: passengerBaby,
    children: passengerChild,
  } = initialData?.passengers || {
    adults: 0,
    baby: 0,
    children: 0,
  };

  let time = (
    <TimeText
      duration={initialData?.duration}
      distance={initialData?.distance}
    />
  );

  return (
    <View >
      <View border="1px solid #ccc" >
        <View >
          <View
          
            backgroundColor="#1572D3"
            p="20px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <View color="#fff" fontWeight="bold">
              {t("from")}
            </View>
            <View color="#fff" fontWeight="bold">
              {time}
            </View>
          </View>
          <View>
            <ul
              style={{
                backgroundColor: "white",
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
                  {formatDateTime.dateTime(new Date(initialData?.fromDate), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
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
                  {initialData?.route?.startingPoint?.name}
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
                  {initialData?.route?.destinationPoint?.name}
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
                  {`${passengerAdult} Yetişkin`} / {`${passengerBaby} Bebek`} /{" "}
                  {`${passengerChild} Çocuk`}
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
              {t("to")}
            </View>
            <View color="#fff" fontWeight="bold">
              {time}
            </View>
          </View>
          <View>
            <ul
              style={{
                backgroundColor: "white",
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
                  {formatDateTime.dateTime(new Date(initialData?.toDate), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
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
                  {initialData?.route?.destinationPoint?.name}
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
                  {initialData?.route?.startingPoint?.name}
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
                  {`${passengerAdult} Yetişkin`} / {`${passengerBaby} Bebek`} /{" "}
                  {`${passengerChild} Çocuk`}
                </View>
              </li>
            </ul>
          </View>
        </View>
      </View>

      {selectedVehicle?._id ? (
        <View
          display="flex"
          mt="20px"
          alignItems="strect"
          justifyContent="space-between"
          border="1px solid #ccc"
          p="10px"
        >
          <View maxWidth="200px" position="relative">
            <Button
              variant="small"
              as="button"
              position="absolute"
              top="10px"
              left="10px"
              onClick={() => changeStep(1)}
            >
              {t("change")}
            </Button>
            <Image
              src={selectedVehicle?.imageUrl}
              width="100%"
              alt={selectedVehicle?.name}
              title={selectedVehicle?.name}
            />
          </View>
          <View
            ml="10px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            flex="1"
          >
            <View>
              <View pt="20px">
                <Text fontWeight="bold">{selectedVehicle?.name}</Text>
                <Text>
                  {selectedVehicle?.brand} {selectedVehicle?.model}
                </Text>
              </View>
            </View>
            <Text textAlign="right" as="span" fontWeight="bold">
              <Price value={selectedVehicle?.price} />
            </Text>
          </View>
        </View>
      ) : null}

      {Object.values(selectedService).length ? (
        <View mt="20px" border="1px solid #ccc" p="10px">
          {Object.values(selectedService).map((service) => (
            <View
              key={service._id}
              display="flex"
              alignItems="strect"
              justifyContent="space-between"
            >
              <View maxWidth="200px" position="relative">
                <Button
                  variant="small"
                  as="button"
                  position="absolute"
                  top="10px"
                  left="10px"
                  onClick={() => changeStep(2)}
                >
                  {t("change")}
                </Button>
                <Image
                  src={service?.image}
                  width="100%"
                  alt={service?.name?.[locale]}
                  title={service?.name?.[locale]}
                />
              </View>
              <View
                ml="10px"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                flex="1"
              >
                <View pt="20px">
                  <Text fontWeight="bold">{service?.name?.[locale]}</Text>
                  <Text>Gidiş: {service?.outbound}</Text>
                  <Text>Dönüş: {service?.return}</Text>
                </View>
                <View display="flex" justifyContent="flex-end">
                  <table>
                    <tr>
                      <td>Price :</td>
                      <td>
                        <Price value={service?.price} />
                      </td>
                    </tr>
                    <tr>
                      <td>Total Price :</td>
                      <td>
                        <Text as="span" fontWeight="bold">
                          <Price
                            value={
                              service?.price *
                              ((service?.outbound || 0) +
                                (service?.return || 0))
                            }
                          />
                        </Text>
                      </td>
                    </tr>
                  </table>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : null}

      <View
        borderBottom="1px solid #ccc"
        pb="5px"
        my="50px"
        display="flex"
        justifyContent="space-between"
        m="30px auto"
        width={["350px", "350px", "100%"]}
      >
        <View>{t("total")}</View>
        <View fontWeight="bold">
          <Price value={total} />
        </View>
      </View>
      <View>
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
  const { selectVehicle, vehicles, gotoNextStep } = useWizardContext();

  const handleSelectedVehicle = (vehicle) => {
    selectVehicle(vehicle);
    gotoNextStep();
  };

  return (
    <View>
      {vehicles?.map((vehicle) => (
        <VehicleItem
          key={vehicle._id}
          vehicle={vehicle}
          onSelect={handleSelectedVehicle}
        />
      ))}
    </View>
  );
};

const Step2 = () => {
  const { additionalServices, gotoNextStep } = useWizardContext();

  return (
    <View >
     
      {additionalServices?.map((service) => (
        <ServiceItem key={service._id} service={service} />
      ))}
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
  const t = useTranslations();
  const router = useRouter();
  const formatDateTime = useFormatter();
  const [isLoad, setIsLoad] = useState(false);

  const { initialData, total, selectedService, selectedVehicle } =
    useWizardContext();

  const { control, handleSubmit } = useForm({
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

  const onSubmit = async (data) => {
    try {
      setIsLoad(true);
      const res = await createTransfer({
        route: initialData?.route?._id,
        additionalServices: selectedService,
        vehicle: selectedVehicle?._id,
        whatsappNotification: data?.isKvkk,
        flightNumber: data?.flightno,
        airline: data?.company,
        dropOffLocation: data?.address,
        driverMessage: data?.message,
        price: total,
        transferDateFrom: initialData?.fromDate,
        transferDateTo: initialData?.toDate,
        user: {
          firstName: data?.name,
          lastName: data?.surname,
          emailAddress: data?.email,
          phoneNumber: data?.phone,
        },
      });

      if (res?.reservationCode) {
        router.push(`/success?reservationId=${res.reservationCode}`);
      }
    } catch (error) {
      router.push(`/error?reservationId=${res.reservationCode}`);
      console.error(error);
    } finally {
      setIsLoad(false);
    }
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
                message: "Lütfen isim alanını doldurunuz",
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
                message: "Lütfen soyisim alanını doldurunuz",
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
                message: "Lütfen email alanını doldurunuz",
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
            {t("from")}
          </Title>
          <Text display="block" as="span">
            {initialData?.route?.startingPoint?.name}
          </Text>
          <Text display="block" as="span">
            {formatDateTime.dateTime(new Date(initialData?.fromDate), {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </Text>
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
              minLength: {
                value: 2,
                message: "Lütfen en az 2 karakter giriniz",
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
              minLength: {
                value: 2,
                message: "Lütfen en az 2 karakter giriniz",
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
              minLength: {
                value: 2,
                message: "Lütfen en az 2 karakter giriniz",
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
                <View mb="20px">Uçuş No</View>

                <TextField placeholder="TK1440" {...field}></TextField>
              </FieldArea>
            )}
          />

          <Controller
            control={control}
            name="message"
            rules={{
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

        <Button as="button" disabled={isLoad}>
          {isLoad ? <LoadingIcon /> : null}
          <Text as="span" mx="5px" color="currentColor">
            Rezervasyon Oluştur
          </Text>
        </Button>
      </form>
    </View>
  );
});

const Wizard = () => {
  const { step } = useWizardContext();
  return (
    <Grid gridTemplateColumns={["1fr", "1fr", "400px 1fr"]}   alignItems="flex-start"
    justifyContent="center" gridGap="30px">
      <View m="0 auto">
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

export default function Home({ pageProps }) {
  const { transactionSearchResult, vehicles, additionalServices, locale } =
    pageProps;

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
      <WizardProvider
        initialData={transactionSearchResult}
        vehicles={vehicles}
        additionalServices={additionalServices}
        locale={locale}
      >
        <Section my={["50px", "50px", "150px"]}>
          <Container>
            <Wizard />
          </Container>
        </Section>
      </WizardProvider>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const [transactionSearchResult, vehicles, additionalServices] =
    await Promise.all([
      getQueryById(params.id),
      getVehicles(),
      getAdditionalServices(),
    ]);

  return {
    props: {
      transactionSearchResult,
      vehicles,
      additionalServices,
    },
  };
}
