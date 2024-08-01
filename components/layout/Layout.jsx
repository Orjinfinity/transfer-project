import { View, Header, Footer } from "@/components";

const Layout = ({ children, globalProps, locale }) => {
  return (
    <View
      display="grid"
      gridTemplateColumns="1fr"
      gridTemplateRows="auto 1fr auto"
      minHeight="100vh"
      alignItems="start"
      width="100%"
      gridTemplateAreas={`"header" "main" "footer"`}
    >
      <Header {...globalProps} locale={locale} />
      <main style={{ maxWidth: "100vw", overflow: "hidden", gridArea: "main" }}>
        {children}
      </main>
      <Footer {...globalProps} locale={locale} />
    </View>
  );
};

export default Layout;
