import { View, Header, Footer } from "@/components";

const Layout = ({ children, globalProps }) => {
  return (
    <View
      display="grid"
      gridTemplateColumns="1fr"
      gridTemplateRows="auto 1fr auto"
      minHeight="100vh"
      alignItems="start"
      width="100%"
    >
      <Header mainNavigation={globalProps?.mainNavigation} pages={globalProps?.pages} />
      <main style={{ maxWidth: "100vw", overflow: "hidden" }}>{children}</main>
      <Footer footerNavigation={globalProps?.footerNavigation} pages={globalProps?.pages} />
    </View>
  );
};

export default Layout;
